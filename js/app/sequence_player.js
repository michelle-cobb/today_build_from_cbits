app.values.sequenceObject = {};
app.actions.sequencePlayer = function (appContents,targetDiv){

    console.log($(targetDiv).find("button"));

    //if that is not empty don't show the bottom
    $('input:button[name="lessonNextButton"]').on("click", function(ev){

        // app.actions.goTo(targetDiv,ev.currentTarget.dataset.id,appContents,{idx:ev.currentTarget.dataset.idx});
        window.location.hash = "#/lesson/"+ev.currentTarget.dataset.id+"/"+ev.currentTarget.dataset.idx;

        });
    
    $('input:button[name="lessonBackButton"]').on("click", function(ev){

        // app.actions.goTo(targetDiv,ev.currentTarget.dataset.id,appContents,{idx:ev.currentTarget.dataset.idx});
        window.location.hash = "#/lesson/"+ev.currentTarget.dataset.id+"/"+ev.currentTarget.dataset.idx;

        });

}

app.views.sequencePlayer = function (sequenceObject, appContents, index) {
    console.log(sequenceObject.element_list);

    var idx = parseInt(index) || 0,
        array_of_ids = sequenceObject.element_list.split(",");
        array_of_objects =[],
        content_response = {},
        content_response.content = "";
        current_slide = "";


    _.each(array_of_ids, function(element, iterator){
        array_of_objects[iterator]= _.where(appContents, {id:parseInt(element)})[0];
    });


    content_response.content += '<div class="header">';
    

    content_response.content += '</div><div class="content_panel" id="lesson" data-idx="'+ idx +'" data-parent-id="'+ sequenceObject.id +'" data-id="'+ array_of_objects[idx].id+'">' +array_of_objects[idx].main_content;

    if (array_of_objects[idx].main_content.search('type="button"') == -1) {
        if (idx > 0){
            content_response.content += app.views.lessonBackButton(sequenceObject.id,idx-1,"Back");
        }
        if (idx < array_of_objects.length-1){
            content_response.content += app.views.lessonNextButton(sequenceObject.id,idx+1,"Next");
        }

        if (idx == array_of_objects.length-1) {
            content_response.content += app.views.lessonFinishButton("Finish");
        }

    }
    content_response.content +='</div>';
    console.log(idx, array_of_objects.length);

    return content_response;


};

var saveTriggers = function(triggerType, hash){
    $('#lesson').append("<input type='button' class='btn' id='save-button' value='Save' style='float: right; min-width: 28%; margin-top: 26px; margin-right: -18px;'>");
    app.values.sequenceObject = _.last(p.find("traps"));
    
    $('[value="Next >"]').hide();
    
    var valid = false

    $('#save-button').on("click", function(){
        $.each($('input[type="text"]'), function() {
            if(this.value != ""){
                valid = true;
            }
        });
        if(valid) {
            app.values.sequenceObject[triggerType] = $('input[type="text"]').serializeArray();
            p.update("traps", app.values.sequenceObject);
            window.location.hash = hash;      
        }
        else {
            $.modal('<h1>You must input a selection before continuing</h1><i class="icon-check icon-2x simplemodal-close" style="position:absolute;bottom:10px;"> Close</i>');
        }          
    });
}

var saveAvoidance = function(driver, hash){

    $('#lesson').append("<input type='button' class='btn' id='save-button' value='Save' style='float: right; min-width: 28%; margin-top: 26px; margin-right: -18px;'>");
    $('[value="Next >"]').hide();
    $('#save-button').on("click", function(ev){
        if ($(':checked').length > 0){
            app.values.sequenceObject.emotionType = driver;
            app.values.sequenceObject.avoidancePatterns = $(':checked').serializeArray();
            p.save("traps", app.values.sequenceObject);
            window.location.hash = hash;
        }
        else {
            $.modal('<h1>You must make a selection before continuing</h1><i class="icon-check icon-2x simplemodal-close" style="position:absolute;bottom:10px;"> Close</i>');
        }                
    });
}

app.actions.sequenceActions = function(id, index) {
    app.values.sequenceObject = {};
    app.values.sequenceObject.traps = [];

    switch(true) {
        case (id == 968 && index == 10 ||
              id == 980 && index == 5  ||
              id == 981 && index == 3  ||
              id == 982 && index == 3):   
            
            var thoughts = [];
            thoughts = p.find("thoughts") || [];
            
            if ( id == 968 && index == 10) {
                if (thoughts.length > 0){
                    $("ul#today-list").html("");
                    _.each(thoughts, function(el, idx){

                        $("ul#today-list").append("<li class="+el.emotion+"><dl class='today-description'><dt>Situation</dt><dd>"+el.situation+"</dd><dt>Thought</dt><dd>"+el.thought+"</dd><dt>Alternate Thought</dt><dd>"+el.alternateThought+"</dd></dl></li>");

                    });
                }
            }

            if(id == 980 && index == 5){

                saveTriggers("anxietyTriggers", "#/lesson/980/6");
                
            }

            if(id == 981 && index == 3){

                saveTriggers("sadnessTriggers", "#/lesson/981/4");

            }

            if(id == 982 && index == 3){
                
                saveTriggers("angerTriggers", "#/lesson/982/4");

            }
            break;

        case (id == 980 && index == 3):
           

            saveAvoidance("fear-driven", "#/lesson/980/4");

            break;

        case (id == 981 && index == 1):
            
            saveAvoidance("sadness-driven", "#/lesson/981/2");

            break;

        case (id == 982 && index == 1):
           
            
            saveAvoidance("anger-driven", "#/lesson/982/2");

            break;
        
        case (id == 980 && index == 7 || id == 981 && index == 5 || id == 982 && index == 5):
            app.actions.saveTraps(id, index);
            break;

        //sadness-driven behaviors checklist
        case (id == 947 && (index == 3 || 
                            index == 2 || 
                            index == 4 || 
                            index == 5)):
            app.actions.saveMoodDrivenBehaviors(id, index)
            break;

        //social support lesson
        case (id == 1282 && index == 1):
            
            $('[name="lessonNextButton"]').on("click", function(ev){

                app.values.supportLessonAssessment = {supportLessonAssessment: $('input[type="radio"]').serializeArray()};

                p.save('support_lesson_assessment', app.values.supportLessonAssessment);

            });

            break;

    }
}

