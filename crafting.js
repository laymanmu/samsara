
var Crafting = {};

/** Item:
* parms.name        = string: name of item
* parms.isTool      = bool:   used up when recipe crafted?
* parms.numPerStack = int:    number of items in single stack
**/
Crafting.Item = function(parms) {
  this.id          = Helpers.getUniqueID('item');
  this.name        = parms.name;
  this.isTool      = parms.isTool;
  this.numPerStack = parms.numPerStack;
};

/** Recipe:
* parms.name       = string: name of recipe
* parms.items      = json:   (item.name:numNeeded,...)
* parms.resultName = string: item.name
**/
Crafting.Recipe = function(parms) {
  this.id         = Helpers.getUniqueID('recipe');
  this.name       = parms.name;
  this.resultName = parms.resultName;
  this.items      = parms.items;
};

Crafting.Recipe.prototype.numNeeded = function(itemName) {
  return this.items[itemName] ? this.items[itemName] : 0;
};

/** Container:
* parms.name   = string: name of container
* parms.slots  = int:    number of slots (<1 is unlimited)
**/
Crafting.Container = function(parms) {
  this.id     = Helpers.getUniqueID('container');
  this.name   = parms.name;
  this.slots  = parms.slots;
  this.items  = {}; //<- key: itemName, val: [item,...]
};

Crafting.Container.prototype.getNextItemNamed = function(itemName) {
  return this.items[itemName] ? this.items[itemName][0] : null;
};

Crafting.Container.prototype.numItemsOf = function(itemName) {
  return this.items[itemName] ? this.items[itemName].length : 0;
};

Crafting.Container.prototype.numSlotsOf = function(itemName) {
  var numItems = this.numItemsOf(itemName);
  if (numItems == 0) return 0;
  var numPerStack = this.getNextItemNamed(itemName).numPerStack;
  return Math.ceil(numItems/numPerStack);
};

Crafting.Container.prototype.numSlotsUsed = function() {
  var count = 0;
  for (var itemName in this.items) {
    count += this.numSlotsOf(itemName);
  }
  return count;
};

Crafting.Container.prototype.numSlotsUnused = function() {
  return this.isUnlimited() ? 1 : this.slots - this.numSlotsUsed();
};

Crafting.Container.prototype.isUnlimited = function() {
  return this.slots < 1;
};

Crafting.Container.prototype.canFit = function(item) {
  if (this.numSlotsUnused() > 0 ) {
    return true;
  } else {
    return (this.numItemsOf(item.name)%item.numPerStack) > 0;
  }
};

Crafting.Container.prototype.add = function(item) {
  if (this.canFit(item)) {
    if (!this.items[item.name]) {
      this.items[item.name] = [];
    }
    this.items[item.name].push(item);
    return true;
  } else {
    return false;
  }
};

Crafting.Container.prototype.remove = function(item) {
  var itemList = this.items[item.name];
  for (var i=0; i<itemList.length; i++) {
    var heldItem = itemList[i];
    if (heldItem.id == item.id) {
      itemList.splice(i,1);
      if (itemList.length == 0) {
        delete this.items[item.name];
      }
      return true;
    }
  }
  return false;
};

Crafting.Container.prototype.canCraft = function(recipe) {
  if (this.numSlotsUsed() == 0) return false;
  for (var itemName in recipe.items) {
    if (this.numItemsOf(itemName) < recipe.items[itemName]) {
      return false;
    }
  }
  return true;
};
