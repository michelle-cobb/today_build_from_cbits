//VIEWS

app.views.nextButton = function(id,label,days_in_treatment){
    
        
    // if (app.dayInTreatment() >= days_in_treatment && days_in_treatment != "") {
    //     return '<input type="button" class="btn btn-warning new-button-content" name="nextButton" value="'+label+ '#' + id+'"/>'
    // }
    // else {
    //     return '';
    // }

    //Comment the above code and uncomment below to turn off time-based rules
    
    return '<input type="button" class="btn new-button-content" name="nextButton" value="'+label+ '#' + id+'"/>'

}

app.views.renderedNextButton = function (text, actionClass, actionId) {

    return '<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right" data-inline="true" class="' + actionClass + '" data-goto="' + actionId + '">' + text + '</a>'
}

app.views.assessmentNextButton = function(id,idx,label){
    // return '<input type="button" class="btn"  name="assessmentNextButton" value=" '+label+' &gt;" data-idx="'+idx+'"  data-id="'+id+'"/>'
return '<a href="#" name="assessmentNextButton" class="btn" id="assessmentNextButton" data-role="button"' +'data-goto="'+idx+'"  data-id="'+id+'">' +label+ '</a>'
}

app.views.lessonNextButton = function(id,idx,label){
        return '<input class="btn" type="button" style="float:right; min-width: 28%;margin-top: 26px;margin-right: -18px;" name="lessonNextButton" value="'+label+' &gt;" data-idx="'+idx+'"  data-id="'+id+'"/>'
}

app.views.lessonBackButton = function(id,idx,label){
        return '<input class="btn" type="button"  style="float:left;%;min-width:28%;margin-top: 26px;margin-left: -18px;" name="lessonBackButton" value="&lt; '+label+' " data-idx="'+idx+'"  data-id="'+id+'"/>'
}

app.views.lessonFinishButton = function(label){
        return '<a href="index.html"><input type="button" class="btn" value="'+label+'" style="float:right; min-width: 28%;margin-top: 26px;margin-right: -18px;" name="lessonFinishButton"/></a>'
}

app.views.renderTimer = function() {

    $('.content_panel').append('<input type="button" class="btn btn-warning timer" style="background-color:#f0ad4e;" value="Start Timer"/>');

    $('.timer').on("click", function (ev) {
        var that = $(this);
        var timer;

        var modal_content = '<img class="tossing fist-time" src="images/fist.jpg"/>';
        
        $.modal(modal_content, {containerCss:{"background":"none", "border":"none"}});
        
        that.val("Timer Started");
        
        setTimeout(function(){
            that.val("Finished!");
            that.off('click');
            $.modal.close();
        }
        ,60000);

        $(window).on('hashchange', function() {
            clearTimeout(that);
        });

    });

}

app.views.panel = function (panelLabel) {


    var panelHtml = "",
        rowCache = "",
        action = "";

    panelLabel = panelLabel || "home";
    panelObject = _.where(app.contents, {
        label: panelLabel
    });


    var panel = panelObject[0] || panelObject;
    panel.contents = _.where(app.contents, {
        showonpanel: panelObject[0].label
    });


    var width_counter = 0;
    var widget_view = "";
    var panelHtml = '<div class="row-fluid">';
    _.each(panel.contents, function (i) {


        widget_view = app.views.widget({
            // styles: i.styles,
            days_in_treatment: i.days_in_treatment,
            pretty_name: i.pretty_name,
            icon: i.icon,
            color: i.color,
            size_width: i.size_width,
            size_height: i.size_height,
            id: i.id,
            image: i.image,
            topic_membership_id: i.topic_membership_id
        });
        width_counter++;
        
        //Comment out to remove time-based rules

        // if (app.dayInTreatment() >= i.days_in_treatment) {

        //     panelHtml += "<div class='col-sm-4 col-xs-4 col-md-4'>" + widget_view + "</div>"

        // }

        //Comment the following out if you wish to resintitute the time-based rules

        panelHtml += "<div class='col-sm-4 col-xs-4 col-md-4'>" + widget_view + "</div>"
    
    if (width_counter % 3 == 0){
        panelHtml += '</div><div class="clearfix visible-sm visible-xs visible-md"></div><div class="row-fluid">';
    }
  
    });

    panelHtml = '<div class="panel" style="background:none !important;">' + panelHtml + '</div>';
    return panelHtml;
};



app.views.widget = function (widget_options) {
    var widget_html,
        options = {};
    options.days_in_treatment = widget_options.days_in_treatment;
    options.name = widget_options.pretty_name || "no name";
    options.icon = widget_options.icon || "";
    options.image = widget_options.image || "";
    options.size_width = widget_options.size_width || 1;
    options.size_height = widget_options.size_height || 1;
    options.id = widget_options.id || "";
    options.topic_membership_id = widget_options.topic_membership_id || "";
    options.color = app.topics.color(options.topic_membership_id, widget_options.color);
    options.styles = widget_options.styles || "";

    widget_html = '<div class="btn widget size_height15 new-content" data-id = "' + options.id + '" style="background-color:' + options.color + ';' + options.styles + '">';
    
    widget_html += '<i style="color:white; font-size:3em;" class="' + options.icon + '">' + options.image + '</i>';
    
    widget_html += '<h3>' + options.name + '</h3></div>';
    
    return widget_html;

}


app.views.page = function (string, page_id) {

    return '<div data-role="page" id="page' + page_id + '" class="assessment-page">' + string + '</div>'

};


