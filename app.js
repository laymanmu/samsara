
var App = {

  settings:   {alwaysClearScreen:true},
  rooms:      [],
  mobs:       [],
  player:     new Mob({name:"player", desc:"a human"}),
  cmdHistory: {pos:0, partial:null, cmds:[]},

  init: function() {
    this.input  = document.getElementById('input');
    this.output = document.getElementById('output');
    this.initRooms();
    this.initMobs();
    this.clearOutput();
    this.look();
    this.input.focus();
    window.onkeypress = function(e) {
      e = e || window.event;
      var code = e.which==0 ? e.keyCode : e.which;
      App.handleInput(code);
    }
  },

  initRooms: function() {
    var park = new Room({name:"deer park", desc:"a shaded grove"});
    var pond = new Room({name:"small pond", desc:"a small pond surrounded by trees"});
    park.exits.add("north", pond);
    pond.exits.add("south", park);
    this.rooms.push(park);
    this.rooms.push(pond);
  },

  initMobs: function() {
    this.rooms[0].addMob(this.player);
    this.addMob(new Mob({name:"deer", desc:"a big buck"}),    this.rooms[0]);
    this.addMob(new Mob({name:"deer", desc:"a gentle fawn"}), this.rooms[1]);
    this.addMob(new Mob({name:"deer", desc:"a quick doe"}),   this.rooms[1]);
  },

  addMob: function(mob, room) {
    this.mobs.push(mob);
    room.addMob(mob);
  },

  print: function(html) {
    if (this.settings.alwaysClearScreen) {
      this.output.innerHTML = "";
    } else {
      this.printDivider();
    }
    this.output.innerHTML += html;
    this.scrollToBottom();
  },

  printDivider: function() {
    if (this.output.innerHTML.length > 0) {
      var html = '<br><span class="divider">~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~</span><br><br>';
      this.output.innerHTML += html;
    }
  },

  scrollToBottom: function() {
    this.output.scrollTop = this.output.scrollHeight;
  },

  clearOutput: function() {
    this.output.innerHTML = "";
  },

  look: function() {
    var room = this.player.room;
    var html = '<span class="roomName">'+room.name+'</span><br />';
    html += '<span class="roomDesc">'+room.desc+'</span><br />';
    html += 'Exits: <span class="roomExits">'+room.describeExits()+'</span><br>';
    html += 'Mobs:  <span class="roomMobs">'+room.describeMobs()+'</span><br>';
    this.print(html);
  },

  handleInput: function(code) {
    if (code == Keyboard.KEY_Enter) {
      var command      = this.input.value;
      this.input.value = "";
      this.runCommand(command);
      this.cmdHistory.cmds.push(command);
      this.cmdHistory.pos     = this.cmdHistory.cmds.length;
      this.cmdHistory.partial = "";
    } else if (code == Keyboard.KEY_UpArrow) {
      // no history or at oldest? - do nothing:
      if (this.cmdHistory.cmds.length==0 || this.cmdHistory.pos==0) return;
      // at the newest command? - grab a partial:
      if (this.cmdHistory.pos == this.cmdHistory.cmds.length) {
        this.cmdHistory.partial = this.input.value;
      }
      // if there are more then move:
      if (this.cmdHistory.pos > 0) {
        this.cmdHistory.pos--;
        this.input.value = this.cmdHistory.cmds[this.cmdHistory.pos];
      }
    } else if (code == Keyboard.KEY_DownArrow) {
      // no history? - do nothing:
      if (this.cmdHistory.cmds.length==0) return;
      // if there are more then move:
      if (this.cmdHistory.pos < this.cmdHistory.cmds.length) {
        this.cmdHistory.pos++;
        if (this.cmdHistory.pos == this.cmdHistory.cmds.length) {
          this.input.value = this.cmdHistory.partial;
        } else {
          this.input.value = this.cmdHistory.cmds[this.cmdHistory.pos];
        }
      }
    }
  },

  runCommand: function(cmd) {
    if (!cmd || cmd.length==0) return;

    var tookTurn = false;

    // built-in commands:
    if (cmd == "look" || cmd == "rest") {
      tookTurn = true;
    } else if (cmd == "clear") {
      this.clearOutput();
      return null;
    } else if (cmd == "help") {
      var html = '<span class="help">Commands: clear, help, look, rest, settings</span><br>';
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
      var cmdLength = cmd.length;
      for (var i=0; i<exitNames.length; i++) {
        var exitPartial = exitNames[i].substring(0,cmdLength);
        if (cmd == exitPartial) {
          this.player.room.moveMob(this.player, exitNames[i]);
          tookTurn = true;
        }
      }
    }

    if (tookTurn) {
      this.takeTurn();
    } else {
      this.print('<span class="error">Unknown command: '+cmd+'</span><br>');
    }
  },

  takeTurn: function() {
    for (var i=0; i<this.mobs.length; i++) {
      this.mobs[i].takeTurn();
    }
    this.look();
  }

};
