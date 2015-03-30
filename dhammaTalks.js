
var DhammaTalks = {
  Khuddakapatha: {
    passages: [],
    desc:'\
The Khuddakapatha is a collection of nine short passages that may have \
been designed as a primer for novice monks and nuns. It includes several \
essential texts that are still chanted daily by laypeople and monastics \
around the world of Theravada Buddhism.'
  },

  random: function() {
    return Helpers.randElement(this.Khuddakapatha.passages);
  }
};

DhammaTalks.Khuddakapatha.passages.push({
  title:    'Saranagamana',
  subTitle: 'Going for Refuge',
  text: [
    'I go to the Buddha for refuge',
    'I go to the Dhamma for refuge',
    'I go to the Sangha for refuge<br>',

    'A second time I go to the Buddha for refuge',
    'A second time I go to the Dhamma for refuge',
    'A second time I go to the Sangha for refuge<br>',
    
    'A third time I go to the Buddha for refuge',
    'A third time I go to the Dhamma for refuge',
    'A third time I go to the Sangha for refuge'
  ]
});

DhammaTalks.Khuddakapatha.passages.push({
  title:    'Dasa Sikkhapada',
  subTitle: 'The Ten Training Rules',
  text: [
    'I undertake the training rule to refrain from taking life',
    'I undertake the training rule to refrain from stealing',
    'I undertake the training rule to refrain from sexual intercourse',
    'I undertake the training rule to refrain from telling lies',
    'I undertake the training rule to refrain from intoxicating fremented & distilled beverages that lead to carelessness',
    'I undertake the training rule to refrain from eating at the wrong time (after noon & before dawn)',
    'I undertake the training rule to refrain from dancing, singing, music, & watching shows',
    'I undertake the training rule to refrain from wearing garlands and beautifying myself with perfumes & cosmetics',
    'I undertake the training rule to refrain from high & luxurious seats & beds',
    'I undertake the training rule to refrain from accepting gold & money'
  ]
});
