// Mandatory UI
// document.querySelector('.line4copy').style.display = 'none'
// document.querySelector('.line4').style.display = 'none'
document.querySelector('.anima-valign-text-middle').innerHTML = ''
document.querySelector('.hed').firstElementChild.nextElementSibling.innerHTML = '<img width="100%" src="images/logo.png" >'

document.querySelectorAll('.industrialnetworkm')[1].style.color = 'white'
document.querySelector('.mainevent').style.display = 'block'

var readJsonData
var dbJsonData

$.ajax({
  url: 'json_read/mogra_event.json',
  contentType: 'application/json',
  dataType: 'json',
  success: function (data) {
      console.log(data);
      // Logic: Loop through alerts array -> create an array full of endpoints
      readJsonData = data
      var arrayOfEndpointObjects = []
      for (i=0; i<data.mogra_event.alerts.length; i++) {
        var object1 = {
          ip : data.mogra_event.alerts[i].end_point_1,
          type: 'sensor',
        }
        var object2 = {
          ip : data.mogra_event.alerts[i].end_point_2,
          type: 'sensor'
        }
        arrayOfEndpointObjects.push(object1)
        arrayOfEndpointObjects.push(object2)
      }
      for (j=0; j < arrayOfEndpointObjects.length; j++ ) {
        for (k=j+1; k < arrayOfEndpointObjects.length-1; k++) {
          if (arrayOfEndpointObjects[j].ip === arrayOfEndpointObjects[k].ip && j!==k) {
            arrayOfEndpointObjects[j].type = 'workstation'
            arrayOfEndpointObjects.splice(k, 1)
            //console.log('Popped: ' + arrayOfEndpointObjects[k].ip)
          }
          if (arrayOfEndpointObjects[j].ip.startsWith('2')) {
            arrayOfEndpointObjects[j].type = 'external entity'
          }
        }
      }
      // Organize 3 arrays: sensor, workstation, and external entities
      var sensorArray = []
      var workstationArray = []
      var externalEntityArray = []
      for (i=0; i< arrayOfEndpointObjects.length; i++) {
        if (arrayOfEndpointObjects[i].type === 'workstation') {
          workstationArray.push(arrayOfEndpointObjects[i].ip)
        }
        else if (arrayOfEndpointObjects[i].type === 'external entity') {
          externalEntityArray.push(arrayOfEndpointObjects[i].ip)
        }
        else {
          sensorArray.push(arrayOfEndpointObjects[i].ip)
        }
      }


      // Then loop through alerts array with the intent of creating elements
      document.querySelector('.eventview').innerHTML = '<div id="alertFilter"><h3>Manufacturing Floor Event Viewer</h3><button id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button><br><div id="toggleFilter" style="display: none"><p>Dates</p><input style="border-radius: 5px; border: 1px solid grey" type="date" id="date1"> - <input style="border-radius: 5px; border: 1px solid grey" type="date" id="date2"><br><p>Times</p><input style="border-radius: 5px; border: 1px solid grey" type="time" id="time1" > - <input style="border-radius: 5px; border: 1px solid grey" type="time" id="time2"> <br><button id="filterFunction" onClick="filterFunction()">GO</button></div></div>'
      document.querySelector('.eventview').innerHTML += '<table id="table"><tr><th>Alert <span onClick="sortAlert()" style="cursor: pointer;float: right">&#9662;</span></th><th>Time <span  onClick="sortTime()" style="cursor: pointer;float: right">&#9662;</span></th><th>Criticality<span onClick="sortTableCriticality()" style="cursor: pointer;float: right">&#9662;</span></th><th>Assets Impacted</th><th>Initiator</th><th>Username<span onClick="sortTable()" style="cursor:pointer; float: right">&#9662;</span></th><th>Asset Metrics</th><th>Asset Vulnerabilities</th><th>Details</th></tr></table>'
      document.querySelector('.eventview').style.display = 'block'
      document.querySelector('.eventview').nextElementSibling.remove()
      document.querySelector('.eventview').nextElementSibling.nextElementSibling.remove()
      document.querySelector('.hotspot1').parentElement.remove()

      for (i=0; i<data.mogra_event.alerts.length; i++) {

        var timestamp = new Date(data.mogra_event.alerts[i].timestamp);
        var todaysDate = new Date();
    //    if(timestamp.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
          var tr = document.createElement('tr')
          var td1 = document.createElement('td')
          td1.innerText = data.mogra_event.alerts[i].description
          var td2 = document.createElement('td')
          td2.innerText = data.mogra_event.alerts[i].alert_level
          var td3 = document.createElement('td')
          if (sensorArray.includes(data.mogra_event.alerts[i].end_point_2)) {
            td3.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_2)) {
            td3.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          } else {
            td3.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          }

          var td4 = document.createElement('td')
          if (sensorArray.includes(data.mogra_event.alerts[i].end_point_1)) {
            td4.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_1)) {
            td4.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          } else {
            td4.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          }

          var td5 = document.createElement('td')
          td5.innerText = data.mogra_event.alerts[i].user
          var td6 = document.createElement('td')
td6.innerHTML = 'Temp: ' + data.mogra_event.alerts[i].metrics.temperature + '<br>' + 'Vibration: ' + data.mogra_event.alerts[i].metrics.vibration + '<br>' + 'Press: ' + data.mogra_event.alerts[i].metrics.pressure
          var td7 = document.createElement('td')
          if (data.mogra_event.alerts[i].alert_level === 'high') {
td7.innerText = data.mogra_event.alerts[i].vulnerabilities
}
          var td8 = document.createElement('td')
          //if (data.mogra_event.alerts[i].command) {
            if (data.mogra_event.alerts[i].details) {
  td8.innerText = data.mogra_event.alerts[i].details
}
          //}

          var td9 = document.createElement('td')
          td9.innerText = data.mogra_event.alerts[i].timestamp.split(' ')[2] + ' ' + data.mogra_event.alerts[i].timestamp.split(' ')[3]

          tr.appendChild(td1)
          tr.appendChild(td9)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
          tr.appendChild(td6)
          tr.appendChild(td7)
          tr.appendChild(td8)
          document.getElementById('table').appendChild(tr)
      //  }
      }
      // Save to JSON write file
      $.ajax({
        url: 'json_write/mogra_event.json',
        contentType: 'application/json',
        dataType: 'json',
        success: function (dbJsonData) {

          console.log(readJsonData)
          console.log(dbJsonData)
          var newData = []
          var counter
          // compare the two, find differences, save
          // to new array, concat dbjson and new data, save
          for (i=0; i<readJsonData.mogra_event.alerts.length; i++) {
            counter = 0

            for (j=0; j<dbJsonData.mogra_event.alerts.length; j++) {

                if (readJsonData.mogra_event.alerts[i].alert_level === dbJsonData.mogra_event.alerts[j].alert_level
                && readJsonData.mogra_event.alerts[i].command === dbJsonData.mogra_event.alerts[j].command
                && readJsonData.mogra_event.alerts[i].description === dbJsonData.mogra_event.alerts[j].description
                && readJsonData.mogra_event.alerts[i].details === dbJsonData.mogra_event.alerts[j].details
                && readJsonData.mogra_event.alerts[i].end_point_1 === dbJsonData.mogra_event.alerts[j].end_point_1
                && readJsonData.mogra_event.alerts[i].end_point_2 === dbJsonData.mogra_event.alerts[j].end_point_2
                && readJsonData.mogra_event.alerts[i].timestamp === dbJsonData.mogra_event.alerts[j].timestamp
                && readJsonData.mogra_event.alerts[i].user === dbJsonData.mogra_event.alerts[j].user) {
                  counter++
                  console.log('theres a match!')
                }
            }
            if (counter !==0) {

            } else {
              console.log(readJsonData.mogra_event.alerts[i])
              newData.push(readJsonData.mogra_event.alerts[i])
            }
          }
    var combinedArrays = dbJsonData.mogra_event.alerts.concat(newData);
    var dbReadyData = {
        "mogra_event" :
        {
            "facility" : "Manufacturing Floor",
            "alerts" : combinedArrays

            }

    }
    console.log(dbReadyData)
    $.ajax
    ({
        type: "GET",
        dataType : 'json',
        async: false,
        url: 'json_write/mogra_event.php',
        data: { data: JSON.stringify(dbReadyData) },
        success: function () {alert("Thanks!"); },
        failure: function() {alert("Error!");}
    });
        },
        // if dbjson is false ie empty db, just save read data to it
        error: function (readJsonData) {
          console.log('error but heres all of the read data ' + readJsonData);
      }
      });
  },
  error: function (jqXHR, text, errorThrown) {
      console.log(jqXHR + " " + text + " " + errorThrown);
  }
});






