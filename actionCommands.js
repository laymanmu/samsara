
var ActionCommands = {};

ActionCommands.look = function() {
  if (App.player.target) {
    var msg = "you see "+ App.player.target.nameThe() +": "+ App.player.target.desc;
    App.player.target.onLookedAt();
    Screens.print(msg, true);
  } else {
    var msg = "look at what?";
    Screens.print(msg, true);
  }
  Screens.refresh();
};

ActionCommands.offerRespect = function() {
  if (App.player.target) {
    var msg = "you bow to "+ App.player.target.nameThe() +" in an offer of respect";
    Screens.print(msg, true);
    App.player.target.onRespectOffered();
  } else {
    var msg = "Offer respect to what?";
    Screens.print(msg, true);
  }
  Screens.refresh();
};

ActionCommands.take = function() {
  if (App.player.target) {
    var msg = "You awkwardly try to pickup "+ App.player.target.nameThe() +" and fail";
    Screens.print(msg, true);
  } else {
    var msg = "Take what?";
    Screens.print(msg, true);
  }
  Screens.refresh();
}
