
var Mixins = {};

//==================================================================
// Acting:
//==================================================================

Mixins.Acting = {};

Mixins.Acting.Wanderer = {
  name:  'Wanderer',
  group: 'Acting',
  act: function() {
    if (Helpers.randBool() && this.hasMixin('Wander')) {
      this.tryMove();
    }
  }
};

Mixins.Acting.SittingSpeaker = {
  name: 'SittingSpeaker',
  group: 'Acting',
  chanceToSpeak: 90,
  act: function() {
    var prefix  = '<span class="speechPrefix">'+ this.nameThe(true) +' says: </span><span class="speech">';
    var postfix = '</span><br>';
    if (Helpers.randInt(1,100) < 3) {
      App.sendMessage(this, this.nameThe() +" repositions a bit while sitting");
    } else if (Helpers.randInt(0,100) < this.chanceToSpeak) {
      this.chanceToSpeak = this.chanceToSpeak-5<=0 ? 5 : this.chanceToSpeak-5;
      var msg = prefix + 'hail the goer, friend' + postfix;
      App.sendMessage(this, msg);
    }
  }
}

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
    App.sendMessage(this, this.nameOne() +" exited "+ names[index]);
    this.room.moveMob(this, names[index]);
    // send enter message:
    var newRoomExitNames = newRoom.getExitNames();
    for (var i=0; i<newRoomExitNames.length;  i++) {
      var room = newRoom.getNextRoom(newRoomExitNames[i]);
      if (room == oldRoom) {
        App.sendMessage(this, this.nameOne() +" entered from the "+ newRoomExitNames[i]);
        break;
      }
    }
  }
};
