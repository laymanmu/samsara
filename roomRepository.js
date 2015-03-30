
var RoomRepository = new Repository("rooms", Room);

//==================================================================
// Exits:
//==================================================================

RoomRepository.exitPairs = [];
RoomRepository.exitPairs.push(['north', 'south']);
RoomRepository.exitPairs.push(['east',  'west']);

//==================================================================
// Outdoor:
//==================================================================

RoomRepository.define('deer_park_entrance', {
  group:    'DeerPark',
  name:     'Deer Park Entrance',
  desc:     'A gate stands in the middle of a large enclosed park',
  display:  '<img src="assets/images/forest_gate.png"/><br>',
  isRandom: false,
  mixins: []
});

RoomRepository.define('inside_deer_park', {
  group:    'DeerPark',
  name:     'Inside the Deer Park',
  desc:     'A large enclosed park full of trees and deer',
  display:  '<img src="assets/images/deer_park.png"/><br>',
  isRandom: false,
  mixins: []
});

RoomRepository.define('two_sadhus', {
  group:    'DeerPark',
  name:     'Two Sadhus',
  desc:     'Two sadhus sit here and discuss the nature of life',
  display:  '<img src="assets/images/two_sadhus.jpg"/><br>',
  isRandom: false,
  mixins: []
});

RoomRepository.define('deer_park_wall', {
  group:    'DeerPark',
  name:     'Stone Wall',
  desc:     'A long brick wall that appears to enclose a park',
  display:  '<img src="assets/images/stone_wall.png"/><br>',
  isRandom: false,
  mixins: []
});

RoomRepository.define('dirt_path', {
  group: 'Outdoor',
  name:  'Dirt Path',
  desc:  'A thin path of dirt with tall grass and trees on both sides',
  display:  '<img src="assets/images/dirt_path.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('pond', {
  group: 'Outdoor',
  name:  'Small Pond',
  desc:  'A small pond with brackish water surrounded by trees',
  display:  '<img src="assets/images/small_pond.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('hill', {
  group: 'Outdoor',
  name:  'Grassy Hill',
  desc:  'A grassy hill of soft earth with no trees',
  display:  '<img src="assets/images/grassy_hill.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('camp', {
  group: 'Outdoor',
  name:  'Abandoned Camp Site',
  desc:  'An abandoned camp site with a blackened fire pit made of stones in the center',
  display:  '<img src="assets/images/abandoned_campsite.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('gravel_road', {
  group: 'Outdoor',
  name:  'Gravel Road',
  desc:  'An old road of mud and gravel',
  display:  '<img src="assets/images/gravel_road.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('grouping_of_trees', {
  group: 'Outdoor',
  name:  'Trees',
  desc:  'A grouping of trees',
  display:  '<img src="assets/images/grouping_of_trees.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('felled_tree', {
  group: 'Outdoor',
  name:  'Felled Tree',
  desc:  'A tree lays here creating a nice ecosystem for small creatures',
  display:  '<img src="assets/images/felled_tree.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('well', {
  group: 'Outdoor',
  name:  'A Well',
  desc:  'A ring of stones circles a deep hole in the ground',
  display:  '<img src="assets/images/stone_well.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('bodhi_tree', {
  group: 'Outdoor',
  name:  'A Bodhi Tree',
  desc:  'An old tree sits here offering protection from the sun and rain',
  display:  '<img src="assets/images/bodhi_tree.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('charnel_ground', {
  group: 'Outdoor',
  name:  'Charnel Ground',
  desc:  'An above ground site for the putrification of bodies. Most people are afraid to come here',
  display:  '<img src="assets/images/charnel_ground.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('dried_river_bed', {
  group: 'Outdoor',
  name:  'Dried River Bed',
  desc:  'This used to be a cool river but now it\'s just mud and debris',
  display:  '<img src="assets/images/dried_riverbed.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('tea_farm', {
  group: 'Outdoor',
  name:  'Tea Farm',
  desc:  'A path leads between tilled areas growing long stems with green leaves',
  display:  '<img src="assets/images/tea_farm.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('rocks', {
  group: 'Outdoor',
  name:  'Rocks',
  desc:  'The ground is broken up to reveal the tips of some large boulders under the grass',
  display:  '<img src="assets/images/rocks.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('grass_hut', {
  group: 'Outdoor',
  name:  'A grass hut',
  desc:  'A simple home made from bundeled reeds and knotty sticks with no door',
  display:  '<img src="assets/images/grass_hut.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('ditch', {
  group: 'Outdoor',
  name:  'A muddy ditch',
  desc:  'The rains have carved out a muddy trench through the earth here',
  display:  '<img src="assets/images/ditch.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('shady_grove', {
  group: 'Outdoor',
  name:  'A Shaded Grove',
  desc:  'The trees here are branchless at the bottoms and create an indoor feeling',
  display:  '<img src="assets/images/shady_grove.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('bench', {
  group: 'Outdoor',
  name:  'A Wooden Bench',
  desc:  'Someone built a flat bench here for people to rest at under a tree',
  display:  '<img src="assets/images/bench.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('fish_pond', {
  group: 'Outdoor',
  name:  'A Fish Pond',
  desc:  'A man-made pond sits here stocked with multi-colored fish',
  display:  '<img src="assets/images/fish_pond.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('open_field', {
  group: 'Outdoor',
  name:  'Open Field',
  desc:  'The open field of grass here gives you an expansive feeling',
  display:  '<img src="assets/images/open_field.png"/><br>',
  isRandom: true,
  mixins: []
});

RoomRepository.define('rock_garden', {
  group: 'Outdoor',
  name:  'Rock Garden',
  desc:  'Someone spent a lot of time to rake all of the the small rocks that surround the larger ones',
  display:  '<img src="assets/images/rock_garden.png"/><br>',
  isRandom: true,
  mixins: []
});



//==================================================================
// Indoor:
//==================================================================

RoomRepository.define('tent_inside', {
  group: 'Indoor',
  name:  'Inside a Large Tent',
  desc:  'A large tent',
  display:  '<img src="assets/images/tent_inside.png"/><br>',
  isRandom: false,
  mixins: []
});

RoomRepository.define('tent_outside', {
  group: 'Indoor',
  name:  'Outside of a Large Tent',
  desc:  'A large tent',
  display:  '<img src="assets/images/tent_outside.png"/><br>',
  isRandom: false,
  mixins: []
});
