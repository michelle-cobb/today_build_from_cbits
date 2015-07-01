app.purpleNew = function(key, object) {


    switch (key) {

        //get an array of days
        //get an array of times
        //construct a formatted time for each day-time combo
        //set a trigger for each day-time combo

        case "activity_reminder":
            // var card = object;
            // debugger;
            // var date_format = "yyyyMMddTHHmmss";
            // var today = Date.today().getDayName();
            // var seconds = app.actions.timeToSeconds(object.fire_date);


            var fire_date = _.where(card,{name:'when'})[0].value;
            // var trigger_event = new Date(seconds);
            // var end_date = trigger_event.add(1).minutes();
            // var new_trigger = {};
            // new_trigger.type = "datetime";
            // new_trigger.name = "activity_card";
            // new_trigger.identifier = "time-card-" + card.id + "-" + Date.now().toString(date_format);
            // new_trigger.action = "PurpleRobot.vibrate('blip'); PurpleRobot.playDefaultTone(); PurpleRobot.showNativeDialog('Activity','Go to the activity tracker to log your activity', 'CLOSE', 'PurpleRobot.launchApplication(\"edu.northwestern.cbits.today\")', 'PurpleRobot.emitToast(\"Go for it!\", true);', null);";

            // //new_trigger.action = "PurpleRobot.playDefaultTone();";
            // new_trigger.datetime_start = fire_date.toString(date_format);
            // new_trigger.datetime_end = end_date.toString(date_format);

            // PurpleRobotClient.updateTrigger(new_trigger.identifier, JSON.stringify(new_trigger), "");

    var amTriggerDateTime = fire_date;
    var amTriggerDateTimeEnd = fire_date.add(1).minutes();

    var pr = new PurpleRobot();

    var dialog =
    pr.showNativeDialog({
      title: "TODAY",
      message: "Go to the activity tracker and log your activity:"  ,
      buttonLabelA: "Yes",
      scriptA: pr.launchApplication('edu.northwestern.cbits.today'),
      buttonLabelB: "No",
      scriptB: pr.emitToast("Thanks, we will check in later!"),
      tag: "p20d",
      priority: 3
    });


    (new PurpleRobot()).updateTrigger({ triggerId:'activity'+Math.random(), random: false, script: dialog, startAt: amTriggerDateTime, endAt: amTriggerDateTimeEnd}).execute();


            p.save("triggers", {
                key: new_trigger.name,
                card_id: card.id,
                trigger_id: new_trigger.identifier,
                enabled: true
            });


            break;

        case "time_based_coping_cards":
            var card = object
            var seconds = app.actions.timeToSeconds(card.scheduledAtTime);
            var date_format = "yyyyMMddTHHmmss";
            var fire_date_array = [];
            var today = Date.today().getDayName();
            var parsed_date;

            _.each(card.days, function(day) {
                if (today == day) {
                    parsed_date = Date.parse(day).add(seconds).seconds();
                } else {
                    parsed_date = Date.parse('next ' + day).add(seconds).seconds();
                }

                fire_date_array.push(parsed_date);
            });
            _.each(fire_date_array, function(fire_date, idx) {
                var trigger_event = new Date(fire_date.valueOf());
                var end_date = trigger_event.add(1).minutes();
                var new_trigger = {};
                new_trigger.type = "datetime";
                new_trigger.name = "time_based_coping_card";
                new_trigger.identifier = "time-card-" + card.id + "-" + Date.now().toString(date_format) + idx;
                new_trigger.action = "PurpleRobot.vibrate('blip'); PurpleRobot.playDefaultTone(); PurpleRobot.showNativeDialog('COPE','" + card.message + "', 'CLOSE', PurpleRobot.launchApplication(\"edu.northwestern.cbits.today\"), 'PurpleRobot.emitToast(\"Hang in there!\", true);', null);";

                //new_trigger.action = "PurpleRobot.playDefaultTone();";
                new_trigger.datetime_start = fire_date.toString(date_format);
                new_trigger.datetime_end = end_date.toString(date_format);

                if (card.repeating) {
                    new_trigger.datetime_repeat = "FREQ=WEEKLY;INTERVAL=1";
                }



                /*var json = {};
		        json.command = "execute_script";
		        json.script = "PurpleRobot.updateTrigger(\"" + new_trigger.identifier + "\", " + JSON.stringify(new_trigger) + ");";*/

                /*var post_data = {};
		        post_data.json = JSON.stringify(json);

		        $.ajax(PurpleRobotClient.serverUrl, {
		          type: "POST",
		          contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		          data: post_data,
		          success: function(data)
		          {
		            alert("Trigger created. It will launch shortly after " + fire_date + "...");
		            console.log("TEST TRIGGER | ",post_data);
		            console.log("TEST TRIGGER RESPONSE: " + JSON.stringify(data));
		          },
		          error: function(jqXHR, textStatus, errorThrown) 
		          { 
		//            alert("Error creating trigger: " + errorThrown);
		            alert("error " + textStatus + " --- " + errorThrown); 
		          }
		        });*/

                PurpleRobotClient.updateTrigger(new_trigger.identifier, JSON.stringify(new_trigger), "");


                p.save("triggers", {
                    key: new_trigger.name,
                    card_id: card.id,
                    trigger_id: new_trigger.identifier,
                    enabled: true
                });

            })
            break;

        case "situation_based_coping_cards":

            var date_format = "yyyyMMddTHHmmss";
            var end_date = Date.now().add(30).seconds();

            var new_trigger = {};
            new_trigger.type = "datetime";
            new_trigger.name = "situation_based_coping_card";
            new_trigger.identifier = "situation-card-" + Date.now().toString(date_format);
            new_trigger.action = "PurpleRobot.vibrate('blip'); PurpleRobot.playDefaultTone(); PurpleRobot.showNativeDialog('COPE','" + card.message + "', 'CLOSE', null ,null, 'PurpleRobot.emitToast(\\'Hang in there!\\', true);');";
            new_trigger.datetime_start = Date.now().toString(date_format);
            new_trigger.datetime_end = end_date.toString(date_format);

            var json = {};
            json.command = "execute_script";
            json.script = "PurpleRobot.updateTrigger(\"" + new_trigger.identifier + "\", " + JSON.stringify(new_trigger) + ");";

            var post_data = {};
            post_data.json = JSON.stringify(json);

            $.ajax(PurpleRobotClient.serverUrl, {
                type: "POST",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: post_data,
                success: function(data) {
                    alert("Successful Trigger Request");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    // alert("Error creating trigger: " + errorThrown);
                    //            alert("error " + textStatus + " --- " + errorThrown); 
                }
            });
            break;
    }


}

/*app.purpleUpdate = function(key, object) {

	switch(key) {

		case "time_based_coping_cards":

			var triggers = p.find("triggers", {card_id: object.id});

			_.each(triggers, function(trigger){

				var json = {};
		        json.command = "execute_script";
		        json.script = "PurpleRobot.disableTrigger("+trigger.trigger_id+")";

		        var post_data = {};
		        post_data.json = JSON.stringify(json);

		        $.ajax(PurpleRobotClient.serverUrl, {
		          type: "POST",
		          contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
		          data: post_data,
		          success: function(data)
		          {
		          	trigger.enabled = false;
		        	p.update("triggers", trigger);
		            alert("Successful Trigger Request");
		          },
		          error: function(jqXHR, textStatus, errorThrown) 
		          { 
		            alert("Error creating trigger: " + errorThrown);
		//            alert("error " + textStatus + " --- " + errorThrown); 
		          }
		        });
		        
	    	});

	    	app.purpleNew(key, object);
	    	break;

	}

}*/