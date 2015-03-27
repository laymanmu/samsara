
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

RoomRepository.define('deer_park', {
  group: 'Outdoor',
  name:  'Deer Park',
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

RoomRepository.define('road', {
  group: 'Outdoor',
  name:  'Gravel Road',
  desc:  'An old road of mud and gravel',
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
  isRandom: true,
  mixins: []
});
