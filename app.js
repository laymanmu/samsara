
var App = {

  rooms:         [],
  currentRoom:   null,
  cmdHistory:    {pos:0, partial:null, cmds:[]},

  init: function() {
    this.input  = document.getElementById('input');
    this.output = document.getElementById('output');
    this.createRooms();
    this.clearOutput();
    this.look();
    window.onkeypress = function(e) {
      e = e || window.event;
      var code = e.which==0 ? e.keyCode : e.which;
      App.handleInput(code);
    }
  },

  createRooms: function() {
    var park = new Room({name:"deer park", desc:"a shaded grove"});
    var pond = new Room({name:"small pond", desc:"a small pond surrounded by trees"});
    park.exits.add("north", pond);
    pond.exits.add("south", park);
    this.rooms.push(park);
    this.rooms.push(pond);
    this.currentRoom = park;
  },

  print: function(html) {
    this.printDivider();
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
    var html = '<span class="roomName">'+this.currentRoom.name+'</span><br />';
    html += '<span class="roomDesc">'+this.currentRoom.desc+'</span><br />';
    html += 'Exits: <span class="roomExits">'+this.currentRoom.describeExits()+'</span><br>';
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

    // built-in commands:
    if (cmd == "look") {
      this.look();
      return null;
    }
    if (cmd == "clear") {
      this.clearOutput();
      return null;
    }
    if (cmd == "help") {
      var html = '<span class="help">Commands: clear, look, help</span><br>';
      this.print(html);
      return null;
    }

    // exact spelling of exits:
    var exitNames = this.currentRoom.getExitNames();
    for (var i=0; i<exitNames.length; i++) {
      if (cmd == exitNames[i]) {
        this.changeRoom(exitNames[i]);
        return null;
      }
    }

    // partial exit names:
    var cmdLength = cmd.length;
    for (var i=0; i<exitNames.length; i++) {
      var exitPartial = exitNames[i].substring(0,cmdLength);
      if (cmd == exitPartial) {
        this.changeRoom(exitNames[i]);
        return null;
      }
    }

    this.print('<span class="error">Unknown command: '+cmd+'</span><br>');
  },

  changeRoom: function(exitName) {
    var room = this.currentRoom.getNextRoom(exitName);
    this.currentRoom = room;
    this.look();
  }

};
