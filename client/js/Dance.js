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
    
    for (var i = 0; i < Game.userCount; i++) {
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
  
  bounds: [
    [500,0],
    [640,160]
  ],
    
  allowedDuration: 500,
  
  positionTest: function(user) {
  
    var data = Kinect.currentPosition;

    if (data && data.right_hand && data.right_hand.x > this.bounds[0][0]
      && data.right_hand.x < this.bounds[1][0]
      && data.right_hand.y > this.bounds[0][1]
      && data.right_hand.y < this.bounds[1][1]
    ) {
      this.success(user);
    } else {
      this.fail(user);      
    }
  
  }
});

Dance_LeftHandAir = new Dance({
  
  title:"Left hand in air",
  
  bounds: [
    [0,0],
    [160,160]
  ],
    
  allowedDuration: 5000,
  
  positionTest: function(user) {
  
    var data = Kinect.currentPosition;

    if (data && data.left_hand && data.left_hand.x > this.bounds[0][0]
      && data.left_hand.x < this.bounds[1][0]
      && data.left_hand.y > this.bounds[0][1]
      && data.left_hand.y < this.bounds[1][1]
    ) {
      this.success(user);
    } else {
      this.fail(user);      
    }
  
  }
});


Dance_BothHandAir = new Dance({
  
  title:"Both hands in air",
  
  bounds: [
    [0,0],
    [160,160],
    
    [500,0],
    [640,160]
  ],
    
  allowedDuration: 5000,
  
  positionTest: function(user) {
  
    var data = Kinect.currentPosition;

    if (data && data.right_hand && data.left_hand
      && data.left_hand.x > this.bounds[0][0]
      && data.left_hand.x < this.bounds[1][0]
      && data.left_hand.y > this.bounds[0][1]
      && data.left_hand.y < this.bounds[1][1]
      
      && data.right_hand.x > this.bounds[2][0]
      && data.right_hand.x < this.bounds[3][0]
      && data.right_hand.y > this.bounds[2][1]
      && data.right_hand.y < this.bounds[3][1]
    ) {
      this.success(user);
    } else {
      this.fail(user);      
    }
  
  }
});
