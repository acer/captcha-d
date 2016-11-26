console.log("Extension ran!");

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('captcha.js');
/*
s.onload = function() {
    this.remove();
};
*/
(document.head || document.documentElement).appendChild(s);

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
	var captcha_div = $("<div id='captcha'></div>");
	var catcha_url = chrome.extension.getURL("captcha.html")
	captcha_div.load(catcha_url);

	story.after(captcha_div);
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
