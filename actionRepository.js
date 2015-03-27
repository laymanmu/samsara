
var ActionRepository = new Repository("actions", Action);

//==================================================================
// General:
//==================================================================

ActionRepository.define('look', {
  name:    'look',
  command: 'look',
  desc:    'look at something',
  icon:    'Icon.1_11.png',
  coolDownCost: 0,
  isSustained:  false
});

ActionRepository.define('respect', {
  name:    'respect',
  command: 'rest',
  desc:    'offer respect',
  icon:    'Icon.7_06.png',
  coolDownCost: 1,
  isSustained:  false
});

ActionRepository.define('wander', {
  name:    'wander',
  command: 'wander',
  desc:    'wander around randomly',
  icon:    'Icon.4_33.png',
  coolDownCost: 0,
  isSustained:  false
});
