app.values.comingOut = _.last(p.find("coming_out")) || {gamePlan:{who:[]}};

var colorArray = ["color1", "color2", "color3", "color4"];

app.views.comingOut = function (id) {
  
  switch(id){

    case 2043:
      if(p.find('coming_out').length > 0){
        $('.row-fluid:first').append('<div class="col-sm-4 col-xs-4 col-md-4"><div class="btn widget size_height15" data-id="2209" style="background-color:#1C99DB;"><i style="color:white; font-size:3em;" class="icon-edit"></i><h3>See My Lists</h3></div></div>');
        
        if(p.find('coming_out')[0].gamePlan.who.length > 0){
          $('.row-fluid:first').append('<div class="col-sm-4 col-xs-4 col-md-4"><div class="btn widget size_height15" data-id="2213" style="background-color:#1C99DB;"><i style="color:white; font-size:3em;" class="icon-sort-by-attributes-alt"></i><h3>See My Game Plan</h3></div></div>');
        }
      }

      break;

    case 2209:

      $('.row-fluid').wrap('<div class="panel" style="background:none !important;"></div>');
      $('.panel').before('<div class="home-button"><a href="#/"><i class="icon-home icon-4x"></i></a></div>');
      $('.content_panel').removeClass("content_panel");

      $('#positive-qualities').append('<div class="btn widget size_height15" data-id="2211" style="background-color:#1C99DB;"><i style="color:white; font-size:3em;" class="icon-smile"></i><h3>My Positive Qualities</h3></div>');
      $('#looking-ahead').append('<div class="btn widget size_height15" data-id="2212" style="background-color:#1C99DB;"><i style="color:white; font-size:3em;" class="icon-share-alt"></i><h3>Looking Ahead</h3></div>');
      $('#got-my-back').append('<div class="btn widget size_height15" data-id="2210" style="background-color:#1C99DB;"><i style="color:white; font-size:3em;" class="icon-sitemap"></i><h3>Who\'s Got My Back</h3></div>');
      break;

    case 2210:
      
      stylePanel();
      var html ="";
     
      $.each(app.values.comingOut.supportNetwork, function (index, object){
        if(object.value != ""){
          html += "<li>"+object.value+"</li>";
        }
      });

      $('#support-list').append(html);
      
      break;

    case 2211:
      
      stylePanel();
      var html ="";
     
      $.each(app.values.comingOut.positiveQualities, function (index, object){
        if(object.value != ""){
          html += "<li>"+object.value+"</li>";
        }
      });

      $('#qualities-list').append(html);
      
      break;

    case 2212:
      
      stylePanel();
      var html ="";
     
      $.each(app.values.comingOut.futureExcited, function (index, object){
        if(object.value != ""){
          html += "<li>"+object.value+"</li>";
        }
      });

      $('#future-list').append(html);
      
      break;

    case 2213:
      
      stylePanel();
      
      var html ="";
      
      $('#coming-out-speech').append(app.values.comingOut.gamePlan.thoughts);
      
      $.each(app.values.comingOut.gamePlan.who, function (index, object){
        if(object.value != ''){
          html += "<li class='color2' style='list-style:none;'><dl class='today-description'><dt>"+object.value+"</dt><dt>Perceived reaction</dt><dd>"+object.reaction+"</dd><dt>Relationship status</dt><dd>"+object.relationship+"</dd><dt>Where to come out</dt><dd>"+object.location+"</dd><dt>"+object.plan+"</dt></dl></li>"
        }
      });

      $('#today-list').append(html);
      
      break;

    case 2101:
      try {
        var html = "";
        $.each(app.values.comingOut.gamePlan.who, function (index, person){
          if(person.value != ''){
            html += "<div class='row'><div class='col-xs-3'>"+person.value+"</div><div class='col-xs-9'><input class='form-control' name='"+person.value+"' type='text'></div></div><br>"
          }
        });
        $('#reaction-form').empty().append(html);
      }
      catch(err){
        console.log(err);
      }
      break;

    case 2103:
      try {

        var html = "";
        $.each(app.values.comingOut.gamePlan.who, function (index, person){
          if(person.value != ''){
            html += "<div class='row'><div class='col-xs-3'>"+person.value+"</div><div class='col-xs-9'><input class='form-control' name='"+person.value+"' type='text'></div></div><br>"
          }
        });
        $('#relationship-form').empty().append(html);
      }
      catch(err){
        console.log(err);
      }
      break;

    case 2106:
      try {

        var html = "";
        $.each(app.values.comingOut.gamePlan.who, function (index, person){
          if(person.value != ''){
            html += "<div class='row'><div class='col-xs-3'>"+person.value+"</div><div class='col-xs-9'><input class='form-control' name='"+person.value+"' type='text'></div></div><br>"
          }
        });
        $('#where-form').empty().append(html);
      }
      catch(err){
        console.log(err);
      }
      break;

    case 2108:
      try {

        var html = "";
        $.each(app.values.comingOut.gamePlan.who, function (index, person){
          if(person.value != ''){
            debugger;
            html += "<div class='row' style='margin-bottom:10px;'><div class='col-xs-6'>"+person.value+"</div>"
            html += "<div class='col-xs-3'><input type='radio' name='"+person.value+"'' value='spontaneous'";
            if (person.plan == 'spontaneous'){
              html+= "checked";}
            html+= "></div><div class='col-xs-3'><input type='radio' name='"+person.value+"'' value='planned'"
            if (person.plan == 'planned'){
              html+= "checked";}
            html+= "></div></div>"
          }
        });
        $('#plan-form').empty().append(html);
      }
      catch(err){
        console.log(err);
      }
      break;

  }
}
app.actions.comingOut = function (id){

  switch(id){

    case 2061:

      $.each($('[name="positiveQualities"]'), function (index, field){

        try{
          $(field).val(app.values.comingOut.positiveQualities[index].value);
        }
        catch(err){
          $(field).val("");
        } 

      });

      $('input[name="saveButton"]').on("click", function (){

          app.values.comingOut.positiveQualities = $('#positive-qualities-form').serializeArray();
          p.save("coming_out", app.values.comingOut);
        
      });
      break;

    case 2063:

      $.each($('[name="futureExcited"]'), function (index, field){

        try{
          $(field).val(app.values.comingOut.futureExcited[index].value);
        }
        catch(err){
          $(field).val("");
        } 

      });

      $('input[name="saveButton"]').on("click", function (){

          app.values.comingOut.futureExcited = $('#future-excited-form').serializeArray();
          p.save("coming_out", app.values.comingOut);
        
      });

    case 2128:

      $.each($('[name="person"]'), function (index, field){

        try{
          $(field).val(app.values.comingOut.supportNetwork[index].value);
        }
        catch(err){
          $(field).val("");
        } 

      });

      $('input[name="saveButton"]').on("click", function (){

          app.values.comingOut.supportNetwork = $('#support-network').serializeArray();
          p.save("coming_out", app.values.comingOut);
        
      });
      break;
    
    case 2099:

      $.each($('[name="who"]'), function (index, field){
        try{
          $(field).val(app.values.comingOut.gamePlan.who[index].value);
        }
        catch(err){
          console.log(err);
        } 
      });

      $('input[name="nextButton"]').on("click", function (){
          var inputArray = $('[type="text"]');
          if(app.values.comingOut.gamePlan.who.length > 0){

            var removeList = [];
            $.each(inputArray, function (index, field){

              if ($(field).val() == ""){

              removeList.push(index);
              }
              else{
                if (app.values.comingOut.gamePlan.who[index] == undefined){
                  app.values.comingOut.gamePlan.who[index] = {};
                }
              app.values.comingOut.gamePlan.who[index].value = $(field).val();
              }

            });


            removeList.reverse();

            $.each(removeList, function(index,field){
                  app.values.comingOut.gamePlan.who.splice(field,1);
            });


          }
          else{
            $.each(inputArray, function (index, field){
              app.values.comingOut.gamePlan.who.push({value:$(field).val()});
            });
          }
          p.save("coming_out", app.values.comingOut);
        
      });
      break;

    case 2101:
      $.each($('[type="text"]'), function (index, field){
        try{
          $(field).val(app.values.comingOut.gamePlan.who[index].reaction);
        }
        catch(err){
          console.log(err);
        } 

      });
      $('input[name="nextButton"]').on("click", function (){
          $.each(app.values.comingOut.gamePlan.who, function (index, person){
            person.reaction = $('[name="'+person.value+'"]').val();
          });
          p.save("coming_out", app.values.comingOut);
        
      });
      break;
    
    case 2103:
      $.each($('[type="text"]'), function (index, field){

        try{
          $(field).val(app.values.comingOut.gamePlan.who[index].relationship);
        }
        catch(err){
          console.log(err);
        } 

      });
      $('input[name="nextButton"]').on("click", function (){
          $.each(app.values.comingOut.gamePlan.who, function (index, person){
            person.relationship = $('[name="'+person.value+'"]').val();
          });
          p.save("coming_out", app.values.comingOut);
        
      });
      break;

    case 2106:
      $.each($('[type="text"]'), function (index, field){

        try{
          $(field).val(app.values.comingOut.gamePlan.who[index].location);
        }
        catch(err){
          console.log(err);
        } 

      });
      $('input[name="nextButton"]').on("click", function (){
          $.each(app.values.comingOut.gamePlan.who, function (index, person){
            person.location = $('[name="'+person.value+'"]').val();
          });
          p.save("coming_out", app.values.comingOut);
        
      });
      break;

    case 2108:
      // $.each($('[type="radio"]'), function (index, field){

      //   try{
      //     $(field).val(app.values.comingOut.gamePlan.who[index].location);
      //   }
      //   catch(err){
      //     console.log(err);
      //   } 

      // });
      $('input[name="nextButton"]').on("click", function (){
          $.each(app.values.comingOut.gamePlan.who, function (index, person){
            person.plan = $('[name="'+person.value+'"]:checked').val();
          });
          p.save("coming_out", app.values.comingOut);
        
      });
      break;

    case 2114:
      try{
        $('textarea').val(app.values.comingOut.gamePlan.thoughts);
      }
      catch(err){
        console.log(err);
      }
      $('input[name="nextButton"]').on("click", function (){
        app.values.comingOut.gamePlan.thoughts = $('textarea').val();
        p.save("coming_out", app.values.comingOut);
      });
      break;
  }
}
var stylePanel = function(){
  $('.content_panel').before('<div class="home-button"><a href="#/"><i class="icon-home icon-4x"></i></a></div>');
  $('.content_panel').css("background-color", "#1C99DB");
}