app.values.copingCard = {};

app.views.copingCard = function (id) {

	var time_based_cards = p.find("time_based_coping_cards") || [];
	var situation_based_cards = p.find("situation_based_coping_cards") || [];
	var color_array = ["color1", "color2", "color3", "color4"];

	switch(id) {

		// Coping Card List

		case 1720:
		_.each(app.values.copingCard.days, function(el,idx){

			console.log(el);
			$('input[value="'+el+'"]').prop('checked',true);

		});
		break;

		case 1328:
			if(time_based_cards.length > 0) {

				$('ul#time-based-cards').html("");
				_.each(time_based_cards, function(el, idx){
					$('ul#time-based-cards').append("<li value='"+el.id+"' class='time-card "+randomClass(color_array)+"'>"+el.cardLabel+"</li>")
				});
			}

			if(situation_based_cards.length > 0) {

				$('ul#situation-based-cards').html("");
				_.each(situation_based_cards, function(el, idx){
					$('ul#situation-based-cards').append("<li value='"+el.id+"' class='situation-card "+randomClass(color_array)+"'>"+el.cardLabel+"</li>")
				});
			}

			$('.time-card').on("click", function(ev){
				app.values.copingCard = p.find("time_based_coping_cards", {id: parseInt($(this).attr("value"))})[0];
				app.actions.goTo("",1720,app.contents);
			});

			$('.situation-card').on("click", function(ev){
				app.values.copingCard = p.find("situation_based_coping_cards", {id: parseInt($(this).attr("value"))})[0];
				app.actions.goTo("",1319,app.contents);
			});

			break;

	}


}

app.actions.copingCard = function (id, ev) {

	switch(id) {

                        case 1312:
                            app.values.copingCard = {};
                            break;

		case 1319:

			// Autofill form with existing object data
			if (app.values.copingCard) {
				$('select#feeling option:selected').text(app.values.copingCard.feeling);
				$('select#withPerson option:selected').text(app.values.copingCard.withPerson);
				$('select#conversationType option:selected').text(app.values.copingCard.conversationType);
				$('select#location option:selected').text(app.values.copingCard.location);
				$('select#physicalEffort option:selected').text(app.values.copingCard.physicalEffort);
				$('#situationBasedMessage').val(app.values.copingCard.message);
				$('#cardLabel').val(app.values.copingCard.cardLabel);
			}
			app.actions.copingCardSave(id);
			break;

		case 1720:

			//Autofill form with existing object data


			if (app.values.copingCard) {

				$('#timeBasedMessage').val(app.values.copingCard.message);
				$('#cardLabel').val(app.values.copingCard.cardLabel);
				$("#scheduledAtTime").val(app.values.copingCard.scheduledAtTime);
				if (app.values.copingCard.repeating) {
					$('[name="repeating"]').prop('checked', true);
				}

				_.each($('label').get(), function(el) {

					_.each(app.values.copingCard.days, function(day){

						if($(el).html() == day) {

							var selector = "#"+$(el).attr('for')
							$(selector).prop('checked', true);
						}

					});

				});

				
					_.each(app.values.copingCard.days, function(el,idx){

			console.log(el);
			$('input[value="'+el+'"]').prop('checked',true);

		});


			}
			app.actions.copingCardSave(id);
			break;

	}

}

