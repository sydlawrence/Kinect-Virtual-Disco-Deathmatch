Kinect = {

  currentPosition: undefined,
  
  parseData: function(data) {
  
      document.getElementById('kinectData').innerHTML = data;

  
  
    // based on "x,y x,y"
    data = data.split(" ");
    data[0] = data[0].split(",");
    data[1] = data[1].split(",");
  
  
    Kinect.currentPosition = {
      hands: [
        {
          x: data[0][0],
          y: data[0][1],
          z: data[0][2]
        },
        {
          x: data[1][0],
          y: data[1][1],
          z: data[1][2]
        }
      ]
    }
    
  }

}




$(document).bind("websocket.message",function(e,data) {

  if (true) {
    Kinect.parseData(data.event.data);
  }

});