/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('VFRPlanner', ['leaflet-directive']);

require(["dgrid/OnDemandGrid", "dgrid/extensions/CompoundColumns", "dgrid/Selection", "dgrid/Keyboard", "dojo/_base/declare", "dojo/_base/lang", "dojo/domReady!"], function(Grid, CompoundColumns, Selection, Keyboard, declare, lang){
    var CompoundedGrid = declare([Grid, CompoundColumns, Selection, Keyboard]);
    var navColumns = [
        {label: "Wind", children: [
                {field: 'wd', label: 'Dir.', sortable: false},
                {field: 'ws', label: 'Speed', sortable: false}
        ]},
        {field: 'alt', label: 'ALT', sortable: false},
        {field: 'tt', label: 'TT', sortable: false},
        {field: 'tas', label: 'TAS', sortable: false},
        {field: 'wca', label: 'wca', sortable: false},
        {field: 'th', label: 'TH', sortable: false},
        {field: 'var', label: 'var', sortable: false},
        {field: 'mh', label: 'MH', sortable: false},
        {field: 'dev', label: 'dev', sortable: false},
        {field: 'ch', label: 'CH', sortable: false},
        {field: 'waypt', label: 'Waypoint', sortable: false},
        {label: 'Distance', children: [
                {field: 'dleg', label: 'leg', sortable: false},
                {field: 'dacc', label: 'acc', sortable: false}
        ]},
        {field: 'gs', label: 'GS', sortable: false},
        {label: 'Time', children: [
                {field: 'tint', label: 'int', sortable: false},
                {field: 'tacc', label: 'acc', sortable: false},
                {field: 'teto', label: 'ETO', sortable: false}
        ]}
    ];
    window.grid = new CompoundedGrid({
        columns: navColumns
    }, "navgrid"
            );
}
        
        );
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
        });

}]);