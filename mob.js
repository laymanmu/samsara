
var _debug = true;

var Mob = function(properties) {
  Entity.call(this, properties);
  properties = properties      || {};
  this.room  = properties.room || null;
};

Mob.prototype = Object.create(Entity.prototype);
