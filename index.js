console.log("Extension ran!");

// news feed parsing
var newsfeed = $("div[id^='feed_stream']").get(0);
var processed_stories = [];
var ads = ['compnerd.jpg', 'doge_ad.jpg', 'getprohockey.gif', 'getproshakew8.gif', 'hillary_server.jpg'];
var image_styling1 = {
  width: 300 + 'px',
  height: 'auto',
  position: 'absolute',
  'z-index': 10,
  left: 10 + 'px',
}
var image_styling2 = {
  width: 300 + 'px',
  height: 'auto',
  position: 'absolute',
  'z-index': 10,
  right: 150 + 'px',
}

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

  var story_height = story.height()

	processed_stories.push(story_elem.id);

	story.css('filter', 'blur(5px)');

  var captcha_id = Math.round(Math.random() * 1000000000);
	var captcha_elem = $("<button>Solve Captcha</button>");
  captcha_elem.css({
    position: 'relative',
    top: - story_height/2 - 50 + 'px',
    left: 164 + 'px',
    'z-index': 100,
    'text-align': 'center',
    width: 'auto',
    padding: 15 + 'px',
    'font-size': 1.5 + 'em',
    background: 'RGBA(74, 170, 165, 1.00)',
    border: 'RGBA(74, 170, 165, 1.00)',
    'border-radius': 3 + 'px',
    cursor: 'pointer',
    color: '#fff',
    'font-weight': 700
  })
	captcha_elem.attr("id", "captcha_" + captcha_id);
	captcha_elem.click(function() {
        var init_captcha_event = new CustomEvent('init_captcha', { 'detail': this.id });
        document.dispatchEvent(init_captcha_event);
	});
  var captcha_img1 = $("<img src=" + chrome.extension.getURL('acer-ad/pics/' + genAdImg()) + "></div>");
  image_styling1['margin-top'] = - story_height/2 - 150 + 'px'
  captcha_img1.css(image_styling1);
  var captcha_img2 = $("<img src=" + chrome.extension.getURL('acer-ad/pics/' + genAdImg()) + "></div>");
  image_styling2['margin-top'] = - story_height/2 + 'px'
  captcha_img2.css(image_styling2);
	story.after(captcha_elem);
	story.after(captcha_img1);
	story.after(captcha_img2);
}

document.addEventListener('init_captcha', function(e) {
	var captcha_button_id = e.detail;
	var captcha_id = captcha_button_id.split("_")[1];
	console.log("Event received from " + e.detail);

	var captcha_button = $('#' + captcha_button_id);
	var captcha_elem;

	if (captcha_id % 2 == 0) {
		captcha_elem = $("<iframe src='https://zlwaterfield.github.io/pic_captcha/'></div>");
		captcha_elem.css({
		    position: 'relative',
		    top: -400 + 'px',
		    left: 65 + 'px',
		    width: 350 + 'px',
		    border: 0,
		    height: 200 + 'px',
        'z-index': 11
		});
	} else {
		captcha_elem = $("<iframe src='https://zlwaterfield.github.io/simon_says/'></div>");
    captcha_elem.css({
      position: 'relative',
      top: -400 + 'px',
      left: 65 + 'px',
      width: 350 + 'px',
      border: 0,
      height: 380 + 'px',
      'z-index': 11
    });
	}

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
	var story_elem = captcha_iframe_elem.prev().prev().prev();
	story_elem.css('filter', 'blur(0px)');
	console.log(story_elem);
	captcha_iframe_elem.remove();
}

var prev = 0
function genAdImg() {
  var ran =  Math.floor(Math.random() * (ads.length))
  if (ran == prev) {
    if (ran === 4) {
      ran = 0
    } else {
      ran++
    }
    prev = ran
  }
  return ads[ran]
}
