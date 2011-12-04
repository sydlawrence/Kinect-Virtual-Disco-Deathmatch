
Dance = function(settings) {
  this.title = "Some dance";
  this.picture = "";
  this.score = 1000;
  this.timestamp = 0;

  this.positionTest = function(player) {
    if( this.check(player) ) {
      player.success();
    } else {
      player.fail();
    }
  }

  this.isValid = function(allowedDuration, timestamp) {
    log(this.title);
    this.timestamp = timestamp;
    
    Game.setDance(this, new Date().getTime() + allowedDuration);
    this.allowedDuration = allowedDuration;
    // this is just for testing
    if (Game.players.length === 0) {
      var t = this;
      setTimeout(function() {
         $(document).trigger("dance.fail", {dance:t});
      },this.allowedDuration)
    }

    $('.dance'+timestamp).addClass("active");
  }

  this.render = function(i) {
    return "";
    //return "<img class='dance dance"+i+"' src='"+this.picture+"' alt='"+this.title+"' />";
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
  picture: "images/moves/rightHand.png",

  check: function(player) {
    return player.skeleton.rightArmUp();
  }
});

Dance_LeftHandAir = new Dance({
  title:"Left hand in air",
  picture: "images/moves/leftHand.png",

  check: function(player) {
    return player.skeleton.leftArmUp();
  }
});


Dance_BankLeft = new Dance({
  title: "Bank left!",
  picture: "images/moves/bankLeft.png",
  check: function(player) {
    return player.skeleton.bankLeft();
  }
});

Dance_BankRight = new Dance({
  title: "Bank right!",
  picture: "images/moves/bankRight.png",
  check: function(player) {
    return player.skeleton.bankRight();
  }
});

Dance_BothHandAir = new Dance({
  title:"Both hands in air",
  picture: "images/moves/bothHands.png",
  check: function(player) {
    return player.skeleton.leftArmUp() && player.skeleton.rightArmUp();
  }
});

Dance_RightFootAir = new Dance({
  title:"Right foot in air",
  picture: "images/moves/rightFoot.png",
  check: function(player) {
    return player.skeleton.rightFootUp();
  }
});

Dance_LeftFootAir = new Dance({
  title:"Left foot in air",
  picture: "images/moves/leftFoot.png",
  check: function(player) {
    return player.skeleton.leftFootUp();
  }
});

Dance_LeftLegBothArms = new Dance({
  title:"Left leg, both arms in air",
  picture: "images/moves/leftLegBothArms.png",
  check: function(player) {
    return player.skeleton.leftFootUp() && player.skeleton.leftArmUp() && player.skeleton.rightArmUp();
  }
});

Dance_RightLegBothArms = new Dance({
  title:"Right leg, both arms in air",
  picture: "images/moves/leftLegBothArms.png",
  check: function(player) {
    return player.skeleton.rightFootUp() && player.skeleton.leftArmUp() && player.skeleton.rightArmUp();
  }
});

Dance_LeftLegRightArm = new Dance({
  title:"Left leg, right arm in air",
  picture: "images/moves/leftLegBothArms.png",
  check: function(player) {
    return player.skeleton.leftFootUp() && player.skeleton.rightArmUp();
  }
});

Dance_RightLegLeftArm = new Dance({
  title:"Right leg, left arm in air",
  picture: "images/moves/leftLegBothArms.png",
  check: function(player) {
    return player.skeleton.rightFootUp() && player.skeleton.leftArmUp();
  }
});



Dance_RightUpperCut = new Dance({
  title:"Right Uppercut",
  picture: "images/moves/leftFoot.png",
  check: function(player) {
    return player.skeleton.rightUpperCut();
  }
});