function toggleFilters() {
  var x = document.getElementById("toggleFilter");
  if (x.style.display === "none") {
    x.style.display = "block";
    seconds = 1000000
  } else {
    x.style.display = "none";
    seconds = 5000
  }
}

function filterFunction() {
  var beginDate = document.getElementById('date1').value
  var endDate = document.getElementById('date2').value
  var beginTime = document.getElementById('time1').value
  var endTime = document.getElementById('time2').value

  beginDate = beginDate.split('-')[1] + '-' + beginDate.split('-')[2] + '-' + beginDate.split('-')[0]
  endDate = endDate.split('-')[1] + '-' + endDate.split('-')[2] + '-' + endDate.split('-')[0]

  $.ajax({
    url: 'json_read/mogra_event.json',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      readJsonData = data
      var arrayOfEndpointObjects = []
      for (i=0; i<data.mogra_event.alerts.length; i++) {
        var object1 = {
          ip : data.mogra_event.alerts[i].end_point_1,
          type: 'sensor',
        }
        var object2 = {
          ip : data.mogra_event.alerts[i].end_point_2,
          type: 'sensor'
        }
        arrayOfEndpointObjects.push(object1)
        arrayOfEndpointObjects.push(object2)
      }
      for (j=0; j < arrayOfEndpointObjects.length; j++ ) {
        for (k=j+1; k < arrayOfEndpointObjects.length-1; k++) {
          if (arrayOfEndpointObjects[j].ip === arrayOfEndpointObjects[k].ip && j!==k) {
            arrayOfEndpointObjects[j].type = 'workstation'
            arrayOfEndpointObjects.splice(k, 1)
            //console.log('Popped: ' + arrayOfEndpointObjects[k].ip)
          }
          if (arrayOfEndpointObjects[j].ip.startsWith('2')) {
            arrayOfEndpointObjects[j].type = 'external entity'
          }
        }
      }
      // Organize 3 arrays: sensor, workstation, and external entities
      var sensorArray = []
      var workstationArray = []
      var externalEntityArray = []
      for (i=0; i< arrayOfEndpointObjects.length; i++) {
        if (arrayOfEndpointObjects[i].type === 'workstation') {
          workstationArray.push(arrayOfEndpointObjects[i].ip)
        }
        else if (arrayOfEndpointObjects[i].type === 'external entity') {
          externalEntityArray.push(arrayOfEndpointObjects[i].ip)
        }
        else {
          sensorArray.push(arrayOfEndpointObjects[i].ip)
        }
      }


      // Then loop through alerts array with the intent of creating elements
      document.querySelector('.eventview').innerHTML = '<div id="alertFilter"><h3>Manufacturing Floor Event Viewer</h3><button id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button><br><div id="toggleFilter" style="display: none"><p>Dates</p><input style="border-radius: 5px; border: 1px solid grey" type="date" id="date1"> - <input style="border-radius: 5px; border: 1px solid grey" type="date" id="date2"><br><p>Times</p><input style="border-radius: 5px; border: 1px solid grey" type="time" id="time1" > - <input style="border-radius: 5px; border: 1px solid grey" type="time" id="time2"> <br><button id="filterFunction" onClick="filterFunction()">GO</button></div></div>'
      document.querySelector('.eventview').innerHTML += '<table id="table"><tr><th>Alert <span onClick="sortAlert()" style="cursor: pointer;float: right">&#9662;</span></th><th>Time <span onClick="sortTime()" style="cursor: pointer;float: right">&#9662;</span></th><th>Criticality<span onClick="sortTableCriticality()" style="cursor: pointer;float: right">&#9662;</span></th><th>Assets Impacted</th><th>Initiator</th><th>Username<span onClick="sortTable()" style="cursor:pointer;float: right">&#9662;</span></th><th>Asset Metrics</th><th>Asset Vulnerabilities</th><th>Details</th></tr></table>'

      for (i=0; i<data.mogra_event.alerts.length; i++) {
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
        var timeVersion
        console.log(splitString[2])
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

            var tr = document.createElement('tr')
            var td1 = document.createElement('td')
            td1.innerText = data.mogra_event.alerts[i].description
            var td2 = document.createElement('td')
            td2.innerText = data.mogra_event.alerts[i].alert_level
            var td3 = document.createElement('td')
            if (sensorArray.includes(data.mogra_event.alerts[i].end_point_2)) {
              td3.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
            } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_2)) {
              td3.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
            } else {
              td3.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
            }

            var td4 = document.createElement('td')
            if (sensorArray.includes(data.mogra_event.alerts[i].end_point_1)) {
              td4.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
            } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_1)) {
              td4.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
            } else {
              td4.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
            }

            var td5 = document.createElement('td')
            td5.innerText = data.mogra_event.alerts[i].user
            var td6 = document.createElement('td')
