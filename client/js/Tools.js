console.log = console.dir;

log = function(str) {

  $('#log').html('').css('top',0).css('opacity',1);
  
  $('#log').append(str+"\n");
  
  var t = setTimeout(function() {  
    $('#log').animate({opacity:0.1,top: (0 - $('#log').height())})
  },1000);
  
}





Vector = {
  angle: function(point1, point2) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  },
  distance: function(point1, point2) {
    return Math.sqrt( ( point2.y - point1.y ) * ( point2.y - point1.y ) + ( point2.x - point1.x ) * ( point2.x - point1.x ) )
  }
}



TextImageReplace = function(str) {
  return "<img src='images/text/"+str+".png'>";
}

