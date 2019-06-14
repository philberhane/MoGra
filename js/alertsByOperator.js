document.querySelector('.chart').innerHTML = '<div id="alertFilter" style="background-color: white;float:right;padding-bottom: 10px"><div><div ><h3 style="font-size: 18px; padding-top:10px">Manufacturing Floor: Alerts By Operator</h3><button style="cursor:pointer" id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button><br><div id="toggleFilter" style="display: none"><p>Dates</p><input style="border-radius: 5px; border: 1px solid grey" type="date" id="date1"> - <input style="border-radius: 5px; border: 1px solid grey" type="date" id="date2"> <br><p>Times</p><input style="border-radius: 5px; border: 1px solid grey" type="time" id="time1" > - <input style="border-radius: 5px; border: 1px solid grey" type="time" id="time2"> <br><button id="filterFunction" onClick="filterFunction()">GO</button></div></div></div>'
document.querySelector('.chart').innerHTML += '<div id="container" style="margin-top: 150px; width: 900; height: 650px;"></div>'
document.querySelector('.anima-valign-text-middle').innerHTML = ''
document.querySelector('.hed').firstElementChild.nextElementSibling.innerHTML = '<img width="100%" src="images/logo.png" >'
document.querySelectorAll('.industrialnetworkm ')[3].style.color = 'white'

