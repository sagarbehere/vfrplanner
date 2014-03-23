/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var currentWayPoint = {name: "NoName", lat: "NoLat", lon: "NoLon"};

function rowAdded (nRow, aData, iDataIndex){
    //it seems aData is array containing row data and iDataIndex is row number, starting from 0
    var currPoint = {name: "NoName", lat: "NoLat", lon: "NoLon"};
    var prevPoint = {name: "NoName", lat: "NoLat", lon: "NoLon"};
    console.log("rowAdded. nRow is " + nRow.toString() + " aData is " + aData.toString() + " iDataIndex is " + iDataIndex.toString());
    //FIXME: Fragile pattern matching! if Bromma\n[59.902,17.304]
    //col. 11 in table is waypoint
    currPoint.name = aData[11].match(/\w+/);//matches "Bromma"
    currPoint.lat = aData[11].match(/\d+\.\d+/g)[0]; //matches 59.902
    currPoint.lon = aData[11].match(/\d+\.\d+/g)[1]; //matches 17.304
    if (iDataIndex > 0){
        var prevPointString;
        prevPointString = $('#navTable').dataTable().fnGetData(iDataIndex-1, 11);//col. 11 is waypoint name
        prevPoint.name = prevPointString.match(/\w+/);
        prevPoint.lat = prevPointString.match(/\d+\.\d+/g)[0];
        prevPoint.lon = prevPointString.match(/\d+\.\d+/g)[1];
        console.log("previous waypoint was: "+prevPoint.name+" ["+prevPoint.lat+","+prevPoint.lon+"]" );
        
        var geoCurrPoint = new LatLon(parseFloat(currPoint.lat),parseFloat(currPoint.lon));
        var geoPrevPoint = new LatLon(parseFloat(prevPoint.lat),parseFloat(prevPoint.lon));
        console.log("distance to previous point is "+Math.ceil(geoPrevPoint.rhumbDistanceTo(geoCurrPoint)*0.54)+"Nm");//1km = 0.54 Nm
        console.log("bearing from previous point is "+geoPrevPoint.rhumbBearingTo(geoCurrPoint).toFixed(2));
        $('#navTable').dataTable().fnUpdate(Math.ceil(geoPrevPoint.rhumbDistanceTo(geoCurrPoint)*0.54),iDataIndex,12);//col 12 is distance/leg
        $('#navTable').dataTable().fnUpdate(geoPrevPoint.rhumbBearingTo(geoCurrPoint).toFixed(2),iDataIndex,3);//col 3 is TT
    }
    
}

function onMapClick(e) {
    $('#navpoint-text').val("You clicked on [" + e.latlng.lat +","+e.latlng.lng+"]");
    currentWayPoint.lat = e.latlng.lat;
    currentWayPoint.lon = e.latlng.lng;
    //alert("You clicked the map at " + e.latlng);
}

$(document).ready(function(){
    
    var map = L.map('map').setView([59.3294,18.0686],13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var aaData = [];
    
    $('#navTable').dataTable({
        "aaData": aaData,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "250px",
        "sScrollX": "100%",
        "bPaginate": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "fnCreatedRow": rowAdded
    });
    //$('#navTable').dataTable().fnAddData(['', '', '', '', '','','', '', '','', '', 'Bromma\n[59.2,17.1]','','','','','','']);
    
    map.on('click', onMapClick);
});

function addWayPoint() {
    //FIXME: Better error handling in case no point is clicked yet

    $('#navTable').dataTable().fnAddData(['', '', '', '', '','','', '', '','', '', currentWayPoint.name+"\n"+"["+currentWayPoint.lat.toFixed(4)+","+currentWayPoint.lon.toFixed(4)+"]",'','','','','','']);
    $('#navTable').dataTable().parent().scrollTop(9999);
}