
var RoomRepository = new Repository("rooms", Room);

//==================================================================
// Outdoor:
//==================================================================

RoomRepository.define('pond', {
  group: 'Outdoor',
  name:  'Small Pond',
  desc:  'A small pond with brackish water',
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