app.values.triggerCount = 0;

app.actions.saveTraps = function(id, index){
    
    app.values.sequenceObject = _.last(p.find("traps"));

    switch(true){
    
    case(id == 980 && index == 7):
        var triggers = app.values.sequenceObject.anxietyTriggers || 0;
        var avoidancePatterns = app.values.sequenceObject.avoidancePatterns;

        if(app.values.triggerCount < triggers.length){
            
            buildTraps(triggers, avoidancePatterns, id, index);
        }
        
        else{
            
            buildTracs(app.values.sequenceObject.traps);

            app.values.triggerCount = 0;
            window.location.hash = "#/lesson/980/8";
        }        
        
        break;
    
    case(id == 981 && index == 5):
        var triggers = app.values.sequenceObject.sadnessTriggers || 0;
        var avoidancePatterns = app.values.sequenceObject.avoidancePatterns;
        
        if(app.values.triggerCount < triggers.length || 0){
            
            buildTraps(triggers, avoidancePatterns, id, index);
        }
        
        else{
            
            buildTracs(app.values.sequenceObject.traps);

            app.values.triggerCount = 0;
            window.location.hash = "#/lesson/981/6";
        }
        
        break;
    
    case(id == 982 && index == 5):
        var triggers = app.values.sequenceObject.angerTriggers || 0;
        var avoidancePatterns = app.values.sequenceObject.avoidancePatterns;
        
        if(app.values.triggerCount < triggers.length || 0){
            
            buildTraps(triggers, avoidancePatterns, id, index);
        }
        else{
            
            buildTracs(app.values.sequenceObject.traps);

            app.values.triggerCount = 0;
            window.location.hash = "#/lesson/982/6";
        }
        break;
    }
}
var buildTracs = function(traps){

    _.each(traps, function(trap){
        var trac = {};

        trac.avoidance_pattern = trap.avoidance_pattern;
        trac.response = trap.response;
        trac.trigger = trap.trigger;
        trac.consequence = trap.consequence;
        trac.guid = trap.guid;

        p.save("tracs", trac);

    });
}
//Recursive function that saves individual traps

var buildTraps = function(triggers, avoidancePatterns, id, index) {
          
    $('[name="trigger"]').val(triggers[app.values.triggerCount].value);
    $('[name="Avoidance"]').html("");
   $('[name="consequence"]').html("");
    _.each(avoidancePatterns, function(pattern){
        $('[name="Avoidance"]').append('<option>'+pattern.value+'</option>');
    });
    
    $('.btn').off("click");
    
    $('.btn').on("click", function(ev){

        app.values.sequenceObject.traps.push({
            guid: guid(),
            trigger: $('[name="trigger"]').val(), 
            response: $('#trapResponse option:selected').text(),
            avoidance_pattern: $('[name="Avoidance"] option:selected').text(),
            consequence: $('[name="consequence"]').val()
        });

        p.update("traps", app.values.sequenceObject);
        app.values.triggerCount++
        app.actions.saveTraps(id, index);

    });

}

app.values.moodObject = {};
app.actions.saveMoodDrivenBehaviors = function(id, index){
    switch(true){
        
        case (id == 947 && index == 2):
            app.styleChecks();

            $('[name="lessonNextButton"]').on("click", function(){
                app.values.moodObject.fearCount = $('input[type="checkbox"]:checked').length;

            });
            break;

        case (id == 947 && index == 3):
            app.styleChecks();
            
            $('[name="lessonNextButton"]').on("click", function(){
                app.values.moodObject.sadnessCount = $('input[type="checkbox"]:checked').length;

            });
            break;

        case (id == 947 && index == 4):
            app.styleChecks();

            $('[name="lessonNextButton"]').on("click", function(){
                app.values.moodObject.angerCount = $('input[type="checkbox"]:checked').length;
                debugger;
            });
            break;
          
        case (id == 947 && index == 5):
            var moodDriver = "";
            
            var fear = {type: "fear-driven", count: app.values.moodObject.fearCount}
            var sadness = {type: "sadness-driven", count: app.values.moodObject.sadnessCount}
            var anger = {type: "anger-driven", count: app.values.moodObject.angerCount}

            var driverArray = [fear, sadness, anger];

            var high_score_object = _.max(driverArray, function(driver){return driver.count});

            if(high_score_object.count === 0 || high_score_object === -Infinity) {
                moodDriver = "no";
            }
            else {

                var totalObjects = _.where(driverArray, {count: high_score_object.count});
                console.log(totalObjects);

                $.each(totalObjects, function(index, object){

                    moodDriver += object.type;

                    if(index + 1 < totalObjects.length) {
                        moodDriver += " and ";
                    }
                    else {
                        moodDriver += " "
                    }

                });
            }

            $('#highestSumCheckboxes').text(moodDriver);
            break;
    }
}








