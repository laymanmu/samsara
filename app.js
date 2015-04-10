
var App = {

  rooms:      [],
  mobs:       [],
  mouse:      {x:0, y:0},
  player:     null,

  init: function() {
    this.initEvents();
    this.initRooms();
    this.initMobs();
    this.initPlayer();
    Screens.init();
  },

  initPlayer: function() {
    this.player = new Mob({name:"player", desc:"a human"});
    this.rooms[0].addMob(this.player);
    this.player.messages = [];
    this.player.actions  = [];

    this.player.actions.push(ActionRepository.create('look'));
    this.player.actions.push(ActionRepository.create('offerRespect'));
  },

  initEvents: function() {
    window.onkeypress = function(e) {
      e = e || window.event;
      var code = e.which==0 ? e.keyCode : e.which;
      App.handleInput(code);
    };
    document.onmousemove = function(e) {
      App.mouse.x = e.pageX;
      App.mouse.y = e.pageY;
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
    for (var i=0; i<Helpers.randInt(30,100); i++) {
      var mob  = MobRepository.createRandom();
      var room = this.rooms[Helpers.randInt(0,this.rooms.length-1)];
      room.addMob(mob);
      this.mobs.push(mob);
    }
    var ascetic = MobRepository.create('ascetic');
    this.rooms[0].addMob(ascetic);
    this.mobs.push(ascetic);
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

  wander: function() {
    var exitName = Helpers.randElement(this.player.room.getExitNames());
    Screens.sendMessage(this.player, 'you wandered towards the '+ exitName);
    this.runCommand(exitName);
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
    var builtins  = ["look", "rest", "clear", "help" ];

    // built-in commands:
    if (cmd == "look" || cmd == "rest") {
      tookTurn = true;
    } else if (cmd == "clear") {
      this.clearOutput();
      return null;
    } else if (cmd == "help") {
      var html = '<span class="help">Commands: '+ builtins.sort().join(', ') +'</span><br>';
      this.print(html);
      return null;
    } else if (cmd == "wander") {
      this.wander();
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
