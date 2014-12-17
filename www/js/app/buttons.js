
app.actions.backButton = function (){
    $('input:button[name="backButton"]').on("click", function (ev) {
            window.history.back();
    });
};




app.actions.homeButton = function (){
    $('input:button[name="homeButton"]').on("click", function (ev) {
        window.location.hash = "#/index";
    });
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
        // console.log(ev);
        ev.preventDefault();

        window.location.hash = "#/general/"+ev.currentTarget.dataset.goto;
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
        console.log(ev);
        window.location.hash = "#/general/"+ev.currentTarget.dataset.goto;

    });

};

