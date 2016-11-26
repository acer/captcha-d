var sequence = []

function initialize () {

}

function restartSimonSays () {
  var sequence = []
  $('.startSimonSays').css({ display: 'block' })
  $('.yourTurn').css({ display: 'none' })
}

function startSimonSays () {
  $('.startSimonSays').css({ display: 'none' })
  var next = genRandomNum()
  console.log(next)
  sequence.push(next)
  lightSequence()
}

function genRandomNum () {
  return Math.floor(Math.random() * (3+1)) + 1
}

function lightSequence () {
  for (var i = 0; i < sequence.length; i++) {
    var className = mapNumToString(sequence[i])
    console.log(className)
    var el =  $('.' +  className)
    console.log(el)
    el.val('click')
    var src = el.currentSrc
  }
  $('.yourTurn').css({ display: 'block' })
}

function simonClick (button) {
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


initialize()
