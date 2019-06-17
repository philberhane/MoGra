document.querySelector('.chart').innerHTML = '<div id="alertFilter" style="padding-bottom: 10px"><div><h3 style="font-size: 17.5px; padding-top: 10px;">Criticality</h3><span style="width: 2px;height: 2px;background-color: rgb(141, 2, 31); color: rgb(141, 2, 31)">test</span> High <br> <span style="width: 2px;height: 2px;background-color: rgb(253, 95, 0); color: rgb(253, 95, 0)">test</span> Medium <br> <span style="width: 2px;height: 2px;background-color: rgb(207,181,59); color: rgb(207,181,59)">test</span> Low</div><div ><h3 style="font-size: 18px">Manufacturing Floor: Alerts Over Time</h3><button style="cursor:pointer" id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button><br><div id="toggleFilter" style="display: none"><p>Dates</p><input style="border-radius: 5px; border: 1px solid grey" type="date" id="date1"> - <input style="border-radius: 5px; border: 1px solid grey" type="date" id="date2"> <br><button id="filterFunction" onClick="filterFunction()">GO</button></div></div></div>'

document.querySelector('.chart').innerHTML += '<div id="chart_div" style="margin-top: 200px; width: 900; height: 650px;"></div>'
document.querySelector('.chart').style.display = 'block'

document.querySelector('.rectangle1').backgroundColor = ''

document.querySelector('.anima-valign-text-middle').innerHTML = ''
document.querySelector('.hed').firstElementChild.nextElementSibling.innerHTML = '<img width="100%" src="images/logo.png" >'
document.querySelectorAll('.industrialnetworkm')[0].style.color = 'white'



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
               high: [],
               medium: [],
               low: []
             }
             arrayOfAlerts.push(object)
           }
          else {
           var beginDate = sessionStorage.beginDate
           var endDate = sessionStorage.endDate

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

           if (dateVersion <= endDate && dateVersion >= beginDate) {
             var object = {
               date : data.mogra_event.alerts[i].timestamp,
               high: [],
               medium: [],
               low: []
             }
             arrayOfAlerts.push(object)
           }

         }
         }
         sessionStorage.clear()




        for (j=0; j<data.mogra_event.alerts.length; j++) {
          for (i=0; i<arrayOfAlerts.length; i++) {
             if (arrayOfAlerts[i].date === data.mogra_event.alerts[j].timestamp) {
               if (data.mogra_event.alerts[j].alert_level === 'high') {
                 arrayOfAlerts[i].high.push(data.mogra_event.alerts[j].alert_level)
               } else if (data.mogra_event.alerts[j].alert_level === 'medium') {
                 arrayOfAlerts[i].medium.push(data.mogra_event.alerts[j].alert_level)
               } else {
                 arrayOfAlerts[i].low.push(data.mogra_event.alerts[j].alert_level)
               }
             }
           }
         }

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


         google.setOnLoadCallback(drawChart);
            function drawChart() {
              var data = new google.visualization.DataTable();
               data.addColumn('date', 'Dates');
              data.addColumn('number', 'Low');
              data.addColumn('number', 'Medium');
              data.addColumn('number', 'High');


              var arrayOfArrays = []

              for (i=0; i < arrayOfAlerts.length; i++) {
                var finalArray = []
                var finalizedDate = []
                var dateArray = arrayOfAlerts[i].date.split(' ')
                if (dateArray[0] === 'May') {
                  dateArray[0] = 5
                }
                if (dateArray[0] === 'June') {
                  dateArray[0] = 6
                }
                if (dateArray[0] === 'July') {
                  dateArray[0] = 7
                }
                if (dateArray[0] === 'August') {
                  dateArray[0] = 8
                }
                if (dateArray[0] === 'September') {
                  dateArray[0] = 9
                }
                if (dateArray[0] === 'October') {
                  dateArray[0] = 10
                }
                if (dateArray[0] === 'November') {
                  dateArray[0] = 11
                }
                if (dateArray[0] === 'December') {
                  dateArray[0] = 12
                }
                if (dateArray[0] === 'January') {
                  dateArray[0] = 1
                }
                if (dateArray[0] === 'February') {
                  dateArray[0] = 2
                }
                if (dateArray[0] === 'March') {
                  dateArray[0] = 3
                }
                if (dateArray[0] === 'April') {
                  dateArray[0] = 4
                }
                finalizedDate.push(dateArray[0])
                finalizedDate.push(dateArray[1].split(',')[0])
                finalizedDate.push(dateArray[1].split(',')[1])

                var valueOne
                var valueTwo
                var valueThree

                if (arrayOfAlerts[i].low.length === 0) {
                  valueThree = null
                } else {
                  valueThree = arrayOfAlerts[i].low.length
                }
                if (arrayOfAlerts[i].medium.length === 0) {
                  valueTwo = null
                } else {
                  valueTwo = arrayOfAlerts[i].medium.length
                }
                if (arrayOfAlerts[i].high.length === 0) {
                  valueOne = null
                } else {
                  valueOne = arrayOfAlerts[i].high.length
                }

                finalArray = [(new Date(finalizedDate[2], finalizedDate[0], finalizedDate[1])), valueOne,valueTwo,valueThree]
                arrayOfArrays.push(finalArray)
              }
              console.log(arrayOfArrays)
             data.addRows(arrayOfArrays);



              var options = {
                hAxis: {title: 'Date'},
               vAxis: {title: 'Number of Alerts By Criticality'},
                legend: 'none',
                series: {
                     0: {pointShape: 'circle', color: 'rgb(207,181,59)'},
                     1: {pointShape: 'circle', color: 'rgb(253, 95, 0)'},
                     2: { pointShape: 'circle', color: 'rgb(141, 2, 31)' }
                   },
                   backgroundColor: '#F1F1F1',
                   pointSize: 20
              };



              var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

              chart.draw(data, options);
            }



   },
   error: function (jqXHR, text, errorThrown) {
       console.log(jqXHR + " " + text + " " + errorThrown);
   }
 });


 function toggleFilters() {
   var x = document.getElementById("toggleFilter");
   if (x.style.display === "none") {
     document.querySelector('#chart_div').style.marginTop = '400px'
     x.style.display = "block";
   } else {
     document.querySelector('#chart_div').style.marginTop = '200px'
     x.style.display = "none";
   }
 }


 function filterFunction() {
   var beginDate = document.getElementById('date1').value
   var endDate = document.getElementById('date2').value


   beginDate = beginDate.split('-')[1] + '-' + beginDate.split('-')[2] + '-' + beginDate.split('-')[0]
   endDate = endDate.split('-')[1] + '-' + endDate.split('-')[2] + '-' + endDate.split('-')[0]

   sessionStorage.beginDate = beginDate
   sessionStorage.endDate = endDate


   location.reload();
 }
