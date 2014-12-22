//START FUNCTIONS
app.mobile = {};
app.mobile.scrollToTop = function() {
    $(window).scrollTop(0);
}

app.views.logic = function(id, options){

    switch(true){
        //Goal Tracker Views -- only include here if there is any view logic
        case (id == 1763 || id == 1764 || id == 1765 || id == 1924 || id == 1770):
            app.views.goalTracker(id);
            break;

        // Thought Record Views
        case (id == 1381 || id == 1928):
            app.views.thoughtRecord(id);
            break;

        // Coping Card Views
        case (id == 1328 || id == 1720):
            app.views.copingCard(id);
            break;

        // Problem Solver Views
        case (id == 1456 || id == 1745 || id == 1956):
            app.views.problemSolver(id);
            break;

        // Graphs
        case (id==1908 || id==1958):
            app.views.graphs(id);
            break;
        // Responsibility Pie
        case (id==1900 || id==1901):
            app.views.responsibilityPie(id);
            break;

        // Activity Tracker
        case (id==2084 || id==2085 || id==2111 || id==2112 || id==2113):
            app.views.activityTracker(id);
            break;


        // Coming Out
        case(id==2043 || id==2101 || id==2103 || id==2106 || id==2209 || id==2210 || id==2211 || id==2212 || id==2213 || id==2108):
            app.views.comingOut(id);
            break;

        //trap
        case (id == 1575 || id == 1959 || id == 1637):
            app.views.trap(id);
            break;




    }


}

app.actions.logic = function(id, options){

    var page = options.idx;

    switch(true){

        //Graphs
        case (id==1908):
            app.actions.graphs(id);
            break;

        //Goal Tracker actions
        case (id == 1763 || id == 1764 || id == 1766 || id == 1924 || id == 1770 || id == 1927):
            app.actions.goalTracker(id);
            break;

        //Thought Record actions
        case (id == 1381 || id ==1388 || id==1376):
            app.actions.thoughtRecord(id);
            break;

        //Coping Card actions
        case (id == 1312 || id == 1319 || id == 1720):
            app.actions.copingCard(id);
            break;

        //Social Support actions
        case (id == 1460 || id == 1461 || id == 1462 || id ==1463):
            app.actions.socialSupport(id);
            break;

        // Positive Activities checklist
        case (id == 1392 || id == 1397 || id == 1404 || id == 1413 || id == 1417 || id == 1419 || id == 1923):
            app.actions.positiveActivities(id);
            break;

        // Problem Solver actions
        case (id == 1423 || id == 1457 || id == 1743 || id == 1455 || id == 1456 || id == 1956):
            app.actions.problemSolver(id);
            break;

        // TRAP/TRAC
        case (id == 1959 || id == 1637):
            app.actions.trap(id);
            break;

        //Daily Review
        case(id == 2005 || id == 2006 || id == 2008 || id == 2009 || id == 2010 || id == 2011 || id == 2012 || id == 2013 || id == 2036 || id == 2037 || id == 2038 || id == 2039 || id == 2040 || id == 2041 ):
            app.actions.dailyReview(id);
            break;

        // Automatic Thoughts recap
        case (id == 968 && page == 10):
            app.actions.sequenceActions(id, page);
            break;

        // Avoidance Patterns/TRAP
        case (id == 968 && page == 10 ||
              id == 980 && page == 5  ||
              id == 980 && page == 3  ||
              id == 980 && page == 7  ||
              id == 981 && page == 1  ||
              id == 981 && page == 3  ||
              id == 981 && page == 5  ||
              id == 982 && page == 1  ||
              id == 982 && page == 3  ||
              id == 982 && page == 5):
            app.actions.sequenceActions(id, page);
            break;

        //Mood-driven behaviors
        case (id == 947 && page == 2 ||
              id == 947 && page == 3 ||
              id == 947 && page == 4 ||
              id == 947 && page == 5):
            app.actions.sequenceActions(id, page);
            break;

        //Timer Button
        case(id == 1801 || id == 1802 || id == 1803 || id == 1805 || id == 1806 || id == 1807 || id == 1808 || id == 1794 || id == 1960 || id == 1777 || id == 1789 || id == 1791):
            app.views.renderTimer();
            break;

        //Social Support lesson
        case(id==1282 && page == 1):
            app.actions.sequenceActions(id, page);
            break;

        //Responsibility Pie
        case(id==1784 || id==1900):
            app.actions.responsibilityPie(id);
            break;

        // Activity Tracker
        case (id==2085 || id == 2086):
            app.actions.activityTracker(id);
            break;

                // Coming Out
        case (id == 2061 || id == 2063 || id == 2128 || id == 2099 || id == 2101 || id == 2103 || id == 2106 || id==2108 || id==2114):
            app.actions.comingOut(id);
            break;
    }
}


app.buildAndPlay = function (switchDiv, content_to_display,options) {
    options = options || {};
    $(switchDiv).html(app.header(options) + content_to_display);
    app.views.logic(app.config.currentPage, options);
    app.actions.default(switchDiv);
    app.actions.logic(app.config.currentPage, options);
    app.mobile.scrollToTop();
};


app.header = function(options){

 var header = "";
 if(options.show_logo == 1){header += "<img src='images/logo.png' style='width:100%;' ><br/>"};
 if(options.hide_home_button == 0){header += "<div class='home-button'><a href='#/'><i class='icon-home icon-4x'></i></a></div>"};
 return header

}


app.start = function (targetDiv,label) {
    if(p.find("start_date").length == 0) {
        app.defaults.startDate();
    }
    $(targetDiv).html(app.views.home);
    app.actions.default(targetDiv);

};

app.Router = Backbone.Router.extend({

routes:{
    "":"index",
    "index":"index",
    "slide/:id":"slide",
    "panel/:id":"panel",
    "question_group/:id":"question_group",
    "lesson/:id/:idx":"lesson",
    "topic/:id":"topic",
    "general/:id":"general",
    "assessment/:id/:idx":"assessment"
},

home: function(){
    app.start(app.defaults.container);
},
index: function(){
    app.start(app.defaults.container);
},
slide: function(id){

    app.actions.goTo(app.defaults.container, id, app.contents);
},
panel: function(id){

    app.actions.goTo(app.defaults.container, id, app.contents);
},
question_group: function(id){
    app.actions.goTo(app.defaults.container, id, app.contents);
},
lesson: function(id,idx){
    app.actions.goTo(app.defaults.container, id, app.contents, {idx:idx});
},
topic: function(id){

    app.actions.goTo(app.defaults.container, id, app.contents);
},
general: function(id){

    app.actions.goTo(app.defaults.container, id, app.contents);
},
assessment: function(id,idx){
    //TODO, TURN ASSESSMENTS INTO XELEMENTS INSTEAD OF INCLUDED JS
    app.actions.goTo(app.defaults.container, id, app.contents, {idx:idx});
},
assessment_summary: function (){

    $(app.defaults.container).html(app.views.assessment_summary(app.score_report));
}


});
