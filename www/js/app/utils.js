//UTILITY FUNCTIONS
//

app.utility.clearTag = function (tag, string) {
    var openTag = '<' + tag + '>';
    var closeTag = '</' + tag + '>';

    string = string.replace(openTag, '');
    string = string.replace(closeTag, '');

    return $.trim(string);
}

app.views.tag = function (tag, contents) {

    return '<' + tag + '>' + contents + '</' + tag + '>';

};


app.topics = _.where(app.contents, {
    element_type: "topic"
});

app.styleChecks = function(){
  // $('[type="checkbox"]').addClass("pull-left check");
  // $('label').addClass("check-label");
}

app.styleRadio = function(){
  $('[type="radio"]').addClass("larger pull-left check");
  $('label').addClass("check-label");
}

app.topics.color = function (topic_membership_id, fallback_color) {
    if (topic_membership_id != "") {
        return _.where(app.topics, {
            id: topic_membership_id
        })[0].color || "gray"
    } else {
        return fallback_color || "gray"
    };
}

//Get random element from array
var randomClass = function(array) {

  return array[Math.floor(Math.random() * array.length)];

}

//GUID generation
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

function validateSocialSupportForm() {
  
  if($('input[type="radio"]:checked').length >= 3){
    $('.btn').removeAttr("disabled");
  }
  
  $('input').on('click', function (ev){
    
    //enables button if form is valid, else refreshes event listener
    validateSocialSupportForm();

  });
}

app.dayInTreatment = function() {

  var start_date = p.find("start_date")[0];

  var current_day_in_treatment = Math.ceil(($.now()/(8.64e+7) - start_date.date/(8.64e+7)));

  return current_day_in_treatment;

}

var getModalContent = function (element) {
  
  return app.utility.helpText[element];

}

app.utility.dailyScoopArrayOfIds = ["1709", "1710", "1713", "1714", "1716", "1717"];

app.utility.toolArrayOfIds = ["1722", "1281", "1422", "1284", "1286", "1288", "1287", "1575"];

app.utility.helpText = {
  situation_help: "<p>Situations are the events that occur in our lives. They are the <strong>WHO</strong>, the <strong>WHAT</strong>, the <strong>WHERE</strong>, and the <strong>HOW</strong></p>",
  emotion_help: "<p>Feelings are <strong>emotions</strong>, like happiness, sadness, worry, guilt, or boredom</p>",
  thought_help: "<p>Thoughts are the words, beliefs, or images that go through our minds</p>",
  "automaticThought-0_help": "<p>Filtering is when you ignore, or downplay the positive things that happen in your life</p>",
  "automaticThought-1_help": "<p>Mind Reading is when you assume you know what another person is thinking or feeling -- as if you can read that person's mind!</p>",
  "automaticThought-2_help": "<p>Emotional Reasoning is when you mistake your emotions for facts, instead of focusing on the actual facts of the situation</p>",
  "automaticThought-3_help": "<p>'Should' statements set strict, rigid expectations for yourself and others using the words 'should' or 'must'</p>",
  "automaticThought-4_help": "<p>Labeling is judging a <em>whole person</em> based on a behavior or situation</p>",
  "automaticThought-5_help": "<p>Magnification is when you exaggerate or magnify negative information or experiences</p>",
  "automaticThought-6_help": "<p>Fortune Teller Error is when you make assumptions about your future as if you were a fortune teller</p>",
  "automaticThought-7_help": "<p>Overgeneralizing is when you assume that just because something happened once, it will continue to happen. Using words like <strong>'all'</strong>, <strong>'never'</strong>, or <strong>'always'</strong> are signs that you are <strong>Overgeneralizing</strong></p>",
  "automaticThought-8_help": "<p>Personalizing is when we take responsibilty for things that we cannot control</p>",
  "automaticThought-10_help": "<p>Black-and-White Thinking is <strong>extreme</strong> -- things are either completely good or completely bad, all right or all wrong, all or nothing, or black or white</p>"
}