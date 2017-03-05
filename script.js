/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 4, 2017
*/


(function(){
 	"use strict";
 	    function drawSeriesChart() {	
	    
	    var data = new google.visualization.DataTable(json);
	
      // Opaque until on hover ?

      var options = {
        title: 'RIT School of Individualized Studies Enrollment from 1885-2017',
        hAxis: {title: 'Year',format: ''},
		vAxis: {title: '', format: ''},
        bubble: {textStyle: {fontSize: 11}},
        colorAxis: {colors:['#FF3333','#8133FF']},
        sizeAxis: {minValue: 0,  maxSize: 50}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
    
	window.addEventListener("load", drawSeriesChart);
}());
