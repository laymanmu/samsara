
var Helpers = {
  randInt: function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  randBool: function() {
    return Math.round(Math.random())===1;
  }
};
