/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('VFRPlanner', ['leaflet-directive']);

$(document).ready(function(){
    var aaData = [];
    
    $('#navTable').dataTable({
        "sDom": "<'row'<'col-6'f><'col-6'l>r>t<'row'<'col-6'i><'col-6'p>>",
        "aaData": aaData,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "250px",
        "sScrollX": "100%",
        "bPaginate": false,
        "bLengthChange": false,
        "iDisplayLength": 8
    });
    //$('#navTable').dataTable().fnAddData(['', '', '', '', '','','', '', '','', '', 'Bromma','','','','','','']);
});

app.controller("mapController", [ '$scope', 'leafletEvents', function($scope, leafletEvents){
        $scope.navpointText = "No point clicked yet.";
        $scope.center = {
            lat: 59.3294,
            lng: 18.0686,
            zoom: 13
        };

        $scope.mapClickedPoint = {name: "SomeName", lat: "SomeLat", Lon: "SomeLon"};
        $scope.$on('leafletDirectiveMap.click', function(e, args) {
            $scope.mapClickedPoint.lat = args.leafletEvent.latlng.lat.toString();
            $scope.mapClickedPoint.lon = args.leafletEvent.latlng.lng.toString();
            $scope.navpointText = "You clicked on [ " + args.leafletEvent.latlng.lat.toString() + ", " + args.leafletEvent.latlng.lng.toString() + "]";
            angular.element(navTable).dataTable().fnAddData(['', '', '', '', '','','', '', '','', '', 'Bromma','','','','','','']);
            angular.element(navTable).dataTable().parent().scrollTop(9999);
        });

}]);