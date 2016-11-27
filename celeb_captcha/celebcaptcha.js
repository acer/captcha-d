var celebrities = ["benedict cumberbatch"];

console.log("Init celebcaptcha.js");

// save index state globally
var index = genIndex()

// Initialize and render image
function init(id) {
	for(var i = 1; i < 7; i++){
		var imageSource = getImageSource(i);
		console.log(imageSource);
		$('.image').append(i + "<img src=\"" + imageSource + "\"/>" );
	}
}

// Generate index for celebrities array
function genIndex () {
  return Math.floor(Math.random() * (celebrities.length+1))
}

// Get the celebrity image
function getImageSource (number) {
  var celebrity = generateCelebrity()
  return './img/me.jpg';
  //+ celebrity.text().replace(/ /g,'') + number;
}

// Generate random word
function generateCelebrity () {
  return celebrities[index]
}

// Do work after button is pressed
function buttonClick () {
  console.log('CLICKED')
  var celebrity = $('.input').val().toLowerCase();
  if (generateCelebrity() === celebrity) {
    // SUCCESS
    $('.message').text( "Success!!! Congrats you're not a dumbass!" );
  } else {
    // FAILURE
    $('.message').text( "FAILURE!!! Fucking BOT!" );
  }
  // checkAgainst word generated
}

init()