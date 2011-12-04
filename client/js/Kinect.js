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
  skeletons: {},
  canvas: undefined,
  context: undefined,

  parseData: function(data) {
    Game.registerPlayer(new Player(data.player));
    var player = Game.findPlayer(data.player);
    
    if( player ) {
      player.track(data);
      
      // check for game start
      if (player.isReady() && !Game.isRunning) {
        var allReady = true;
        for (var i = 0; i < Game.players.length; i++) {
          if (!Game.players[i].isReady()) {
            allReady = false;
            break;
          }
        }
        
        if (allReady) {
          $(document).trigger('game.start');  
        }
      
      }
    } else {

    }

    Kinect.draw();
  },

  init: function() {
    Kinect.canvas = document.getElementById(config.kinect.canvas);
    Kinect.context = Kinect.canvas.getContext('2d');
  },

  draw: function() {
    Kinect.context.clearRect(0,0,Kinect.canvas.width,Kinect.canvas.height);
    for(var i = 0 ; i < Game.players.length ; i++ ) {
      var player = Game.players[i];
      if( player.skeleton.valid() )
        player.draw(Kinect.context);
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
    $(document).trigger("kinect.calibrated");
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
