
var Mixins = {};

//==================================================================
// Acting:
//==================================================================

Mixins.Acting = {};

Mixins.Acting.Wanderer = {
  name:  'Wanderer',
  group: 'Acting',
  act: function() {
    if (this.hasMixin('Wander')) {
      this.tryMove();
    }
  }
};

//==================================================================
//  Moving:
//==================================================================

Mixins.Moving = {};

Mixins.Moving.Wander = {
  name:  'Wander',
  group: 'Moving',
  tryMove: function() {
    if (!this.room) return;
    var names   = this.room.getExitNames();
    var index   = Helpers.randInt(0, names.length-1);
    var oldRoom = this.room;
    var newRoom = this.room.getNextRoom(names[index]);
    // send exit message:
    App.sendMessage(this, "a "+ this.name +" exited "+ names[index]);
    this.room.moveMob(this, names[index]);
    // send enter message:
    var newRoomExitNames = newRoom.getExitNames();
    for (var i=0; i<newRoomExitNames.length;  i++) {
      var room = newRoom.getNextRoom(newRoomExitNames[i]);
      if (room == oldRoom) {
        App.sendMessage(this, "a "+ this.name +" entered from the "+ newRoomExitNames[i]);
        break;
      }
    }
  }
};
