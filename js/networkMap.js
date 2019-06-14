
document.querySelector('.main1').style.display = 'block'
document.querySelector('.hed').firstElementChild.nextElementSibling.innerHTML = '<img width="100%" src="images/logo.png" >'


document.querySelector('.box').innerHTML = '<div id="alertFilter"><div><h3 style="font-size: 17.5px; padding-top: 10px;">Criticality</h3><span style="width: 2px;height: 2px;background-color: rgb(141, 2, 31); color: rgb(141, 2, 31)">test</span> High <br> <span style="width: 2px;height: 2px;background-color: rgb(253, 95, 0); color: rgb(253, 95, 0)">test</span> Medium <br> <span style="width: 2px;height: 2px;background-color: rgb(207,181,59); color: rgb(207,181,59)">test</span> Low</div><div style="display: none;"><h3>Manufacturing Floor Event Viewer</h3><button style="cursor:pointer" id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button><br><div id="toggleFilter" style="display: none"><p>Dates</p><input style="border-radius: 5px; border: 1px solid grey" type="date" id="date1"> - <input style="border-radius: 5px; border: 1px solid grey" type="date" id="date2"><br><p>Times</p><input style="border-radius: 5px; border: 1px solid grey" type="time" id="time1" > - <input style="border-radius: 5px; border: 1px solid grey" type="time" id="time2"> <br><button id="filterFunction" onClick="filterFunction()">GO</button></div></div></div>'
document.getElementById('alertFilter').firstElementChild.nextElementSibling.style.fontSize = '17.5px'
document.getElementById('alertFilter').firstElementChild.nextElementSibling.style.paddingTop = '20px'
document.querySelectorAll('.industrialnetworkm')[4].style.color = 'white'


var width = 960,
    height = 500
function getPos(el) {
        // yay readability
        for (var lx=0, ly=0;
             el != null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx,y: ly};
    }

var svg = SVG('svg1').size("100%", 900);
var links = svg.group();
var markers = svg.group();
var nodes = svg.group();
var defs = svg.defs();

//Have another property in an object of the node its connected to

// <div id="workstation" style="background: #E5E5E5;
// border: 1px solid #4A4A4A; border-radius: 5px; width: 6.7rem; height: 4.6rem; radius: 0.4rem">
//     <div style="font-family: FontAwesome;
// font-size: 18px;
// color: #444444;
// letter-spacing: 0;
// text-align: center; width: 1.7rem; height: 2.3rem">
// <i class="fa fa-desktop"></i>
// </div>
// <div style="font-family: Open Sans;
// font-size: 10px;
// color: #FFFFFF;
// letter-spacing: 0;
// text-align: center; width: 6.7rem; height: 2.3rem;background: #4A4A4A; ">
//   Workstation 1
// </div>
// </div>

//
//


