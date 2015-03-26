
var App = {

  settings:   {alwaysClearScreen:true},
  rooms:      [],
  mobs:       [],
  cmdHistory: {pos:0, partial:null, cmds:[]},
  mouse:      {x:0, y:0},
  player:     null,

  init: function() {
    this.input  = document.getElementById('input');
    this.output = document.getElementById('output');
    this.initEvents();
    this.initRooms();
    this.initMobs();
    this.initPlayer();
    this.clearOutput();
    this.look();
    this.input.focus();
  },

  initPlayer: function() {
    this.player = new Mob({name:"player", desc:"a human"}),
    this.player.messages = [];
    this.rooms[0].addMob(this.player);
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
    var html = '<span class="roomName">'+room.name+'</span><br>';
    html += '<span class="roomDesc">'+room.desc+'</span><br>';
    html += 'Exits: <span class="roomExits">'+room.describeExits()+'</span><br>';

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

    this.print(html);

    for (var i=0; i<mobs.length; i++) {
      var span = document.getElementById(mobs[i].id);
      span.addEventListener("mouseenter", function(e) {
        var mob = App.player.room.getMob(e.target.id);
        if (!mob) {
          console.log("no mob found? e: ", e);
        }
        Helpers.showPopup(mob.getPopupHTML());
      });
      span.addEventListener("mouseleave", function(e) {
        Helpers.hidePopup();
      });
    }
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
    for (var i=0; i<this.mobs.length; i++) {
      var mob = this.mobs[i];
      if (mob.hasMixin('Acting')) {
        mob.act();
      }
    }
    this.look();
  },

  sendMessage: function(from, msg) {
    if (from.room == this.player.room) {
      this.player.messages.push(msg);
    }
  },

};
