
var MobRepository = new Repository('mobs', Mob);

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