var arrayOfPaths = []
var compareArray = []

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
      var arrayOfConnections = []

      for (i=0; i<data.mogra_event.alerts.length; i++) {
        if(sessionStorage.length === 0) {
        var timestamp = new Date(data.mogra_event.alerts[i].timestamp);
        var todaysDate = new Date();
      //  if(timestamp.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
        var object1 = {
          ip : data.mogra_event.alerts[i].end_point_1,
          type: 'sensor',
        }
        var object2 = {
          ip : data.mogra_event.alerts[i].end_point_2,
          type: 'sensor'
        }

        var object3 = {
          ip1 : data.mogra_event.alerts[i].end_point_1,
          ip2: data.mogra_event.alerts[i].end_point_2,
          criticality: data.mogra_event.alerts[i].alert_level,
user: data.mogra_event.alerts[i].user,
temperature: data.mogra_event.alerts[i].metrics.temperature
        }
        arrayOfEndpointObjects.push(object1)
        arrayOfEndpointObjects.push(object2)
        arrayOfConnections.push(object3)
    //  }
    } else {
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
      var object1 = {
        ip : data.mogra_event.alerts[i].end_point_1,
        type: 'sensor',
      }
      var object2 = {
        ip : data.mogra_event.alerts[i].end_point_2,
        type: 'sensor'
      }

      var object3 = {
        ip1 : data.mogra_event.alerts[i].end_point_1,
        ip2: data.mogra_event.alerts[i].end_point_2,
        criticality: data.mogra_event.alerts[i].alert_level,
user: data.mogra_event.alerts[i].user,
temperature: data.mogra_event.alerts[i].metrics.temperature
      }
      arrayOfEndpointObjects.push(object1)
      arrayOfEndpointObjects.push(object2)
      arrayOfConnections.push(object3)
    }
    }
  } else {
    if (dateVersion <= endDate && dateVersion >= beginDate) {
      var object1 = {
        ip : data.mogra_event.alerts[i].end_point_1,
        type: 'sensor',
      }
      var object2 = {
        ip : data.mogra_event.alerts[i].end_point_2,
        type: 'sensor'
      }

      var object3 = {
        ip1 : data.mogra_event.alerts[i].end_point_1,
        ip2: data.mogra_event.alerts[i].end_point_2,
        criticality: data.mogra_event.alerts[i].alert_level,
        user: data.mogra_event.alerts[i].user,
        temperature: data.mogra_event.alerts[i].metrics.temperature,
        alertName: data.mogra_event.alerts[i].metrics.description,
        details: data.mogra_event.alerts[i].metrics.details
      }
      arrayOfEndpointObjects.push(object1)
      arrayOfEndpointObjects.push(object2)
      arrayOfConnections.push(object3)
    }
  }
}
  }
  sessionStorage.clear()
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

      for (i=0;i<workstationArray.length;i++) {
        console.log(workstationArray[i])
        var workstation = '<div id="'+workstationArray[i]+'" class="workstation connect" style="background: #E5E5E5;'+
        'border: 1px solid #4A4A4A; border-radius: 5px; width: 6.7rem; height: 4.6rem; radius: 0.4rem">'+
            '<div style="font-family: FontAwesome;'+
        'font-size: 18px;'+
        'color: #444444;'+
        'letter-spacing: 0;'+
        'text-align: center; width: 1.7rem; height: 2.3rem">'+
        '<i class="fa fa-desktop" style="float: right"></i>'+
        '</div>'+
        '<div style="font-family: Open Sans;'+
        'font-size: 10px;'+
        'color: #FFFFFF;'+
        'letter-spacing: 0;'+
        'text-align: center; width: 6.7rem; height: 2.3rem;background: #4A4A4A; ">'+
          'Workstation '+ (i+1) +
        '</div>'+
        '</div>'

        var row
        if (i === 0 || i % 2 === 0) {
          row = '<div class="row"><div class="col-md-3">' + workstation + '</div><div class="col-md-3"></div></div>'
        } else {
          row = '<div class="row"><div class="col-md-3"></div><div class="col-md-3">' + workstation + '</div></div>'
        }

        document.getElementById('workstationColumn').innerHTML +=row


      }

      for (i=0;i<sensorArray.length;i++) {
        console.log(sensorArray[i])
        var sensor = '<div id="'+sensorArray[i]+'" class="sensor connect" style="background: #E5E5E5;'+
        'border: 1px solid #4A4A4A; border-radius: 5px; width: 6.7rem; height: 4.6rem; radius: 0.4rem">'+
            '<img class="fill43" src="https://anima-uploads.s3.amazonaws.com/projects/5cdda6b85ffb44000a194e77/releases/5cdda81a5ffb4400098adfa3/img/main-pop-work3-fill-43-6@2x.png">' +
            '<img class="fill37" src="https://anima-uploads.s3.amazonaws.com/projects/5cdda6b85ffb44000a194e77/releases/5cdda81a5ffb4400098adfa3/img/main-x-fill-37-4@2x.png">' +
            '<img class="fill40" src="https://anima-uploads.s3.amazonaws.com/projects/5cdda6b85ffb44000a194e77/releases/5cdda81a5ffb4400098adfa3/img/main-pop-work3-fill-40-2@2x.png">' +
        '</div>'+
        '<div style="font-family: Open Sans;'+
        'font-size: 10px;'+
        'color: #FFFFFF;'+
        'letter-spacing: 0;'+
        'text-align: center; width: 6.7rem; height: 2.3rem;background: #4A4A4A; ">'+
          'Workstation '+ (i+1) +
        '</div>'+
        '</div>'

        var row
        if (i === 0 || i % 4 === 0) {
          row = '<div class="row"><div class="col-md-3">' + sensor + '</div></div>'
          document.getElementById('sensorColumn').innerHTML += row
        } else {
          for (k=0;k<document.getElementById('sensorColumn').children.length;k++) {
            if (document.getElementById('sensorColumn').children[k].children.length < 4) {
              document.getElementById('sensorColumn').children[k].innerHTML += '<div class="col-md-3">' + sensor + '</div>'
            }
          }
        }

      }


      for (i=0;i<externalEntityArray.length;i++) {
        var external = '<div id="'+externalEntityArray[i]+'" class="external connect" style="background: #E5E5E5;'+
        'border: 1px solid #4A4A4A; border-radius: 5px; width: 6.7rem; height: 4.6rem; radius: 0.4rem">'+
            '<div style="font-family: FontAwesome;'+
        'font-size: 18px;'+
        'color: #444444;'+
        'letter-spacing: 0;'+
        'text-align: center; width: 1.7rem; height: 2.3rem">'+
        '<i class="fa fa-desktop" style="float: right"></i>'+
        '</div>'+
        '<div style="font-family: Open Sans;'+
        'font-size: 10px;'+
        'color: #FFFFFF;'+
        'letter-spacing: 0;'+
        'text-align: center; width: 6.7rem; height: 2.3rem;background: #4A4A4A; ">'+
          'External Entity '+ (i+1) +
        '</div>'+
        '</div>'

        var row = '<div class="row"><div class="col-md-6">' + external + '</div><div class="col-md-6"></div></div>'


        document.getElementById('externalColumn').innerHTML +=row
      }

      var connect = document.getElementsByClassName('connect')
