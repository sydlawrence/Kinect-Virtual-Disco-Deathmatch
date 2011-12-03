Dance = function(settings) {
 
  this.title = "Some dance";
  this.picture = "";
  
  this.timeout = undefined;
  this.startTime = 0;
  this.endTime = 0;
  this.allowedDuration = 2000; // milliseconds
    
  this.isValid = function() {
    
    log(this.title);
    
    currentDance = this;    
    this.startTime = new Date();
    this.startTime = this.startTime.getTime();
    this.endTime = this.startTime + this.allowedDuration;
    
    this.timeout = setInterval("currentDance.positionTest()",50);
    
  }
  
  this.fail = function() {
    var now = new Date();
    now = now.getTime();
    if (now > this.endTime) {
      clearInterval(this.timeout);
      $(document).trigger("dance.fail",{dance:this});
    }
  }
  
  this.success = function() {
    clearInterval(this.timeout);
    $(document).trigger("dance.success",{dance:this});
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
    
  allowedDuration: 5000,
  
  positionTest: function() {
  
    var data = Kinect.currentPosition;

    if (data && data.right_hand && data.right_hand.x > this.bounds[0][0]
      && data.right_hand.x < this.bounds[1][0]
      && data.right_hand.y > this.bounds[0][1]
      && data.right_hand.y < this.bounds[1][1]
    ) {
      this.success();
    } else {
      this.fail();      
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
  
  positionTest: function() {
  
    var data = Kinect.currentPosition;

    if (data && data.left_hand && data.left_hand.x > this.bounds[0][0]
      && data.left_hand.x < this.bounds[1][0]
      && data.left_hand.y > this.bounds[0][1]
      && data.left_hand.y < this.bounds[1][1]
    ) {
      this.success();
    } else {
      this.fail();      
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
  
  positionTest: function() {
  
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
      this.success();
    } else {
      this.fail();      
    }
  
  }
});








$(document).bind("dance.success",function(evt,e) {
  console.log(e);
  log("<span style='color:#0f0'>successful dance move: "+e.dance.title+"</span>");
});

$(document).bind("dance.fail",function(evt,e) {
  console.log(e);
  log("<span style='color:#f00'>unsuccessful dance move: "+e.dance.title+"</span>");
});




var time = 0;
var waitTime = 3;
var startInterval;

start = function() {
  log(time)
  if (time == waitTime) {
    clearInterval(startInterval);
    log("Start!");
    Dance_LeftHandAir.isValid();
    t = setTimeout("Dance_RightHandAir.isValid()",7000);
    t2 = setTimeout("Dance_BothHandAir.isValid()",14000);
    
  }
  time++;
}

startInterval = setInterval("start()",1000);
