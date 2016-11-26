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