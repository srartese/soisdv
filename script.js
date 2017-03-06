/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 5, 2017
*/


(function(){
 	"use strict";
 	
 google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawSeriesChart);

  var data, options, chart, parabolaBtn;

  function drawSeriesChart() {
    
    document.querySelector('#allRadio').onchange = function(e){
  		drawSeriesChart();
  	}
  	document.querySelector('#fiveRadio').onchange = function(e){
  		filterByFive();
  	}
  	document.querySelector('#tenRadio').onchange = function(e){
  		filterByTen();
  	}

  	
    parabolaBtn = document.getElementById('parabolaBtn');
    parabolaBtn.onclick = function(){
      drawParabolaChart();
    };

    var weightedSOISdata = [
      ["ID", "Date", "", "", "Enrollment"],
    ];
    var totalEnrollment = 0.0;
    for(var i = 1; i < SOISdata.length;i++){
      var d = SOISdata[i];
      totalEnrollment += d[3]/2.08;
      weightedSOISdata.push([
        d[0].slice(0,4), totalEnrollment, d[2], d[3], d[4]*d[4]
      ]);
      totalEnrollment += d[3]/2.08;
    }

    data = new google.visualization.arrayToDataTable(weightedSOISdata);

    // Opaque until on hover ?

    options = {
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
        maxZoomOut: 8,
        zoomDelta: 1.1
      },
      animation:{
        duration: 1000,
        easing: 'out',
      },
      tooltip: {trigger: 'none'}
    };

    chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);
  }
  
  function drawParabolaChart(){
    // Disabling the button while the chart is drawing.
    parabolaBtn.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
        function() {
          parabolaBtn.disabled = false;
        });

    var parabolaSOISdata = [
      ["ID", "Year", "Enrollment", "Size"]
    ];
    for(var i = 1; i < SOISdata.length; i++){
      var d = SOISdata[i];
      parabolaSOISdata.push([
        d[0].slice(0,4), d[1], d[3], d[3]
      ]);
    }

    options = {
      title: 'RIT School of Individualized Studies Enrollment from 1885-2017',
      hAxis: {
        title: '', 
        format: '', 
        gridlines: {count: 5},
        minorGridlines: {count:9},
        viewWindowMode:'explicit',
        viewWindow:{
          max:1930,
          min:1880
        }
      },
      vAxis: {
        title: '',
        format: '',
        gridlines: {count: 10},
        viewWindowMode:'explicit',
        viewWindow:{
          max:8000,
          min:0
        }
      },
      bubble: {textStyle: {fontSize: 11}},
      colorAxis: {colors:['#FFFF00','#FF0000']},
      sizeAxis: {minValue: 0, maxSize: 5},
      tooltip: {trigger: 'none'},
      explorer:{
        axis: 'horizontal',
        maxZoomIn: 1,
        maxZoomOut: 4,
        zoomDelta: 1.1
      },
      animation:{
        duration: 1000,
        easing: 'out',
      },
    };

    chart.draw(data, options);
  }
  
  function filterByFive(){
	var fiveSOISdata = [
      ["ID", "Date", "", "", "Enrollment"],
    ];
    var totalEnrollment = 0.0;
    for(var i = 1; i < SOISdata.length; i =i+ 5){
      var d = SOISdata[i];
      totalEnrollment += d[3]/2.08;
      fiveSOISdata.push([
        d[0].slice(0,4), totalEnrollment, d[2], d[3], d[4]*d[4]
      ]);
      totalEnrollment += d[3]/2.08;
    }
    
     data = new google.visualization.arrayToDataTable(fiveSOISdata);
     chart.draw(data, options);
  }
  
  function filterByTen(){
	  	var fiveSOISdata = [
      ["ID", "Date", "", "", "Enrollment"],
    ];
    var totalEnrollment = 0.0;
    for(var i = 6; i < SOISdata.length; i =i+ 10){
      var d = SOISdata[i];
      totalEnrollment += d[3]/2.08;
      fiveSOISdata.push([
        d[0].slice(0,4), totalEnrollment, d[2], d[3], d[4]*d[4]
      ]);
      totalEnrollment += d[3]/2.08;
    }
    
     data = new google.visualization.arrayToDataTable(fiveSOISdata);
     chart.draw(data, options);
  }
  
  window.addEventListener("load", drawSeriesChart);
}());
