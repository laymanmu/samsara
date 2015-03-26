
var Action = function(properties) {
  Entity.call(this, properties);
  properties    = properties         || {};
  this.command  = properties.command || 'rest';
  this.iconName = properties.icon    || 'Icon.4_18.png';
  this.image           = document.createElement('img');
  this.image.id        = this.id;
  this.image.src       = 'assets/'+this.iconName;
  this.image.className = "actionIcon";
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
    App.runCommand(e.target.command);
  });
};