td6.innerHTML = 'Temp: ' + data.mogra_event.alerts[i].metrics.temperature + '<br>' + 'Vibration: ' + data.mogra_event.alerts[i].metrics.vibration + '<br>' + 'Press: ' + data.mogra_event.alerts[i].metrics.pressure
            var td7 = document.createElement('td')

            if (data.mogra_event.alerts[i].alert_level === 'high') {
td7.innerText = data.mogra_event.alerts[i].vulnerabilities
}
            var td8 = document.createElement('td')
            //if (data.mogra_event.alerts[i].details) {
              if (data.mogra_event.alerts[i].details) {
  td8.innerText = data.mogra_event.alerts[i].details
}
            //}
            var td9 = document.createElement('td')
            td9.innerText = data.mogra_event.alerts[i].timestamp.split(' ')[2] + ' ' + data.mogra_event.alerts[i].timestamp.split(' ')[3]

            tr.appendChild(td1)
            tr.appendChild(td9)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
            tr.appendChild(td7)
            tr.appendChild(td8)

            document.getElementById('table').appendChild(tr)
          }
        }
      //  }
    } else {
      if (dateVersion <= endDate && dateVersion >= beginDate) {

          var tr = document.createElement('tr')
          var td1 = document.createElement('td')
          td1.innerText = data.mogra_event.alerts[i].description
          var td2 = document.createElement('td')
          td2.innerText = data.mogra_event.alerts[i].alert_level
          var td3 = document.createElement('td')
          if (sensorArray.includes(data.mogra_event.alerts[i].end_point_2)) {
            td3.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_2)) {
            td3.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          } else {
            td3.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_2)+1).toString()
          }

          var td4 = document.createElement('td')
          if (sensorArray.includes(data.mogra_event.alerts[i].end_point_1)) {
            td4.innerText = 'Sensor ' + (sensorArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          } else if (workstationArray.includes(data.mogra_event.alerts[i].end_point_1)) {
            td4.innerText = 'Workstation ' + (workstationArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          } else {
            td4.innerText = 'External Entity ' + (externalEntityArray.indexOf(data.mogra_event.alerts[i].end_point_1)+1).toString()
          }

          var td5 = document.createElement('td')
          td5.innerText = data.mogra_event.alerts[i].user
          var td6 = document.createElement('td')
td6.innerHTML = 'Temp: ' + data.mogra_event.alerts[i].metrics.temperature + '<br>' + 'Vibration: ' + data.mogra_event.alerts[i].metrics.vibration + '<br>' + 'Press: ' + data.mogra_event.alerts[i].metrics.pressure
          var td7 = document.createElement('td')
          if (data.mogra_event.alerts[i].alert_level === 'high') {
td7.innerText = data.mogra_event.alerts[i].vulnerabilities
}
          var td8 = document.createElement('td')
          //if (data.mogra_event.alerts[i].command) {
            if (data.mogra_event.alerts[i].details) {
  td8.innerText = data.mogra_event.alerts[i].details
}
          //}
          var td9 = document.createElement('td')
          td9.innerText = data.mogra_event.alerts[i].timestamp.split(' ')[2] + ' ' + data.mogra_event.alerts[i].timestamp.split(' ')[3]

          tr.appendChild(td1)
          tr.appendChild(td9)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
          tr.appendChild(td6)
          tr.appendChild(td7)
          tr.appendChild(td8)
          document.getElementById('table').appendChild(tr)

      }
    }
  }
  },
    error: function (jqXHR, text, errorThrown) {
        console.log(jqXHR + " " + text + " " + errorThrown);
    }
  });

}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[5];
      y = rows[i + 1].getElementsByTagName("TD")[5];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}



