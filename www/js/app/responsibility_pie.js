app.values.responsibilityPie = {};
app.views.responsibilityPie = function (id) {

	switch(id){
		case 1900:
			if(app.values.responsibilityPie){
				debugger;

				$('tbody').html("");

				var bodyHtml = "";

				_.each(app.values.responsibilityPie.peopleOrReasons, function(object){

					if(object.value != ""){

						bodyHtml += "<tr><td name='"+object.name+"'>"+object.value+"</td><td><input class='form-control' value=0 type='number' min=0 max=100 name='"+object.value+"'></td><tr>";
					}

				});

				$('tbody').append(bodyHtml);

			}
			break;

		case 1901:
			debugger;
			if(app.values.responsibilityPie){
				$(function () {
				 $('.pie-chart').highcharts({
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false
			        },
			        title: {
			            text: 'Share of Responsibility'
			        },


			        series: [{
			            type: 'pie',
			            name: 'Responsibility share',
			            data: app.values.responsibilityPie.responsibilityShare
			        }]
			    });
			});
			}

	}

}

// var totalRemainingPoints = function(){
// 	var totalCount = 0;

// 	_.each($('[type="number"]'), function (element) {
// 		totalCount += parseInt($(element).val());

// 	});

// 	return(100-totalCount);
// }

app.actions.responsibilityPie = function (id) {

	switch(id) {

		case 1784:
			app.actions.savePie(id);
			break;

		case 1900:
			$('[name="nextButton"]').on('click', function(ev){
				app.values.responsibilityPie.responsibilityShare = [];
				_.each($('input[type="number"]'), function(element){

					app.values.responsibilityPie.responsibilityShare.push([
						$(element).attr("name"),
						parseInt($(element).val())
					]);
				});

				p.save('responsibility_pie', app.values.responsibilityPie);

			});
			break;
	}


}

app.actions.savePie = function (id) {

	switch(id){

		case 1784:
			$('[name="nextButton"]').on('click', function(ev){
				debugger;
				app.values.responsibilityPie.peopleOrReasons = $('input[type="text"]').serializeArray();
				p.save('responsibility_pie', app.values.responsibilityPie);
			});
			break;
	}
}
