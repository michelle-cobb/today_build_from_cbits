app.actions.inputConversion = function(){

     _.each(_.uniq($('input[name="question"]')), function (element) {

        var content_to_replace, questionObject, pageContents, questionContents;

        questionObject = _.where(app.questions,{id:parseInt(element.value)})[0];

        pageContents = $("body").html();

        questionContents = app.views.assessmentQuestion(questionObject);

        content_to_replace = pageContents.replace(element,questionContents);

        $(element).replaceWith(questionContents);

    });
};

app.actions.timeToSeconds = function(time) {
    
    var hm = time.split(':');

    var seconds = (+hm[0]) * 3600 + (+hm[1]) * 60;

    return seconds;

};

app.actions.newContent = function () {

    $.each($('.widget'), function(i, el) {

        if(p.find('tools_accessed', {tool_id: $(el).attr('data-id')}).length > 0) {

            $(el).removeClass('new-content');

        }
    });

    $.each($('[name="nextButton"]'), function(i, el) {

        if(p.find('tools_accessed', {tool_id: $(el).attr('data-goto')}).length > 0) {

            $(el).removeClass('new-button-content');

        }

    });
    
}

app.actions.highlightDailyReview = function() {

    var today = moment();
        
    var todayAtSeven = moment().hours(10).minutes(0);

    if(p.find('tools_accessed', {tool_id: '2004'}).length > 0){

        var lastAccessed = new Date(_.last(p.find('tools_accessed', {tool_id: '2004'})).timestamp);
        
        lastAccessed = moment(lastAccessed);

        if(lastAccessed.diff(today, 'days') == 0){
            
            app.highlightAfterSeven(today, todayAtSeven);

        }
    }

    else {

        app.highlightAfterSeven(today, todayAtSeven);

    }

}

app.highlightAfterSeven = function(now, seven) {

    if(now > seven){
                
        return 'new-content';

    }

    else {

        return '';

    }

}

app.actions.highlightMoodRater = function(){
    
    if(p.find('tools_accessed', {tool_id: '1180'}).length == 0){
        
        return 'new-content';
    }

    else {

        var lastAccessed = new Date(_.last(p.find('tools_accessed', {tool_id: '1180'})).timestamp);
        
        lastAccessed = moment(lastAccessed);
        
        var today = moment();
        
        if(lastAccessed.diff(today, 'days') > 0){

            return 'new-content';
        }    
        
        else {
        
            return '';
        }
    }
}

app.highlightFromNesting = function(array_of_ids){

  //get array of all widgets that are children of main page widget
  var widgets = [];

  $.each(array_of_ids, function(i, array_id){
    
    widgets.push(_.where(appContent, {id: parseInt(array_id)})[0]);
  
  });
  
  //filter array by which child widgets are potentially showable
  var visibleWidgets = [];
  
  $.each(widgets, function(i, widget){
        if (app.dayInTreatment() >= widget.days_in_treatment) {
          
          visibleWidgets.push(widget);
        }

  });

  //check if any of these filtered widgets have been accessed
  var highlightTool = '';
  
  $.each(visibleWidgets, function(i, widget){
    
    if(_.where(p.find('tools_accessed', {tool_id: widget.id}).length == 0)) {
      
      highlightTool = 'new-content';
    
    }
  
  });

  // return string
  return highlightTool;
}

app.actions.default = function (targetDiv) {
    var switchDiv = targetDiv || "body";
    app.actions.inputConversion();
    app.actions.saveButton(switchDiv);
    app.actions.nextButton(switchDiv);
    app.actions.homeButton();
    app.actions.backButton();

    $('input:radio', 'input:checkbox', 'input:text','select').trigger('create');
    
    app.actions.newContent();

    $(".widget").on("click", function (ev) {

        window.location.hash = "#/general/"+ev.currentTarget.dataset.id;

        p.save('tools_accessed', {tool_id: ev.currentTarget.dataset.id});

    });

    $("[name='nextButton']").on("click", function (ev) {

        p.save('tools_accessed', {tool_id: ev.currentTarget.dataset.goto});

    });

};
