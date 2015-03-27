
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
  group: 'Outdoor',
  name:  'Deer Park Entrance',
  desc:  'A gate stands in the middle of a large enclosed park',
  isRandom: false,
  mixins: []
});

RoomRepository.define('inside_deer_park', {
  group: 'Outdoor',
  name:  'Inside the Deer Park',
  desc:  'A large enclosed park full of trees and deer',
  isRandom: false,
  mixins: []
});


RoomRepository.define('deer_park_wall', {
  group: 'Outdoor',
  name:  'Brick Wall',
  desc:  'A long brick wall that appears to enclose a park',
  isRandom: false,
  mixins: []
});

RoomRepository.define('path', {
  group: 'Outdoor',
  name:  'Dirt Path',
  desc:  'A thin path of dirt with tall grass and trees on both sides',
  isRandom: true,
  mixins: []
});

RoomRepository.define('pond', {
  group: 'Outdoor',
  name:  'Small Pond',
  desc:  'A small pond with brackish water surrounded by trees',
  isRandom: true,
  mixins: []
});

RoomRepository.define('hill', {
  group: 'Outdoor',
  name:  'Grassy Hill',
  desc:  'A grassy hill of soft earth with no trees',
  isRandom: true,
  mixins: []
});

RoomRepository.define('camp', {
  group: 'Outdoor',
  name:  'Abandoned Camp Site',
  desc:  'An abandoned camp site with a blackened fire pit made of stones in the center',
  isRandom: true,
  mixins: []
});

RoomRepository.define('road', {
  group: 'Outdoor',
  name:  'Gravel Road',
  desc:  'An old road of mud and gravel',
  isRandom: true,
  mixins: []
});

RoomRepository.define('trees001', {
  group: 'Outdoor',
  name:  'Trees',
  desc:  'A grouping of trees',
  isRandom: true,
  mixins: []
});

RoomRepository.define('log', {
  group: 'Outdoor',
  name:  'Log',
  desc:  'A giant felled tree lays here creating a nice ecosystem for small creatures',
  isRandom: true,
  mixins: []
});

RoomRepository.define('well', {
  group: 'Outdoor',
  name:  'A Well',
  desc:  'A ring of stones circles a deep hole in the ground',
  isRandom: true,
  mixins: []
});

RoomRepository.define('bodhi', {
  group: 'Outdoor',
  name:  'A Bodhi Tree',
  desc:  'An old tree sits here offering protection from the sun and rain',
  isRandom: true,
  mixins: []
});

RoomRepository.define('charnel', {
  group: 'Outdoor',
  name:  'Charnel Ground',
  desc:  'An above ground site for the putrification of bodies. Most people are afraid to come here',
  isRandom: true,
  mixins: []
});

RoomRepository.define('dried_river_bed', {
  group: 'Outdoor',
  name:  'Dried River Bed',
  desc:  'This used to be a cool river but now it\'s just mud and debris',
  isRandom: true,
  mixins: []
});

RoomRepository.define('tea_farm', {
  group: 'Outdoor',
  name:  'Tea Farm',
  desc:  'A path leads between tilled areas growing long stems with green leaves',
  isRandom: true,
  mixins: []
});

RoomRepository.define('rocks', {
  group: 'Outdoor',
  name:  'Rocks',
  desc:  'The ground is broken up to reveal the tips of some large boulders under the grass',
  isRandom: true,
  mixins: []
});

RoomRepository.define('grass_hut', {
  group: 'Outdoor',
  name:  'A grass hut',
  desc:  'A simple home made from bundeled reeds and knotty sticks with no door',
  isRandom: true,
  mixins: []
});

RoomRepository.define('ditch', {
  group: 'Outdoor',
  name:  'A muddy ditch',
  desc:  'The rains have carved out a muddy trench through the earth here',
  isRandom: true,
  mixins: []
});

RoomRepository.define('shady_grove', {
  group: 'Outdoor',
  name:  'A Shaded Grove',
  desc:  'The trees here are branchless at the bottoms and create an indoor feeling',
  isRandom: true,
  mixins: []
});

RoomRepository.define('bench', {
  group: 'Outdoor',
  name:  'A Wooden Bench',
  desc:  'Someone built a flat bench here for people to rest at under a tree',
  isRandom: true,
  mixins: []
});

RoomRepository.define('coy_pond', {
  group: 'Outdoor',
  name:  'A Coy Pond',
  desc:  'A man-made pond sits here stocked with multi-colored fish',
  isRandom: true,
  mixins: []
});

RoomRepository.define('open_grass', {
  group: 'Outdoor',
  name:  'Open Grass',
  desc:  'The open field of grass here gives you an expansive feeling',
  isRandom: true,
  mixins: []
});

RoomRepository.define('rock_garden', {
  group: 'Outdoor',
  name:  'Rock Garden',
  desc:  'Someone spent a lot of time to rake all of the the small rocks that surround the larger ones',
  isRandom: true,
  mixins: []
});



//==================================================================
// Indoor:
//==================================================================

RoomRepository.define('tent', {
  group: 'Indoor',
  name:  'Large Tent',
  desc:  'A large tent',
  isRandom: false,
  mixins: []
});
