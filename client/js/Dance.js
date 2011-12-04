Dance = function(settings) {

  this.title = "Some dance";
  this.picture = "";

  this.score = 5;

  this.timeouts = [];
  this.startTime = 0;
  this.endTime = 0;
  this.allowedDuration = 2000; // milliseconds

  this.positionTest = function(user) {
    this.success(user);
  }

  this.isValid = function(allowedDuration) {
    if (allowedDuration) {
      this.allowedDuration = allowedDuration;
    }
    log(this.title);

    currentDance = this;
    this.startTime = new Date();
    this.startTime = this.startTime.getTime();
    this.endTime = this.startTime + this.allowedDuration;

    for (i in Game.users) {
      this.timeouts[i] = setInterval("currentDance.positionTest("+i+")",50);
    }

  }

  this.fail = function(user) {

    var now = new Date();
    now = now.getTime();
    if (now > this.endTime) {
      clearInterval(this.timeouts[user]);
      $(document).trigger("dance.fail",{dance:this,user:user});
    }
  }

  this.success = function(user) {
    clearInterval(this.timeouts[user]);
    $(document).trigger("dance.success",{dance:this,user:user});
  }

  for (i in settings) {
    this[i] = settings[i];
  }

  return this;

};






Dance_RightHandAir = new Dance({

  title:"Right hand in air",

  positionTest: function(user) {

    if(Kinect.skeletons[user].rightArmUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }

  }
});

Dance_LeftHandAir = new Dance({

  title:"Left hand in air",

  positionTest: function(user) {

    if(Kinect.skeletons[user].leftArmUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }
  }
});


Dance_BothHandAir = new Dance({

  title:"Both hands in air",

  positionTest: function(user) {

    if(Kinect.skeletons[user].leftArmUp() && Kinect.skeletons[user].rightArmUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }
  }
});

Dance_RightFootAir = new Dance({

  title:"Right foot in air",

  positionTest: function(user) {

    if(Kinect.skeletons[user].rightFootUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }

  }
});

Dance_LeftFootAir = new Dance({

  title:"Left foot in air",

  positionTest: function(user) {

    if(Kinect.skeletons[user].leftFootUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }
  }
});


Dance_LeftLegBothArms = new Dance({

  title:"Left leg, both arms in air",

  positionTest: function(user) {

    if( Kinect.skeletons[user].leftFootUp() && Kinect.skeletons[user].leftArmUp() && Kinect.skeletons[user].rightArmUp() ) {
      this.success(user);
    } else {
      this.fail(user);
    }

  }

});
