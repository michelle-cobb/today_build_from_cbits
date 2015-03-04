app.values.problemSolver = _.last(p.find("problems")) || {};

app.views.problemSolver = function (id) {

	var problems = p.find("problems") || [];

	switch(id) {

		case 1456:
			if (app.values.problemSolver) {
				
				if($('.icon-edit-sign').length == 0) {
					$('.content_panel').prepend("<i class='icon-edit-sign icon-2x pull-right'> Edit</i>");
				};
				
				$("#problemLabel").html("");
				
				$("#problemLabel").append(app.values.problemSolver.problemLabel);
				

				
				$('#desired-outcomes').html("");

				_.each(app.values.problemSolver.goals, function (goal) {
					$('#desired-outcomes').append("<li>"+goal.value+"</li>");
				});

				$('#solutions').html("");

				_.each(app.values.problemSolver.solutions, function (solution, idx) {
					$('#solutions').append('<tr id="row'+idx+'"><td id="solution'+idx+'">'+solution.value+'</td><td><div class="big-check"><input class="larger check'+idx+'" id="goal-help'+idx+'" type="checkbox"></div></td><td><div class="big-check"><input class="larger check'+idx+'" id="minimal-effects'+idx+'" type="checkbox"></div></td></tr>');
					
					if(solution.help) {
						$('#goal-help'+idx).prop('checked', true);
					}
					
					if(solution.minimalEffects) {
						$('#minimal-effects'+idx).prop('checked', true);
					}
				});
				
				highlightRow();

				var modal_content = "";
				
				modal_content += '<div class="modal-close"><i class="pull-right icon-ok-sign icon-2x simplemodal-close"></i></div><h3>Edit Problem</h3><p>Title</p><div class="form-group"><input class="form-control" id="problem-label-modal" type="text" value="'+app.values.problemSolver.problemLabel+'"/><p>Goals</p>';

				_.each(app.values.problemSolver.goals, function (goal) {
					modal_content += '<input style="margin:4px;" class="form-control" name="problemGoal" type="text" value="'+goal.value+'"/>';
				});
				
				modal_content += '<p>Solutions</p>'
				
				_.each(app.values.problemSolver.solutions, function (solution) {
					modal_content += '<input style="margin:4px;" class="form-control" name="solutionName" type="text" value="'+solution.value+'"/>';
				});
				
				modal_content +='</div>'

				$('.icon-edit-sign').on("click", function(){
					$.modal(modal_content, {opacity:80, onClose: function() {
							app.values.problemSolver.problemLabel = $('#problem-label-modal').val();
							app.values.problemSolver.solutions = $('input[name="solutionName"]').serializeArray();
							app.values.problemSolver.goals = $('input[name="problemGoal"]').serializeArray();
							_.each(app.values.problemSolver.solutions, function (solution, idx) {
								solution.help = $('#goal-help'+idx).is(':checked');
								solution.minimalEffects = $('#minimal-effects'+idx).is(':checked');
							});
							p.update("problems", app.values.problemSolver);
							$.modal.close();
							app.actions.goTo("", 1456, app.contents)
						} 
					});
				});

			}
			break;

		case 1745:
			//This is just to append a random class to the list item so that the tiles are multi-colored
			var hex_color_array = ["#782670", "#5B226B", "#643591", "#68267A"];
			
			if (problems.length > 0){
		        $("ul#today-list").html("");
		        _.each(problems, function(el, idx){

		        	if(el.preferredSolution) {
		        		var solution_index = parseInt(_.last(el.preferredSolution.split('-')[1]));
		        	}

		            $("ul#today-list").append("<i class='icon-caret-right' id='today-list-icon"+idx+"' value='"+el.id+"' style='float:left;'></i><li style='background-color: "+randomClass(hex_color_array)+"'><dl class='today-description'><dt>Problem</dt><dd>"+el.problemLabel+"</dd><div id='goals"+idx+"'><dt>Goals</dt></div><div id='solutions"+idx+"'><dt>Solutions</dt></div></dl></li>");

		            _.each(el.goals, function(goal){ 
		            	$('#goals'+idx).append("<dd>"+goal.value+"</dd>");
		            });
		            _.each(el.solutions, function(solution, index){

		            	if(index == solution_index) {
		            		$('#solutions'+idx).append('<dd id="'+index+idx+'""><i class="icon-check preferred-solution"></i>'+solution.value+'</dd>');
		            	}
		            	else {
		            		$('#solutions'+idx).append("<dd id='"+index+idx+"'>"+solution.value+"</dd>");

		            	}
		            	if(solution.help == true && solution.minimalEffects == true){
		            		$('#'+index+idx).addClass("yellow");
		            	}

		            });
		        });


		        $('.icon-caret-right').on("click", function (ev) {
	                app.values.problemSolver = p.find("problems", {id: parseInt($(this).attr("value"))})[0];
	                app.actions.goTo("",1456,app.contents);
	        	});
			}
			else{

				$("ul#today-list").html('<li><i>You haven\'t added any problems yet</i></li>');

			}
			break;

		case 1956:
			var solutions = app.values.problemSolver.solutions;

			$("#solution-radios").html("");
			_.each(solutions, function(solution, idx) {
				if(solution.help == true && solution.minimalEffects == true){

					$("#solution-radios").append('<label class="radio"><input type="radio" name="solutionRadios" id="optionsRadios-'+idx+'">'+solution.value+' <i class="icon-check" style="color:yellow;"></i></label>');
				}

				else {
					$("#solution-radios").append('<label class="radio"><input type="radio" name="solutionRadios" id="optionsRadios-'+idx+'">'+solution.value+'</label>');
				}
			});
			break;
			

	}

}

