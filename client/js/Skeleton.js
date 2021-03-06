
// REMEMBER: Screen coords, Y grows downwards, so arms about shoulders means arms have a SMALLER y-coord than shoulders

Skeleton = function(data) {

  this.joints = data;

  this.valid = function() {
    return this.joints.neck && this.joints.left_foot && this.joints.right_foot && this.joints.left_hand && this.joints.right_hand;
  }

  this.position = function() {
    return this.joints.neck.x;
  }
  
  this.rightUpperCut = function() {
    return Math.sqrt((this.joints.right_hand.y - this.joints.right_elbow.y) * (this.joints.right_hand.y - this.joints.right_elbow.y)) < Vector.distance(this.joints.head,this.joints.neck) / 2;
  }

  this.handAboveElbow = function(side) {
    return this.joints[side + "_hand"].y < this.joints[side + "_elbow"].y;
  }
  
  this.handsOnHead = function() {
    var distance = Vector.distance(this.joints.head,this.joints.neck);
    if (!distance) {
      return false;
    }
       
    return Vector.distance(this.joints.head, this.joints.left_hand) < distance && Vector.distance(this.joints.head, this.joints.right_hand) < distance;
  }

  this.handBelowKnee = function(side) {
    return this.joints[side + "_hand"].y > this.joints[side + "_knee"].y;
  }

  this.elbowAboveShoulder = function(side) {
    return this.joints[side + "_elbow"].y < this.joints[side + "_shoulder"].y;
  }

  this.bankLeft = function() {
    return Vector.angle(this.joints.left_hand, this.joints.right_hand) > -150 && Vector.angle(this.joints.left_hand, this.joints.right_hand) < -130;
  }

  this.bankRight = function() {
    return Vector.angle(this.joints.left_hand, this.joints.right_hand) > 130 && Vector.angle(this.joints.left_hand, this.joints.right_hand) < 150;
  }

  this.kneeAboveOtherKnee = function(knee, other) {
    return this.joints[knee + "_knee"].y < this.joints[other + "_knee"];
  }

  this.footAboveOtherFoot = function(foot, other) {
    var neckToFoot = Vector.distance(this.joints[foot + "_foot"],this.joints.neck);
    var neckToOther = Vector.distance(this.joints[other + "_foot"],this.joints.neck);
    var neckToHead = Vector.distance(this.joints.head,this.joints.neck);


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

