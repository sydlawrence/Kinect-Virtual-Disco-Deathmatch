Game = {

  scores: [],
  
  userCount: 1,
  
  users:[],
    
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
   
    Game.users = [];
  
    if (Game.isRunning) {
      alert("Game is already running");
      return;
    }
    Game.isRunning = true;
  
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
    $('body').addClass('players'+Game.users.length);
    Song.play(song1);
    $(document).trigger("game.begin");
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
    
    render: function(str) {
    
      var $div = $("<div class='countdown'>");
      $div.html(str);
      
      $div.animate({opacity:0},800,undefined,function() {
        $div.remove();
      })
      
      $('body').append($div);
    },
    
    run: function() {
      if (Game.countdown.time == Game.countdown.waitTime) {
        clearInterval(Game.countdown.startInterval);
        Game.countdown.render(TextImageReplace('fight'));

        Game.begin();
      } else {
        Game.countdown.render(TextImageReplace(Game.countdown.waitTime - Game.countdown.time))

      }
      Game.countdown.time++;
    }
  }
}

$(document).bind("game.start",function() {
  Game.start(2);
});

$(document).bind("Song.ready", function() { 
  // add all the dance moves to the screen
  $('.dance_moves').html("");
  for (i in Song.currentSong.moves) {
    $('.dance_moves').prepend(Song.currentSong.moves[i].move.render(i));
  }
});

$(document).bind("game.stop",function() {
  Game.finish();
});

$(document).bind("game.updateScores",function() {
  $('#score .values').html(Game.scores.join(", "));
});

$(document).bind("dance.success",function(evt,e) {
  Game.addScore(e.user,e.dance.score);
  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("success").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomSuccess()/*, isRight*/);
});

$(document).bind("dance.fail",function(evt,e) {
  //Game.addScore(e.dance.user,0);
  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("fail").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomFail()/*, isRight*/);
});


