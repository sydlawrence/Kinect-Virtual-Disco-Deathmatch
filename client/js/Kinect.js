/*
  {
    "left_elbow": {
      "x": 455.76843,
      "y":318.22772,
      "z":752.74554
    },
    "left_hand": {
      "x":455.76395,
      "y":545.3215,
      "z":752.74554
    },
    "left_knee": {
      "x":598.067,
      "y":771.2663,
      "z":736.17126
    },
    "left_foot": {
      "x":598.067,
      "y":1112.7468,
      "z":736.17126
    },
    "right_elbow": {
      "x":684.94946,
      "y":340.79352,
      "z":461.77103
    },
    "right_hand": {
      "x":684.9568,
      "y":710.9852,
      "z":461.77103
    },
    "right_knee": {
      "x":779.62213,
      "y":946.6657,
      "z":541.7804
    },
    "right_foot": {
      "x":779.62213,
      "y":1410.6694,
      "z":541.7804
    },
    "head": {
      "x":779.62213,
      "y":1410.6694,
      "z":541.7804
    }
  }

*/


Kinect = {

  currentPosition: undefined,
  
  parseData: function(data) {  
    Kinect.currentPosition = data;
    
  }
  
  draw: function() {
  
  }

}




$(document).bind("websocket.message",function(e,data) {

  if (!data.status) {
    Kinect.parseData(data.event.data);
  } else {
    console.log(data.status);
  }

});