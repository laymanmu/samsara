

var ItemRepository = new Repository('items', Crafting.Item);

ItemRepository.define('rock', {
  name:  'rock',
  desc:  'a small rock',
  image: 'assets/items/I_Rock01.png',
  isRandom: true
});

ItemRepository.define('stick', {
  name:  'stick',
  desc:  'a small stick',
  image: 'assets/items/W_Staff01.png',
  isRandom: true
});

ItemRepository.define('fabric', {
  name:  'fabric',
  desc:  'a small scrap of cloth fabric',
  image: 'assets/items/I_Fabric.png',
  isRandom: true
});

ItemRepository.define('bone', {
  name:  'bone',
  desc:  'a bone',
  image: 'assets/items/I_Bone.png',
  isRandom: true
});

ItemRepository.define('clover', {
  name:  'clover',
  desc:  'some clover',
  image: 'assets/items/I_Clover.png',
  isRandom: true
});

ItemRepository.define('feather', {
  name:  'feather',
  desc:  'a feather',
  image: 'assets/items/I_Feather02.png',
  isRandom: true
});

// ======================================
// food:
// ======================================

ItemRepository.define('bread', {
  name:  'bread',
  desc:  'a chunk of bread',
  image: 'assets/items/I_C_Bread.png',
  isRandom: false
});

ItemRepository.define('carrot', {
  name:  'carrot',
  desc:  'a carrot',
  image: 'assets/items/I_C_Carrot.png',
  isRandom: false
});

ItemRepository.define('fish', {
  name:  'fish',
  desc:  'a fish',
  image: 'assets/items/I_C_Fish.png',
  isRandom: false
});

ItemRepository.define('grapes', {
  name:  'grapes',
  desc:  'some grapes',
  image: 'assets/items/I_C_Grapes.png',
  isRandom: false
});

ItemRepository.define('mushroom', {
  name:  'mushroom',
  desc:  'some mushrooms ',
  image: 'assets/items/I_C_Mushroom.png',
  isRandom: false
});

ItemRepository.define('radish', {
  name:  'radish',
  desc:  'a radish',
  image: 'assets/items/I_C_Radish.png',
  isRandom: false
});

ItemRepository.define('strawberry', {
  name:  'strawberry',
  desc:  'some strawberries',
  image: 'assets/items/I_C_Strawberry.png',
  isRandom: false
});