document.querySelector('.chart').style.display = 'block'

				 $.ajax({
					 url: 'json_read/mogra_event.json',
					 contentType: 'application/json',
					 dataType: 'json',
					 success: function (data) {
							 //console.log(data);
							 // Logic: Loop through alerts array -> create an array full of endpoints
							 readJsonData = data
							 var arrayOfAlerts = []
							 for (i=0; i<data.mogra_event.alerts.length; i++) {
									 if(sessionStorage.length === 0) {
								 var object = {
									 date : data.mogra_event.alerts[i].timestamp,
									 user: data.mogra_event.alerts[i].user,
									 count: 0
								 }
								 arrayOfAlerts.push(object)
							 }
							else {
							 var beginDate = sessionStorage.beginDate
							 var endDate = sessionStorage.endDate
							 var beginTime = sessionStorage.beginTime
				       var endTime = sessionStorage.endTime

							 var string = data.mogra_event.alerts[i].timestamp
							 var splitString = string.split(' ')
							 var dateVersion
							 if (splitString[0] === 'May') {
								 dateVersion = '05'
							 } else if (splitString[0] === 'June') {
								 dateVersion = '06'
							 }
							 else if (splitString[0] === 'July') {
								 dateVersion = '07'
							 }
							 else if (splitString[0] === 'August') {
								 dateVersion = '08'
							 }
							 else if (splitString[0] === 'September') {
								 dateVersion = '09'
							 }
							 else if (splitString[0] === 'October') {
								 dateVersion = '10'
							 }
							 else if (splitString[0] === 'November') {
								 dateVersion = '11'
							 }
							 else if (splitString[0] === 'December') {
								 dateVersion = '12'
							 }
							 else if (splitString[0] === 'January') {
								 dateVersion = '01'
							 }
							 else if (splitString[0] === 'February') {
								 dateVersion = '02'
							 }
							 else if (splitString[0] === 'March') {
								 dateVersion = '03'
							 }
							 else if (splitString[0] === 'April') {
								 dateVersion = '04'
							 }
							 dateVersion += '-' + splitString[1].replace(',', '-')


							 // var timeVersion = splitString[2].replace('02', (02+12).toString())
							 // console.log(splitString[2])


							 // if current index date is equal to begin date or end date or begin<i<end
							 // then a nested if statement comparing time
							   var timeVersion
							 if (splitString[3] === 'PM') {
				        timeVersion = (parseInt(splitString[2].split(':')[0])+12).toString() + ':' + splitString[2].split(':')[1] + ':' + splitString[2].split(':')[2]
				     } else {
				       timeVersion = splitString[2]
				     }
				     console.log(timeVersion)

				       // var timeVersion = splitString[2].replace('02', (02+12).toString())
				       // console.log(splitString[2])


				       // if current index date is equal to begin date or end date or begin<i<end
				       // then a nested if statement comparing time
				       if (beginTime) {

								 if (dateVersion <= endDate && dateVersion >= beginDate) {
							 		if (timeVersion >= beginTime && timeVersion <=endTime) {

										var object = {
	 									 date : data.mogra_event.alerts[i].timestamp,
	 									 user: data.mogra_event.alerts[i].user,
	 									 count: 0
	 								 }
	 								 arrayOfAlerts.push(object)
						}
					}
				} else {
							 if (dateVersion <= endDate && dateVersion >= beginDate) {

								 var object = {
									 date : data.mogra_event.alerts[i].timestamp,
									 user: data.mogra_event.alerts[i].user,
									 count: 0
								 }
								 arrayOfAlerts.push(object)
							 }
}
						 }
						 }
						 sessionStorage.clear()




							for (i=0; i<arrayOfAlerts.length; i++) {
								for (j=i+1; j<arrayOfAlerts.length-1; j++) {
								 if (arrayOfAlerts[i].user === arrayOfAlerts[j].user && arrayOfAlerts[i].date === arrayOfAlerts[i].date) {
									 arrayOfAlerts[j].count = arrayOfAlerts[j].count + 1
									 arrayOfAlerts.splice(j, 1)
								 }
							 }
						 }
						 console.log(arrayOfAlerts)


						 for (i=0; i<arrayOfAlerts.length;i++) {
							 var array = arrayOfAlerts[i].date.split(' ')

							 /*if (array[0] === 'May') {
								 array[0] = 5
							 }
							 if (array[0] === 'June') {
								 array[0] = 6
							 }
							 if (array[0] === 'July') {
								 array[0] = 7
							 }
							 if (array[0] === 'August') {
								 array[0] = 8
							 }
							 if (array[0] === 'September') {
								 array[0] = 9
							 }
							 if (array[0] === 'October') {
								 array[0] = 10
							 }
							 if (array[0] === 'November') {
								 array[0] = 11
							 }
							 if (array[0] === 'December') {
								 array[0] = 12
							 }
							 if (array[0] === 'January') {
								 array[0] = 1
							 }
							 if (array[0] === 'February') {
								 array[0] = 2
							 }
							 if (array[0] === 'March') {
								 array[0] = 3
							 }
							 if (array[0] === 'April') {
								 array[0] = 4
							 }
								*/

							 arrayOfAlerts[i].date = array[0] + ' ' + array[1]
						 }


						 function compare(a, b) {
			// Use toUpperCase() to ignore character casing
									const genreA = a.date.toUpperCase();
									const genreB = b.date.toUpperCase();

									let comparison = 0;
									if (genreA > genreB) {
										comparison = 1;
									} else if (genreA < genreB) {
										comparison = -1;
									}
									return comparison;
								}


						 // google.setOnLoadCallback(drawChart);
							// 	function drawChart() {
							// 		var data = new google.visualization.DataTable();
							// 		 data.addColumn('date', 'Dates');
							// 		data.addColumn('number', 'Sensor');



									var arrayOfArrays = []

									// for (i=0; i < arrayOfAlerts.length; i++) {
									// 	var finalArray = []
									// 	var finalizedDate = []
									// 	var dateArray = arrayOfAlerts[i].date.split(' ')
									// 	if (dateArray[0] === 'May') {
									// 		dateArray[0] = 5
									// 	}
									// 	if (dateArray[0] === 'June') {
									// 		dateArray[0] = 6
									// 	}
									// 	if (dateArray[0] === 'July') {
									// 		dateArray[0] = 7
									// 	}
									// 	if (dateArray[0] === 'August') {
									// 		dateArray[0] = 8
									// 	}
									// 	if (dateArray[0] === 'September') {
									// 		dateArray[0] = 9
									// 	}
									// 	if (dateArray[0] === 'October') {
									// 		dateArray[0] = 10
									// 	}
									// 	if (dateArray[0] === 'November') {
									// 		dateArray[0] = 11
									// 	}
									// 	if (dateArray[0] === 'December') {
									// 		dateArray[0] = 12
									// 	}
									// 	if (dateArray[0] === 'January') {
									// 		dateArray[0] = 1
									// 	}
									// 	if (dateArray[0] === 'February') {
									// 		dateArray[0] = 2
									// 	}
									// 	if (dateArray[0] === 'March') {
									// 		dateArray[0] = 3
									// 	}
									// 	if (dateArray[0] === 'April') {
									// 		dateArray[0] = 4
									// 	}
									// 	finalizedDate.push(dateArray[0])
									// 	finalizedDate.push(dateArray[1].split(',')[0])
									// 	finalizedDate.push(dateArray[1].split(',')[1])
									//
									// 	var valueOne
									// 	var valueTwo
									// 	var valueThree
									//
									//
									//
									// 	finalArray = [(new Date(finalizedDate[2], finalizedDate[0], finalizedDate[1])), arrayOfAlerts[i].count+1]
									// 	arrayOfArrays.push(finalArray)
									// }
									// console.log(arrayOfArrays)
								 // data.addRows(arrayOfArrays);



									// var options = {
									// 	hAxis: {title: 'Date'},
									//  vAxis: {title: 'Number of Alerts By Sensor'},
									// 	legend: 'none',
									// 	series: {
									// 			 0: { pointShape: 'circle', color: 'blue' }
									// 		 },
									// 		 backgroundColor: '#F1F1F1',
									// 		 pointSize: 20
									// };
									//
									//
									//
									// var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
									//
									// chart.draw(data, options);
									function drawChart() {

										var array = [
									               ['User', 'Alerts', {role: 'style'}, { role: 'annotation' }]
									            ]
										var count = 0
										var barColor
										for (i=0;i<arrayOfAlerts.length;i++) {
											if (count === 0) {
												barColor = '#498FE1'
											}
											if (count === 1) {
												barColor = '#D0011B'
											}
											if (count === 2) {
												barColor = '#79C90F'
											}
											if (count === 3) {
												barColor = '#F5A523'
											}
											if (count === 4) {
												barColor = '#8B8B8B'
											}
											if (count === 4) {
												count = 0
											} else {
												count++
											}
											var newArray = [arrayOfAlerts[i].user, arrayOfAlerts[i].count+1, barColor, arrayOfAlerts[i].count+1]
											array.push(newArray)
										}


									            // Define the chart to be drawn.
									            var data = google.visualization.arrayToDataTable(array);

									            var options = {
																hAxis: {title: 'Users'},
									              vAxis: {
									            gridlines : {
									              count : 5
									            },
															title: 'Number of Alerts'
									          },
									              backgroundColor: '#F1F1F1',
									            	legend: {
									            		position: 'none'
									              },
									              annotations: {
									            textStyle: {
									                color: 'black',
									                backgroundColor: 'white',
									            },
									        }
									         };


									            // Instantiate and draw the chart.
									            var chart = new google.visualization.ColumnChart(document.getElementById('container'));
									            var chartContainer = document.getElementById('container')
									            google.visualization.events.addListener(chart, 'ready', function () {
									        // modify x-axis labels
									        var labels = chartContainer.getElementsByTagName('text');

									        // Array.prototype.forEach.call(labels, function(label) {
									        //     label.style.color = 'black';
									        //     label.style.cursor = 'pointer';
									        // });

									      });

									            chart.draw(data, options);
									         }
									         google.charts.setOnLoadCallback(drawChart);



			 },
			 error: function (jqXHR, text, errorThrown) {
					 console.log(jqXHR + " " + text + " " + errorThrown);
			 }
			});


			function toggleFilters() {
			 var x = document.getElementById("toggleFilter");
			 if (x.style.display === "none") {
				 document.querySelector('#container').style.marginTop = '300px'
				 x.style.display = "block";
			 } else {
				 document.querySelector('#container').style.marginTop = '150px'
				 x.style.display = "none";
			 }
			}


			function filterFunction() {
			 var beginDate = document.getElementById('date1').value
			 var endDate = document.getElementById('date2').value
			 var beginTime = document.getElementById('time1').value
			 var endTime = document.getElementById('time2').value


			 beginDate = beginDate.split('-')[1] + '-' + beginDate.split('-')[2] + '-' + beginDate.split('-')[0]
			 endDate = endDate.split('-')[1] + '-' + endDate.split('-')[2] + '-' + endDate.split('-')[0]

			 sessionStorage.beginDate = beginDate
			 sessionStorage.endDate = endDate


			 location.reload();
			}