console.log(arrayOfConnections)
compareArray = arrayOfConnections
      for (i=0;i<arrayOfConnections.length;i++) {
        var twoConnections = []

        for (j=0;j<connect.length;j++) {
          if (connect[j].id === arrayOfConnections[i].ip1 || connect[j].id === arrayOfConnections[i].ip2) {
            twoConnections.push(connect[j])
          }
        }
        // Then create g's for both and connect functions
        console.log(twoConnections)
        console.log(arrayOfConnections[i])
        var color
        if (arrayOfConnections[i].criticality === 'high') {
          color = 'rgb(141, 2, 31)'
        } else if (arrayOfConnections[i].criticality === 'medium') {
          color = 'rgb(253, 95, 0)'
        } else if (arrayOfConnections[i].criticality === 'low') {
          color = 'rgb(207,181,59)'
        } else {
          color = '#7ECB19'
        }

          var user = arrayOfConnections[i].user
          var ip1 = arrayOfConnections[i].ip1
          var ip2 = arrayOfConnections[i].ip2
          var temperature = arrayOfConnections[i].temperature


        if (twoConnections[0].className.split(' ')[0] === 'sensor') {
          var g1 = nodes.group().translate(getPos(twoConnections[0]).x, getPos(twoConnections[0]).y+(50*i))
          g1.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          var sensorIndex = sensorArray.indexOf(twoConnections[0].id);
          g1.node.innerHTML = '<image alt="'+arrayOfConnections[i].ip2+'"  onmouseover="popup(this)" onmouseout="popDown(this)" xlink:href="images/sensor(notMaroon).png" height="50" width="50"/>'
          g1.node.innerHTML += '<text x="'+3+'" y="'+40+'" style="padding-top: 50px; font-size:12px" fill="white">'+'Sensor '+ (sensorIndex+1) +'</text>'
          g1.node.innerHTML += '<rect style="display:none" x="-75" y="-70" width="196" height="78" stroke="red" fill="white"></rect>'
          g1.node.innerHTML += '<text style="display:none" x="-65" y="-40" font-size:12px">IP: '+arrayOfConnections[i].ip2+'</text>'
          g1.node.innerHTML += '<text style="display:none" x="-65" y="-15" font-size:12px">Temp: '+arrayOfConnections[i].temperature+'</text>'
        } else if (twoConnections[0].className.split(' ')[0] === 'workstation') {
          var workstationIndex = workstationArray.indexOf(twoConnections[0].id);
          var g1 = nodes.group().translate(getPos(twoConnections[0]).x, getPos(twoConnections[0]).y+(50*i))
          g1.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          g1.node.innerHTML = '<image onmouseover="popup(this)" xlink:href="images/workstation(grey).png" height="82" width="57"/>'
          g1.node.innerHTML += '<text x="'+3+'" y="'+40+'" style="padding-top: 50px; font-size:12px" fill="white">'+'Workstation '+ (workstationIndex+1) +'</text>'
          g2.node.innerHTML += '<rect x="-55" y="-50" width="196" height="78" stroke="red" fill="white"></rect>'

          //g2.node.innerHTML += '<rect x="0" y="-50" width="196" height="78" stroke="red" fill="white"></rect>'
        } else {
          var externalIndex = externalEntityArray.indexOf(twoConnections[0].id);
          var g1 = nodes.group().translate(getPos(twoConnections[0]).x, getPos(twoConnections[0]).y+(50*i))
          g1.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          g1.node.innerHTML = '<image onmouseover="popup(this)" xlink:href="images/externalGrey.png" height="75" width="75"/>'
          g1.node.innerHTML += '<text x="'+2+'" y="'+60+'" style="padding-top: 50px; font-size:12px" fill="white">'+'External Entity</text>'
          g1.node.innerHTML += '<rect x="-55" y="-50" width="196" height="78" stroke="red" fill="white"></rect>'

          //g1.node.innerHTML += '<rect x="'+35+'" y="'+72+'" fill="transparent" stroke="'+color+'" style="padding-top: 50px;">'+(externalIndex+1)+'</rect>'

        }




        if (twoConnections[1].className.split(' ')[0] === 'sensor') {
          var sensorIndex = sensorArray.indexOf(twoConnections[1].id);
          var g2 = nodes.group().translate(getPos(twoConnections[1]).x, getPos(twoConnections[1]).y+(50*i))
          g2.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          g2.node.innerHTML = '<image onmouseover="popup(this)" xlink:href="images/sensor(notMaroon).png" height="50" width="50"/>'
          g2.node.innerHTML += '<text x="'+3+'" y="'+40+'" style="padding-top: 50px; font-size:12px" fill="white">'+'Sensor '+ (sensorIndex+1) +'</text>'

        } else if (twoConnections[1].className.split(' ')[0] === 'workstation') {
          var workstationIndex = workstationArray.indexOf(twoConnections[1].id);
          var g2 = nodes.group().translate(getPos(twoConnections[1]).x, getPos(twoConnections[1]).y)
          g2.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          g2.node.innerHTML = '<image style="cursor:pointer" alt="'+arrayOfConnections[i].ip1+'" id="thisisatest" onclick="fade(this)" onmouseover="popup(this)" onmouseout="popDown(this)" xlink:href="images/workstation(grey).png" height="100" width="72"/>'
          g2.node.innerHTML += '<text x="'+1+'" y="'+65+'" style="padding-top: 50px; font-size:12px" fill="white">'+'Workstation'+ (workstationIndex+1) +'</text>'
          g2.node.innerHTML += '<rect style="display:none" x="-55" y="-50" width="196" height="78" stroke="red" fill="white"></rect>'
          g2.node.innerHTML += '<text style="display:none" x="-45" y="-25" font-size:12px">User: '+arrayOfConnections[i].user+'</text>'
          g2.node.innerHTML += '<text style="display:none" x="-45" y="0" font-size:12px">IP: '+arrayOfConnections[i].ip1+'</text>'
        } else {
          var externalIndex = externalEntityArray.indexOf(twoConnections[1].id);
          var g2 = nodes.group().translate(getPos(twoConnections[1]).x, getPos(twoConnections[1]).y)
          g2.circle(50).fill("#C2185B").opacity(0.4);
          //console.log(g1.node.children[0])
          g2.node.innerHTML = '<image style="cursor:pointer" alt="'+arrayOfConnections[i].ip1+'" id="thisisatest" onclick="fade(this)" onmouseover="popup(this)" onmouseout="popDownExternal(this)" xlink:href="images/externalGrey.png" height="75" width="75"/>'
          g2.node.innerHTML += '<text x="'+2+'" y="'+60+'" style="padding-top: 50px; font-size:12px" fill="white">External Entity</text>'
          g2.node.innerHTML += '<text x="'+35+'" y="'+72+'" style="padding-top: 50px; font-size:12px" fill="white">'+(externalIndex+1)+'</text>'
          g2.node.innerHTML += '<rect style="display:none" x="-55" y="-50" width="196" height="78" stroke="red" fill="white"></rect>'
          g2.node.innerHTML += '<text style="display:none" x="-45" y="-25" font-size:12px">User: '+arrayOfConnections[i].user+'</text>'
          g2.node.innerHTML += '<text style="display:none" x="-45" y="0" font-size:12px">IP: '+arrayOfConnections[i].ip1+'</text>'
        }


        var conn1 = g2.connectable({
           // targetAttach: 'perifery',
           // sourceAttach: 'perifery',
        //  padEllipse: true,
        //  markers: markers,
            type: 'curved'
        }, g1);
        conn1.setConnectorColor(color)
        conn1.setMarker('default',markers)
        //conn1.setAttribute("onmouseover", "test()")

        // var conn2 = g1.connectable({
        //     // targetAttach: 'perifery',
        //     // sourceAttach: 'perifery',
        //     type: 'curved'
        // }, g2);
        // conn2.setConnectorColor("#7ECB19")
        // conn2.setMarker('default',markers)

        for (h=0;h<document.querySelectorAll("path").length; h++) {
          if (document.querySelectorAll("path")[h].attributes.length > 2){
            if (document.querySelectorAll("path")[(h+i)]) {
            console.log(document.querySelectorAll("path")[(h+i)])
            document.querySelectorAll("path")[(h+i)].setAttribute('onmouseover', 'popupConnection(this)')
            document.querySelectorAll("path")[(h+i)].setAttribute('onmouseout', 'popupConnection(this)')
            arrayOfPaths.push(document.querySelectorAll("path")[(h+i)])
            // var g3 = nodes.group().translate(getPos(document.querySelectorAll("path")[(h+i)]).x, getPos(document.querySelectorAll("path")[(h+i)]).y)
            // var d = document.querySelectorAll("path")[(h+i)].getAttribute('d')
            // g3.innerHTML = '<text d="'+document.querySelectorAll("path")[(h+i)]+'" >This is a test</text>'
          }

            //console.log('yee')
          }
        }
console.log(arrayOfPaths)


      }
      document.getElementById('sensorColumn').style.display = 'none'
      document.getElementById('workstationColumn').style.display = 'none'
      document.getElementById('externalColumn').style.display = 'none'
      // document.querySelector('.box').style.display = 'none'



      //document.querySelector('.manufacturingfloor').nextElementSibling.innerHTML = '<button id="toggleFiltersButton" onClick="toggleFilters()">Filter by Date / Time &#9662;</button>'

      document.querySelector('.main').appendChild(document.querySelector('.main1'))
      document.querySelector('.main1').style.marginLeft = '200px'
      document.querySelector('.main1').style.marginTop = '200px'
      document.querySelector('.main1').style.width = '100%'



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
    document.querySelector('.main1').style.marginTop = '400px'
    x.style.display = "block";
    seconds = 1000000
  } else {
    document.querySelector('.main1').style.marginTop = '200px'
    x.style.display = "none";
    seconds = 5000
  }
}


