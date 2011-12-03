/*
{
	"head": {},
	"neck": {},
	"torso": {},
	"left_shoulder": {},
	"left_elbow": {},
	"left_hand": {},
	"left_hip": {},
	"left_knee": {},
	"left_foot": {},
	"right_shoulder": {},
	"right_elbow": {},
	"right_hand": {},
	"right_hip": {},
	"right_knee": {},
	"right_foot": {}
}

*/


Kinect = {

  currentPosition: {},
  canvas: undefined,
  context: undefined,
  
  parseData: function(data) {  
  
    Kinect.currentPosition[data.player] = data;
    Kinect.draw();
    
  },
  
  init: function() {
    Kinect.canvas = document.getElementById(config.kinect.canvas);
    Kinect.context = Kinect.canvas.getContext('2d');
    
  },
  
  drawLimb: function(user, start, end) {
    
    if (Kinect.currentPosition[user][start] && Kinect.currentPosition[user][end]) {
      Kinect.context.beginPath();      
      Kinect.context.moveTo(Kinect.currentPosition[user][start].x,Kinect.currentPosition[user][start].y);  
      Kinect.context.lineTo(Kinect.currentPosition[user][end].x,Kinect.currentPosition[user][end].y);  
      Kinect.context.stroke(); 
    }
  },
  
  draw: function() {
    
    Kinect.context.clearRect(0,0,Kinect.canvas.width,Kinect.canvas.height);
        
    for (i in Kinect.currentPosition) {    
        
    Kinect.drawLimb(i, "head", "neck");
    Kinect.drawLimb(i, "neck", "left_shoulder");
    Kinect.drawLimb(i, "left_shoulder", "left_elbow");
    Kinect.drawLimb(i, "left_elbow", "left_hand");
    Kinect.drawLimb(i, "neck", "right_shoulder");
    Kinect.drawLimb(i, "right_shoulder", "right_elbow");
    Kinect.drawLimb(i, "right_elbow", "right_hand");

    Kinect.drawLimb(i, "left_shoulder", "torso");
    Kinect.drawLimb(i, "torso", "left_hip");
    Kinect.drawLimb(i, "left_hip", "left_knee");
    Kinect.drawLimb(i, "left_knee", "left_foot");

    Kinect.drawLimb(i, "right_shoulder", "torso");
    Kinect.drawLimb(i, "torso", "right_hip");
    Kinect.drawLimb(i, "right_hip", "right_knee");
    Kinect.drawLimb(i, "right_knee", "right_foot");
    
    }
    
  }

}
$(document).ready(function() {
  Kinect.init();

})



$(document).bind("websocket.message",function(e,data) {
  data = data.event.data;
  data = JSON.parse(data);
  if (!data.status) {
    Kinect.parseData(data);
  } else {
    if (data.status === "calibrated") {
      $(document).trigger("kinect.calibrated");
    }
    console.log(data.status);
  }

});


$(document).bind("kinect.calibrated",function() {
  $('body').addClass("calibrated");
});