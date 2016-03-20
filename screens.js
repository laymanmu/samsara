
var Screens = {
  currentScreen:   null,
  layoutContainer: null,

  init: function() {
    this.layoutContainer = document.getElementById("details");
    this.switchScreen(Screens.Start);
  },

  refresh: function() {
    if (this.currentScreen) {
      this.currentScreen.update();
      this.currentScreen.draw();
    }
  },

  switchScreen: function(screen, properties) {
    if (this.currentScreen != null) {
      this.currentScreen.exit();
    }
    this.currentScreen = screen;
    this.currentScreen.enter(properties);
    this.refresh();
  },

  sendMessage: function(from, msg, keepNew) {
    if (this.currentScreen == Screens.Play) {
      this.currentScreen.addLogMessage(from, msg, keepNew);
    }
  },

  print: function(msg, keepNew) {
    keepNew = keepNew || false;
    if (this.currentScreen) {
      this.currentScreen.print(msg, keepNew);
    }
  }

};

//==================================================================
// Play:
//==================================================================

Screens.Play = {
  childScreen:  null,
  cmdHistory:  {pos:0, partial:null, cmds:[]},
  ui:          {newLogMessageIDs:[]},

  enter: function(properties) {
    this.ui.canvas  = document.getElementById('canvas');
    this.ui.details = document.getElementById('details');
    this.ui.context = document.getElementById('context');
    this.ui.log     = document.getElementById('log');
    this.ui.actions = document.getElementById('actions');
    this.ui.input   = document.getElementById('input');
    this.ui.popup   = document.getElementById('popup');

    this.ui.canvas.width  = 800;
    this.ui.canvas.height = 300;

    this.ui.actions.innerHTML = "";
    for (var i=0; i<App.player.actions.length; i++) {
      this.ui.actions.appendChild(App.player.actions[i].image);
    }
    if (this.savedLog) {
      this.ui.log.innerHTML = this.savedLog;
      this.savedLog = null;
    }
    this.ui.input.focus();
  },

  exit: function() {
    this.savedLog    = this.ui.log.innerHTML;
    this.childScreen = null;
    Screens.layoutContainer.innerHTML = "";
  },

  draw: function() {
    if (this.childScreen) {
      this.childScreen.draw();
      return;
    }

    var room = App.player.room;
    var html = '';

    //this.ui.display.innerHTML = room.display;

    html += '<span class="roomName">'+room.name+'</span><br>';
    html += '<span class="roomDesc">'+room.desc+'</span><br>';

    // exits:
    var exitNames = room.getExitNames();
    var exitRooms = [];
    if (exitNames.length > 0) {
      html += '<div class="entityList">Exits: ';
      for (var i=0; i<exitNames.length; i++) {
        var name = exitNames[i];
        var exit = room.getNextRoom(name);
        exitRooms.push(exit);
        html += '<span class="roomExit" id="'+exit.id+'">'+name+'</span>';
        if (i<exitNames.length-1) html += ', ';
      }
      html += '</div>';
    }

    // mobs:
    var mobs = [];
    for (var i=0; i<room.mobs.length; i++) {
      if (room.mobs[i] != App.player) {
        mobs.push(room.mobs[i]);
      }
    }
    if (mobs.length > 0) {
      html += '<div class="entityList">Beings: ';
      for (var i=0; i<mobs.length; i++) {
        var klass = "roomMob";
        if (mobs[i] == App.player.target) {
          klass += ' targeted';
        }
        html += '<span class="'+klass+'" id="'+mobs[i].id+'">'+mobs[i].name+'</span>';
        if (i<mobs.length-1)  html += ', ';
      }
      html += '</div>';
    }

    // items:
    if (room.items.length > 0) {
      html += '<div class="entityList">Items: ';
      for (var i=0; i<room.items.length; i++) {
        html += '<span class="roomItem" id="'+ room.items[i].id +'">'+ room.items[i].name+'</span>';
        if (i<room.items.length-1) html += ', ';
      }
      html += '</div>';
    }

    // set ui.details html:
    this.ui.details.innerHTML = html;

    // set ui.context html:
    this.updateTargetContext();

    // setup exit events:
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

    // setup mob events:
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
        if (App.player.target && e.target.id == App.player.target.id) {
          // if clicked on target:
          document.getElementById(App.player.target.id).className = "roomMob";
          App.player.target = null;
        } else if (App.player.target) {
          // if clicked on one while has other target:
          document.getElementById(App.player.target.id).className = "roomMob";
          App.player.target = App.player.room.getMob(e.target.id);
          document.getElementById(App.player.target.id).className = "roomMob targeted";
        } else {
          // if clicked on one while has no target:
          App.player.target = App.player.room.getMob(e.target.id);
          document.getElementById(App.player.target.id).className = "roomMob targeted";
        }
        Screens.Play.updateTargetContext();
      });
    }

    // setup item events:
    for (var i=0; i<room.items.length; i++) {
      var span = document.getElementById(room.items[i].id);
      span.addEventListener("mouseenter", function(e) {
        var item = App.player.room.getItem(e.target.id);
        Helpers.showPopup(item.getPopupHTML());
      });
      span.addEventListener("mouseleave", function(e) {
        Helpers.hidePopup();
      });
    }

    // apply image filters:
    var image = new Image();
    image.src = room.display;
    image.onload = function() {
      Animations.startAnimating(Animations.bounceZoom, image);
    };
  },

  update: function() {
    if (this.childScreen) {
      this.childScreen.update();
      return;
    }

    // log messages:
    var keepNew = [];
    for (var i=0; i<this.ui.newLogMessageIDs.length; i++) {
      var id  = this.ui.newLogMessageIDs[i];
      var msg = document.getElementById(id);
      if (msg.className.indexOf('keepNew') > -1) {
        msg.className = "newLogMessage";
        keepNew.push(id);
      } else {
        msg.className = "oldLogMessage";
      }
    }
    this.ui.newLogMessageIDs = keepNew;

    // mobs:
    for (var i=0; i<App.mobs.length; i++) {
      var mob = App.mobs[i];
      if (mob.hasMixin('Acting')) {
        mob.act();
      }
    }
    // actions:
    for (var i=0; i<App.player.actions.length; i++) {
      App.player.actions[i].update();
    }
    // player target:
    if (App.player.target && App.player.target.room.id != App.player.room.id) {
      App.player.target = null;
    }
  },

  setChildScreen: function(screen, properties) {
    properties = properties || {};
    this.childScreen        = screen;
    properties.parentScreen = this;
    screen.enter(properties);
  },

  addLogMessage: function(from, msg, keepNew) {
    if (from.room != App.player.room) return;
    this.print(msg, keepNew);
  },

  print: function(msg, keepNew) {
    var id   = 'msg' + Helpers.getUniqueID();
    var klass = keepNew ? 'newLogMessage keepNew' : 'newLogMessage';
    var html = '<span id="'+ id +'" class="'+ klass +'">'+ msg +'</span><br>';
    this.ui.log.innerHTML += html;
    this.ui.newLogMessageIDs.push(id);
    this.ui.log.scrollTop = this.ui.log.scrollHeight;
  },

  handleInput: function(code) {
    if (this.childScreen) {
      this.childScreen.handleInput(code);
      return;
    }

    if (code == Keyboard.KEY_Enter) {
      var command = this.ui.input.value;
      this.ui.input.value = "";
      App.runCommand(command);
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

  updateTargetContext: function() {
    var html = "";
    if (App.player.target) {
      html += 'Target:<br><div class="contextPopup">';
      html += App.player.target ? App.player.target.getPopupHTML() : "";
      html += '</div>';
    }
    Screens.currentScreen.ui.context.innerHTML = html;
  }

};

//==================================================================
// Start:
//==================================================================

Screens.Start = {
  layout: '<div id="layout">press Enter to start</div>',
  enter: function(properties) {
    Screens.layoutContainer.innerHTML = this.layout;
  },
  exit: function() {
  },
  update: function() {
  },
  draw: function() {
  },
  print: function(msg) {
    Screens.layoutContainer.innerHTML += '<p>'+msg+'</p>';
    document.body.innerHTML += msg;
  },
  handleInput: function(code) {
    if (code == Keyboard.KEY_Enter) {
      Screens.switchScreen(Screens.Play);
    }
  }
};

