/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 8, 2017
*/


(function(){
 	"use strict";
 
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(init);

  var data, woptions, options, wchart, chart, curveBtn, chartState, filterState, timelineBtn, waterfallBtn;

  function init(){
	 //Radio buttons!
	  document.querySelector('#allRadio').onchange = function(e){
  		filterByAll();
  	}
  	document.querySelector('#fiveRadio').onchange = function(e){
  		filterByFive();
  	}
  	document.querySelector('#tenRadio').onchange = function(e){
  		filterByTen();
  	}
  	
  	curveBtn = document.getElementById('curveBtn');
    curveBtn.onclick = function(){
	    checkActive(curveBtn);
      drawCurveChart();
    };
    timelineBtn = document.getElementById('timelineBtn');
    timelineBtn.onclick = function(){
	    checkActive(timelineBtn);
      drawSeriesChart();
    };
    waterfallBtn = document.getElementById('waterfallBtn');
    waterfallBtn.onclick = function(){
	    checkActive(waterfallBtn);
      drawWaterfallChart();
    };
    

  	chartState = "series";
    filterState = "all";
  	chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  	drawSeriesChart();
	  
  }
  
  function checkActive(type){
	  var typeBtn = type;
	  var button = document.getElementsByTagName('button');
	  if($(button).hasClass('active')){
		 $(button).removeClass('active'); 
	  }
	  $(typeBtn).addClass('active');
  }

  function drawSeriesChart() {
    if(chartState == "waterfall"){
      chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    }
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
      title: '',
      titlePosition: 'none',
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
        gridlines: {count: 0},
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
        duration: 500,
        easing: 'out',
      },
      tooltip: {trigger: 'none'}
    };
   
    if(filterState == "five"){
      filterByFive();
    } else if(filterState == "ten"){
      filterByTen();
    } else{
      chart.draw(data, options);
    }
  }
  
  function drawCurveChart(){
    if(chartState == "waterfall"){
      chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    }
    chartState = "curve";
    
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
    
    options.title = '';
    options.titlePosition = 'none';
    options.hAxis.title = 'Year';
    options.hAxis.gridlines.count = 9;
    options.hAxis.viewWindow = {
      max: 2020,
      min: 1880
    }
    options.vAxis.title = 'Enrollment Number';
    options.hAxis.viewWindowMode = "explicit";
    options.vAxis.gridlines.count = 9;
    options.vAxis.viewWindow = {
      max:9000,
      min:0
    };
    options.vAxis.viewWindowMode = "explicit";
    options.sizeAxis.maxSize = 5;
    options.explorer.axis = "horizontal";
    options.explorer.maxZoomIn = .1;
    options.explorer.maxZoomOut = 1;
    options.explorer.zoomDelta = 1.1;
    options.tooltip.trigger = 'hover';

    if(filterState == "five"){
      filterByFive();
    } else if(filterState == "ten"){
      filterByTen();
    } else{
      chart.draw(data, options);
    }
  }
  
  function drawWaterfallChart(){
    if(chartState != "waterfall"){
      wchart = new google.visualization.CandlestickChart(document.getElementById('series_chart_div'));
    }
      
    var waterfallSOISdata = [];
    for(var i = 2; i < SOISdata.length; i++){
      var d = SOISdata[i];
      //console.log("[" + d[0].slice(0,4) +", "+ SOISdata[i-1][3] +", "+ SOISdata[i-1][3]+", "+ d[3]+", "+ d[3] +"]");
      waterfallSOISdata.push([
        d[0].slice(0,4), SOISdata[i-1][3], SOISdata[i-1][3], d[3], d[3]
      ]);
    }

    var wdata = new google.visualization.arrayToDataTable(waterfallSOISdata, true);

    woptions = {
      title: '',
      hAxis: {
        title: 'Year', 
        format: '', 
        gridlines: {count: 9},
        viewWindowMode:'explicit',
      },
      vAxis: {
        title: 'Enrollment Number',
        format: '',
        gridlines: {count: 9},
        viewWindowMode:'explicit',
        viewWindow:{
          max:9000,
          min:0
        },
      },
      animation:{duration:200, startup:false},
      sizeAxis: {minValue: 0, maxSize: 5},
      explorer:{
        axis: 'horizontal',
        maxZoomIn: 1,
        maxZoomOut: 8,
        zoomDelta: 1.1
      },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#FF0000' }, // red
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      },
      bar: { groupWidth: '100%' },
      legend: 'none',
    };
    if(chartState == "series"){
      woptions.animation.startup = true;
    }
    chartState = "waterfall";

    if(filterState == "five"){
      filterByFive();
    } else if(filterState == "ten"){
      filterByTen();
    } else{
      wchart.draw(wdata, woptions);
    }
  }

  function filterByFive(){
    filterState = "five";
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
    } else if(chartState == "waterfall"){
      var fivesHistory = SOISdata[1][3];
      var fives = 0;
      for(var i = 1; i < SOISdata.length; i++){
        var d = SOISdata[i];
        fives += d[3]
        if((i-1) % 5 == 0 && i != 1){
          fiveSOISdata.push([
            SOISdata[i-5][0].slice(0,4), fivesHistory, fivesHistory, fives, fives
          ]);
          fivesHistory = fives;
          fives = 0;
        }

      } 
      woptions.vAxis.viewWindow.max = 38000;
      woptions.vAxis.gridlines = {count: 6}
    }

    if(chartState == "waterfall"){
      data = new google.visualization.arrayToDataTable(fiveSOISdata, true);
      wchart.draw(data, woptions);
    } else{
      data = new google.visualization.arrayToDataTable(fiveSOISdata);
      chart.draw(data, options);
    }
  }

  function filterByAll(){
    filterState = "all";
    if(chartState == "series"){
      drawSeriesChart();
    } else if(chartState == "curve"){
      drawCurveChart();
    } else if(chartState == "waterfall"){
      drawWaterfallChart();
    }
  }
  
  function filterByTen(){
    filterState = "ten";
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
            SOISdata[i-10][0].slice(0,4) + "s", (totalEnrollment+(tensEnrollment/2.08)), 0, tensEnrollment, tens
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
            SOISdata[i-10][0].slice(0,4) + "s", SOISdata[i-10][1], tens, tens
          ]);
          tens = 0;
        }
      } 
      options.vAxis.viewWindow.max = 70000;
      options.vAxis.gridlines = {count: 6}
      options.sizeAxis.maxSize = 13;
    } else if(chartState == "waterfall"){
      var tensHistory = SOISdata[1][3];
      var tens = 0;
      for(var i = 1; i < SOISdata.length; i++){
        var d = SOISdata[i];
        tens += d[3]
        if((i-6) % 10 == 0 && i != 6){
          tenSOISdata.push([
            SOISdata[i-10][0].slice(0,4) + "s", tensHistory, tensHistory, tens, tens
          ]);
          tensHistory = tens;
          tens = 0;
        }

      } 
      woptions.vAxis.viewWindow.max = 70000;
      woptions.vAxis.gridlines = {count: 6}
    }
    if(chartState == "waterfall"){
      console.log("in")
      data = new google.visualization.arrayToDataTable(tenSOISdata, true);
      wchart.draw(data, woptions);
    } else{
      data = new google.visualization.arrayToDataTable(tenSOISdata);
      chart.draw(data, options);
    }
  }

  window.addEventListener("load", init);
}());