function popupConnection(user) {
  console.log(user)
}

function popDownConnection(user) {
  console.log(user)
}




function popup(user) {
  user.nextElementSibling.nextElementSibling.style.display = 'block'
  user.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block'
  user.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'block'
}

function popDown(user) {
  user.nextElementSibling.nextElementSibling.style.display = 'none'
  user.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
  user.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
}

function popDownExternal(user) {
  user.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
  user.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
  user.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'
}
// and then change seconds variable to 10000000 whenever something is clicked on

// var seconds = 0
//
// function refresh(seconds){
//   setTimeout(function(){
//    window.location.reload(1);
// }, seconds);
// }
//
// setTimeout(function(){
// refresh(seconds)
// }, 5000);


function filterFunction() {
  var beginDate = document.getElementById('date1').value
  var endDate = document.getElementById('date2').value
  var beginTime = document.getElementById('time1').value
  var endTime = document.getElementById('time2').value

  beginDate = beginDate.split('-')[1] + '-' + beginDate.split('-')[2] + '-' + beginDate.split('-')[0]
  endDate = endDate.split('-')[1] + '-' + endDate.split('-')[2] + '-' + endDate.split('-')[0]

  sessionStorage.beginDate = beginDate
  sessionStorage.endDate = endDate
  sessionStorage.beginTime = beginTime
  sessionStorage.endTime = endTime

  location.reload();
}