var highlightRow = function () {
	for (var i = 0; i <  app.values.problemSolver.solutions.length; i++) {
		if ($('.check'+i+':checked').length == 2) {
			$('#row'+i).css({"background-color":"#DBC758"});
			$('#solution'+i).css({"color":"black"});
		}
		else {
			$('#row'+i).css({"background-color":"#432463"});
			$('#solution'+i).css({"color":"white"});

		}
	}
}

var highlightRowSample = function () {
	for (var i = 0; i <  5; i++) {
		if ($('.check'+i+':checked').length == 2) {
			$('#row'+i).css({"background-color":"#DBC758"});
			$('#solution'+i).css({"color":"black"});
		}
		else {
			$('#row'+i).css({"background-color":"#432463"});
			$('#solution'+i).css({"color":"white"});

		}
	}
}

app.actions.problemSolver = function(id, ev) {
	
	switch(id) {

		case 1423:
			app.actions.problemSolverSave(id);
			break;

		case 1455:

			// $('input.larger').on('click', function (ev) {

			// 	highlightRowSample();
				
			// });
			break;

		case 1457:
			app.actions.problemSolverSave(id);
			break;

		case 1743:
			app.actions.problemSolverSave(id);
			break;

		case 1456:

			$('input.larger').on('click', function (ev) {

				highlightRow();
				
			});

			app.actions.problemSolverSave(id);
			break;

		case 1956:
			app.actions.problemSolverSave(id);
			break;

	}
}


app.actions.problemSolverSave = function(id, ev) {

	switch(id) {

		case 1423:

			$('.btn').on("click", function (ev){
				app.values.problemSolver.id = null;
				app.values.problemSolver.problemLabel = $('#problemLabel').val();
				p.save("problems", app.values.problemSolver);
				PurpleRobotClient.emitReading("ProblemSolver", {name:'Create Problem', response:app.values.problemSolver});

			});
			break;

		case 1457:
			$('.btn').on("click", function (ev){
				app.values.problemSolver.solutions = $('input[name="solutionName"]').serializeArray();
				p.update("problems", app.values.problemSolver);
				PurpleRobotClient.emitReading("ProblemSolver", {name:'Update Solution Name', response:app.values.problemSolver});

			});
			break;

		case 1743:
			$('.btn').on("click", function (ev){
				app.values.problemSolver.goals = $('input[name="problemGoal"]').serializeArray();
				p.update("problems", app.values.problemSolver);
				PurpleRobotClient.emitReading("ProblemSolver", {name:'Update Problem Goal', response:app.values.problemSolver});
			});
			break;

		case 1456:
			$('.btn').on("click", function (ev){
				_.each(app.values.problemSolver.solutions, function (solution, idx) {
					solution.help = $('#goal-help'+idx).is(':checked');
					solution.minimalEffects = $('#minimal-effects'+idx).is(':checked');
				});

				p.update("problems", app.values.problemSolver);
				PurpleRobotClient.emitReading("ProblemSolver", {name:'Update Solutions / Help / Minimal Effects', response:app.values.problemSolver});

			});
			break;
		case 1956:
			$('.btn').on("click", function (ev) {
				app.values.problemSolver.preferredSolution = $('[name="solutionRadios"]:checked').attr("id");
				p.update("problems", app.values.problemSolver);
				PurpleRobotClient.emitReading("ProblemSolver", {name:'Update Preferred Solutions', response:app.values.problemSolver});

				app.values.problemSolver.id = null;
			});
			break;

	}

}

