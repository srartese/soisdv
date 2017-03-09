/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 5, 2017
*/


(function(){
 	"use strict";
 
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(init);

  var data, options, chart, curveBtn, chartState, timelineBtn, waterfallBtn;


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
    timelineBtn = document.getElementById('timelineBtn');
    timelineBtn.onclick = function(){
      drawSeriesChart();
    };
    waterfallBtn = document.getElementById('waterfallBtn');
    waterfallBtn.onclick = function(){
      drawWaterfallChart();
    };

  	chartState = "series";
  	chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      	
  	drawSeriesChart();
	  
  }

  function drawSeriesChart() {
    chartState = "series";
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
        gridlines: {count: 0, color: 'none'},
        viewWindowMode:'explicit',
        viewWindow:{
          max:21000,
          min:0
        },
        baselineColor: 'none'
      },
      vAxis: {
        title: '',
        format: '',
        gridlines: {count: 0, color: 'black'},
        baselineColor: 'black'
      },
      bubble: {textStyle: {fontSize: 11}},
      colorAxis: {colors:['#FFFF00','#FF0000']},
      sizeAxis: {minValue: 0, maxSize: 100},
      explorer:{
        axis: 'horizontal',
        maxZoomIn: 1,
        maxZoomOut: 8,
        zoomDelta: 1.1,
        keepInBounds: false
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
    chartState = "curve";
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
    options.explorer.maxZoomIn = .1;
    options.explorer.maxZoomOut = 1;
    options.explorer.zoomDelta = 1.1;
    options.tooltip.trigger = 'hover';

    chart.draw(data, options);
  }
  
  function filterByFive(){
    var fiveSOISdata = [];
    if(chartState == "series"){
      fiveSOISdata.push(["ID", "Date", "", "", "Enrollment"]);
      var totalEnrollment = 0;
      var fives = 0;
      var fivesEnrollment = 0;

      for(var i = 1; i < SOISdata.length; i++){
        var d = SOISdata[i];
        fives += d[4]*d[4]
        fivesEnrollment += d[3];
        if((i-1) % 5 == 0 && i != 1){
          fiveSOISdata.push([
            SOISdata[i-5][0].slice(0,4), (totalEnrollment+(fivesEnrollment/2.08)), 0, fivesEnrollment, fives
          ]);
          fives = 0;
          totalEnrollment += fivesEnrollment;
          fivesEnrollment = 0;
        }
      }

      options.hAxis.viewWindow.max = 98000
    }
    else if(chartState == "curve"){
      var fives = 0;
      fiveSOISdata.push(["ID", "Year", "Enrollment", "Size"]);
      for(var i = 1; i < SOISdata.length; i++){
        var d = SOISdata[i];
        fives += d[3]
        if((i-1) % 5 == 0 && i != 1){
          fiveSOISdata.push([
            SOISdata[i-5][0].slice(0,4), SOISdata[i-5][1], fives, fives
          ]);
          fives = 0
        }
      }
	  
      options.vAxis.viewWindow.max = 38000;
      options.sizeAxis.maxSize = 6;
    }

    data = new google.visualization.arrayToDataTable(fiveSOISdata);
    chart.draw(data, options);
  }
  
  function filterByTen(){

    var tenSOISdata = [];
    if(chartState == "series"){
      tenSOISdata.push(["ID", "Date", "", "", "Enrollment"]);
      var totalEnrollment = 0;
      var tens = 0;
      var tensEnrollment = 0;

      for(var i = 6; i < SOISdata.length; i++){
        var d = SOISdata[i];
        tens += d[4]*d[4]
        tensEnrollment += d[3];
        if((i-6) % 10 == 0 && i != 6){
          tenSOISdata.push([
            SOISdata[i-10][0].slice(0,4), (totalEnrollment+(tensEnrollment/2.08)), 0, tensEnrollment, tens
          ]);
          tens = 0;
          totalEnrollment += tensEnrollment;
          tensEnrollment = 0;
        }
      }

      options.hAxis.viewWindow.max = 180000
    }
    else if(chartState == "curve"){
      var tens = 0;
      tenSOISdata.push(["ID", "Year", "Enrollment", "Size"]);
      for(var i = 1; i < SOISdata.length; i++){
        var d = SOISdata[i];
        tens += d[3]
        if((i-6) % 10 == 0 && i != 6){
          tenSOISdata.push([
            SOISdata[i-10][0].slice(0,4), SOISdata[i-10][1], tens, tens
          ]);
          tens = 0;
        }
      }

      options.vAxis.viewWindow.max = 70000;
      options.vAxis.gridlines = {count: 6}
      options.sizeAxis.maxSize = 13;
    }
    
    data = new google.visualization.arrayToDataTable(tenSOISdata);
    chart.draw(data, options);
  }

  function drawWaterfallChart(){
    chartState = "waterfall";
    var wchart = new google.visualization.CandlestickChart(document.getElementById('series_chart_div'));
    // Disabling the button while the chart is drawing.
    waterfallBtn.disabled = true;
    google.visualization.events.addListener(chart, 'ready',
      function() {
        waterfallBtn.disabled = false;
      });
    
    var waterfallSOISdata = [];
    for(var i = 2; i < SOISdata.length; i++){
      var d = SOISdata[i];
      //console.log("[" + d[0].slice(0,4) +", "+ SOISdata[i-1][3] +", "+ SOISdata[i-1][3]+", "+ d[3]+", "+ d[3] +"]");
      waterfallSOISdata.push([
        d[0].slice(0,4), SOISdata[i-1][3], SOISdata[i-1][3], d[3], d[3]
      ]);
    }

    var wdata = new google.visualization.arrayToDataTable(waterfallSOISdata, true);

    var woptions = {
      title: 'RIT School of Individualized Studies Enrollment from 1885-2017',
      hAxis: {
        title: '', 
        format: '', 
        gridlines: {count: 10},
        viewWindowMode:'explicit',
      },
      vAxis: {
        title: '',
        format: '',
        gridlines: {count: 6},
        viewWindowMode:'explicit',
        viewWindow:{
          max:9000,
          min:0
        }
      },
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
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      },
      bar: { groupWidth: '100%' }
    };

    wchart.draw(wdata, woptions);
  }
  
  window.addEventListener("load", init);
}());