function sortAlert() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}






function sortTableCriticality() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (x.innerHTML === 'high') {
        x.value = 1
      }
      if (x.innerHTML === 'medium') {
        x.value = 2
      }
      if (x.innerHTML === 'low') {
        x.value = 3
      }
      if (y.innerHTML === 'high') {
        y.value = 1
      } else if (y.innerHTML === 'medium') {
        y.value = 2
      } else {
        y.value = 3
      }

      //check if the two rows should switch place:
      if (x.value > y.value) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortTime() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
    //   if (splitString[3] === 'PM') {
    //    timeVersion = (parseInt(splitString[2].split(':')[0])+12).toString() + ':' + splitString[2].split(':')[1] + ':' + splitString[2].split(':')[2]
    // } else {
    //   timeVersion = splitString[2]

      var xValue
      var yValue
      x = rows[i].getElementsByTagName("TD")[1];
      if (x.innerText.split(' ')[1] === 'PM') {
        xValue = parseInt(x.innerText.split(' ')[0].split(':')[0]+12).toString() + ':' + x.innerText.split(' ')[0].split(':')[1] + '' + x.innerText.split(' ')[0].split(':')[2]
      } else {
        xValue = x.innerText.split(' ')[0]
      }
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (y.innerText.split(' ')[1] === 'PM') {
        yValue = parseInt(y.innerText.split(' ')[0].split(':')[0]+12).toString() + ':' + y.innerText.split(' ')[0].split(':')[1] + '' + y.innerText.split(' ')[0].split(':')[2]
      } else {
        yValue = y.innerText.split(' ')[0]
      }
      //check if the two rows should switch place:
      if (xValue > yValue) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

var seconds = 0

function refresh(seconds){
  setTimeout(function(){
   window.location.reload(1);
}, seconds);
}

setTimeout(function(){
refresh(seconds)
}, 5000);
