var app = {};

app.contents = appContent;

app.defaults = {};
app.defaults.startPanel = "home";

app.defaults.demo = {};
app.defaults.demo.startDate = function(){
    var d = new Date(); // today
    var x = 32; // number of days in the past to go back
    d.setDate(d.getDate() - x);
    return d;
}

app.panels = _.where(app.contents, {
    element_type: "panel"
});

app.views = {};
app.actions = {};


app.views.nextButton = function(id,label){

    return '<input type="button" class="btn" name="nextButton" value="'+label+ '#' + id+'"/>'

}

app.views.lessonNextButton = function(id,idx,label){

    return '<input type="button" class="btn"  name="lessonNextButton" value="'+label+' &gt;" data-idx="'+idx+'"  data-id="'+id+'"/>'

}

app.views.lessonBackButton = function(id,idx,label){
    return '<input type="button"  class="btn"  name="lessonBackButton" value="&lt; '+label+' " data-idx="'+idx+'"  data-id="'+id+'"/>'

}


app.views.lessonHomeButton = function(label){
    return '<input type="button"  class="btn"  onclick="app.start();" name="nextButton" value="'+label+'"/>'

}




app.panels.grab = function (panelLabel) {
    var panelSelect = panelLabel || "home";
    return _.where(app.contents, {
        label: panelSelect
    });
};

app.panels.set = function (panelObject) {
    var panel = panelObject[0] || panelObject;
    panel.contents = _.where(app.contents, {
        showonpanel: panelObject[0].label
    });
    return panel;
};

app.panels.build = function (panelContents) {

    var panelHtml = "",
        action = "";

    _.each(panelContents.contents, function (i) {

        panelHtml += app.widget({
            styles: i.styles,
            pretty_name: i.pretty_name,
            icon: i.icon,
            color: i.color,
            size_width: i.size_width,
            size_height: i.size_height,
            id: i.id,
            image: i.image,
            topic_membership_id: i.topic_membership_id
        });
    });

    panelHtml = '<div class="panel">' + panelHtml + '</div>';
    return panelHtml;
};

app.topics = _.where(app.contents, {
    element_type: "topic"
});

app.topics.color = function (topic_membership_id, fallback_color) {
    if (topic_membership_id != "") {
        return _.where(app.topics, {
            id: topic_membership_id
        })[0].color || "gray"
    } else {
        return fallback_color || "gray"
    };
}

app.actions.sequencePlayer = function (appContents,targetDiv){

    $('input:button[name="lessonNextButton"]').on("click", function(ev){

        app.actions.goTo(targetDiv,ev.currentTarget.dataset.id,appContents,{idx:ev.currentTarget.dataset.idx});

        });
    
    $('input:button[name="lessonBackButton"]').on("click", function(ev){

        app.actions.goTo(targetDiv,ev.currentTarget.dataset.id,appContents,{idx:ev.currentTarget.dataset.idx});

        });
}

app.views.sequencePlayer = function (sequenceObject, appContents,index) {

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


    content_response.content += '<div class="content_panel" id="lesson" data-idx="'+ idx +'" data-parent-id="'+ sequenceObject.id +'" data-id="'+ array_of_objects[idx].id+'">' +array_of_objects[idx].main_content+'</div>';

    console.log(idx, array_of_objects.length);

    if (idx > 0){
    content_response.content += app.views.lessonBackButton(sequenceObject.id,idx-1,"Back");}
    if (idx < array_of_objects.length-1 ){
    content_response.content += app.views.lessonNextButton(sequenceObject.id,idx+1,"Next");}
    if (idx == array_of_objects.length-1){
    content_response.content += app.views.lessonHomeButton("Home");}



    return content_response;


};



app.actions.nextButton = function (targetDiv) {
    var label, goto;
        var switchDiv = targetDiv || "body";


    _.each(_.uniq($('input:button[name="nextButton"]')), function (element) {

        // console.log(element.value);
        // console.log(element.value.indexOf("#"));

        if (element.value.indexOf("#") > -1) {

            label = element.value.slice(0, element.value.indexOf("#"));
            goto = element.value.slice(element.value.indexOf("#") + 1, element.value.length);


            $('input:button[name="nextButton"]').each(function () {
                if ($(this).val() == element.value) {
                    $(this).val(label);
                    $(this).attr("data-goto", goto);
                    $(this).addClass("btn");
                }
            });
        };
    });

    $('input:button[name="nextButton"]').on("click", function (ev) {
        console.log(ev);
        ev.preventDefault();
        app.actions.goTo(switchDiv, ev.currentTarget.dataset.goto, app.contents);
    });

};

