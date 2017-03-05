/* SOIS Data Visualization using Google Charts
	By Matthew Graham and Sara Artese
	Last Updated: March 4, 2017
*/


(function(){
 	"use strict";
 	
 	google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawSeriesChart);

    function drawSeriesChart() {
    
	// var data = new google.visualization.arrayToDataTable([
 //      ["ID", "Date", "", "", "Enrollment"],
 //      ["Test 2000", 2000, 0, 600, 600],
 //      ["Test 2001", 2001, 0, 1200, 1200],
 //      ["Test 2002", 2002, 0, 2400, 2400],
 //      ["Test 2003", 2003, 0, 4800, 4800],
 //      ["Test 2004", 2004, 0, 9600, 9600],
 //      ["Test 2000", 2005, 0, 600, 600],
 //      ["Test 2001", 2006, 0, 1200, 1200],
 //      ["Test 2002", 2007, 0, 2400, 2400],
 //      ["Test 2003", 2008, 0, 4800, 4800],
 //      ["Test 2004", 2009, 0, 9600, 9600],
 //      ["Test 2000", 2010, 0, 600, 600],
 //      ["Test 2001", 2011, 0, 1200, 1200],
 //      ["Test 2002", 2012, 0, 2400, 2400],
 //      ["Test 2003", 2013, 0, 4800, 4800],
 //      ["Test 2004", 2014, 0, 9600, 9600],
 //      ["Test 2000", 2015, 0, 600, 600],
 //      ["Test 2001", 2016, 0, 1200, 1200],
 //      ["Test 2002", 2017, 0, 2400, 2400],
 //      ["Test 2003", 2018, 0, 4800, 4800],
 //      ["Test 2004", 2019, 0, 9600, 9600],
 //      ["Test 2000", 2020, 0, 600, 600],
 //      ["Test 2001", 2021, 0, 1200, 1200],
 //      ["Test 2002", 2022, 0, 2400, 2400],
 //      ["Test 2003", 2023, 0, 4800, 4800],
 //      ["Test 2004", 2024, 0, 9600, 9600],
 //      ["Test 2000", 2025, 0, 600, 600],
 //      ["Test 2001", 2026, 0, 1200, 1200],
 //      ["Test 2002", 2027, 0, 2400, 2400],
 //      ["Test 2003", 2028, 0, 4800, 48000000],
 //      ["Test 2004", 2029, 0, 9600, 96000000],
 //    ]);

 var data = new google.visualization.arrayToDataTable(SIOSdata);
	
  // Opaque until on hover ?

  var options = {
    title: 'RIT School of Individualized Studies Enrollment from 1885-2017',
    hAxis: {
      title: '', 
      format: '', 
      gridlines: {
        count: 0,
      },
    },
    vAxis: {
      title: '',
      format: '',
      gridlines: {
        count: 0
      }
    },
    bubble: {textStyle: {fontSize: 11}},
    colorAxis: {colors:['#FF3333','#8133FF']},
    sizeAxis: {minValue: 0, maxSize: 20},
    explorer:{
      axis: 'horizontal'
    }
  };

  var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);
  }
    
	//window.addEventListener("load",init);
}());
