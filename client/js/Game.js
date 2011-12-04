Game = {
  players: [],
  samples: {},

  isRunning: false,

  registerPlayer: function(player) {
    if( !Game.playerRegistered(player) ) {
      Game.players.push(player);
    }
  },

  registerSample: function(name, url) {
    Game.samples[name] = soundManager.createSound({
      id: name,
      url: url,
      autoLoad: true,
      autoPlay: false
    });
  },

  registerMusic: function(name, url) {
    Game.samples[name] = soundManager.createSound({
      id: name,
      url: url,
      autoload: true,
      autoplay: false,
      position: 22000,
      whileplaying: function() {
        var time = parseInt(this.position / 1000);
        if( Song.currentTime !== time ) {
          Song.currentTime = time;
          $('#trackTime').html(Song.currentTime);
          Song.checkMoves(Song.currentTime);
        }
        //console.log(this.position);
      },
    });

    //Game.samples[name].play();
  },

  loadSamples: function() {
    Game.registerMusic("music", song1.track.mp3);
    Game.registerSample("dff", "songs/dff.mp3");
    Game.registerSample("finishHim", "songs/a6f563_Mortal_Kombat_3_Finish_Him_Sound_Effect.mp3");
    Game.registerSample("fight", "songs/10d604_Street_Fighter_Fight_Sound_Effect.mp3");
  },

  playSound: function(name) {
    Game.samples[name].play();
  },

  findPlayer: function(userId) {
    for(var i = 0 ; i < Game.players.length ; i++ ) {
      var player = Game.players[i];
      if(userId == player.userId) {
        return player;
      }
    }

    return false;
  },

  playerRegistered: function(player) {
    if( Game.findPlayer(player.userId) )
      return true;

    return false;
  },

  setDance: function(dance, endTime) {
    for(var i = 0 ; i < Game.players.length; i++ ) {
      var player = Game.players[i];
      player.setDance(dance, endTime);
    }
  },

  // called to start a new game
  start: function() {
    if (Game.isRunning) {
      alert("Game is already running");
      return;
    }
    Game.isRunning = true;

    $('#log').html('');
    Game.countdown.start();
  },

  // the actual begin method
  begin: function() {
    $('body').addClass('players'+Game.players.length);
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
        Game.playSound("fight");
        Game.countdown.render(TextImageReplace('fight'));

        Game.begin();
      } else {
        Game.playSound("dff");
        Game.countdown.render(TextImageReplace(Game.countdown.waitTime - Game.countdown.time))

      }
      Game.countdown.time++;
    }
  }
}

$(document).bind("game.start",function() {
  $('.score').html(0);
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

  for (var i = 0; i < Game.players.length; i++) {
    var el = '#score_left';
    if (Game.players[i].isRight()) { // if user is right
      el = '#score_right';
    }

    update_score = function(el,count) {
      var $div = $(el);
      var fs = $div.css('font-size');
      $div.animate({fontSize:42},300);

      var html = $div.html();
      html = parseInt(html);

      if (html !== count) {

        var updateInterval = setInterval(function() {
          var html = $div.html();
          html = parseInt(html);

          if (html !== count) {
            var c = html+23;
            if (c > count) {
              c = count;
            }
            $div.html(c);
          } else {
            clearInterval(updateInterval);
            $div.animate({fontSize:fs});
          }
        },5);
      }
    }
    
    if (!Game.isRunning) {
      return;
    }
    update_score(el,Game.players[i].score);
    
    if (Game.players[i].score >= 3000) {
    
      $(document).trigger("game.stop");
      soundManager.stopAll();
      Game.playSound("finishHim");

      
      var winner = 1;
      str = "Player 1 Wins!";
      if (Game.players[i].isRight()) {
        str = "Player 2 Wins!";
        winner = 2;
      } 
      
      switch (winner) {
        case 1:
          Notifications.create(Notifications.randomSuccess(), false, 1);
          Notifications.create(Notifications.randomFail(), true, 1);
          break;
        case 2:
          Notifications.create(Notifications.randomSuccess(), true, 1);
          Notifications.create(Notifications.randomFail(), false, 1);
          break;
      
      
      }
      
      
      
           
      $('#winner').css("display","block");     
      $('#winner').html(str);
    }
    

  }

});

$(document).bind("dance.success",function(evt,e) {
  e.player.addScore(e.points);

  var div = ".left_player";
  if (e.player.isRight()) {
    div = ".right_player";
  }

  var danceImg = $(div+" .dance"+e.dance.timestamp)
  danceImg.addClass("success").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomSuccess(), e.player.isRight());
});

$(document).bind("dance.fail",function(evt,e) {
  var div = ".left_player";
  if (e.player.isRight()) {
    div = ".right_player";
  }

  var danceImg = $(div+" .dance"+e.dance.timestamp)
  danceImg.addClass("fail").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomFail(), e.player.isRight());
});


