
var Repository = function(repoName, instanceConstructor) {
  this.name            = repoName;
  this.constructor     = instanceConstructor;
  this.templates       = {};
  this.randomTemplates = {};
};

Repository.prototype.addTemplate = function(name, template) {
  this.templates[name] = template;
  if (template.isRandom) {
    this.randomTemplates[name] = template;
  }
};

Repository.prototype.create = function(name, overridingProperties) {
  if (!this.templates[name]) {
    throw new Error("no template named "+ name +" found in "+ this.name +" repository.");
  }
  var template = Object.create(this.templates[name]);
  if (overridingProperties) {
    for (var key in overridingProperties) {
      template[key] = overridingProperties[key];
    }
  }
  return new this.constructor(template);
};

Repository.prototype.createRandom = function() {
  return this.create(Object.keys(this.randomTemplates).random());
};
