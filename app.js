
var App = {

  settings:   {alwaysClearScreen:true},
  rooms:      [],
  mobs:       [],
  actions:    [],
  cmdHistory: {pos:0, partial:null, cmds:[]},
  mouse:      {x:0, y:0},
  ui:         {},
  player:     null,

  init: function() {
    this.ui.input   = document.getElementById('input');
    this.ui.output  = document.getElementById('output');
    this.ui.context = document.getElementById('context');
    this.ui.log     = document.getElementById('log');
    this.initEvents();
    this.initRooms();
    this.initMobs();
    this.initPlayer();
    this.initActions();
    this.clearOutput();
    this.look();
    this.ui.input.focus();
  },

  initPlayer: function() {
    this.player = new Mob({name:"player", desc:"a human"}),
    this.player.messages = [];
    this.rooms[0].addMob(this.player);
  },

  initActions: function() {
    var actions    = this.actions;
    var actionsDiv = document.getElementById('actions');
    function addAction(properties) {
      var action = new Action(properties);
      actions.push(action);
      actionsDiv.appendChild(action.image);
    }
    addAction({name:'look',   command:'look',  icon:'Icon.1_11.png',desc:'look at the room or your target'});
    addAction({name:'respect',command:'rest',  icon:'Icon.7_06.png',desc:'rest'});
    addAction({name:'wander', command:'wander',icon:'Icon.4_33.png',desc:'wander around randomly'});
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
    //this.rooms[this.rooms.length-1].addMob(ascetic);
    this.rooms[0].addMob(ascetic);
    this.mobs.push(ascetic);
  },

  print: function(html) {
    if (this.settings.alwaysClearScreen) {
      this.ui.output.innerHTML = "";
    } else {
      this.printDivider();
    }
    this.ui.output.innerHTML += html;
    this.scrollToBottom();
  },

  printDivider: function() {
    if (this.ui.output.innerHTML.length > 0) {
      var html = '<br><span class="divider">~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~</span><br><br>';
      this.ui.output.innerHTML += html;
    }
  },

  scrollToBottom: function() {
    this.ui.output.scrollTop = this.ui.output.scrollHeight;
  },

  clearOutput: function() {
    this.ui.output.innerHTML = "";
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
    return this.findEntity(id, this.actions);
  },

  wander: function() {
    var exitName = Helpers.randElement(this.player.room.getExitNames());
    this.sendMessage(this.player, 'you wandered towards the '+ exitName);
    this.runCommand(exitName);
  },

  updateContextWindow: function() {
    if (!this.player.target) {
      this.ui.context.innerHTML = "";
    } else {
      this.ui.context.innerHTML = this.player.target.getPopupHTML();
    }
  },

  look: function() {
    var room = this.player.room;

    var html;

    // ascii art:
    //html = Helpers.randElement(AsciiArt.all);
    html = AsciiArt.hillTrees;

    html += '<br>';
    html += '<span class="roomName">'+room.name+'</span><br>';
    html += '<span class="roomDesc">'+room.desc+'</span><br>';

    // exits:
    var exitNames = room.getExitNames();
    var exitRooms = [];
    if (exitNames.length > 0) {
      html += 'Exits: ';
      for (var i=0; i<exitNames.length; i++) {
        var name = exitNames[i];
        var exit = room.getNextRoom(name);
        exitRooms.push(exit);
        html += '<span class="roomExit" id="'+exit.id+'">'+name+'</span>';
        if (i<exitNames.length-1) html += ', ';
      }
      html += '<br>';
    }

    // mobs:
    var mobs = [];
    for (var i=0; i<room.mobs.length; i++) {
      if (room.mobs[i] != this.player) {
        mobs.push(room.mobs[i]);
      }
    }
    if (mobs.length > 0) {
      html += 'Mobs: ';
      for (var i=0; i<mobs.length; i++) {
        html += '<span class="roomMob" id="'+ mobs[i].id +'">'+ mobs[i].name +'</span>';
        if (i<mobs.length-1)  html += ', ';
      }
      html += '<br>';
    }

    // messages:
    if (this.player.messages.length > 0) {
      html += '<br>';
      for (var i=0; i<this.player.messages.length; i++) {
        html += '<span class="message">  '+this.player.messages[i]+'</span><br>';
      }
      this.player.messages = [];
    }

    // add html to document:
    this.print(html);

    // setup exit popup & click events:
    for (var i=0; i<exitRooms.length; i++) {
      var span = document.getElementById(exitRooms[i].id);
      span.exitName = exitNames[i];
      span.addEventListener("mouseenter", function(e) {
        var room = App.getRoom(e.target.id);
        Helpers.showPopup(room.getPopupHTML());
      });
      span.addEventListener("mouseleave", function(e) {
        Helpers.hidePopup();
      });
      span.addEventListener("click", function(e) {
        App.runCommand(e.target.exitName);
      });
    }

    // setup mob popup & click events:
    for (var i=0; i<mobs.length; i++) {
      var span = document.getElementById(mobs[i].id);
      span.addEventListener("mouseenter", function(e) {
        var mob = App.player.room.getMob(e.target.id);
        Helpers.showPopup(mob.getPopupHTML());
      });
      span.addEventListener("mouseleave", function(e) {
        Helpers.hidePopup();
      });
      span.addEventListener("click", function(e) {
        App.player.target = App.player.room.getMob(e.target.id);
        App.updateContextWindow();
      });


    }
  },

  handleInput: function(code) {
    if (code == Keyboard.KEY_Enter) {
      var command      = this.ui.input.value;
      this.ui.input.value = "";
      this.runCommand(command);
      this.cmdHistory.cmds.push(command);
      this.cmdHistory.pos     = this.cmdHistory.cmds.length;
      this.cmdHistory.partial = "";
    } else if (code == Keyboard.KEY_UpArrow) {
      // no history or at oldest? - do nothing:
      if (this.cmdHistory.cmds.length==0 || this.cmdHistory.pos==0) return;
      // at the newest command? - grab a partial:
      if (this.cmdHistory.pos == this.cmdHistory.cmds.length) {
        this.cmdHistory.partial = this.ui.input.value;
      }
      // if there are more then move:
      if (this.cmdHistory.pos > 0) {
        this.cmdHistory.pos--;
        this.ui.input.value = this.cmdHistory.cmds[this.cmdHistory.pos];
      }
    } else if (code == Keyboard.KEY_DownArrow) {
      // no history? - do nothing:
      if (this.cmdHistory.cmds.length==0) return;
      // if there are more then move:
      if (this.cmdHistory.pos < this.cmdHistory.cmds.length) {
        this.cmdHistory.pos++;
        if (this.cmdHistory.pos == this.cmdHistory.cmds.length) {
          this.ui.input.value = this.cmdHistory.partial;
        } else {
          this.ui.input.value = this.cmdHistory.cmds[this.cmdHistory.pos];
        }
      }
    }
  },

  runCommand: function(cmd) {
    if (!cmd || cmd.length==0) return;

    var tookTurn  = false;
    var cmdLength = cmd.length;
    var builtins  = ["look", "rest", "clear", "help", "settings"];

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

    // settings:
    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key)) {
        if (cmd == key) {
          this.settings[key] = !this.settings[key];
          this.print(key +" setting is now set to: "+ this.settings[key]);
          return null;
        }
      }
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
      this.update();
    } else {
      this.print('<span class="error">Unknown command: '+cmd+'</span><br>');
    }
  },

  update: function() {
    // mobs:
    for (var i=0; i<this.mobs.length; i++) {
      var mob = this.mobs[i];
      if (mob.hasMixin('Acting')) {
        mob.act();
      }
    }
    // actions:
    for (var i=0; i<this.actions.length; i++) {
      this.actions[i].update();
    }
    // player target:
    if (this.player.target && this.player.target.room.id != this.player.room.id) {
      this.player.target = null;
    }
    // screen:
    this.updateContextWindow();
    this.look();
  },

  sendMessage: function(from, msg) {
    if (from.room == this.player.room) {
      this.player.messages.push(msg);
    }
  },

};
