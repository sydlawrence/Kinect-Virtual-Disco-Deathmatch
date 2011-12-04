
// REMEMBER: Screen coords, Y grows downwards, so arms about shoulders means arms have a SMALLER y-coord than shoulders

Skeleton = function(data) {

  this.joints = data;

  this.valid = function() {
    return this.joints.head && this.joints.neck && this.joints.left_foot && this.joints.right_foot && this.joints.left_hand && this.joints.right_hand;
  }

  this.position = function() {
    return this.joints.head.x;
  }

  this.handAboveElbow = function(side) {
    return this.joints[side + "_hand"].y < this.joints[side + "_elbow"].y;
  }

  this.elbowAboveShoulder = function(side) {
    return this.joints[side + "_elbow"].y < this.joints[side + "_shoulder"].y;
  }

  this.kneeAboveOtherKnee = function(knee, other) {
    return this.joints[knee + "_knee"].y < this.joints[other + "_knee"];
  }

  this.footAboveOtherFoot = function(foot, other) {
    var neckToFoot = this.joints[foot + "_foot"].y - this.joints.neck.y;
    var neckToOther = this.joints[other + "_foot"].y - this.joints.neck.y;
    var neckToHead = Math.abs(this.joints.neck.y - this.joints.head.y);

    if( (neckToOther - neckToFoot) > neckToHead )
      return true;

    return false;
  }

  this.leftArmUp = function() {
    return this.elbowAboveShoulder("left") && this.handAboveElbow("left");
  }

  this.rightArmUp = function() {
    return this.elbowAboveShoulder("right") && this.handAboveElbow("right");
  }

  this.leftFootUp = function() {
    return this.footAboveOtherFoot("left", "right");
  }

  this.rightFootUp = function() {
    return this.footAboveOtherFoot("right", "left");
  }

  return this;
};

