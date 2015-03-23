
var Room = function(properties) {
  properties = properties || {};
  this.name  = properties.name  || "forest";
  this.desc  = properties.desc  || "you are surrounded by trees";
  this.exits = properties.exits || new KeyStore();
};

Room.prototype.describeExits = function() {
  var desc = "[ ";
  var names = this.exits.keys();
  for (var i=0; i<names.length; i++) {
    desc += names[i];
    if (i<names.length-1) {
      desc += " ";
    }
  }
  desc += " ]";
  return desc;
};

Room.prototype.getExitNames = function() {
  return this.exits.keys();
};

Room.prototype.addExit = function(name, room) {
  this.exits.set(name, room);
};

Room.prototype.removeExit = function(name) {
  this.exits.delete(name);
};

Room.prototype.getNextRoom = function(exitName) {
  return this.exits.get(exitName);
};
