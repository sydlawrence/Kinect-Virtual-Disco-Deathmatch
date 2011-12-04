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

  loadSamples: function() {
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

  for (var i = 0; i < Game.players.length; i++) {
    if (true) {
      $('#score_right').html(Game.players[i].score);
    } else {
      $('#score_left').html(Game.players[i].score);
    }
  }
});

$(document).bind("dance.success",function(evt,e) {
  e.player.addScore(e.dance.score);

  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("success").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomSuccess()/*, isRight*/);
});

$(document).bind("dance.fail",function(evt,e) {
  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("fail").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomFail()/*, isRight*/);
});


