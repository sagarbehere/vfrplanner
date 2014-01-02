/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('VFRPlanner', ['ngGrid', 'leaflet-directive']);

app.controller("mapController", [ '$scope', 'leafletEvents', function($scope, leafletEvents){
        $scope.navpointText = "No point clicked yet.";
        $scope.center = {
            lat: 59.3294,
            lng: 18.0686,
            zoom: 13
        };
        $scope.waypoints = [];
        $scope.mapClickedPoint = {name: "SomeName", lat: "SomeLat", Lon: "SomeLon"};
        $scope.$on('leafletDirectiveMap.click', function(e, args) {
            $scope.mapClickedPoint.lat = args.leafletEvent.latlng.lat.toString();
            $scope.mapClickedPoint.lon = args.leafletEvent.latlng.lng.toString();
            $scope.navpointText = "You clicked on [ " + args.leafletEvent.latlng.lat.toString() + ", " + args.leafletEvent.latlng.lng.toString() + "]";
        });
        $scope.rowData = [{alt: "", tt: "", wd: "",  ws: "", wca: "",  th: "",    var: "", mh: "", dev: "", ch: "", waypt: "", dleg: "", dacc: "", gs: "", tint: "", tacc: "", teto: ""}];
        $scope.myData = [{name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}];
        
        $scope.gridOptions = {
            data: 'rowData',
//            data: 'myData',
//            enableCellSelection: true,
//            enableRowSelection: false,
//            enableCellEditOnFocus: true,
            columnDefs: [{field: 'alt', displayName: 'ALT', enableCellEdit: true},
                  {field: 'tt', displayName: 'TT', enableCellEdit: true},
                  {field: 'wd', displayName: 'WD', enableCellEdit: true},
                  {field: 'ws', displayName: 'WS', enableCellEdit: true},
                  {field: 'wca', displayName: 'wca', enableCellEdit: true},
                  {field: 'th', displayName: 'TH', enableCellEdit: true},
                  {field: 'var', displayName: 'var', enableCellEdit: true},
                  {field: 'mh', displayName: 'MH(deg)', enableCellEdit: true},
                  {field: 'dev', displayName: 'dev.', enableCellEdit: true},
                  {field: 'ch', displayName: 'CH', enableCellEdit: true},
                  {field: 'waypt', displayName: 'Waypoint', enableCellEdit: true, width: 120},
                  {field: 'dleg', displayName: 'D', enableCellEdit: true},
                  {field: 'dacc', displayName: 'D acc.', enableCellEdit: true},
                  {field: 'gs', displayName: 'GS', enableCellEdit: true},
                  {field: 'tint', displayName: 'T', enableCellEdit: true},
                  {field: 'tacc', displayName: 'T acc.', enableCellEdit: true},
                  {field: 'teto', displayName: 'ETO', enableCellEdit: true}
              ]
        };

}]);