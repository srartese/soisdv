 	"use strict"; 
 	
 	google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {

      var data = google.visualization.arrayToDataTable([
        ["ID",      "Date",     "", "", "Enrollment"],
        ["1887-88", 1887,       0,  510,  510],
        ["1888-89", 1888,       0,  454,  454],
        ["1889-90", 1889,       0,  798,  798],
        ["1890-91", 1890,       0,  711,  711],
        ["1891-92", 1891,       0,  721,  721],
        ["1892-93", 1892,       0,  736,  736],
        ["1893-94", 1893,       0,  753,  753],
      ]);

      

      var options = {
        title: 'Correlation between life expectancy, fertility rate ' +
               'and population of some world countries (2010)',
        hAxis: {title: 'Date'},
		    vAxis: {title: ''},
        bubble: {textStyle: {fontSize: 11}}
      };

      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
    }
