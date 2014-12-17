app.views.forms = {};


app.views.forms.slider = function (contents, currentQuestionCounter) {

    var input_content = "", max_discrete_responses = app.config.max_discrete_responses || 5, contents = contents || {};
    contents.data_type = contents.orientation || "vertical";
    contents.data_mini = contents.data_mini || false;
    contents.data_iconpos = contents.data_iconpos || "left";
    contents.data_theme = contents.data_theme || "";
    contents.required = contents.required || false;
    contents.min = contents.min || 0;
    contents.max = contents.max || 10;
    contents.default_value = contents.default_value || 5;
    contents.labeled_points = contents.labeled_points || [];
    contents.step = contents.step || 1;
    contents.data_highlight = contents.data_highlight || true;
    contents.disabled = contents.disabled || false;
    console.log(contents.disabled);
    input_content += '<label for="' + contents.data_label + '">'+contents.content +'</label>';
    input_content += '<input type="range"';
    if (contents.disabled == true){
        input_content += ' disabled="'+contents.disabled;};

    input_content += '" data-mini="'+contents.data_mini+'"data-highlight="'+contents.data_highlight+'"step="'+contents.step+'" name="' + contents.data_label + '" id="' + contents.data_label + '" min="' + contents.min + '" max="' + contents.max + '" value="' + contents.default_value + '"/>';

    return input_content;

};

app.views.forms.radio = function (contents, currentQuestionCounter) {

    var input_content, max_discrete_responses = app.config.max_discrete_responses || 5, contents = contents || {};
    contents.data_type = contents.orientation || "vertical";
    contents.data_mini = contents.data_mini || false;
    contents.data_iconpos = contents.data_iconpos || "left";
    contents.data_theme = contents.data_theme || "b";
    contents.required = contents.required || false;


    input_content = '<div class="form-group" data-type="'+contents.data_type+'" data-iconpos="'+ contents.data_iconpos +'">';
    input_content += '<legend>' + app.views.forms.currentQuestionCounter(currentQuestionCounter) + contents.content + '</legend>';

   for (var i = 0; i < max_discrete_responses; i++) {
        if (eval('contents.response' + i) != "" && eval('contents.response' + i) != undefined ) {
            input_content += '<div class="radio"><label for="' + contents.data_label + '-' + i + '"><input type="radio" name="' + contents.data_label + '" id="' + contents.data_label + '-' + i + '"value="' + eval('contents.response' + i) + '">' + eval('contents.response' + i) + '</label></div>'
        };
    };
    input_content += '</div>';

    return input_content;

};

app.views.forms.checkbox = function (contents, currentQuestionCounter) {

    var input_content, max_discrete_responses = app.config.max_discrete_responses || 5, contents = contents || {};;
    contents.data_type = contents.orientation || "vertical";
    contents.data_mini = contents.data_mini || false;
    contents.data_iconpos = contents.data_iconpos || "left";
    contents.data_theme = contents.data_theme || "";
    contents.required = contents.required || false;


    input_content = '<div class="form-group" data-iconpos="'+ contents.data_iconpos +'">';
    input_content += '<legend>' + app.views.forms.currentQuestionCounter(currentQuestionCounter) + contents.content + '</legend>';

    for (var i = 0; i < max_discrete_responses; i++) {
        if (eval('contents.response' + i) != "" && eval('contents.response' + i) != undefined ) {
            input_content += '<div class="checkbox"><label for="' + contents.data_label + '-' + i + '"><input type="checkbox" name="' + contents.data_label + '" id="' + contents.data_label + '-' + i + '"value="' + eval('contents.response' + i) + '">' + eval('contents.response' + i) + '</label></div>'
        };
    };

    input_content += '</div><br/>';

    return input_content;

};

app.views.forms.select = function (contents, currentQuestionCounter) {

    var input_content, max_discrete_responses = app.config.max_discrete_responses || 5, contents = contents || {};;
    contents.data_type = contents.orientation || "vertical";
    contents.data_mini = contents.data_mini || false;
    contents.data_iconpos = contents.data_iconpos || "left";
    contents.data_theme = contents.data_theme || "";
    contents.required = contents.required || false;


    input_content = '';
    input_content += '<div class="form-group"><label for="'+ contents.data_label +'">' + app.views.forms.currentQuestionCounter(currentQuestionCounter) + contents.content + '</label>';
    input_content += '<select class="form-control" name="'+ contents.data_label+'" id="'+contents.data_label+'">';
    for (var i = 0; i < max_discrete_responses; i++) {
        if (eval('contents.response' + i) != "" && eval('contents.response' + i) != undefined) {
            input_content += '<option value="' + eval('contents.response' + i + "_value") + '">' + eval('contents.response' + i) + '</option>'
        };
    };

    input_content += '</select></div>';

    return input_content;

};



app.views.forms.currentQuestionCounter = function(number){

    // if (number != "" && number){
    //     return number + ") ";
    // }

    return ""

};

app.views.forms.text = function (contents, currentQuestionCounter) {

    var input_content, contents = contents || {};
    contents.required = contents.required || false;

    input_content = '<div class="form-group"><label for="' + contents.data_label + '">' + app.views.forms.currentQuestionCounter(currentQuestionCounter)  + contents.content + '</label>';
    input_content += '<input type="text" class="form-control" name="' + contents.data_label + '" id="' + contents.data_label + '"/></div>';

    return input_content;

};


app.views.forms.time = function (contents, currentQuestionCounter) {

    var input_content, contents = contents || {};
    contents.required = contents.required || false;

    input_content = '<div class="form-group"><label for="' + contents.data_label + '">' + app.views.forms.currentQuestionCounter(currentQuestionCounter)  + contents.content + '</label>';
    input_content += '<input class="form-control" type="time" name="' + contents.data_label + '" id="' + contents.data_label + '"/></div>';

    return input_content;

};

