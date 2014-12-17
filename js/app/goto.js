
app.actions.goTo = function (targetDiv, id, app_contents, options) {

    // console.log(targetDiv, id, app_contents, options);
    // console.log(parseInt(id));
    var object_to_load = _.where(app_contents, {
        id: parseInt(id)
    })[0];
    var switchDiv = targetDiv || "#mainContainer" ;
    var content_to_display = "";
    var switch_options = options || {};
    app.config.currentPage = parseInt(id);
	
    switch_options.hide_home_button = object_to_load.hide_home_button || '';
    switch_options.show_logo = object_to_load.show_logo;
    switch (object_to_load.element_type) {
    case "panel":

        if(object_to_load.id == 1724) {
            app.start(app.defaults.container);
        }
        else {
            content_to_display = app.views.panel(object_to_load.label);
            $(switchDiv).html(content_to_display);

            app.buildAndPlay(switchDiv, content_to_display,switch_options);
        }
        break;
    case "question_group":
        // content_to_display = object_to_load.element;
        // window.location.href = "http://mohrlab.northwestern.edu/parakeet/app/GeneralPlayer/?id=" + parseInt(id);
        // 
        var parent_list_first_id;


        if (typeof object_to_load.element_list == "string"){
                parent_list_first_id = parseInt(object_to_load.element_list.split(","));}
            else {
                parent_list_first_id = object_to_load.element_list;
            }
        
        content_to_display = _.where(app_contents, {
            id: parent_list_first_id
        })[0].main_content;
        app.buildAndPlay(switchDiv, '<div class="content_panel">' + content_to_display + '</div>',switch_options);
        break;

    case "assessment":
       //TODO MAKE APP.QUESTIONS A PASSED IN VAR
        // console.log(app_contents);
        var filtered_content = _.where(app.questions, {
        tool_id: parseInt(id)
        });

        // console.log(filtered_content);

        // TODO write a variable that outputs an ordered distinct list of page names into an array called surveyOrder
        var surveyOrder =  _.where(filtered_content);

        // console.log(surveyOrder);
        // console.log(filtered_content);
        $(switchDiv).html(app.views.assessmentPage(filtered_content,id, switch_options.idx));
        app.actions.assessmentPage(filtered_content,id, switch_options.idx);
        break;

    case "lesson":
        var object_from_player = app.views.sequencePlayer(object_to_load, app_contents, switch_options.idx);
        content_to_display = object_from_player.content;
        app.buildAndPlay(switchDiv, content_to_display,switch_options);
        app.actions.sequencePlayer(app_contents,switchDiv);
        break;

    case "placard":
        break;

    case "topic":
        // content_to_display = object_to_load.element;
        // window.location.href = "http://mohrlab.northwestern.edu/parakeet/app/GeneralPlayer/?id=" + parseInt(id);
        var element_list = object_to_load.element_list.split(","), 
        lesson_array= _.where(app_contents,{topic_membership_id:parseInt(id),element_type:"lesson"});

        content_to_display = '<h1>' + object_to_load.pretty_name + '</h1><div class="container">';
        

        _.each(lesson_array, function(element){
            content_to_display += app.views.nextButton(element.id,element.pretty_name, element.days_in_treatment) + '<br/>';

        });

        content_to_display += '</div>'
        
        app.buildAndPlay(switchDiv, content_to_display,switch_options);
        break;

    default:
        content_to_display = '<div class="content_panel">' + object_to_load.main_content + '</div>';
        app.buildAndPlay(switchDiv, content_to_display,switch_options);        
        break;

    }

    if (object_to_load.show_logo == "true" || object_to_load.show_logo == "yes"){
        $(switchDiv).prepend("<img src='images/logo.png' style='width:100%;' ><br/>");
    };

    if (object_to_load.hide_home_button == "true" || object_to_load.hide_home_button == "yes"){
        $(switchDiv).prepend("<a href='index'><i class='icon-home'></i></a>");

    };


	if (object_to_load.content_panel_color != "" && object_to_load.content_panel_color != "undefined"){
	$(".content_panel").attr('style','background-color:' + object_to_load.content_panel_color + ' !important');
	};


}

