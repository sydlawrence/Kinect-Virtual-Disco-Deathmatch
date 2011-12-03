conn = {};

// let's invite Firefox to the party.
if (window.MozWebSocket) {
  window.WebSocket = window.MozWebSocket;
}

openConnection = function() {

  if (conn.readyState === undefined || conn.readyState > 1) {
    conn = new WebSocket('ws://'+config.socket.hostname+':'+config.socket.port+'/'+config.socket.path);    
    conn.onopen = function () {

    };

    conn.onmessage = function (event) { 
      $(document).trigger("websocket.message",{event:event});
    };
    
    conn.onclose = function (event) {
      console.log("socket closed");
    };
  }
}
openConnection();