app.values.goalTracker = {};

function setGoalTracker (elId) {
    app.values.goalTracker = p.find("goals", {id: elId})[0];
}

function clearGoalTracker () {
    app.values.goalTracker = {};
}

// GOAL TRACKER VIEW LOGIC CONTROLLED BY app.logic.views
app.views.goalTracker = function(id) {

    var not_completed_goals,
    completed_goals;

    not_completed_goals = p.find("goals",{completed: false, deleted: false}) || [];
    completed_goals = p.find("goals",{completed: true}) || [];

    switch(id){

        case 1763:

        var extra_completed_goals;

        if (not_completed_goals.length > 0){
            $("ul#notCompletedGoals").html("");
            _.each(not_completed_goals, function(el){
                $("ul#notCompletedGoals").append("<li><i id='goal"+el.id+"' style='float:left; margin-left: -20px;padding-right:20px;' class='formfield icon-hand-right icon-large' value='"+el.id+"'></i><label style='height:30px;width:80%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:100%; font-size:100%;' for='goal"+el.id+"' value='" + el.id + "'>" + el.goalLabel + "</label></li>");
            });
        }

        if (completed_goals.length > 0){
            $("ul#completedGoals").html("");
            _.each(completed_goals, function(el, idx){
                if(idx < 4 ) {
                    $("ul#completedGoals").append("<li><i id='goal"+el.id+"' style='float:left; margin-left: -20px; padding-right:20px;' class='formfield icon-trophy icon-large' value='"+el.id+"'></i><label style='line-height:110%; font-size:100%;' for='goal"+el.id+"' value='" + el.id + "'>" + el.goalLabel + "</label></li>");
                }
                if(idx >= 4) {
                    extra_completed_goals = (idx - 3)
                }
            });
            if (extra_completed_goals > 0) {
                $("ul#completedGoals").append("<li> And " + extra_completed_goals + " more!</li>");
            }


        }

        $('.icon-hand-right').on("click", function (ev) {

            setGoalTracker(parseInt($(this).attr("value")));

            app.actions.goTo("",1924,app.contents);


        });

        break;

    }
}

app.checkGoalStep = function(step){
    return "<i class='icon-check icon-2x' value="+step+"></i>";
};
app.uncheckGoalStep= function(step){
    return "<i class='icon-unchecked icon-2x' value="+step+"></i>";
};

// ROUTES FROM app.logic.actions. CONTROLS CRUD BEHAVIOR.
app.actions.goalTracker = function(id,ev){

    switch(id){

        case 1764:
            app.actions.goalTrackerSave(id);
            break;

        case 1766:
            app.actions.goalTrackerUpdate(id);
            break;

        case 1770:
            app.actions.goalTrackerDelete(id);
            break;

        case 1924:
            var goal = app.values.goalTracker

            $('[for="goalLabel"]').html("What goal are you currently working on?");

            $('#goalLabel').replaceWith($('<p><em>'+goal.goalLabel+'</em></p>'));

            $('#goalStep1').replaceWith($('<em>'+goal.goalSteps[0].step1+'</em>'));

            $('form label').addClass("col-xs-2");

            if(goal.goalSteps[0].completed == false){
                $('[for=goalStep1]').append(app.uncheckGoalStep("step1"));
            }

            else {
                $('[for=goalStep1]').append(app.checkGoalStep("step1"));
            }

            $('#goalStep2').replaceWith($('<em>'+goal.goalSteps[1].step2+'</em>'));

            if(goal.goalSteps[1].completed == false){
                $('[for=goalStep2]').append(app.uncheckGoalStep("step2"));
            }

            else {
                $('[for=goalStep2]').append(app.checkGoalStep("step2"));
            }

            $('#goalStep3').replaceWith($('<em>'+goal.goalSteps[2].step3+'</em>'));

            if(goal.goalSteps[2].completed == false){
                $('[for=goalStep3]').append(app.uncheckGoalStep("step3"));
            }

            else {
                $('[for=goalStep3]').append(app.checkGoalStep("step3"));
            }

            app.actions.goalTrackerUpdate(id);
            break;

        case 1927:
            app.actions.goalTrackerDelete(id);
            break;

    }
}


app.actions.goalTrackerSave = function (id){

switch(id){

    case 1764:
    $(".btn").on("click", function(ev){
        var goalstep_array = [];
        goalstep_array.push({step1: $("input[name='goalStep1']").val(), completed: false});
        goalstep_array.push({step2: $("input[name='goalStep2']").val(), completed: false});
        goalstep_array.push({step3: $("input[name='goalStep3']").val(), completed: false});

        p.save("goals",{
                goalLabel: $("input[name='goalLabel']").val(),
                goalSteps: goalstep_array,
                completed: false,
                deleted: false
                });
        });

        clearGoalTracker();
        break;

}
}

