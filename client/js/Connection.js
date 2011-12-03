// let's invite Firefox to the party.
if (window.MozWebSocket) {
  window.WebSocket = window.MozWebSocket;
}

openConnection = function() {

  if (conn.readyState === undefined || conn.readyState > 1) {
    conn = new WebSocket('ws://mb.local:8080/p5websocket');    
    conn.onopen = function () {
      alert("socket open");
    };

    conn.onmessage = function (event) {
      console.log(event.data);    
    };
    
    conn.onclose = function (event) {
      console.log(event);
      alert("socket closed");
    };
  }
}
openConnection();