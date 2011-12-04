
Dance = function(settings) {
  this.title = "Some dance";
  this.picture = "";
  this.score = 5;

  this.positionTest = function(player) {
    if( this.check(player) ) {
      player.success();
    } else {
      player.fail();
    }
  }

  this.isValid = function(allowedDuration) {
    log(this.title);
    Game.setDance(this, new Date().getTime() + allowedDuration);
  }

  this.fail = function(user) {
    var player = Game.findPlayer(user);
    player.fail();
  }

  this.success = function(user) {
    var player = Game.findPlayer(user);
    player.success();
  }

  for (i in settings) {
    this[i] = settings[i];
  }

  return this;

};

Dance_RightHandAir = new Dance({
  title:"Right hand in air",

  check: function(player) {
    return player.skeleton.rightArmUp();
  }
});

Dance_LeftHandAir = new Dance({
  title:"Left hand in air",

  check: function(player) {
    return player.skeleton.leftArmUp();
  }
});


Dance_BothHandAir = new Dance({
  title:"Both hands in air",

  check: function(player) {
    return player.skeleton.leftArmUp() && player.skeleton.rightArmUp();
  }
});

Dance_RightFootAir = new Dance({
  title:"Right foot in air",

  check: function(player) {
    return player.skeleton.rightFootUp();
  }
});

Dance_LeftFootAir = new Dance({
  title:"Left foot in air",

  check: function(player) {
    return player.skeleton.leftFootUp();
  }
});


Dance_LeftLegBothArms = new Dance({
  title:"Left leg, both arms in air",

  check: function(player) {
    return player.skeleton.leftFootUp() && player.skeleton.leftArmUp() && player.skeleton.rightArmUp();
  }
});

