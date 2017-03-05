/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 4, 2017
*/


(function(){
 	"use strict";
 	
 	google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawSeriesChart);

  function drawSeriesChart() {

    var weightedSOISdata = [
      ["ID", "Date", "", "", "Enrollment"],
    ];
    var totalEnrollment = 0.0;
    for(var i = 1; i < SOISdata.length; i++){
      var d = SOISdata[i];
      totalEnrollment += d[3]/2.08;
      weightedSOISdata.push([
        d[0].slice(0,4), totalEnrollment, d[2], d[3], d[4]*d[4]
      ]);
      totalEnrollment += d[3]/2.08;
    }

    var data = new google.visualization.arrayToDataTable(weightedSOISdata);

    /*var testSOISdata = [
      ["ID", "Date", "", "", "Enrollment"],
      ["1", 324, 0, 600, 360000],
      ["2", 1296, 0, 1200, 1440000],
      ["3", 3240, 0, 2400, 5760000],
      ["4", 7128, 0, 4800, 23040000],
      ["5", 14912, 0, 9600, 92160000],
      ["6", 22688, 0, 4800, 23040000]
    ];
    var totalEnrollment = 0;*/

    //var data = new google.visualization.arrayToDataTable(testSOISdata);
  	
    // Opaque until on hover ?

    var options = {
      title: 'RIT School of Individualized Studies Enrollment from 1885-2017',
      hAxis: {
        title: '', 
        format: '', 
        gridlines: {count: 0},
        viewWindowMode:'explicit',
        viewWindow:{
          max:21000,
          min:0
        }
      },
      vAxis: {
        title: '',
        format: '',
        gridlines: {count: 0},
      },
      bubble: {textStyle: {fontSize: 11}},
      colorAxis: {colors:['#FFFF00','#FF0000']},
      sizeAxis: {minValue: 0, maxSize: 100},
      explorer:{
        axis: 'horizontal',
        maxZoomIn: 1,
        maxZoomOut: 1
      },
      tooltip: {trigger: 'none'}
    };

    var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
    
	window.addEventListener("load", drawSeriesChart);

}());
