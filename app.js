
var App = {

  rooms:  [],
  mobs:   [],
  items:  [],
  player: null,
  mouse:  {clientX:0, clientY:0, pageX:0, pageY:0},

  init: function() {
    this.initEvents();
    this.initRooms();
    this.initMobs();
    this.initItems();
    this.initPlayer();
    Screens.init();
  },

  initPlayer: function() {
    this.player = new Mob({name:"player", desc:"a human"});
    this.rooms[0].addMob(this.player);
    this.player.messages  = [];
    this.player.actions   = [];
    this.player.container = new Crafting.Container({name:"bag",slots:20});

    this.player.actions.push(ActionRepository.create('look'));
    this.player.actions.push(ActionRepository.create('offerRespect'));
    this.player.actions.push(ActionRepository.create('take'));
  },

  initEvents: function() {
    window.onkeypress = function(e) {
      e = e || window.event;
      var code = e.which==0 ? e.keyCode : e.which;
      App.handleInput(code);
    };
    document.onmousemove = function(e) {
      App.mouse.clientX = e.clientX;
      App.mouse.clientY = e.clientY;
      App.mouse.pageX = e.pageX;
      App.mouse.pageY = e.pageY;
    };
  },

  initRooms: function() {
    var parkWall  = RoomRepository.create('deer_park_wall');
    var parkGate  = RoomRepository.create('deer_park_entrance');
    var deerPark  = RoomRepository.create('inside_deer_park');
    var twoSadhus = RoomRepository.create('two_sadhus');

    twoSadhus.exits.add('grass', deerPark);
    deerPark.exits.add('grass', twoSadhus);

    deerPark.exits.add('gate', parkGate);
    parkGate.exits.add('gate', deerPark);

    parkGate.exits.add('path', parkWall);
    parkWall.exits.add('path', parkGate);

    this.rooms.push(parkWall);
    this.rooms.push(parkGate);
    this.rooms.push(deerPark);
    this.rooms.push(twoSadhus);

    // TODO: add init to rooms to create mobs
    for (var i=0; i<2; i++) {
      twoSadhus.addMob(MobRepository.create('sadhu'));
    }

    var lastRoom = parkWall;

    Helpers.shuffle(RoomRepository.randomTemplateNames);
    for (var i=0; i<RoomRepository.randomTemplateNames.length; i++) {
      var nextRoom = RoomRepository.create(RoomRepository.randomTemplateNames[i]);
      var exitPair = Helpers.randElement(RoomRepository.exitPairs);
      lastRoom.exits.add(exitPair[0], nextRoom);
      nextRoom.exits.add(exitPair[1], lastRoom);
      this.rooms.push(nextRoom);
      lastRoom = nextRoom;
    }
  },

  initMobs: function() {
    var numMobs = Helpers.randInt(30,100);
    for (var i=0; i<numMobs; i++) {
      var mob  = MobRepository.createRandom();
      var room = this.rooms[Helpers.randInt(0,this.rooms.length-1)];
      room.addMob(mob);
      this.mobs.push(mob);
    }
    // add an ascetic to the starting room:
    var ascetic = MobRepository.create('ascetic');
    this.rooms[0].addMob(ascetic);
    this.mobs.push(ascetic);
  },

  initItems: function() {
    var numItems = Helpers.randInt(30, 100);
    for (var i=0; i<numItems; i++) {
      var item = ItemRepository.createRandom();
      var room = this.rooms[Helpers.randInt(0, this.rooms.length-1)];
      room.addItem(item);
      this.items.push(item);
    }
  },

  findEntity: function(id, list) {
    for (var i=0; i<list.length; i++) {
      if (list[i].id == id) {
        return list[i];
      }
    }
  },

  getRoom: function(id) {
    return this.findEntity(id, this.rooms);
  },

  getAction: function(id) {
    return this.findEntity(id, this.player.actions);
  },

  handleInput: function(code) {
    if (Screens.currentScreen) {
      Screens.currentScreen.handleInput(code);
    }
  },

  runCommand: function(cmd) {
    if (!cmd || cmd.length==0) return;

    var tookTurn  = false;
    var cmdLength = cmd.length;

    // built-in commands:
    if (ActionCommands.hasOwnProperty(cmd)) {
      ActionCommands[cmd]();
      return null;
    } else if (cmd == "dhamma") {
      var talk  = DhammaTalks.random();
      var props = {title:talk.title, subTitle:talk.subTitle, text:talk.text};
      Screens.currentScreen.setChildScreen(Screens.DhammaTalk, props);
      return null;
    }

    // exact spelling of exits:
    if (!tookTurn) {
      var exitNames = this.player.room.getExitNames();
      for (var i=0; i<exitNames.length; i++) {
        if (cmd == exitNames[i]) {
          this.player.room.moveMob(this.player, exitNames[i]);
          tookTurn = true;
        }
      }
    }

    // partial exit names:
    if (!tookTurn) {
      for (var i=0; i<exitNames.length; i++) {
        var exitPartial = exitNames[i].substring(0,cmdLength);
        if (cmd == exitPartial) {
          this.player.room.moveMob(this.player, exitNames[i]);
          tookTurn = true;
        }
      }
    }

    if (tookTurn) {
      Screens.sendMessage(this.player, "command: "+ cmd);
      Screens.refresh();
    } else {
      console.log("ERROR: runCommand() unknown command: "+ cmd);
    }
  }


};
