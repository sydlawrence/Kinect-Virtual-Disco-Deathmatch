Game = {

  scores: [],
  
  userCount: 1,
  
  isRunning: false,
  
  addScore: function(key, value) {
    if (value === undefined) {
      value = key;
      key = 0;
    }

    Game.scores[key] += value; 
    
    $(document).trigger("game.updateScores");
  },
  

  // called to start a new game
  start: function(userCount) {
    if (Game.isRunning) {
      alert("Game is already running");
      return;
    }
  
    this.userCount = userCount;
    
    //this.userCount = 1;
    var scores = [];
    for (var i = 0; i<userCount;i++) {
      scores[i] = 0;
    }
    Game.scores = scores;
    
    $('#log').html('');
    Game.countdown.start();
     
  },
  
  // the actual begin method
  begin: function() {
    log("Start!");
    $(document).trigger("game.begin");
    Game.isRunning = true;
    Song.play(song1);
  },
  
  finish: function() {
    Game.isRunning = false;
    $(document).trigger("game.finish");
  },
  
  // for a countdown timer
  countdown: {
    time: 0,
    waitTime: 3,
    startInterval: undefined,
    
    start: function() {
        Game.countdown.time = 0;
        Game.countdown.startInterval = setInterval('Game.countdown.run()',1000);
    },
    
    run: function() {
      log(Game.countdown.time)
      if (Game.countdown.time == Game.countdown.waitTime) {
        clearInterval(Game.countdown.startInterval);
        Game.begin();
      }
      Game.countdown.time++;
    }
  }
}

$(document).bind("game.start",function() {
  Game.start(1);
});

$(document).bind("game.stop",function() {
  Game.finish();
});

$(document).bind("game.updateScores",function() {
  $('#score .values').html(Game.scores.join(", "));
});

$(document).bind("dance.success",function(evt,e) {
  Game.addScore(e.user,e.dance.score);
  log("<span style='color:#0f0'>User "+e.user+" successful dance move: "+e.dance.title+"</span>");
});

$(document).bind("dance.fail",function(evt,e) {
  //Game.addScore(e.dance.user,0);
  log("<span style='color:#f00'>User "+e.user+" unsuccessful dance move: "+e.dance.title+"</span>");
});


