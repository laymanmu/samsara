
var Mob = function(properties) {
  this._id   = "mob" + Helpers.getUniqueID();
  properties = properties      || {};
  this.name  = properties.name || "hungry ghost";
  this.desc  = properties.desc || "a confused spirit being";
  this.room  = properties.room || null;
  // mixins:
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

Mob.prototype.hasMixin = function(mixin) {
  if (typeof mixin === 'object') {
    return this.mixins[mixin.name] || this.mixinGroups[mixin.name];
  } else {
    return this.mixins[mixin] || this.mixinGroups[mixin];
  }
};

Mob.prototype.nameOne = function(shouldCapitalize) {
  var prefixes = shouldCapitalize ? ['A','An'] : ['a','an'];
  var first    = this.name.charAt(0).toLowerCase();
  var prefix   = 'aeiou'.indexOf(first)<0 ? prefixes[0] : prefixes[1];
  return prefix +" "+ this.name;
};

Mob.prototype.nameThe = function(shouldCapitalize) {
  var prefix = shouldCapitalize ? 'The' : 'the';
  return prefix +" "+ this.name;
};

Mob.prototype.getPopupHTML = function() {
  var html = '<span class="popupMobName">'+ this.name +'</span><br>';
  html += '<span class="popupMobDesc">'  + this.desc  +'</span><br>';
  html += '<br><span class="popupMobID"> id: '    + this._id   +'</span><br>';
  return html;
};
