
var Mob = function(properties) {
  Entity.call(this, properties);
  properties  = properties        || {};
  this.room   = properties.room   || null;
  this.target = properties.target || null;
};

Mob.prototype = Object.create(Entity.prototype);

Mob.prototype.getPopupHTML = function() {
  var target = this.target || "none";
  var html = Entity.prototype.getPopupHTML.call(this);
  html += '<hr/><table>';
  html += '<tr><td>id:     </td><td>'+ this.id +'</td></tr>';
  html += '<tr><td>target: </td><td>'+ target  +'</td></tr>';
  html += '</table>';
  return html;
};
