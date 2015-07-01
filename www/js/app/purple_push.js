app.purpleNew = function(key, object) {

debugger;

    switch (key) {

        //get an array of days
        //get an array of times
        //construct a formatted time for each day-time combo
        //set a trigger for each day-time combo

        case "activity_reminder":

            var card = object;
            debugger;
            var date_format = "yyyyMMddTHHmmss";
            
            var today = Date.today().getDayName();

             // var seconds = app.actions.timeToSeconds(object.when);

            var fire_date = moment(card.when);
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

            var reminderTriggerDateTime = fire_date.subtract(10,'minutes');
            var reminderTriggerDateTimeEnd = fire_date.subtract(9,'minutes');

            var eventTriggerDateTime = fire_date;
            var eventTriggerDateTimeEnd = fire_date.add(1,'minutes');

            var reminderPrivateId = 'a-'+card.what+'-'+reminderTriggerDateTime+'-reminder';
            var eventPrivateId = 'a-'+card.what+'-'+eventTriggerDateTime;

            var pr = new PurpleRobot();

            var dialog =
            pr.showNativeDialog({
              title: "TODAY",
              message: "Hey, in 10 minutes, you said you were going to: \\n " + card.what + '\\nAre you going to?' ,
              buttonLabelA: "Yes",
              scriptA: pr.emitToast("Thanks, we will check in later!"),
              buttonLabelB: "No",
              scriptB: pr.emitToast("OK! Keep scheduling!").deleteTrigger(eventPrivateId),
              tag: "reminder",
              priority: 3
            });

            var secondDialog =
            pr.showNativeDialog({
              title: "TODAY",
              message: "Hey, you said you were going to: \\n" + card.what + '\\nGo to the activity tracker and tell us how it went!' ,
              buttonLabelA: "OK",
              scriptA: pr.persistEncryptedString('loadOnBoot','index.html#/general/1285','TODAY').launchApplication('edu.northwestern.cbits.today'),
              buttonLabelB: "",
              scriptB: pr.emitToast(""),
              tag: "reminder",
              priority: 3
            });

            (new PurpleRobot()).updateTrigger({ triggerId:reminderPrivateId, random: false, script: dialog, startAt: reminderTriggerDateTime.toDate(), endAt: reminderTriggerDateTimeEnd.toDate()}).execute();

            (new PurpleRobot()).updateTrigger({ triggerId:eventPrivateId, random: false, script: secondDialog, startAt: eventTriggerDateTime.toDate(), endAt: eventTriggerDateTimeEnd.toDate()}).execute();


            p.save("triggers", {
                key: card.what,
                card_id: card.eventPrivateId,
                trigger_id: card.eventPrivateId,
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
                new_trigger.action = "PurpleRobot.vibrate('blip'); PurpleRobot.playDefaultTone(); PurpleRobot.showNativeDialog('Coping Card','You scheduled a coping card! Here's your message to yourself:" + card.message + "', 'CLOSE', PurpleRobot.launchApplication(\"edu.northwestern.cbits.today\"), 'PurpleRobot.emitToast(\"Hang in there!\", true);', null);";

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