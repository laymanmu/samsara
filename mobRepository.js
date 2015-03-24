
var MobRepository = new Repository('mobs', Mob);

//==================================================================
// Deer:
//==================================================================

MobRepository.define('buck', {
  name:  'deer',
  desc:  'a big buck',
  isRandom: true,
  mixins: [ Mixins.Moving.Wander, Mixins.Acting.Wanderer ]
});

MobRepository.define('doe', {
  name:  'deer',
  desc:  'a quick doe',
  isRandom: true,
  mixins: [ Mixins.Moving.Wander, Mixins.Acting.Wanderer ]
});

MobRepository.define('fawn', {
  name:  'deer',
  desc:  'a gentle fawn',
  isRandom: true,
  mixins: [ Mixins.Moving.Wander, Mixins.Acting.Wanderer ]
});

//==================================================================
// People:
//==================================================================

MobRepository.define('begger', {
  name: 'begger',
  desc: 'this wandering begger looks very tired and hungry',
  isRandom: true,
  mixins: [ Mixins.Moving.Wander, Mixins.Acting.Wanderer ]
});

MobRepository.define('ascetic', {
  name: 'ascetic',
  desc: 'this homeless person sits patiently with their eyes closed',
  isRandom: true,
  mixins: [ Mixins.Acting.SittingSpeaker ]
});
