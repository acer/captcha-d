var sequence = []
var user_clicks = []

function restartSimonSays () {
  sequence = []
  user_clicks = []
  $('.startSimonSays').css({ display: 'inline-block' })
  $('.yourTurn').css({ display: 'none' })
  $('.error').css({ display: 'none' })
  $('.winner').css({ display: 'none' })
}

function startSimonSays () {
  $('.startSimonSays').css({ display: 'none' })
  nextRound()
}

function genRandomNum () {
  return Math.floor(Math.random() * (3+1)) + 1
}

function lightSequence () {
  (function myLoop (i) {
     setTimeout(function () {
        $('.yourTurn').css({ display: 'none' })
        var className = mapNumToString(sequence[i])
        var el =  $('.' +  className)
        el.find('img').attr('src', getImageUrl(className, 'bright'))
        dim(className, el)

        if (i < sequence.length - 1) {
          i++
          myLoop(i)
        } else {
          $('.yourTurn').css({ display: 'inline-block' })
        }
     }, 600)
  })(0);
}

function dim (className, el, time) {
  setTimeout(function () {
    el.find('img').attr('src', getImageUrl(className, 'dim'))
  }, time || 400)
}

function simonClick (button) {
  var el =  $('.' +  button)
  el.find('img').attr('src', getImageUrl(button, 'bright'))
  dim(button, el, 100)
  user_clicks.push(mapStringToNum(button))
  if (user_clicks.length === sequence.length) {
    doneRound()
  } else {
    checkUserClicks()
  }
}

function checkUserClicks () {
  for (var i = 0; i < user_clicks.length; i++) {
    if (sequence[i] !== user_clicks[i]) {
      return userError()
    }
  }
}

function doneRound () {
  // Check users input
  for (var i = 0; i < sequence.length; i++) {
    if (sequence[i] !== user_clicks[i]) {
      return userError()
    }
    if (i === sequence.length - 1) {
      return nextRound()
    }
  }
}

function userError () {
  $('.yourTurn').css({ display: 'none' })
  $('.error').css({ display: 'inline-block' })
}

function nextRound () {
  if (sequence.length < 3) {
    user_clicks = []
    var next = genRandomNum()
    sequence.push(next)
    lightSequence()
  } else {
    $('.yourTurn').css({ display: 'none' })
    $('.winner').css({ display: 'inline-block' })
  }
}

function mapStringToNum (string) {
  switch (string) {
    case 'top_left':
      return 1;
    case 'top_right':
      return 2;
    case 'bottom_left':
      return 3;
    case 'bottom_right':
      return 4;
  }
}

function mapNumToString (num) {
  switch (num) {
    case 1:
      return 'top_left'
    case 2:
      return 'top_right'
    case 3:
      return 'bottom_left'
    case 4:
      return 'bottom_right'
  }
}

function getImageUrl (className, type) {
  switch (className) {
    case 'top_left':
      return 'img/green_' + type + '.jpg';
    case 'top_right':
      return 'img/red_' + type + '.jpg';
    case 'bottom_left':
      return 'img/yellow_' + type + '.jpg';
    case 'bottom_right':
      return 'img/blue_' + type + '.jpg';
  }
}