app.actions.saveButton = function (targetDiv) {
    var switchDiv = targetDiv || "body";
    //TODO change hashed buttons into buttons with data roles WITH SAVE
    _.each(_.uniq($('input:button[name="saveButton"]')), function (element) {


        if (element.value.indexOf("#") > -1) {

            label = element.value.slice(0, element.value.indexOf("#"));
            goto = element.value.slice(element.value.indexOf("#") + 1, element.value.length);

            $('input:button[name="saveButton"]').each(function () {
                if ($(this).val() == element.value) {
                    $(this).val(label);
                    $(this).attr("data-goto", goto);
                      $(this).addClass("btn");
                }

            });
        };
    });

    $('input:button[name="saveButton"]').on("click", function (ev) {
        ev.preventDefault();
        app.actions.goTo(switchDiv, ev.currentTarget.dataset.goto, app.contents);
    });

}

app.actions.default = function (targetDiv) {
    var switchDiv = targetDiv || "body";
    app.actions.saveButton(switchDiv);
    app.actions.nextButton(switchDiv);
    console.log(switchDiv);
    $(".widget").on("click", function (ev) {
        console.log(ev);
        app.actions.goTo(switchDiv, ev.currentTarget.dataset.id, app.contents);
    });

};

app.actions.goTo = function (targetDiv, id, app_contents, options) {

    // console.log(targetDiv, id, app_contents, options);
    // console.log(parseInt(id));

    var object_to_load = _.where(app_contents, {
        id: parseInt(id)
    })[0];
    var switchDiv = targetDiv || "#mainContainer" ;
    var content_to_display = "";
    var switch_options = options || {};

    // console.log(switchDiv);
    // console.log(object_to_load.element_type);

    switch (object_to_load.element_type) {

    case "html" || "slide":
        content_to_display = object_to_load.main_content;
        app.buildAndPlay(switchDiv, content_to_display);
        break;

    case "panel":
        content_to_display = app.panels.build(app.panels.set(app.panels.grab(object_to_load.label)));
        $(switchDiv).html(content_to_display);

        app.buildAndPlay(switchDiv, content_to_display);
        break;

    case "question_group":
        // content_to_display = object_to_load.element;
        // window.location.href = "http://mohrlab.northwestern.edu/parakeet/app/GeneralPlayer/?id=" + parseInt(id);
        var parent_list_first_id = parseInt(object_to_load.element_list.split(","));
        content_to_display = _.where(app_contents, {
            id: parent_list_first_id
        })[0].main_content;
        app.buildAndPlay(switchDiv, '<div class="content_panel">' + content_to_display + '</div>');
        break;

    case "assessment":
        break;

    case "lesson":
        var object_from_player = app.views.sequencePlayer(object_to_load, app_contents, switch_options.idx);
        content_to_display = object_from_player.content;
        options
        app.buildAndPlay(switchDiv, content_to_display);
        app.actions.sequencePlayer(app_contents,switchDiv);
        break;

    case "placard":
        break;

    case "topic":
        // content_to_display = object_to_load.element;
        // window.location.href = "http://mohrlab.northwestern.edu/parakeet/app/GeneralPlayer/?id=" + parseInt(id);
        var element_list = object_to_load.element_list.split(","), 
        lesson_array= _.where(app_contents,{topic_membership_id:parseInt(id),element_type:"lesson"});

        console.log(object_to_load);
        content_to_display = '<h1>' + object_to_load.pretty_name + '</h1>';
        


        _.each(lesson_array, function(element){

            content_to_display += app.views.nextButton(element.id,element.pretty_name) + '<br/>';

        });

        app.buildAndPlay(switchDiv, content_to_display);
        break;

    default:
        alert("Content has yet to be connected to this button.");
        break;

    }

}

app.buildAndPlay = function (switchDiv, content_to_display) {
    $(switchDiv).html(content_to_display);
    app.actions.default (switchDiv);

}

app.widget = function (widget_options) {

    // console.log(widget_options);
    var widget_html,
        options = {};
    options.name = widget_options.pretty_name || "no name";
    options.icon = widget_options.icon || "";
    options.image = widget_options.image || "";
    options.size_width = widget_options.size_width || 1;
    options.size_height = widget_options.size_height || 1;
    options.id = widget_options.id || "";
    options.topic_membership_id = widget_options.topic_membership_id || "";
    options.color = app.topics.color(options.topic_membership_id, widget_options.color);
    options.styles = widget_options.styles || "";

    // console.log(options);
    widget_html = '<div class="widget size_width' + options.size_width + ' size_height' + options.size_height + '" data-id = "' + options.id + '" style="background-color:' + options.color + ';' + options.styles + '">';
    widget_html += '<i class="' + options.icon + '">' + options.image + '</i>';
    widget_html += '<h3>' + options.name + '</h3>';
    widget_html += '</div>';

    return widget_html

}

app.start = function (label) {

    home_special = "<img src='images/logo.png' style='width:100%;' ><br/>";
    $("#mainContainer").html(home_special + app.panels.build(app.panels.set(app.panels.grab(label))));
    app.actions.default("#mainContainer");

}