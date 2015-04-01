
var Helpers = {

  _nextID: 1,

  getUniqueID: function() {
    return '_' + this._nextID++;
  },

  randInt: function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  randBool: function() {
    return Math.round(Math.random())===1;
  },

  randElement: function(array) {
    return array[this.randInt(0, array.length-1)];
  },

  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue      = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex]  = temporaryValue;
    }
    return array;
  },

  showPopup: function(html) {
    var posX = App.mouse.x + 100 + "px";
    var posY = App.mouse.y + "px";
    var div  = document.getElementById('popup');
    div.innerHTML     = html;
    div.style.left    = posX;
    div.style.top     = posY;
    div.style.display = 'block';
  },

  hidePopup: function() {
    document.getElementById('popup').style.display = 'none';
  },

  wrap: function(text, maxWidth, lineBreak, shouldCut) {
    lineBreak = lineBreak || '<br>';
    maxWidth  = maxWidth  || 75;
    shouldCut = shouldCut || false;
    if (!text) { return text; }
    var regex = '.{1,' +maxWidth+ '}(\s|$)' + (shouldCut ? '|.{' +maxWidth+ '}|.+$' : '|\S+?(\s|$)');
    return text.match(RegExp(regex,'g')).join(lineBreak);
  }

};
