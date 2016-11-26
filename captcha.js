// Word list (170 total)
var words = ["deoxyribonucleoprotein", "nondistinguishableness", "noninterchangeableness", "pseudoanthropological", "representationalistic", "trichloroacetaldehyde", "interdenominationalism", "succinylsulphathiazole", "counterrevolutionaries", "anatomicopathological", "noncharacteristically", "antisupernaturalistic", "indistinguishableness", "pseudoenthusiastically", "magnetothermoelectricity", "dichlorodifluoromethane", "disproportionableness", "hexahydroxycyclohexane", "disestablishmentarianism", "establishmentarianism", "triacetyloleandomycin", "electrocardiographically", "antimaterialistically", "hydrodesulphurization", "trinitrophenylmethylnitramine", "anticonstitutionalist", "hdmezovï¾¡sï¾¡rhely", "electromyographically", "desoxyribonucleoprotein", "polytetrafluoroethylene", "overindividualization", "thermophosphorescence", "chlorotrifluoromethane", "bioelectrogenetically", "phenylethylmalonylurea", "dendrochronologically", "hexachlorocyclohexane", "cyclotrimethylenetrinitramine", "humuhumunukunukuapuaa", "methyltrinitrobenzene", "ballistocardiographic", "overintellectualization", "pseudointernationalistic", "aerobacteriologically", "ultranationalistically", "overimpressionability", "intertransformability", "noninterchangeability", "hyperpolysyllabically", "overintellectualizing", "nitrotrichloromethane", "dichlorodiphenyltrichloroethane", "chlorotrifluoroethylene", "anticonstitutionalism", "electrodiagnostically", "intellectualistically", "pentamethylenediamine", "hyperconstitutionalism", "psychophysiologically", "overindustrialization", "disestablishmentarian", "microspectrophotometric", "succinylsulfathiazole", "misapprehensiveranged", "electrophysiologically", "poliencephalomyelitis", "electroencephalographically", "diaminopropyltetramethylenediamine", "superincomprehensibleness", "demethylchlortetracycline", "electroencephalographic", "overcommercialization", "antinationalistically", "misapprehensiveranging", "diphenylaminechlorarsine", "isopropylideneacetone", "magnetohydrodynamically", "supercalifragilisticexpialidocious", "hexamethylenetetramine", "antidisestablishmentarianism", "electroencephalograph", "psychotherapeutically", "trichloronitromethane", "temperameperamentally", "superincomprehensible", "transcendentalization", "trifluorochloromethane", "electroencephalography", "hyperenthusiastically", "overindividualistically", "transubstantiationalist", "overimpressionableness", "dichlorodiphenyltrichloroethane", "microspectrophotometry", "pseudohermaphroditism", "pseudoanachronistical", "chlorprophenpyridamine", "pseudophilanthropical", "dichlorodifluoromethane", "dicyclopentadienyliron", "crossfertilizafiling", "pseudointellectually", "llanfairpwllgwyngyll", "electrometallurgical", "interdifferentiating", "phenylaceticaldehyde", "ophthalmodynamometer", "antimilitaristically", "noncannibalistically", "hydrodesulfurization", "proconstitutionalism", "microelectrophoretic", "tribromoacetaldehyde", "electrotherapeutical", "overenthusiastically", "overintellectualized", "pseudodemocratically", "anticapitalistically", "existentialistically", "palaeogeographically", "pseudoapologetically", "intercommunicability", "crystallographically", "rï¿¥ï¾¡ntgenographically", "uncharacteristically", "hyperdolichocephalic", "lymphogranulomatosis", "superconformableness", "hypersuggestibleness", "micropaleontological", "phenyldiethanolamine", "magnetohydrodynamics", "ethnomusicologically", "nonnationalistically", "indistinguishability", "nonimpressionability", "subdiaphragmatically", "institutionalization", "overmilitaristically", "pseudohermaphroditic", "superserviceableness", "electrosynthetically", "encephalographically", "neurophysiologically", "oversystematicalness", "nonimperialistically", "parathyroidectomized", "hypercholesterolemia", "microminiaturization", "nonanachronistically", "phototelegraphically", "nonmaterialistically", "palaeoclimatological", "electrocauterization", "electroballistically", "pseudoscientifically", "proindustrialisation", "polyvinylpyrrolidone", "incomprehensibleness", "nonreprehensibleness", "interdifferentiation", "nonindustrialization", "pseudolinguistically", "antienthusiastically", "counterrevolutionary", "incontrovertibleness", "anthropomorphization", "photophosphorylation", "roentgenographically", "internationalization"]

// save index state globally
var index = genIndex()

console.log("Init captcha.js");

document.addEventListener('init_captcha', function (e) {
  var imageUrl = genImageUrl();
  $('#image_' + e.detail).append( "<img src=\"" + imageUrl + "\"/>" );
});

// Initialize and render image
function init(id) {
  var imageUrl = genImageUrl();
  $('#image_' + id).append( "<img src=\"" + imageUrl + "\"/>" );
}

// Generate index for words array
function genIndex () {
  return Math.floor(Math.random() * (words.length+1))
}

// Generate image from dummyimage
function genImageUrl () {
  var word = genWord()
  return 'https://dummyimage.com/300x100&text=' + word
}

// Generate random word
function genWord () {
  return words[index]
}

// Do work after button is pressed
function buttonClick () {
  console.log('CLICKED')
  var word = $('.input').val()
  if (genWord() === word) {
    // SUCCESS
    $('.message').append( "Success!!! Congrats you're not a dumbass!" );
  } else {
    // FAILURE
    $('.message').append( "FAILURE!!! Fucking BOT!" );
  }
  // checkAgainst word generated
}