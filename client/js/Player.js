
Player = function(userId) {
  this.userId = userId;
  this.skeleton = undefined;
  this.score = 0;
  this.timeout = undefined;
  this.dance = undefined;
  this.endTime = 0;

  this.track = function(data) {
    this.skeleton = new Skeleton(data);
  }

  this.setDance = function(dance, endTime) {
    var player = this;
    console.log("dance set for player " + this.userId);
    this.endTime = endTime;
    this.timeout = setInterval(function() {
      dance.positionTest(player.userId);
    }, 50);
  }

  this.fail = function() {
    var now = new Date().getTime();
    if (now > this.endTime) {
      clearInterval(this.timeout);
      this.timeout = undefined;
      console.log("player " + this.userId + " failed");
    }
  }

  this.success = function() {
    clearInterval(this.timeout);
    this.timeout = undefined;
    console.log("player " + this.userId + " success");
    //$(document).trigger("dance.success",{dance:this,user:user});
  }
  return this;

}

