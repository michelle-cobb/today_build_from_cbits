app.views.assessmentQuestion = function(object){

currentQuestionCounter = "";
var element = object;
 switch (element.type) {

    case "radio":
        currentQuestionCounter++;
        return app.views.forms.radio(element, currentQuestionCounter);
        break;
    case "text":
        currentQuestionCounter++;
        return app.views.forms.text(element, currentQuestionCounter);
        break;
    case "number":
        currentQuestionCounter++;
       return app.views.forms.text(element, currentQuestionCounter);
        break;
    case "checkbox":
        currentQuestionCounter++;
        return app.views.forms.checkbox(element, currentQuestionCounter);
        break;
    case "slider":
        currentQuestionCounter++;
        return app.views.forms.slider(element, currentQuestionCounter);
        break;
    case "select":
        currentQuestionCounter++;
        return app.views.forms.select(element, currentQuestionCounter);
        break;
	case "time":
        currentQuestionCounter++;
        return app.views.forms.time(element, currentQuestionCounter);
        break;
    default:
        return app.views.tag(element.type, element.content);
        break;

}


};

app.views.assessmentPage = function (assessment_page_array,assessment_page_name, assessment_index) {

    var page_content = "";

    var currentQuestionCounter = "";

    assessment_index = assessment_index || 0;



    // console.log(assessment_page_array);
    // console.log(parseInt(assessment_index));
   assessment_page_array =  _.where(assessment_page_array, {page:parseInt(assessment_index)+1} );
   // console.log(assessment_page_array);
    _.each(assessment_page_array, function (element) {

            switch (element.type) {

            case "radio":
                currentQuestionCounter++;
                page_content += app.views.forms.radio(element, currentQuestionCounter);
                break;
            case "text":
                currentQuestionCounter++;
                page_content += app.views.forms.text(element, currentQuestionCounter);
                break;
            case "number":
                currentQuestionCounter++;
                page_content += app.views.forms.text(element, currentQuestionCounter);
                break;
            case "checkbox":
                currentQuestionCounter++;
                page_content += app.views.forms.checkbox(element, currentQuestionCounter);
                break;
            case "slider":
                currentQuestionCounter++;
                page_content += app.views.forms.slider(element, currentQuestionCounter);
                break;
            case "select":
                currentQuestionCounter++;
                page_content += app.views.forms.select(element, currentQuestionCounter);
                break;
            default:
                page_content += app.views.tag(element.type, element.content);
                break;

            }

        });

    //add next button
    page_content += app.views.assessmentNextButton(assessment_page_name, parseInt(assessment_index) + 1,'Save and Continue');
    return '<div data-role="page" id="page' + assessment_page_name +'"> <form method="post" id="assessment">' + page_content + '</form></div>';
};

app.views.assessment_summary = function (report) {
    return "<div style='padding:1.5em'><h1>Screening Finished!</h1><br/>"+report+"</div>";
}


//VIEW ACTIONS
app.actions.assessmentPage = function (assessment_object,assessment_name,currentPageIndex) {
    var id;
    var label_text;
    var score = "";
    // console.log(app.config.surveyOrder[currentPageIndex].scoring)
    
    
    $('#assessmentNextButton').on("click", function (ev) {
        ev.preventDefault();

        if($('input[type="radio"]').length > 0 && $('input[type="radio"]:checked').length == 0 ) {
           var modalContent = "<h3>You must select a response to continue</h3><a href='#' class='simplemodal-close' style='float:right;' >close</a>";
            $.modal(modalContent);
        }
        else if($('input[type="checkbox"]').length > 0 && $('input[type="checkbox"]:checked').length == 0 ) {
            var modalContent = "<h3>You must select a response to continue</h3><a href='#' class='simplemodal-close' style='float:right;' >close</a>";
            $.modal(modalContent);
        }
        else {
            id = $(':checked').attr('id') || '';
            label_text = $('[for='+id+']').text();

            if($('input[type="radio"]:checked').length > 0){
                score = parseInt(_.last($('input[type="radio"]:checked').attr("id").split("-")));
            }

            app.actions.saveAssessmentItem(assessment_name,currentPageIndex,$("#assessment").serializeArray(), {label: label_text, question_score: score});

            if (parseInt(ev.currentTarget.dataset.goto) < assessment_object.length) {

                var next_page_idx = parseInt(ev.currentTarget.dataset.goto);

                window.location.hash="#/assessment/" + assessment_name + "/" + next_page_idx ;

            } else {
                //app.actions.saveCompleteAssessment(assessment_name,app.values.currentAssessmentGuid);
                app.actions.scoreAssessments("assessment_"+assessment_name, app.values.currentAssessmentGuid);
            }
        }
    });
     if ($.mobile){
            $("#page" + assessment_name).page();
            $("#page" + assessment_name).show();
        }
    

}

app.values.currentAssessmentGuid = "";


