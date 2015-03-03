var formatScore = ["Very Bad", "Bad", "A little Bad", "In Between/Mixed", "A Little Good", "Good", "Very Good"];


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
        case 2123:

      $('#review-graph').highcharts({
        chart: {
            type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                    style: {overflow: 'visible'}
            },
            title: {
                text: "Ways I've coped"
            },
            tooltip: {
              enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b> {point.percentage: .1f} %'
                    }
                }
            },
            series: [{

                name: 'Coping',
                data: dailyReviewData()
            }]
      });
      
          $('#report').append("<h2>Select the icon to see your data in more detail</h2><p><strong>I took control of the problem or my feelings <span id='control-count'></span> times</strong> <i id='0' class='icon-question-sign'></i></p><p><strong>I adapted to the problem <span id='adapt-count'></span> times</strong> <i id='1' class='icon-question-sign'></i></p><p><strong>I expressed my feelings <span id='express-count'></span> times:</strong> <i id='2' class='icon-question-sign'></i></p><p><strong>I lashed out, or took my feelings out on others <span id='lash-count'></span> times</strong> <i id='3' class='icon-question-sign'></i></p><p><strong>I avoided the situation <span id='avoid-count'></span> times</strong> <i id='4' class='icon-question-sign'></i></p>");
          $('#control-count').text(app.controlCount);
          $('#adapt-count').text(app.adaptCount);
          $('#express-count').text(app.expressCount);
          $('#lash-count').text(app.lashCount);
          $('#avoid-count').text(app.avoidCount);

          $('.icon-question-sign').on("click", function (ev){
       
                var modalContent = app.values.reportHTML[$(this).attr('id')];
                modalContent += "<a href='#' class='simplemodal-close' style='float:right;'>close</a>";
                $.modal(modalContent);

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

      $('#review-graph').on("click", function () {

        app.actions.goTo("",2123,app.contents);

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

app.values.dailyReviewSchema = [ 
                {"Taking Control": [
                         "I did something to make things better", 
                         "I asked someone for help", 
                         "I used an In the Moment Tool"
                         ]
                }, 
                  
                  {"Adapting": [
                          "I told myself that it isn’t a big deal", 
                        "I decided that I’m still ok, nobody’s perfect", 
                        "I tried to accept it the way it is",
                        "I tried to think about it in a different way", 
                        "I told myself everything would be all right",
                        "Excercised/played sports",
                        "Played video games or surfed the Web",
                        "Watched TV",
                        "Listened to music",
                        "Saw friends",
                        "Got something to eat",   
                        "Did a hobby",
                        "Did work or schoolwork",
                        "Other",
                        "Took deep breaths",
                        "Listened to music",
                        "Prayed or meditated",
                        "Took a break",
                        "Took a walk",
                        "Exercised"
                         ]
                }, 
                  
                  {"Expressing": [
                          "Crying or screaming",
                        "Talking to someone", 
                        "Writing in a journal/ diary",
                        "Singing, writing, or making other art"
                          ]
                },
                  
                  {"Lashing Out": [
                          "Yelling at somebody",
                                                "Hitting, slamming, or punching",
                                                "Being sarcastic/ making fun"
                          ]
                },
                  
                  {"Avoiding": [
                          "I tried not to think about it",
                        "I acted like nothing ever happened", 
                        "I wished the problem would just go away",
                        "I smoked cigarettes, took drugs, drank alcohol, or ate more than I wanted to",
                        "I couldn’t stop thinking about it, but I didn’t try anything to improve the situation or my feelings."
                        ]
                }
                ];

app.values.reportHTML = [];

var dailyReviewData = function() {

  var strategiesData = [];

  $.each(app.values.dailyReviewSchema, function(idx, object){

        var count = 0;

        app.values.reportHTML[idx] = "<div class='review-graph-modal'>";
    $.each(_.values(object), function(i, thing){
      $.each(thing, function(j, string){
        count += p.find(string).length;
                if(p.find(string).length > 0){
                    app.values.reportHTML[idx] += "<p><i class='icon-arrow-right'></i> " + string + " " + p.find(string).length + " times</p>";
                };
      });

    });
    
        app.values.reportHTML[idx] += "</div>";
        strategiesData.push({ name:_.keys(object)[0],y: count});

        switch(idx){
            case 0:
                app.controlCount = count;
                break;
            case 1:
                app.adaptCount = count;
                break
            case 2:
                app.expressCount = count;
                break;
            case 3:
                app.lashCount = count;
                break;
            case 4:
                app.avoidCount = count;
                break;
        }
    
  });
  return strategiesData;

}

app.values.whoWithCollection =[];
app.values.convoType = [];
app.values.MoodLocation = [];
app.values.activityLevel = [];

function dailyMoodAverage(moods) {
    var overall_moods = [];
    var averagedArray = [];
    _.each(moods, function(score) {
        overall_moods.push({score: score.responses[0].question_score, day: moment(score.updated_at).format('DDD')});
    });
    
    var grouped = _.groupBy(overall_moods, 'day');
    
    _.each(grouped, function (group){
        var aggregateScore;
        var score = 0;
        _.each(group, function (group_item){
            score += group_item.score
        });
        averageScore = (score / group.length);
        averagedArray.push(averageScore);
    });
    return averagedArray;
}

var moodGraphData = function() {

  var moodDataCollection = p.find("assessment_1180");
  var moodScoreArray = [];
  var filteredArray = [];
  var averagedArray = [];

  _.each(moodDataCollection, function (moodData){
    _.each(moodData.responses, function (object){
      
      var moodOverall = moodData.responses[0].question_score;
      
      if(object.question_id == 3 || object.question_id == 4 || object.question_id == 5 || object.question_id == 6){
        
        var name = object.value;
          
      }

      if(name){

        moodScoreArray.push({value: name, score: moodOverall, question_id: object.question_id});
      }

    });

  });

  _.each(moodScoreArray, function (object){

    var collectionOfSameResponses = _.where(moodScoreArray, {value: object.value});

    filteredArray.push(collectionOfSameResponses);

  });

  _.each(filteredArray, function (nestedObject){

    var scoreArray = _.pluck(nestedObject, 'score');
    var sum = 0;
    var average;
    
    _.each(scoreArray, function (value){
      sum += value;
    });
    
    average = sum/scoreArray.length;

    average = Number((average).toFixed(1));

    averagedArray.push({question_id: nestedObject[0].question_id, value: nestedObject[0].value, score: average});

  });

  app.values.whoWithCollection = filterDuplicates(_.where(averagedArray, {question_id: 3}));
  app.values.convoType = filterDuplicates(_.where(averagedArray, {question_id: 4}));
  app.values.moodLocation = filterDuplicates(_.where(averagedArray, {question_id: 5}));
  app.values.activityLevel = filterDuplicates(_.where(averagedArray, {question_id: 6}));

}


var filterDuplicates = function (collection) {

  var filteredList = [];

   _.each(collection, function (object){

    if(_.where(filteredList, {name: object.value}).length == 0){
      filteredList.push({name: object.value, data: [object.score]});
    }

   });
   return filteredList;
}

