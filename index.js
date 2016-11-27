console.log("Extension ran!");

// news feed parsing
var newsfeed = $("div[id^='feed_stream']").get(0);
var processed_stories = [];

// currently, the observer will find all news feed stories
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
	var mutation_dom_id = mutation.target.id;
	if (mutation_dom_id && mutation_dom_id.startsWith("hyperfeed_story")) {
		if (processed_stories.includes(mutation_dom_id) == false) {
			process_story(mutation.target);
		}
	}

	});
});

var config = { attributes: true, childList: true, characterData: true, subtree: true};
observer.observe(newsfeed, config);
//observer.disconnect();

function process_story(story_elem) {

	var story = $(story_elem);
	var story_content = story.find(".userContent");

	if (story_content.length == 0) {
		// if there is no userContent div, then the story is empty or not loaded
		return;
	}

	processed_stories.push(story_elem.id);

	story.css('filter', 'blur(5px)');

    var captcha_id = Math.round(Math.random() * 1000000000);
	var captcha_elem = $("<button>Solve Captcha</button>");
	captcha_elem.attr("id", "captcha_" + captcha_id);
	captcha_elem.click(function() {
        var init_captcha_event = new CustomEvent('init_captcha', { 'detail': this.id });
        document.dispatchEvent(init_captcha_event);
	});
	story.after(captcha_elem);
}


function blurFaces (el, story) {
  if ($(el).has("img") && $(el).has("img").length > 0) {
    var image = $(el).find("img")
    var g = new Image()
    g.crossOrigin = 'anonymous'
    g.src = image[0].currentSrc
    var j_el = $(g)

    if (j_el.faceDetection ) {
      j_el.faceDetection({
        complete: function (faces) {
          console.log(faces);
          for (var i = 0; i < faces.length; i++) {
              $('<div>', {
                  'class':'face',
                  'css': {
                      'position': 'absolute',
                      'left':     faces[i].x * faces[i].scaleX - 10 + 'px',
                      'top':      faces[i].y * faces[i].scaleY - 10 + 'px',
                      'width':    faces[i].width  * faces[i].scaleX + 10 + 'px',
                      'height':   faces[i].height * faces[i].scaleY + 10 + 'px'
                  }
              })
              .insertAfter(this);
          }
          story.css('filter', 'blur(0)')
        }
      });
    }
  }
}

document.addEventListener('init_captcha', function(e) {
	var captcha_button_id = e.detail;
	var captcha_id = captcha_button_id.split("_")[1];
	console.log("Event received from " + e.detail);

	var captcha_button = $('#' + captcha_button_id);

	var captcha_elem = $("<iframe src='https://zlwaterfield.github.io/'></div>");
	captcha_elem.attr("id", "captcha_" + captcha_id);
	captcha_button.after(captcha_elem);
	
	var captcha_dom_elem = captcha_elem[0];
	captcha_dom_elem.addEventListener("load", function() {
			captcha_dom_elem.contentWindow.postMessage(captcha_id, "*");
	});

	captcha_button.remove();
});


window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
	var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
	if (origin !== "https://zlwaterfield.github.io")
		return;

	captcha_success(event.data);
}

function captcha_success(captcha_winner_id) {
	console.log("Winner winner chicken dinner for " + captcha_winner_id);
	var captcha_iframe_elem = $('#captcha_' + captcha_winner_id);
	var story_elem = captcha_iframe_elem.prev();
	story_elem.css('filter', 'blur(0px)');
	console.log(story_elem);
}