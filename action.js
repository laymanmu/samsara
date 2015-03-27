
var Action = function(properties) {
  Entity.call(this, properties);
  properties        = properties         || {};
  this.command      = properties.command || 'rest';
  this.iconName     = properties.icon    || 'Icon.4_18.png';
  this.coolDownCost = properties.coolDownCost || 2;
  this.isSustained  = properties.isSustained  || false;
  this.image           = document.createElement('img');
  this.image.id        = this.id;
  this.image.src       = 'assets/'+this.iconName;
  this.image.className = "actionIcon actionReady";
  this.coolDownValue = 0;
  this.initEvents();
};

Action.prototype = Object.create(Entity.prototype);

Action.prototype.initEvents = function() {
  this.image.command = this.command;
  this.image.addEventListener("mouseenter", function(e) {
    var action = App.getAction(e.target.id);
    Helpers.showPopup(action.getPopupHTML());
  });
  this.image.addEventListener("mouseleave", function(e) {
    Helpers.hidePopup();
  });
  this.image.addEventListener("click", function(e) {
    var action = App.getAction(e.target.id);
    action.use();
  });
};

Action.prototype.update = function() {
  if (this.coolDownValue > 0) {
    this.coolDownValue--;
    if (this.coolDownValue == 0) {
      this.image.className = "actionIcon actionReady";
    }
  }
};

Action.prototype.use = function() {
  if (this.coolDownValue == 0) {
    App.runCommand(this.command);
    this.coolDownValue = this.coolDownCost;
    if (this.coolDownValue != 0) {
      this.image.className = "actionIcon actionNotReady";
    }
  }
};

Action.prototype.getPopupHTML = function() {
  var html = Entity.prototype.getPopupHTML.call(this);
  html += '<hr/><table>';
  html += '<tr><td>id:     </td><td>'+ this.id +'</td></tr>';
  html += '<tr><td>cooldown cost: </td><td>'+ this.coolDownCost +'</td></tr>';
  if (this.coolDownValue > 0) {
    html += '<tr><td>cooldown value: </td><td>'+ this.coolDownValue +'</td></tr>';
  }
  html += '</table>';
  return html;
};