function test() {
  console.log('test')
}

function fade(user) {
  var queries = document.querySelectorAll('image')
  var count = 0
  for (i=0;i<queries.length;i++) {
    if (queries[i].style.opacity === '0.4') {
      count+=1
    }
  }

  if (count > 0) {
    for (i=0;i<queries.length;i++) {
      if (queries[i].style.opacity === '0.4') {
        queries[i].style.opacity = '1'
      }
    }
  } else {

    for (i=0;i<queries.length;i++) {
      queries[i].style.opacity = '0.4'
    }

    //document.body.style.opacity = '0.4'
    var ip = user.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.split(' ')[1]
    var arrayOfConnected = []
    for (i=0;i<compareArray.length;i++) {
      if (ip === compareArray[i].ip1) {
        arrayOfConnected.push(compareArray[i].ip2)
      }
    }

    for (i=0; i<arrayOfConnected.length;i++) {
      for (j=0;j<queries.length;j++) {

        if (arrayOfConnected[i] === queries[j].getAttribute('alt') || ip === queries[j].getAttribute('alt')) {
          queries[j].style.opacity = '1'
        }
      }
    }
}
}
// var connectorInUse = nodes.use(connector)

//document.querySelector('.main1').innerHTML = ''

// var svg = d3.select(".main1").append("svg")
//     .attr("width", width)
//     .attr("height", height);
//
// var force = d3.layout.force()
//     .gravity(.01)
//     .distance(150)
//     .charge(-50)
//     .size([width, height]);
//
// var json = {
//   "nodes":[
// 		{"name":"Sensor 1","group":1, "img":  "images/sensor.png"},
// 		{"name":"Sensor 2","group":2, "img":  "images/sensor.png"},
// 		{"name":"Workstation 1","group":2, "img": "images/desktop.png"},
// 		{"name":"Sensor 3","group":3, "img":  "images/sensor.png"},
//     {"name":"Workstation 2","group":2, "img": "images/desktop.png"},
//     {"name":"Sensor 4","group":3, "img":  "images/sensor.png"}
// 	],
// 	"links":[
// 		{"source":2,"target":1,"weight":3, "color": "green"},
// 		{"source":2,"target":0,"weight":3, "color": "green"},
//     {"source":2,"target":3,"weight":3, "color": "green"},
//     {"source":0,"target":1,"weight":3, "color": "green"},
//     {"source":4,"target":5,"weight":3, "color": "green"},
//     {"source":4,"target":0,"weight":3, "color": "green"}
// 	]
// }
//
//
//   force
//       .nodes(json.nodes)
//       .links(json.links)
//       .start();
//
//   var link = svg.selectAll(".link")
//       .data(json.links)
//     .enter().append("line")
//       .attr("class", "link")
//     .style("stroke-width", function(d) { return Math.sqrt(d.weight); })
//       .style("stroke", function(d) { return d.color; });
//
//   var node = svg.selectAll(".node")
//       .data(json.nodes)
//     .enter().append("g")
//       .attr("class", "node")
//       .call(force.drag);
//
//
//       var images = node.append("svg:image")
//            .attr("xlink:href",  function(d) { return d.img;})
//            .attr("x", function(d) { return -25;})
//            .attr("y", function(d) { return -25;})
//            .attr("height", 50)
//            .attr("width", 50);
//
//   node.append("text")
//       .attr("dx", 30)
//       .attr("dy", ".35em")
//       .text(function(d) { return d.name });
//
//
//
//   force.on("tick", function() {
//     link.attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });
//
//     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//   });



