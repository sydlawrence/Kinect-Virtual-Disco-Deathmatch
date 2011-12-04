Game = {

  scores: [],

  userCount: 1,

  users:[],
  players: [],
  
  isRunning: false,

  registerPlayer: function(player) {
    if( !Game.playerRegistered(player) ) {
      Game.players.push(player);
    }
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
        var endNumber = count;
        
        var updateInterval = setInterval(function() {
          var html = $div.html();
          html = parseInt(html); 
          
          if (html !== count) {
            var c = html+5;
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
    update_score(el,Game.players[i].score);

  }  
  
});

$(document).bind("dance.success",function(evt,e) {
  e.player.addScore(e.dance.score);

  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("success").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomSuccess(), e.player.isRight());
});

$(document).bind("dance.fail",function(evt,e) {
  e.player.addScore(e.dance.score);
  
  var danceImg = $(".dance"+e.dance.timestamp)
  danceImg.addClass("fail").animate({marginBottom:(0-danceImg.height())},300,undefined, function() {
    danceImg.remove();
  });
  Notifications.create(Notifications.randomFail(), e.player.isRight());
});


