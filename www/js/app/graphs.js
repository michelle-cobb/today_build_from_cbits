app.views.graphs = function(id) {

	switch(id) {
		case 1908:

			$('#graph-list').html('');
			$('#graph-list').append("<li class='graph-tile' id='mood-graph'><p>Mood Graph</p><i class='icon-bar-chart icon-2x'></i></li><li class='graph-tile' id='other-graph'><p>Other Chart</p><i class='icon-bar-chart icon-2x'</i></li>");
			break;

		case 1958:

			var sevenDays = [];

			for(var i=1; i <= 7; i++) {
				sevenDays.push(i.toString());
			}
			
			mappedMoods = [];

			var pastMoods = sevenDayMoods(p.find("assessment_1180"));
      
		  _.each(sevenDays, function(day){
        mappedMoods.push([day, averageRatings(groupRatingsByDay(pastMoods, moment().startOf('day').subtract('days', (parseInt(day) - 1))))])  
      })	

      $(function () {
		        $('#mood-graph-time').highcharts({
		            title: {
		                text: 'Daily Mood Score<br/>' +moment().subtract('days', 7).format("dddd, MMMM Do YYYY")+ " to " +moment().format("dddd, MMMM Do YYYY"),
		                x: -20 //center
		            },
		            xAxis: {
		            	title: {
		            		text: 'Day'
		            	},
		                categories: sevenDays
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
		                data: mappedMoods
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

function sevenDayMoods (moodRatings) {
  return _.filter(moodRatings, function(rating) { return moment(rating.timestamp) > moment().subtract('days', 7) }) 
}

function groupRatingsByDay (moodRatings, day) {
  return _.filter(moodRatings, function(rating) { return moment(rating.timestamp).startOf('day').diff(day, 'days') == 0 }) 
}

function averageRatings (moodRatings) {
 return _.reduce(moodRatings, function(memo, num) {
          return memo + num.responses[0].question_score;
        }, 0) / (moodRatings.length === 0 ? 1 : moodRatings.length);
}
