Notifications = {

  successOptions: [
    TextImageReplace('awesome'),
    TextImageReplace('kickass'),
    TextImageReplace('great'),

  ],
  
  failOptions: [
    TextImageReplace('wtf'),
    TextImageReplace('fuckoff'),
    TextImageReplace('youreshit'),
  ],
  
  randomSuccess: function() {
    var random = Math.random() * (Notifications.successOptions.length-1);
    if (random > (Notifications.successOptions.length - 1.5)) {
      random = Notifications.successOptions.length-1;
    }
    random = parseInt(random);
    return Notifications.successOptions[random];
  },
  
  randomFail: function() {
    var random = Math.random() * (Notifications.failOptions.length-1);
    if (random > (Notifications.failOptions.length - 1.5)) {
      random = Notifications.failOptions.length-1;
    }
    random = parseInt(random);
    return Notifications.failOptions[random];
  },


  create: function(str,isRight) {
    var $div = $('<div class="notification" />');
    $div.html(str);
    if (isRight) {
      $div.addClass("right_player");
    }
    
    $('body').append($div);
    
    $div.animate({opacity:1},500,undefined, function() {
      $div.animate({opacity:0},1000,undefined, function() {
        $div.remove();
      });
    });
  }

}

