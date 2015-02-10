app.views.graphs = function(id) {

	switch(id) {
		case 1908:

			$('#graph-list').html('');
			$('#graph-list').append("<li class='graph-tile' id='mood-graph'><p>Mood Graph</p><i class='icon-bar-chart icon-2x'></i></li><li class='graph-tile' id='other-graph'><p>Other Chart</p><i class='icon-bar-chart icon-2x'</i></li>");
			break;

		case 1958:

			var overall_moods = [];

			var mood_scores = p.find("assessment_1180");
			
			_.each(mood_scores, function(score) {
				overall_moods.push(score.responses[0].question_score);
			});

			var numbers = [];

			var startDate = localStorage.startdate;
			var currentDate = new Date();

			for(var i=1; i <= 7; i++) {
				numbers.push(i.toString());
			}
			
      $(function () {
		        $('#mood-graph-time').highcharts({
		            title: {
		                text: 'Daily Mood Score<br/>' +startDate+ " to " +currentDate,
		                x: -20 //center
		            },
		            xAxis: {
		            	title: {
		            		text: 'Day'
		            	},
		                categories: numbers
		            },
		            yAxis: {
		                title: {
		                    text: 'Mood'
		                },
		                plotLines: [{
		                    value: 0,
		                    width: 1,
		                    color: '#808080'
		                }]
		            },
		            legend: {
		                layout: 'vertical',
		                align: 'right',
		                verticalAlign: 'middle',
		                borderWidth: 0
		            },
		            series: [{
		                name: 'Mood Rater',
		                data: overall_moods
		            }],
		            exporting: {
         				enabled: false
					}
		        });
    		});
			break;

	}
}

app.actions.graphs = function(id) {

	switch(id) {
		case 1908:
			$('#mood-graph').on("click", function () {

				app.actions.goTo("",1958,app.contents);

			});
			break;
	}
}