app.actions.copingCardSave = function (id, ev) {

	switch(id) {

		// Situation Based Coping Card
		case 1319:

			$('.btn').on("click", function(ev){
				if(app.values.copingCard) {
					var card_id = app.values.copingCard.id;
				}
				app.values.copingCard = {
					feeling: $('select#feeling option:selected').text(),
					withPerson: $('select#withPerson option:selected').text(),
					conversationType: $('select#conversationType option:selected').text(),
					location: $('select#location option:selected').text(),
					physicalEffort: $('select#physicalEffort option:selected').text(),
					message: $('#situationBasedMessage').val(),
					cardLabel: $('#cardLabel').val(),
					id: card_id
				}
				if (app.values.copingCard.id) {
					p.update("situation_based_coping_cards", app.values.copingCard);
				}

				else {
					p.save("situation_based_coping_cards", app.values.copingCard);
				}
				app.values.copingCard = {};

			});


			break;

		// Time Based Coping Card
		case 1720:
			app.styleChecks();
			$('.btn').on("click", function(ev){
				var repeating_value = $('[name="repeating"]').is(':checked')
				var day_array = [];

				if(app.values.copingCard) {
					var card_id = app.values.copingCard.id;
				}

				_.each($(':checked'), function(el){
			    	if (el.getAttribute('name') == 'scheduledAtDay') {
			    		day_array.push($('[for='+el.id+']').text());
			    	}
			  	});

			  	app.values.copingCard = {
			  		message: $('#timeBasedMessage').val(),
					days: day_array,
					repeating: repeating_value,
					scheduledAtTime: $('#scheduledAtTime').val(),
					cardLabel: $('#cardLabel').val(),
					id: card_id
			  	}
                                                debugger;

				p.save("time_based_coping_cards", app.values.copingCard);
				app.purpleNew("time_based_coping_cards", app.values.copingCard);
				app.values.copingCard = {};

			});

			break;
	}

}
app.purpleSituation = function(assessment_name, guid, options) {

    var card_array = p.find("situation_based_coping_cards");
    var situation = {};
    situation.withPeople = [];
    situation.feelings = [];

    var situationCard = p.find(assessment_name, {guid: guid})[0];

    _.each(situationCard.responses, function(response) {

        if(response.question_id == 2){
            situation.feelings.push({emotion: "Mad", value :parsedValue(response.value)});
        }

        if(response.question_id == 3){
            situation.feelings.push({emotion:"Confident", value: parsedValue(response.value)});;
        }

        if(response.question_id == 4){
            situation.feelings.push({emotion:"Nervous", value: parsedValue(response.value)});;
        }

        if(response.question_id == 5){
            situation.feelings.push({emotion:"Sad", value: parsedValue(response.value)});;
        }

        if(response.question_id == 6){
            situation.feelings.push({emotion: "Happy", value: parsedValue(response.value)});;

        }
        if(response.question_id == 7){
            situation.feelings.push({emotion:"Guilty", value: parsedValue(response.value)});;

        }
        if(response.question_id == 8){
            situation.feelings.push({emotion:"Bored", value: parsedValue(response.value)});;
        }

        if(response.question_id == 10){
            situation.withPeople.push(response.value);
        }

        if(response.question_id == 12){
            situation.conversationType = response.label_text;
        }

        if(response.question_id == 13){
            situation.location = response.label_text;
        }

        if(response.question_id == 14){
            situation.physicalEffort = response.label_text;
        }

    });
    console.log(situation);

    _.each(card_array, function(card) {

        var situationObtains = [];

        _.each(situation.feelings, function(feeling){
            if((feeling.emotion == card.feeling && feeling.value == true) || card.feeling == "Any"){
                situationObtains.push(true);
            }
            else {

                situationObtains.push(false);
            }
        });

        _.each(situation.withPeople, function(person) {
            if(person == card.withPerson || card.withPerson == "Any"){

                situationObtains.push(true);
            }
            else {

                situationObtains.push(false);
            }
        });

        if(situation.conversationType == card.conversationType || card.conversationType == "Any"){
            situationObtains.push(true);
        }
        else{
            situationObtains.push(false);
        }

        if(situation.location == card.location || card.location == "Any"){
            situationObtains.push(true);
        }
        else{
            situationObtains.push(false);
        }

        if(situation.physicalEffort == card.physicalEffort || card.physicalEffort == "Any"){
            situationObtains.push(true);
        }
        else{
            situationObtains.push(false);
        }

        console.log(situationObtains);

        if (! _.contains(situationObtains, false)) {

            //app.purpleNew("situation_based_coping_card", card);
            var modal_content = "";

                modal_content += '<h2>Coping Card</h2><h3>' + card.message + '</h3><div><i class="icon-check icon-2x simplemodal-close"> Close</i></div>'
                $.modal(modal_content);

            }


    });


}