// form_contents is assumed to be an array of objects
app.actions.saveAssessmentItem = function (assessment_id,index,form_contents, options){
    
    var object; 

    if (index == null) {
        app.values.currentAssessmentGuid = guid();
        _.each(form_contents, function(element) {
            element.question_id = 1;
            if(options.question_score !== ""){
                element.question_score = options.question_score;
            }
        });
        
        var responses_with_question_id = form_contents;
        p.save("assessment_"+assessment_id, {guid: app.values.currentAssessmentGuid, responses: responses_with_question_id});
        PurpleRobotClient.emitReading('Assessment',{name:'Saved Assessment',response:{id:assessment_id,guid: app.values.currentAssessmentGuid, responses: responses_with_question_id}});

    }

    else {
        object = p.find("assessment_"+assessment_id, {guid: app.values.currentAssessmentGuid})[0] || _.last(p.find("assessment_"+assessment_id));

        _.each(form_contents, function (element){
            element.question_id = parseInt(index)+1;
            if(options.length > 0 && (element.question_id == 12 || element.question_id == 13 || element.question_id == 14)) {
                element.label_text = options;
            }
            
            if(options.question_score != ""){
                element.question_score = options.question_score;
            }
            
            object.responses.push(element);
        });
        
        p.update("assessment_"+assessment_id, {guid: object.guid, id:object.id, responses: object.responses, timestamp: object.timestamp});
        PurpleRobotClient.emitReading('Assessment',{name:'Updated Answers',response:{id:assessment_id, id:object.id, responses: object.responses, timestamp: object.timestamp}});

    }

}


app.actions.scoreAssessments = function (assessment_name, guid, options) {

    switch (assessment_name) {
   
    case "assessment_1180":


    //     var options = options || {}, score= 0;
    //     options.cutoff = options.cutoff || 12,
    //     options.question_list = options.question_list || $("[name^=EPDS]:checked"),
    //     options.score_report = options.score_report || "";

    //     _.each(options.question_list, function (element) {
    //             score += parseInt($(element).val());
    //         });

    //     if (score< options.cutoff ) {
         
    // //TODO: TURN APP SCORE REPORT INTO AN ARRAY OF OBJECTS WITH SPECIFIC SCORES
    //         app.score_report += "<h2>EPDS Score</h2>" + score;
    //         window.location.hash = "#/assessment_summary";

    //     } else {
    //         app.score_report += "<h2>EPDS Score</h2>" + score;
    //         window.location.hash = "#/assessment/" + next_page_idx;
    //     }

    var coping_cards =  pound.find('situation_based_coping_cards');

    var latest_response = pound.find('assessment_1180')[pound.find('assessment_1180').length-1];

    var latest_response_set = {};

    latest_response_set['feeling'] = latest_response.responses[1].value;
    latest_response_set['withPerson'] = latest_response.responses[2].value;
    latest_response_set['conversationType'] = latest_response.responses[3].value;
    latest_response_set['location'] = latest_response.responses[4].value;
    latest_response_set['physicalEffort'] = latest_response.responses[5].value;

    var coping_messages = [];

    _.each(coping_cards, function(coping_card){

        var coping_card_true = false;

        _.each(['feeling','withPerson','conversationType','location','physicalEffort'], function(label){


            if (coping_card[label] == latest_response_set[label]){
                coping_card_true = true;
            }

        })

        if (coping_card_true){
            coping_messages.push(coping_card.message);
        }

    });

    if (coping_messages.length > 0){

        var content ='<h5>You made a coping card for this!</h5>';

        _.each(coping_messages, function(el){
           content += '<p>' + el + '</p>';

        })


        content += '<a onclick="app.actions.moodRater(\''+assessment_name+'\',\''+guid+'\',\''+options +'\')" class="btn">Finish!</a>';

        $("#mainContainer").html('<div style="border-radius:15px; background:#1e497c; color:white; margin:5%; padding:20px;">' + content + '</div>');



    }

    else{

        app.actions.moodRater(assessment_name, guid, options);

    }




        break;



    }
};

// Options can either be passed a Question Data Label or a Question ID
// if null value for guid is passed in, guid defaults to last assessment recorded for tool
// if Question Id is passed in, it is assumed that it will return a single parseable response object 
var score = function(tool_id, options, guid){
    var assessment = p.find(tool_id, {guid: guid})[0] || _.last(p.find(tool_id));
    var response;
    var value;

    if (_.isString(options)) {
        response = _.where(assessment.responses, {name: options})[0];
    }

    else {
        response = _.where(assessment.responses, {question_id: options})[0];
    }

    return response.value;

};

var goToAndPlayId =  function(array_of_ids){
    var page = array_of_ids[Math.floor(Math.random()*array_of_ids.length)];
    app.actions.goTo("", page, app.contents)

};

//return boolean value from assessment response
var parsedValue = function(string_with_int){
    var question_score = parseInt(_.last(string_with_int.split("-")));
    return question_score > 2;
}


