
Player = function(userId) {
  this.userId = userId;
  this.skeleton = undefined;
  this.data = undefined;
  this.score = 0;
  this.timeout = undefined;
  this.dance = undefined;
  this.endTime = 0;

  this.track = function(data) {
    this.skeleton = new Skeleton(data);
    this.data = data;
  }

  this.position = function() {
    if( this.skeleton.valid() ) {
      return this.skeleton.position();
    }

    return -1;
  }

  this.isRight = function() {
    return !this.isLeft();
  }

  this.isLeft = function() {
    var
      rightMost = 0,
      rightMostUserId = 0;

    for(var i = 0 ; i < Game.players.length ; i++ ) {
      var player = Game.players[i];
      if( player.position() > rightMost ) {
        rightMostUserId = player.userId;
        rightMost = player.position();
      }
    }

    return this.userId == rightMostUserId;
  }

  this.name = function() {
    return this.userId;
  }

  this.addScore = function(points) {
    this.score += points;
    $(document).trigger("game.updateScores");
  }

  this.setDance = function(dance, endTime) {
    this.dance = dance;
    var player = this;
    this.endTime = endTime;
    this.timeout = setInterval(function() {
      dance.positionTest(player);
    }, 50);
  }

  this.fail = function() {
    var now = new Date().getTime();
    if (now > this.endTime) {
      clearInterval(this.timeout);
      this.timeout = undefined;
      $(document).trigger("dance.fail", {dance:this.dance, player:this});
    }
  }

  this.success = function() {
    clearInterval(this.timeout);
    this.timeout = undefined;
    $(document).trigger("dance.success", {dance:this.dance, player:this});
  }

  this.drawLimb = function(context, start, end) {
    if( this.data[start] && this.data[end] ) {
      var from = this.data[start], to = this.data[end];
      context.strokeStyle = '#fff'; // red
      context.lineWidth = 6;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
    }
  }

  this.draw = function(context) {
    this.drawLimb(context, "head", "neck");
    this.drawLimb(context, "neck", "left_shoulder");
    this.drawLimb(context, "left_shoulder", "left_elbow");
    this.drawLimb(context, "left_elbow", "left_hand");
    this.drawLimb(context, "neck", "right_shoulder");
    this.drawLimb(context, "right_shoulder", "right_elbow");
    this.drawLimb(context, "right_elbow", "right_hand");

    this.drawLimb(context, "left_shoulder", "torso");
    this.drawLimb(context, "torso", "left_hip");
    this.drawLimb(context, "left_hip", "left_knee");
    this.drawLimb(context, "left_knee", "left_foot");

    this.drawLimb(context, "right_shoulder", "torso");
    this.drawLimb(context, "torso", "right_hip");
    this.drawLimb(context, "right_hip", "right_knee");
    this.drawLimb(context, "right_knee", "right_foot");
  }

  return this;
}

