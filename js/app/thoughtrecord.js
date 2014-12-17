app.values.thoughtRecord = {};
app.values.edit = false;

app.views.thoughtRecord = function(id) {
	var thoughts = [];

	thoughts = p.find("thoughts") || [];

	switch(id){

		case 1928:
                        app.values.edit = false;
		if (thoughts.length > 0){
        	               $("ul#today-list").html("");
        	               _.each(thoughts, function(el, idx){

        	                   $("ul#today-list").append("<i class='icon-caret-right' id='today-list-icon"+idx+"' value='"+el.id+"' style='float:left;'></i><li class="+el.emotion+"><dl class='today-description'><dt>Situation</dt><dd>"+el.situation+"</dd><dt>Thought</dt><dd>"+el.thought+"</dd><dt>Alternate Thought</dt><dd>"+el.alternateThought+"</dd></dl></li>");

        	               });

        	               $('i').on("click", function (ev) {
                            app.values.thoughtRecord = p.find("thoughts", {id: parseInt($(this).attr("value"))})[0];
                            app.values.edit = true;
                            app.actions.goTo("",1381,app.contents);
                	   });
		}

		break;

	}
}

app.actions.thoughtRecord = function(id, ev) {
	switch(id){
   case 1376:
      app.values.edit = false;
      app.values.thoughtRecord = {};

      break;

		case 1381:


			$.each($('label'), function(i, el){
				if($(el).attr("for") != "emotion"){
					$(el).append(' <i class="icon-question-sign" id="'+$(this).attr("for")+'_help"></i>')
				}
			});

			$('.icon-question-sign').on("click", function(){
				event.preventDefault();
				var modal_content = '<a class="simplemodal-close">close</a><br>';
				modal_content += getModalContent(this.id)
				modal_content += '</div>';
				$.modal(modal_content, {opacity:80});
			});

			if (app.values.thoughtRecord && app.values.edit) {

				$('#situation').val(app.values.thoughtRecord.situation);
				$('#emotion option:selected').html(app.values.thoughtRecord.emotion);
				$('#thought').val(app.values.thoughtRecord.thought);

				_.each($('label').get(), function(el) {

					_.each(app.values.thoughtRecord.autoThoughts, function(autoThought){

						if($(el).text() == autoThought) {

							var selector = "#"+$(el).attr('for');

							$(selector).prop('checked', true);
						}

					});

				});
			}

			app.actions.thoughtRecordSave(id);

			break;

		case 1388:

			app.actions.thoughtRecordSave(id);

			break;

	}

}

app.actions.thoughtRecordSave = function (id, ev) {
	switch(id){

		case 1381:
			$(".btn").on("click", function(ev){
			    var autothought_array = [];
			    _.each($(':checked'), function(el){
			    	if (el.getAttribute('type') == 'checkbox') {
			    		autothought_array.push($('[for='+el.id+']').text());
			    	}
			  	})

			    if (app.values.thoughtRecord) {
			    	var alternate = app.values.thoughtRecord.alternateThought;
			    	var nowAsk = app.values.thoughtRecord.nowAsk;
			    }
				    app.values.thoughtRecord = {
				            situation: $("#situation").val(),
				            emotion: $('select#emotion option:selected').text(),
				            thought: $('#thought').val(),
				            autoThoughts: autothought_array,
				            nowAsk: nowAsk,
				            alternateThought: alternate,
				            id: app.values.thoughtRecord.id
				            }
			    });
        	break;

        case 1388:
        	if (app.values.thoughtRecord && app.values.edit) {
        		$('#alternateThought').val(app.values.thoughtRecord.alternateThought);
        		$('#nowAsk').val(app.values.thoughtRecord.nowAsk);
        	}
        	$(".btn").on("click", function(ev){
        		app.values.thoughtRecord.alternateThought = $('#alternateThought').val();
        		app.values.thoughtRecord.nowAsk = $('#nowAsk').val();
        		if (app.values.thoughtRecord.id) {
        			p.update("thoughts", app.values.thoughtRecord);
        		}
        		else {
        			p.save("thoughts", app.values.thoughtRecord);
        		}
        		app.values.thoughtRecord = {};
        	});



    }
}

app.actions.thoughtRecordUpdate = function (id, ev) {
    app.values.edit = false;
}

app.actions.thoughtRecordDelete = function (id, ev) {

}