app.views.tasks = function(tasks){

    var content = '';

    content += '<h3>Your tasks</h3>';

    if (tasks.newCopingCard == true){
    content += '<div class="tasks-panel">';
    content += '<h4>New Coping Card!</h4><a href="index.html#/general/1288" class="btn">Start Now!</a>';
    content += '</div>';
    }

    if (tasks.newScheduledActivity == true){
    content += '<div class="tasks-panel">';
    content += '<h4>New Activity!</h4><a href="index.html#/general/2112" class="btn">Start Now!</a>';
    content += '</div>';
    }

    if (tasks.newDailyReview == true){
    content += '<div class="tasks-panel">';
    content += '<h4>New Daily Review!</h4><a href="index.html#/general/2004" class="btn">Start Now!</a>';
    content += '</div>';
    }

    if (tasks.newDailyScoop == true) {
    content += '<div class="tasks-panel">';
    content += '<h4>New Daily Scoop!</h4><a href="index.html#/general/1723" class="btn">Start Now!</a>';
    content += '</div>';
    }

    if (tasks.newMoodRater == true){
    content += '<div class="tasks-panel">';
    content += '<h4>New Mood Rater!</h4><a href="index.html#/general/1180" class="btn">Start Now!</a>';
    content += '</div>';
    }


    return '<div class="container">' + content + '</div>'
}


app.views.home = function(){

    var content = '';
    var default_content = '<div class="container"><img src="images/logo.png" style="width:100%;" ><br/><div class="widget size_height2 '+app.highlightFromNesting(app.utility.dailyScoopArrayOfIds)+'" data-id="1723" style="width:45%; background-color:#094399;font-size:150%;"><i class="icon-lightbulb"></i><h3>Daily Scoop</h3></div><div class="widget size_height1 '+app.actions.highlightMoodRater()+'" data-id="1180" style="background-color:#00879D; width:21%; height:95px;"><i class="icon-dashboard"></i><h3>Mood Rater</h3></div><div class="widget size_height1 '+app.actions.highlightDailyReview()+'" data-id="2004" style="background-color:#53003E; width:20.5%; height:95px;"><i class="icon-edit"></i><h3>Daily Review</h3></div><div class="widget size_width2 size_height1 '+app.highlightFromNesting(app.utility.toolArrayOfIds)+'" data-id="1719" style="width:44%;background-color:#FF6700;height:95px;"><i class="icon-briefcase"></i><h3>Toolbox</h3></div><div class="widget size_width1 size_height1" data-id="1908" style="background-color:#229E7C;"><i class="icon-bar-chart"></i><h3>Graphs</h3></div><div class="widget size_width1 size_height1" data-id="1729" style="background-color:#E56284;"><i class="icon-star"></i><h3>Inspiration</h3></div><div class="widget size_width1 size_height1" data-id="1733" style="background-color:orange;"><i class="icon-group"></i><h3>Community Support</h3></div><div class="widget size_width1 size_height1" data-id="1725" style="background-color:#663796;"><i class="icon-question-sign"></i><h3>Resources and Info</h3></div><div class="widget size_width1 size_height1" data-id="1726" style="background-color:#59A2FF;"><i class="icon-user"></i><h3>Contact Your Coach</h3></div><div class="widget size_width1 size_height1" data-id="1727" style="background-color:#A32638;"><i class=""><img src="images/icons/24-7.png"></i><h3>Lifesaver</h3></div></div>';

    var beforeNow = function(timestamp){
        return (moment() > moment(timestamp))
    }


    var getActivities = function(){
        var rawActivities = JSON.parse(localStorage['activity_tracker']);

        var cleanActivities = [];
        _.each(rawActivities, function(el,idx){
            if(beforeNow(el.timestamp) && el.viewed != true){        

                cleanActivities.push(el);debugger;
                rawActivities[idx].viewed = true;
            }
        })


        localStorage['activity_tracker'] = JSON.stringify(rawActivities);
        return cleanActivities
    }

    var getCopingCards = function(){
        var rawCopingCards = JSON.parse(localStorage['time_based_coping_cards']);
                var cleanActivities = [];
        var cleanCopingCards = [];
        _.each(rawCopingCards, function(el,idx){

            if(beforeNow(el.timestamp) && el.viewed != true){
                cleanCopingCards.push(el);
                rawCopingCards[idx].viewed = true;
            }
        })

        localStorage['time_based_coping_cards'] = JSON.stringify(rawCopingCards);
        return cleanCopingCards
    }

//    app.actions.highlightMoodRater == 'new-content' || app.actions.highlightDailyReview == 'new-content' || app.highlightFromNesting(app.utility.dailyScoopArrayOfIds) == 'new-content' ||
debugger;
    if ( getActivities().length > 0 || getCopingCards().length > 0){

        var tasks = {};
        // tasks.newDailyScoop = app.highlightFromNesting(app.utility.dailyScoopArrayOfIds) == 'new-content';
        // tasks.newMoodRater = app.actions.highlightMoodRater == 'new-content';
        // tasks.newDailyReview = app.actions.highlightDailyReview == 'new-content';

        tasks.newDailyScoop = app.highlightFromNesting(app.utility.dailyScoopArrayOfIds) == false;
        tasks.newMoodRater = app.actions.highlightMoodRater == false;
        tasks.newDailyReview = app.actions.highlightDailyReview == false;

        tasks.newScheduledActivity = getActivities().length > 0;
        tasks.newCopingCard = getCopingCards().length > 0;
        tasks.scheduledActivities = getActivities();
        tasks.copingCards = getCopingCards();

        return app.views.tasks(tasks);

    } else {
        content = default_content;

    }

    return content

}
