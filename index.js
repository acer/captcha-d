// Generate image from dummyimage
function genImageUrl () {
  return 'https://dummyimage.com/300x300&text=' + genWord();
}

// Generate random word
function genWord () {
  var index = Math.floor(Math.random() * (words.length+1))
  return words[index];
}

// Word list (170 total)
var words = ["deoxyribonucleoprotein", "nondistinguishableness", "noninterchangeableness", "pseudoanthropological", "representationalistic", "trichloroacetaldehyde", "interdenominationalism", "succinylsulphathiazole", "counterrevolutionaries", "anatomicopathological", "noncharacteristically", "antisupernaturalistic", "indistinguishableness", "pseudoenthusiastically", "magnetothermoelectricity", "dichlorodifluoromethane", "disproportionableness", "hexahydroxycyclohexane", "disestablishmentarianism", "establishmentarianism", "triacetyloleandomycin", "electrocardiographically", "antimaterialistically", "hydrodesulphurization", "trinitrophenylmethylnitramine", "anticonstitutionalist", "hdmezovï¾¡sï¾¡rhely", "electromyographically", "desoxyribonucleoprotein", "polytetrafluoroethylene", "overindividualization", "thermophosphorescence", "chlorotrifluoromethane", "bioelectrogenetically", "phenylethylmalonylurea", "dendrochronologically", "hexachlorocyclohexane", "cyclotrimethylenetrinitramine", "humuhumunukunukuapuaa", "methyltrinitrobenzene", "ballistocardiographic", "overintellectualization", "pseudointernationalistic", "aerobacteriologically", "ultranationalistically", "overimpressionability", "intertransformability", "noninterchangeability", "hyperpolysyllabically", "overintellectualizing", "nitrotrichloromethane", "dichlorodiphenyltrichloroethane", "chlorotrifluoroethylene", "anticonstitutionalism", "electrodiagnostically", "intellectualistically", "pentamethylenediamine", "hyperconstitutionalism", "psychophysiologically", "overindustrialization", "disestablishmentarian", "microspectrophotometric", "succinylsulfathiazole", "misapprehensiveranged", "electrophysiologically", "poliencephalomyelitis", "electroencephalographically", "diaminopropyltetramethylenediamine", "superincomprehensibleness", "demethylchlortetracycline", "electroencephalographic", "overcommercialization", "antinationalistically", "misapprehensiveranging", "diphenylaminechlorarsine", "isopropylideneacetone", "magnetohydrodynamically", "supercalifragilisticexpialidocious", "hexamethylenetetramine", "antidisestablishmentarianism", "electroencephalograph", "psychotherapeutically", "trichloronitromethane", "temperameperamentally", "superincomprehensible", "transcendentalization", "trifluorochloromethane", "electroencephalography", "hyperenthusiastically", "overindividualistically", "transubstantiationalist", "overimpressionableness", "dichlorodiphenyltrichloroethane", "microspectrophotometry", "pseudohermaphroditism", "pseudoanachronistical", "chlorprophenpyridamine", "pseudophilanthropical", "dichlorodifluoromethane", "dicyclopentadienyliron", "crossfertilizafiling", "pseudointellectually", "llanfairpwllgwyngyll", "electrometallurgical", "interdifferentiating", "phenylaceticaldehyde", "ophthalmodynamometer", "antimilitaristically", "noncannibalistically", "hydrodesulfurization", "proconstitutionalism", "microelectrophoretic", "tribromoacetaldehyde", "electrotherapeutical", "overenthusiastically", "overintellectualized", "pseudodemocratically", "anticapitalistically", "existentialistically", "palaeogeographically", "pseudoapologetically", "intercommunicability", "crystallographically", "rï¿¥ï¾¡ntgenographically", "uncharacteristically", "hyperdolichocephalic", "lymphogranulomatosis", "superconformableness", "hypersuggestibleness", "micropaleontological", "phenyldiethanolamine", "magnetohydrodynamics", "ethnomusicologically", "nonnationalistically", "indistinguishability", "nonimpressionability", "subdiaphragmatically", "institutionalization", "overmilitaristically", "pseudohermaphroditic", "superserviceableness", "electrosynthetically", "encephalographically", "neurophysiologically", "oversystematicalness", "nonimperialistically", "parathyroidectomized", "hypercholesterolemia", "microminiaturization", "nonanachronistically", "phototelegraphically", "nonmaterialistically", "palaeoclimatological", "electrocauterization", "electroballistically", "pseudoscientifically", "proindustrialisation", "polyvinylpyrrolidone", "incomprehensibleness", "nonreprehensibleness", "interdifferentiation", "nonindustrialization", "pseudolinguistically", "antienthusiastically", "counterrevolutionary", "incontrovertibleness", "anthropomorphization", "photophosphorylation", "roentgenographically", "internationalization"]

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
}
>>>>>>> Stashed changes
