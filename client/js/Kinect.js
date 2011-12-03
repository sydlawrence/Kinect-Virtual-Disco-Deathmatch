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

  currentPosition: undefined,
  canvas: undefined,
  context: undefined,
  
  parseData: function(data) {  
    console.log(JSON.parse(data));
    Kinect.currentPosition = JSON.parse(data);
    Kinect.draw();
    
  },
  
  init: function() {
    Kinect.canvas = document.getElementById(config.kinect.canvas);
    Kinect.context = Kinect.canvas.getContext('2d');
    
  },
  
  drawLimb: function(start, end) {
    
    if (Kinect.currentPosition[start] && Kinect.currentPosition[end]) {
      Kinect.context.beginPath();      
      Kinect.context.moveTo(Kinect.currentPosition[start].x,Kinect.currentPosition[start].y);  
      Kinect.context.lineTo(Kinect.currentPosition[end].x,Kinect.currentPosition[end].y);  
      Kinect.context.stroke(); 
    }
  },
  
  draw: function() {
    
    Kinect.context.clearRect(0,0,Kinect.canvas.width,Kinect.canvas.height);
        
    Kinect.drawLimb("head", "neck");
    Kinect.drawLimb("neck", "left_shoulder");
    Kinect.drawLimb("left_shoulder", "left_elbow");
    Kinect.drawLimb("left_elbow", "left_hand");
    Kinect.drawLimb("neck", "right_shoulder");
    Kinect.drawLimb("right_shoulder", "right_elbow");
    Kinect.drawLimb("right_elbow", "right_hand");

    Kinect.drawLimb("left_shoulder", "torso");
    Kinect.drawLimb("torso", "left_hip");
    Kinect.drawLimb("left_hip", "left_knee");
    Kinect.drawLimb("left_knee", "left_foot");

    Kinect.drawLimb("right_shoulder", "torso");
    Kinect.drawLimb("torso", "right_hip");
    Kinect.drawLimb("right_hip", "right_knee");
    Kinect.drawLimb("right_knee", "right_foot");
    
  }

}
$(document).ready(function() {
  Kinect.init();

})



$(document).bind("websocket.message",function(e,data) {

  if (!data.status) {
    Kinect.parseData(data.event.data);
  } else {
    console.log(data.status);
  }

});