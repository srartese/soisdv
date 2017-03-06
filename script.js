/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 5, 2017
*/


(function(){
 	"use strict";
 
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(init);

  var data, options, chart, curveBtn, chartState, timelineBnt;

  function init(){
	 //Radio buttons!
	document.querySelector('#allRadio').onchange = function(e){
  		drawSeriesChart();
  	}
  	document.querySelector('#fiveRadio').onchange = function(e){
  		filterByFive();
  	}
  	document.querySelector('#tenRadio').onchange = function(e){
  		filterByTen();
  	}
  	
  	
  	curveBtn = document.getElementById('curveBtn');
    curveBtn.onclick = function(){
      drawCurveChart();
    };
    timelineBnt = document.getElementById('timelineBtn');
    timelineBtn.onclick = function(){
      drawSeriesChart();
    };


	chartState = "series";
	chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    	
	drawSeriesChart();
	  
  }

  function drawSeriesChart() {
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
   
    chart.draw(data, options);
  }
  
  function drawCurveChart(){
    // Disabling the button while the chart is drawing.
    curveBtn.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
      function() {
        curveBtn.disabled = false;
      });
    
    var curveSOISdata = [
      ["ID", "Year", "Enrollment", "Size"]
    ];
    for(var i = 1; i < SOISdata.length; i++){
      var d = SOISdata[i];
      curveSOISdata.push([
        d[0].slice(0,4), d[1], d[3], d[3]
      ]);
    }

    data = new google.visualization.arrayToDataTable(curveSOISdata);

    options.hAxis.gridlines = 14;
    options.hAxis.minorGridlines = 9;
    options.hAxis.viewWindow = {
      max: 2020,
      min: 1880
    }
    options.vAxis.gridlines = 9;
    options.vAxis.viewWindow = {
      max:9000,
      min:0
    };
    options.sizeAxis.maxSize = 5;
    options.explorer.maxZoomIn = .1
    options.explorer.maxZoomOut = 1;
    options.explorer.zoomDelta = 1.1;

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
  
  window.addEventListener("load", init);
}());
