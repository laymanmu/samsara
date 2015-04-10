
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
    var posX = App.mouse.clientX + 100;
    var posY = App.mouse.clientY;
    var div  = document.getElementById('popup');

    div.innerHTML     = html;
    div.style.display = 'block';
    var popupHeight   = div.offsetHeight;
    var screenHeight  = document.body.clientHeight;
    var bottom        = posY + popupHeight;
    var diff          = bottom - screenHeight;

    if (diff > 0) {
      var margin = 30;
      posY = App.mouse.pageY - (diff+margin);
    } else {
      posY = App.mouse.pageY;
    }

    div.style.left = posX +"px";
    div.style.top  = posY +"px";
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
