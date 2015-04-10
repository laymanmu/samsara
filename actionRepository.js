
var ActionRepository = new Repository("actions", Action);

//==================================================================
// General:
//==================================================================

ActionRepository.define('look', {
  name:    'Look',
  command: 'look',
  icon:    'Icon.1_11.png',
  desc:    'Look at your target',
  coolDownCost: 0,
  isSustained:  false,
  isRandom:     false
});

ActionRepository.define('offerRespect', {
  name:    'Offer Respect',
  command: 'offerRespect',
  icon:    'Icon.7_06.png',
  desc:    'Offer respect to your target',
  coolDownCost: 0,
  isSustained:  false,
  isRandom:     false
});

ActionRepository.define('take', {
  name:    'Take',
  command: 'take',
  icon:    'Icon.5_92.png',
  desc:    'Take something to carry with you',
  coolDownCost: 0,
  isSustained:  false,
  isRandom:     false
});
