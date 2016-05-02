
//REMOVE JQUERY MOBILE EVENT MANAGEMENT
//
if ($.mobile){
	$.mobile.ajaxEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.hashListeningEnabled = false;
	$.mobile.pushStateEnabled = false;
};


var app = {};

app.contents = appContent;
app.questions = questionContent;

app.defaults = {};
app.defaults.startPanel = "home";
app.defaults.container = "#mainContainer";

app.config = {};
app.config.intervention_title = "TODAY!";
app.config.max_discrete_responses = 40;

app.config.currentPage = 0;

app.defaults.startDate = function(){

    var month = Date.today().getMonthName();

    var day = Date.today().getDayName();

    var day_of_month = Date.parse('today', "d");
    
    var year = Date.today().getYear();

    var start_date = new Date();
    start_date.setMinutes(0);
    start_date.setSeconds(0);
    
    p.save("start_date", {month: month, day: day, year: year, date: start_date.getTime()});
};

app.panels = _.where(app.contents, {
    element_type: "panel"
});

app.views = {};
app.actions = {};
app.utility = {};
app.values = {};