app.values.dailyReview = {};

app.actions.dailyReview = function (id, ev) {

	switch(id) {

		case 2005:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowHappened = $('#lowHappened').val();
				app.values.dailyReview.guid = guid();
				p.save("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Start Daily Review &amp; Updated Low Happened', response:app.values.dailyReview});

				console.log(app.values.dailyReview);
			});
				break;

		case 2006:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowOccurredWhen = $('input[name="lowOccurredWhen"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated Low Occurred When', response:app.values.dailyReview});

			});
			break;

		case 2008:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowWhatFeelings = $('input[name="lowWhatFeelings"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated Low What Feelings', response:app.values.dailyReview});


			});
			break;

		case 2009:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowFeelingReaction = $('input[name="lowFeelingReaction"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated Low Feeling Reaction', response:app.values.dailyReview});


				$.each(app.values.dailyReview.lowFeelingReaction, function (idx, object){
					p.save(object.value, object);
					PurpleRobotClient.emitReading("Daily_Review", {name:'Save Low Feeling Reaction', response:app.values.dailyReview});

				});

			});
			break;

		case 2010:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowLetFeelingsOut = $('input[name="lowLetFeelingsOut"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated Low Let Feelings Out', response:app.values.dailyReview});


				$.each(app.values.dailyReview.lowLetFeelingsOut, function (idx, object){
					p.save(object.value, object);
					PurpleRobotClient.emitReading("Daily_Review", {name:'Saved Low Let Feelings Out', response:app.values.dailyReview});

				});

			});
			break;

		case 2011:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowStressReaction = $('input[name="lowStressReaction"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Saved Low Stress Reaction', response:app.values.dailyReview});

				$.each(app.values.dailyReview.lowStressReaction, function (idx, object){
					p.save(object.value, object);
				});

			});
			break;

		case 2012:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowOtherActivitySpecfics = $('input[name="lowOtherActivitySpecfics"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Low Other Activity Specifics', response:app.values.dailyReview});

				$.each(app.values.dailyReview.lowOtherActivitySpecfics, function (idx, object){
					p.save(object.value, object);
				});

			});
			break;

		case 2013:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.lowCalmSpecifics = $('input[name="lowCalmSpecifics"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated Low Calm Specifics', response:app.values.dailyReview});


				$.each(app.values.dailyReview.lowCalmSpecifics, function (idx, object){
					p.save(object.value, object);
				});

			});
			break;

		case 2036:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highHappened = $('#highHappened').val();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High Happened', response:app.values.dailyReview});

			});
			break;

		case 2037:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highOccurredWhen = $('input[name="highOccurredWhen"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High Occurred When', response:app.values.dailyReview});
			});
			break;

		case 2038:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highWhatFeelings = $('input[name="highWhatFeelings"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High What Feelings', response:app.values.dailyReview});
			});
			break;

		case 2039:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highLocation = $('input[name="highLocation"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High Location', response:app.values.dailyReview});
			});
			break;

		case 2040:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highWithPeople = $('input[name="highWithPeople"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High With People', response:app.values.dailyReview});
			});
			break;

		case 2041:
			$('input[name="nextButton"]').on("click", function(){
				app.values.dailyReview.highCouldRepeat = $('input[name="highCouldRepeat"]').serializeArray();
				p.update("daily_reviews", app.values.dailyReview);
				app.values.dailyReview = {};
				PurpleRobotClient.emitReading("Daily_Review", {name:'Updated High Could Repeat', response:app.values.dailyReview});
			});
			break;

	}
}