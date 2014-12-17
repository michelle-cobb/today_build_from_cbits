app.values.activityTracker = {};

app.views.activityTracker = function (id){

	switch(id){

		case 2085:

			$('#question').append("<i class='icon-question-sign'></i>");

			var modalContent = "<h2>Please complete your positive activities checklist!</h2><a href='#' class='simplemodal-close' style='float:right;' >close</a>";
      
      $('.icon-question-sign').on("click", function (ev){

          $.modal(modalContent);

      });

			if(p.find("positive_activities").length > 0){

				var positiveList = _.last(p.find("positive_activities"));

				modalContent = "<h2>Review your list of Positive activities to help you plan!<h2><h3>Alone Time</h3><ul>"

				_.each(positiveList.aloneTime, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul>";

				modalContent += "<h3>Be Social</h3><ul>"

				_.each(positiveList.beSocial, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul>";
				
				modalContent += "<h3>Get Involved</h3><ul>"

				_.each(positiveList.getInvolved, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul>";

				modalContent += "<h3>Out and About</h3><ul>"

				_.each(positiveList.outAndAboutTown, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul>";

				modalContent += "<h3>Treat Yourself</h3><ul>"

				_.each(positiveList.pamperYourself, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul>";

				modalContent += "<h3>Work Up a Sweat</h3><ul>"

				_.each(positiveList.workUpASweat, function(activity){

					modalContent += "<li>"+activity.value+"</li>"

				});

				modalContent += "</ul><a href='#' class='simplemodal-close' style='float:right;' >close</a>";

			}
			
			if(app.values.activityTracker){

				_.each(app.values.activityTracker.activity, function(object){

					$('[name="'+object.name+'"]').val(object.value);

				});
			}
			
			break;

		case 2111:
			
			var today = moment();

			var activities = p.find("activity_tracker");

			_.each(activities, function(object){
				
				object.start = moment(object.activity[2].value);
			
			});
			
			var upcoming_activities = _.filter(activities, function(object){return object.start >= today});
			
			if(upcoming_activities.length > 0){
				
				$('#today-list').html('');

				var dateFormat = "LLL";

				_.each(upcoming_activities, function(object){

					var time = moment(object.activity[2].value);

    			var prettyTime = time.format(dateFormat);

					$('#today-list').append('<i class="icon-caret-right" id="'+object.id+'" style="float:left;""></i><li class="Guilty"> <dl> <dt> Plan</dt> <dd> '+object.activity[0].value+'</dd> <dt> Activity Type</dt> <dd> '+object.activity[1].value+'</dd> <dt> Date</dt> <dd> '+prettyTime+' </dl> </li>'); 
				
				});
				
				$('i').on("click", function (ev) {

        	app.values.activityTracker = p.find("activity_tracker", {id: parseInt($(this).attr("id"))})[0];
        	
        	app.actions.goTo("",2085,app.contents);
        		
        });
			}

			break;
		
		case 2112:

			var today = moment();

			var activities = p.find("activity_tracker");

			_.each(activities, function(object){
				
				object.start = moment(object.activity[2].value);
				
			});
			
			var unreviewed_activities = _.filter(activities, function(object){return object.start < today && object.reviewed == false});
			
			if(unreviewed_activities.length > 0){
				
				$('#today-list').html('');

				var dateFormat = "LLL";

				_.each(unreviewed_activities, function(object){

    				var time = moment(object.activity[2].value);

    				var prettyTime = time.format(dateFormat);

					$('#today-list').append('<i class="icon-caret-right" id="'+object.id+'" style="float:left;""></i><li class="Guilty"> <dl> <dt> Plan</dt> <dd> '+object.activity[0].value+'</dd> <dt> Activity Type</dt> <dd> '+object.activity[1].value+'</dd> <dt> Date</dt> <dd> '+prettyTime+' </dl> </li>'); 
				
				});
				
				$('i').on("click", function (ev) {

                	app.values.activityTracker = p.find("activity_tracker", {id: parseInt($(this).attr("id"))})[0];
                	
                	app.actions.goTo("",2086,app.contents);
        		
        		});
			
			}

			break;

		case 2113:
			
			var activities = p.find("activity_tracker", {reviewed:true});
			
			$('#today-list').html('');

			var dateFormat = "LLL";

			_.each(activities, function(object){
				
				var time = moment(object.activity[2].value);

				var prettyTime = time.format(dateFormat);
				
				$('#today-list').append('<i class="icon-caret-right" id="'+object.id+'" style="float:left;""></i><li class="Guilty"> <dl> <dt> Plan</dt> <dd> '+object.activity[0].value+'</dd> <dt> Activity Type</dt> <dd> '+object.activity[1].value+'</dd> <dt> Date</dt> <dd> '+prettyTime+' </dl> </li>'); 
			
			});

			$('i').on("click", function (ev) {

            	app.values.activityTracker = p.find("activity_tracker", {id: parseInt($(this).attr("id"))})[0];
            	
            	var modalContent = ""

            	$.each(app.values.activityTracker.activity, function (index, object){

            		switch(object.name){

            			case "plan":
            				
            				modalContent += "<h4>Plan</h4><p>"+object.value+"</p>"
            				
            				break;

            			case "what":

            				modalContent += "<h4>Activity Type</h4><p>"+object.value+"</p>"

            				break;

            			case "when":

            				var time = moment(object.value);

            				var prettyTime = time.format(dateFormat);

            				modalContent += "<h4>Date</h4><p>"+prettyTime+"</p>"

            				break;
						
						      case "confident":

            				modalContent += "<h4>How confident were you?</h4><p>"+object.value+"</p>"

            				break;

            			case "nervous":

            				modalContent += "<h4>How nervous were you before doing this?</h4><p>"+object.value+"</p>"

            				break;

            			case "important":
            				
            				modalContent += "<h4>How important was this?</h4><p>"+object.value+"</p>"

            				break;

            		}

         		});

            	$.each(app.values.activityTracker.review, function (index, object){
            			
            		switch(object.name){

            			case "complete":

            				modalContent += "<h4>Completed?</h4><p>"+object.value+"</p>"

            				break;

            			case "nervous":

            				modalContent += "<h4>Nervous while doing</h4><p>"+object.value+"</p>"

            				break;

						      case "accomplished":

            				modalContent += "<h4>Sense of accomplishment felt</h4><p>"+object.value+"</p>"

            				break;

            			case "mood-radio":

            				modalContent += "<h4>Mood after</h4><p>"+object.value+"</p>"

            				break;

            		}

            	});

   				modalContent += "<a class='simplemodal-close'>Close</a>";

            	$.modal(modalContent);
    		
    		});

			break;

	}

}

app.actions.activityTracker = function (id){

	switch(id){

		case 2085:
			app.actions.saveActivity(id);
			break;

		case 2086:
			app.actions.saveActivity(id);
			break;

	}

}

app.actions.saveActivity = function (id){

	switch(id){

		case 2085:

			$('[name="saveButton"]').on("click", function(ev){

				app.values.activityTracker.activity = $('.form-control').serializeArray();

				app.values.activityTracker.reviewed = false;

				p.save("activity_tracker", app.values.activityTracker);

				app.values.activityTracker = {};

			});

			break;

		case 2086:

			$('[name="saveButton"]').on("click", function(ev){

				app.values.activityTracker.review = $('[type="radio"], input').serializeArray();

				app.values.activityTracker.reviewed = true;

				p.save("activity_tracker", app.values.activityTracker);

				app.values.activityTracker = {};

			});

			break;

	}

}