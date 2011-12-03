console.log = console.dir;

log = function(str) {
  $('#log').append(str+"\n");

}



Vector = {
  angle: function(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  }
}





