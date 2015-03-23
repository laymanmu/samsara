
var Mob = function(properties) {
  properties = properties      || {};
  this.name  = properties.name || "hungry ghost";
  this.desc  = properties.desc || "a confused spirit being";
  this.room  = properties.room || null;
};

Mob.prototype.takeTurn = function() {
  if (!this.room) return;
  if (Helpers.randBool()) {
    var exitNames = this.room.getExitNames();
    var index = Helpers.randInt(0, exitNames.length-1);
    this.room.moveMob(this, exitNames[index]);
  }
}
