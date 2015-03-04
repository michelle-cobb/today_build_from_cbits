app.values.positiveActivities = {};
app.values.positiveActivitiesLast = _.last(p.find("positive_activities")) || {};

app.actions.positiveActivities = function (id, ev) {

	var activities = app.values.positiveActivitiesLast;

	var appendChecks = function (positive_activities) {
		_.each(positive_activities, function (context) {
			_.each(context, function(element) {
				$('#'+element.id).prop('checked', true);
			});
		});
	};

	switch(id) {

		case 1392:
			app.styleChecks();
			appendChecks(activities);

			$('.btn').on("click", function(ev){
			
				var get_out_array = []

				_.each($('[name="outAndAboutTown"]:checked'), function(place){

					get_out_array.push({id: $(place).attr('id'), value: $(place).attr('value')});

				});
				app.values.positiveActivities.outAndAboutTown = get_out_array;
				p.save("positive_activities", app.values.positiveActivities);
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Out and About Town', response:app.values.positiveActivities});

			});
			break;
		
		case 1397:
			app.styleChecks();
			appendChecks(activities);


			$('.btn').on("click", function(ev){
			
				var be_social_array = []

				_.each($('[name="beSocial"]:checked'), function(social){

					be_social_array.push({id: $(social).attr('id'), value: $(social).attr('value')});

				});
				app.values.positiveActivities.beSocial = be_social_array;
				p.update("positive_activities", app.values.positiveActivities);
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Be Social', response:app.values.positiveActivities});

			});
			break;
		
		case 1404:
			app.styleChecks();
			appendChecks(activities);

			$('.btn').on("click", function(ev){
			
				var alone_time_array = []

				_.each($('[name="aloneTime"]:checked'), function(alone){

					alone_time_array.push({id: $(alone).attr('id'), value: $(alone).attr('value')});

				});
				app.values.positiveActivities.aloneTime = alone_time_array;
				p.update("positive_activities", app.values.positiveActivities);
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Alone Time', response:app.values.positiveActivities});

			});
			break;

		case 1413:
			app.styleChecks();
			appendChecks(activities);

			$('.btn').on("click", function(ev){
			
				var pamper_array = []

				_.each($('[name="pamperYourself"]:checked'), function(pamper){

					pamper_array.push({id: $(pamper).attr('id'), value: $(pamper).attr('value')});

				});
				app.values.positiveActivities.pamperYourself = pamper_array;
				p.update("positive_activities", app.values.positiveActivities);
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Postivie Activities', response:app.values.positiveActivities});


			});
			break;


		case 1417:
			app.styleChecks();
			appendChecks(activities);


			$('.btn').on("click", function(ev){
			
				var get_involved_array = []

				_.each($('[name="getInvolved"]:checked'), function(involve){

					get_involved_array.push({id: $(involve).attr('id'), value: $(involve).attr('value')});

				});
				app.values.positiveActivities.getInvolved = get_involved_array;
				p.update("positive_activities", app.values.positiveActivities);
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Get Involved', response:app.values.positiveActivities});


			});
			break;

		case 1419:
			app.styleChecks();
			appendChecks(activities);


			$('.btn').on("click", function(ev){
			
				var sweat_array = []

				_.each($('[name="workUpASweat"]:checked'), function(sweat){

					sweat_array.push({id: $(sweat).attr('id'), value: $(sweat).attr('value')});

				});
				app.values.positiveActivities.workUpASweat = sweat_array;
				p.update("positive_activities", app.values.positiveActivities);
				app.values.positiveActivitiesLast = _.last(p.find("positive_activities"));
				PurpleRobotClient.emitReading("Positive_Activities", {name:'Updated Work Up Sweat', response:app.values.positiveActivities});


			});
			break;

	}
}