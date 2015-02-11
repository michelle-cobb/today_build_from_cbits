app.views.graphs = function(id) {

	switch(id) {
		case 1908:

			$('#graph-list').html('');
			$('#graph-list').append("<li class='graph-tile' id='mood-graph'><p>Mood Graph</p><i class='icon-bar-chart icon-2x'></i></li><li class='graph-tile' id='other-graph'><p>Other Chart</p><i class='icon-bar-chart icon-2x'</i></li>");
			break;

		case 1958:

			var sevenDays = [];
      var mappedMoods = [];
			var pastMoods = sevenDayMoods(p.find("assessment_1180"));

			for(var i=7; i >= 1; i--) {
				sevenDays.push(i.toString());
			}
      
		  _.each(sevenDays, function(day, index){
        mappedMoods.push([dayToDate(day), averageRatings(groupRatingsByDay(pastMoods, moment().startOf('day').subtract('days', (parseInt(day) - 1))))]);  
        sevenDays[index] = dayToDate(day);
      });

      console.log(mappedMoods);

      $(function () {
          $('#mood-graph-time').highcharts({
            title: {
                text: 'Weekly Mood Scores',
                x: -20 //center
            },
            xAxis: {
              title: {
                text: 'Day'
              },
                categories: sevenDays
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Mood'
                }
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

function dayToDate (day) {
  return moment().subtract('days', day-1).format('MMM Do')
}

function sevenDayMoods (moodRatings) {
  return _.filter(moodRatings, function(rating) { return moment(rating.timestamp) > moment().subtract('days', 7) }) 
}

function groupRatingsByDay (moodRatings, day) {
  return _.filter(moodRatings, function(rating) { return moment(rating.timestamp).startOf('day').diff(day, 'days') === 0 }) 
}

function averageRatings (moodRatings) {
  return _.reduce(moodRatings, function(memo, num) {
          return memo + num.responses[0].question_score;
        }, 0) / (moodRatings.length === 0 ? 1 : moodRatings.length);
}
