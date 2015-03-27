
var ActionRepository = new Repository("actions", Action);

//==================================================================
// General:
//==================================================================

ActionRepository.define('look', {
  name:    'look',
  command: 'look',
  icon:    'Icon.1_11.png',
  desc:    'look at something',
  coolDownCost: 2,
  isSustained:  false
});