// function readJSONFile() {
// // Blah blah blah, retrieve data from file, save data to obj object
// var obj = {
//     "mogra_report":
//     {
//         "network_map":
//         {
//             "connections":
//             [
//                 {
//                     "end_point_1" : "192.168.1.105",
//                     "end_point_2" : "192.168.1.122",
//                     "pay_load_type" : "http",
//                     "traffic_level" : "4",
//                 },
//
//                 {
//                     "end_point_1" : "192.168.1.105",
//                     "end_point_2" : "192.168.1.124",
//                     "traffic_level" : "3",
//                 },
//
//                 {
//                     "end_point_1" : "20.1.22.173",
//                     "end_point_2" : "192.168.1.115",
//                     "pay_load_type" : "unknown",
//                     "traffic_level" : "2",
//                 },
//
//                 {
//                     "end_point_1" : "192.168.1.105",
//                     "end_point_2" : "192.168.1.112",
//                     "pay_load_type" : "proprietary",
//                     "traffic_level" : "0",
//                 },
//
//                 {
//                     "end_point_1" : "192.168.1.105",
//                     "end_point_2" : "192.168.1.117",
//                     "pay_load_type" : "proprietary",
//                     "traffic_level" : "0",
//                 }
//
//             ]
//
//         }
//
//     }
//
// }
//   // for (i=0; i<document.getElementsByClassName('rectangle').length-6; i++) {
//   //   document.getElementsByClassName('rectangle')[i].parentElement.style.visibility = 'none'
//   //   // Hide arrows
//   // }
//   displayNetworkMap(obj)
// }
//
// function displayNetworkMap(obj) {
//   var arrayOfEndpointObjects = []
//   // Create Objects for sensors workstations and external entities, that way we can add properties from other files
//   // Eventually we'll have if sensor1, then make the first arrow appear and the more complex logic
//   for (i = 0; i < obj.mogra_report.network_map.connections.length; i++) {
//     var obj1 = {
//       ip: obj.mogra_report.network_map.connections[i].end_point_1,
//       type: 'sensor'
//     }
//     var obj2 = {
//       ip: obj.mogra_report.network_map.connections[i].end_point_2,
//       type: 'sensor'
//     }
//     arrayOfEndpointObjects.push(obj1)
//     arrayOfEndpointObjects.push(obj2)
//     //arrayOfEndpointObjects.push(obj.mogra_report.network_map.connections[i])
//   }
//    console.log(arrayOfEndpointObjects)
//   // Compare each object's IP value to the rest of the array. If same, pop the second and
//   // change the first's type to 'workstation'
//   for (j=0; j < arrayOfEndpointObjects.length; j++ ) {
//     for (k=j+1; k < arrayOfEndpointObjects.length-1; k++) {
//        console.log('Comparison: ' + arrayOfEndpointObjects[j].ip + ' and ' + arrayOfEndpointObjects[k].ip)
//       if (arrayOfEndpointObjects[j].ip === arrayOfEndpointObjects[k].ip && j!==k) {
//         arrayOfEndpointObjects[j].type = 'workstation'
//         arrayOfEndpointObjects.splice(k, 1)
//         console.log('Popped: ' + arrayOfEndpointObjects[k].ip)
//       }
//     }
//   }
//    console.log(arrayOfEndpointObjects)
// }
// readJSONFile()
// // and some script to read from file every x seconds. we're gonna have to read both (network & alert JSONs) at same time
