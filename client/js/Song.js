Song = {

  audio:undefined,

  play:function(song) {
    Song.audio.src = song.track.mp3;  
    
    Song.audio.onended = function() {
      alert("ended");
    }
    
    Song.audio.onstop = function() {
      alert("stop");
    }
    
    Song.audio.play();
    
  }

}

Song.audio = document.createElement("audio");





//Song.play(song1);