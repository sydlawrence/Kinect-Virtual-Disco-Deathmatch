Song = {

  audio:undefined,
  
  currentSong: undefined,
  
  currentTime: undefined,

  play:function(song) {
    Song.currentSong = song;
    Song.audio.src = song.track.mp3;  
    
    Song.audio.play();
    
  },
  
  checkMoves: function(timestamp) {
    if (Song.currentSong.moves[timestamp]) {
      Song.currentSong.moves[timestamp].move.isValid(Song.currentSong.moves[timestamp].allowedDuration);
    }
  }

}

Song.audio = document.createElement("audio");


Song.audio.onpause = function() {
  alert("ended");
}

$(Song.audio)
  .bind("ended",function() {
    $(document).trigger("game.stop");
    $('#trackTime').html("");
  })
  .bind("timeupdate",function() {
    if (Song.currentTime !== parseInt(Song.audio.currentTime)) {
      Song.currentTime = parseInt(Song.audio.currentTime);
      $('#trackTime').html(Song.currentTime);
      Song.checkMoves(Song.currentTime);     
    }
  })
  .bind("pause",function() {
    $('#trackTime').html(""); 
  });

$(document).bind("game.stop",function() {
  Song.audio.pause();
});


