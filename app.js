
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
    Helpers.randElement(this.rooms).addMob(this.player);
    this.player.messages = [];
    this.player.actions  = [];

    this.player.actions.push(ActionRepository.create('look'));
    this.player.actions.push(ActionRepository.create('wander'));
    this.player.actions.push(ActionRepository.create('respect'));
    var numRandomActions = 3;
    while (numRandomActions > 0) {
      var action = ActionRepository.createRandom();
      var exists = false;
      for (var i=0; i<this.player.actions.length; i++) {
        if (this.player.actions[i].name == action.name) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.player.actions.push(action);
        numRandomActions--;
      }
    }
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
    var park = new Room({name:"deer park", desc:"a shaded grove"});
    var pond = new Room({name:"small pond", desc:"a small pond surrounded by trees"});
    var path = new Room({name:"dirt path", desc:"a dirt path"});
    var road = new Room({name:"road", desc:"a cobblestone road"});
    var hill = new Room({name:"hill", desc:"a grassy hill"});
    var camp = new Room({name:"camp", desc:"an abandoned campground"});

    park.exits.add("north", pond);
    pond.exits.add("south", park);

    park.exits.add("east", path);
    path.exits.add("west", park);

    path.exits.add("east", road);
    road.exits.add("west", path);

    road.exits.add("east", hill);
    hill.exits.add("west", road);

    hill.exits.add("east", camp);
    camp.exits.add("west", hill);

    this.rooms.push(park);
    this.rooms.push(pond);
    this.rooms.push(path);
    this.rooms.push(road);
    this.rooms.push(hill);
    this.rooms.push(camp);
  },

  initMobs: function() {
    for (var i=0; i<Helpers.randInt(3,10); i++) {
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
    } else if (cmd == "settings") {
      var html = 'Settings:<br><br>';
      for (var key in this.settings) {
        if (this.settings.hasOwnProperty(key)) {
          html += key +': <span class="settingsValue">'+ this.settings[key] +'</span><br>';
        }
      }
      this.print(html);
      return null;
    } else if (cmd == "wander") {
      this.wander();
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
      this.print('<span class="error">Unknown command: '+cmd+'</span><br>');
    }
  },

};
