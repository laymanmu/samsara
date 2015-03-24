
var Helpers = {

  _nextID: 1,

  getUniqueID: function() {
    return this._nextID++;
  },

  randInt: function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  randBool: function() {
    return Math.round(Math.random())===1;
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
  }

};
