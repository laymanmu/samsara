
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
  coolDownCost: 1,
  isSustained:  false,
  isRandom:     false
});
