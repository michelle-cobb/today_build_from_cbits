	app.values.tracs = [];


app.views.trap = function (id) {


	switch(id){
		
		case 1575:
		app.values.trac = {};
		break;
	}

}

app.actions.trap = function (id) {


	switch(id){
		
		case 1959:

			app.values.tracs = p.find("tracs");
			
			if (app.values.tracs.length > 0) {
				$("ul#today-list").html("");
					_.each(app.values.tracs, function(trap, idx){
	            		$("ul#today-list").append("<i class='icon-caret-right' id='"+trap.guid+"' value='"+trap.id+"' style='float:left;'></i><li class="+trap.response+"><dl class='today-description'><dt>Trigger</dt><dd>"+trap.trigger+"</dd><dt>Thought</dt><dd>"+trap.response+"</dd><dt>Avoidance Pattern</dt><dd>"+trap.avoidance_pattern+"</dd></dl></li>");
	            	});

	        }


	        $('i').on("click", function (ev) {
                app.values.trac = _.first(p.find("tracs", {id: parseInt($(this).attr("value"))}));
                app.values.trap_guid = $(this).attr("id");
                app.actions.goTo("",1637,app.contents);
        	});

	        break;
		

		case 1637:
			
			var trac = {};

			if(app.values.trac){
				
				trac = app.values.trac;
				
				$('#trigger').val(trac.trigger);
				$('#consequence').val(trac.consequence);
				$('#response').val(trac.response);
				$('#pattern').val(trac.avoidance_pattern);
				$('#pattern').val(trac.avoidance_pattern);
				$('#alternateCopingStrategy option:contains("'+trac.alternateCopingStrategy+'")').prop('selected',true)
				// $('#alternateCopingStrategy option:selected').text(trac.alternateCopingStrategy);
				// alert(trac.getBackOnTrac);
				$('#getBackOnTrac option:contains("'+trac.getBackOnTrac+'")').prop('selected',true)

				// $('#getBackOnTrac option:selected').text(trac.getBackOnTrac);
			}
			$('.btn').on("click", function (ev) {
				trac.alternateCopingStrategy = $('#alternateCopingStrategy option:selected').text();
				trac.getBackOnTrac = $('#getBackOnTrac option:selected').text();
				trac.trigger = $('#trigger').val();
				trac.consequence = $('#consequence').val();
				trac.response = $('#response').val();
				trac.avoidance_pattern = $('#pattern').val();
				p.save("tracs", trac);
				app.values.trac = {};

				var hash_number = 0;
				
				switch($('#getBackOnTrac option:selected').text()) {

					case "Goal Tracker":
						hash_number = 1422;
						break;
					case "Calendar":
						hash_number = 1285;
						break;
					case "Positive Activity List":
						hash_number = 1284;
						break;
					case "Thought Record":
						hash_number = 1286;
						break;
					case "Coping Card":
						hash_number = 1288;
						break;
					case "Problem Solver":
						hash_number = 1287;
						break;

				}

					app.actions.goTo("",hash_number,app.contents);
			});

			
			break;

			

	}
}