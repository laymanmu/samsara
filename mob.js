
var Mob = function(properties) {
  properties = properties      || {};
  this.name  = properties.name || "hungry ghost";
  this.desc  = properties.desc || "a confused spirit being";
  this.room  = properties.room || null;
};

Mob.prototype.takeTurn = function() {
  if (!this.room) return;
  if (Helpers.randBool()) {
    var names   = this.room.getExitNames();
    var index   = Helpers.randInt(0, names.length-1);
    var oldRoom = this.room;
    var newRoom = this.room.getNextRoom(names[index]);

    App.sendMessage(this, "a "+ this.name +" exited "+ names[index]);
    this.room.moveMob(this, names[index]);

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
