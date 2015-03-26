
var Entity = function(properties) {
  this.id    = "entity" + Helpers.getUniqueID();
  this.name  = properties.name || "entity";
  this.desc  = properties.desc || "an entity";
};

Entity.prototype.nameOne = function(shouldCapitalize) {
  var prefixes = shouldCapitalize ? ['A','An'] : ['a','an'];
  var first    = this.name.charAt(0).toLowerCase();
  var prefix   = 'aeiou'.indexOf(first)<0 ? prefixes[0] : prefixes[1];
  return prefix +" "+ this.name;
};

Entity.prototype.nameThe = function(shouldCapitalize) {
  var prefix = shouldCapitalize ? 'The' : 'the';
  return prefix +" "+ this.name;
};

Entity.prototype.capitalizeName = function() {
  var first = this.name.charAt(0).toUpperCase();
  var other = this.name.substring(1);
  return first + other;
};

Entity.prototype.wrapDesc = function(charsWide) {
  return Helpers.wrap(this.desc, charsWide, '<br>', false);
};

Entity.prototype.getPopupHTML = function(charsWide) {
  charsWide = charsWide || 50;
  var html = '<table>';
  html += '<tr><td class="popupName">'+ this.capitalizeName()    +'</td></tr>';
  html += '<tr><td class="popupDesc">'+ this.wrapDesc(charsWide) +'</td></tr>';
  html += '<tr><td class="popupID">id: '+ this.id                +'</td></tr>';
  html += '</table>';
  return html;
};
