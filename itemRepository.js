

var ItemRepository = new Repository('items', Crafting.Item);

ItemRepository.define('rock', {
  name:  'rock',
  desc:  'a small rock',
  isRandom: true
});

ItemRepository.define('stick', {
  name:  'stick',
  desc:  'a small stick',
  isRandom: true
});

ItemRepository.define('clothScrap', {
  name:  'cloth',
  desc:  'a small scrap of dirty cloth',
  isRandom: true
});

ItemRepository.define('bucket', {
  name:  'bucket',
  desc:  'a leaky wooden bucket',
  isRandom: true
});

ItemRepository.define('twine', {
  name:  'twine',
  desc:  'a small bundle of twine made from plants',
  isRandom: true
});

ItemRepository.define('cup', {
  name:  'cup',
  desc:  'a wooden cup for drinking liquids',
  isRandom: true
});
