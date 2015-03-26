
var _debug = true;

var Mob = function(properties) {
  Entity.call(this, properties);

  properties = properties      || {};
  this.room  = properties.room || null;
  this.mixins      = {};
  this.mixinGroups = {};
  var mixins       = properties.mixins || [];
  for (var i=0; i<mixins.length; i++) {
    var mixin = mixins[i];
    for (var key in mixin) {
      if (key != 'name' && key != 'group' && !this.hasOwnProperty(key)) {
        this[key] = mixin[key];
      }
    }
    this.mixins[mixin.name]       = true;
    this.mixinGroups[mixin.group] = true;
    if (mixin.init) {
      mixin.call(this, properties);
    }
  }
};

Mob.prototype = Object.create(Entity.prototype);

Mob.prototype.hasMixin = function(mixin) {
  if (typeof mixin === 'object') {
    return this.mixins[mixin.name] || this.mixinGroups[mixin.name];
  } else {
    return this.mixins[mixin] || this.mixinGroups[mixin];
  }
};