app.actions.goalTrackerUpdate = function (id){

switch(id){

    case 1766:
        $("[name=saveButton]").on("click", function(ev){
            app.values.goalTracker.completed = true;
            p.update("goals", app.values.goalTracker);
        });
        break;

    case 1924:

        if($('.icon-edit-sign').length == 0) {

            $('.content_panel').prepend("<i class='icon-edit-sign icon-2x pull-right'> Edit</i>");

        };

        toggleCheckBox();

        var modal_content = "";

        modal_content += '<div class="modal-close"><a class="pull-right simplemodal-close">save</a></div><h3>Edit Goal</h3><p>Goal Title</p><div class="form-group"><input class="form-control" id="goal-label-modal" type="text" value="'+app.values.goalTracker.goalLabel+'"/><p>Goals</p>';

        modal_content += '<input style="margin:4px;" class="form-control" name="step1" type="text" value="'+app.values.goalTracker.goalSteps[0].step1.replace(/"/g, "'")+'"/>';
        modal_content += '<input style="margin:4px;" class="form-control" name="step2" type="text" value="'+app.values.goalTracker.goalSteps[1].step2.replace(/"/g, "'")+'"/>';
        modal_content += '<input style="margin:4px;" class="form-control" name="step3" type="text" value="'+app.values.goalTracker.goalSteps[2].step3.replace(/"/g, "'")+'"/>';
        modal_content +='</div>'

        $('.icon-edit-sign').on("click", function(){
            $.modal(modal_content, {opacity:80, onClose: function() {
                    app.values.goalTracker.goalLabel = $('#goal-label-modal').val();
                    app.values.goalTracker.goalSteps[0].step1 = $('input[name="step1"]').val();
                    app.values.goalTracker.goalSteps[1].step2 = $('input[name="step2"]').val();
                    app.values.goalTracker.goalSteps[2].step3 = $('input[name="step3"]').val();

                    p.update("goals", app.values.goalTracker);
                    $.modal.close();
                    app.actions.goTo("", 1924, app.contents)
                }
            });
        });

        $("[name='saveButton']").on("click", function(ev){

            setGoalSteps();

            p.save("goals", app.values.goalTracker);

            if( app.values.goalTracker.goalSteps[0].completed == true &&
                app.values.goalTracker.goalSteps[1].completed == true &&
                app.values.goalTracker.goalSteps[2].completed == true){
                app.actions.goTo("",1766, app.contents);
                clearGoalTracker();
            }
            else {
                clearGoalTracker();
                app.actions.goTo("", 1763, app.contents);
            }

        });

    }
}

app.actions.goalTrackerDelete = function (id){

switch(id){
    case 1770:
        $("[name='saveButton']").on("click", function(ev){
            app.values.goalTracker.deleted = true;
            p.save("goals", app.values.goalTracker);
            clearGoalTracker();
        });
        break;

    case 1927:
        $("[name=saveButton]").on("click", function(ev){
            p.nuke("goals");
        });
        break;
    }
}

var toggleCheckBox = function (){

    $('.icon-check').on("click", function(ev){

        $(this).toggleClass('icon-unchecked icon-check');
        $('.icon-check, .icon-unchecked').unbind("click");
        toggleCheckBox();

    });

    $('.icon-unchecked').on("click", function(ev){

        $(this).toggleClass('icon-unchecked icon-check');

        $('.icon-unchecked, .icon-check').unbind("click");
        toggleCheckBox();

        var modal_content = '<h2>Excellent work!</h2><a class="simplemodal-close">close</a><p><strong>You should be proud of yourself!</strong></p><p>Completing each of these steps brings you even closer to achieving your goal!</p><p>We&#39;ll keep this step listed since completing it again will not only make you feel more confident in yourself, but will also make achieving your goal easier.</p><p>Be sure to tell us if you complete this step again! Keep up the great work!</p><p><div></div>';

        $.modal(modal_content);

    });



}

var setGoalSteps = function(){

    $.each($('.icon-check'), function(index, element){

        switch($(element).attr('value')){
            case "step1":
                app.values.goalTracker.goalSteps[0].completed = true;
                break;
            case "step2":
                app.values.goalTracker.goalSteps[1].completed = true;
                break;
            case "step3":
                app.values.goalTracker.goalSteps[2].completed = true;
                break;
        }

    });

    $.each($('.icon-unchecked'), function(index, element){

        switch($(element).attr('value')){
            case "step1":
                app.values.goalTracker.goalSteps[0].completed = false;
                break;
            case "step2":
                app.values.goalTracker.goalSteps[1].completed = false;
                break;
            case "step3":
                app.values.goalTracker.goalSteps[2].completed = false;
                break;
        }

    });
}
