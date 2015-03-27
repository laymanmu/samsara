
var Room = function(properties) {
  Entity.call(this, properties);
  properties = properties || {};
  this.name  = properties.name  || "forest";
  this.desc  = properties.desc  || "you are surrounded by trees";
  this.exits = properties.exits || new KeyStore();
  this.mobs  = properties.mobs  || [];
};

Room.prototype = Object.create(Entity.prototype);

Room.prototype.addMob = function(mob) {
  this.mobs.push(mob);
  mob.room = this;
};

Room.prototype.removeMob = function(mob) {
  var index = this.mobs.indexOf(mob);
  if (index != -1) {
    this.mobs.splice(index, 1);
  }
};

Room.prototype.moveMob = function(mob, exitName) {
  var newRoom = this.getNextRoom(exitName);
  if (!newRoom) return;
  Screens.sendMessage(mob, mob.nameOne() +" exited to the "+ exitName);
  this.removeMob(mob);
  newRoom.addMob(mob);
  var newRoomExits = newRoom.getExitNames();
  var enteredFrom  = "";
  for (var i=0; i<newRoomExits.length; i++) {
    if (newRoom.getNextRoom(newRoomExits[i]).id == this.id) {
      enteredFrom = newRoomExits[i];
      break;
    }
  }
  Screens.sendMessage(mob, mob.nameOne() +" entered from the "+ enteredFrom);
};

Room.prototype.getMob = function(id) {
  for (var i=0; i<this.mobs.length; i++) {
    if (this.mobs[i].id == id) {
      return this.mobs[i];
    }
  }
};

Room.prototype.describeExits = function() {
  var desc = "[ ";
  var names = this.exits.keys();
  var name, exit;
  for (var i=0; i<names.length; i++) {
    name = names[i];
    exit = this.exits[name];
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
