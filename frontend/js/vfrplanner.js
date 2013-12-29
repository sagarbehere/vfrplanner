/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('VFRPlanner', ['leaflet-directive']);

app.controller("mapController", [ '$scope', 'leafletEvents', function($scope, leafletEvents){
        $scope.navpointText = "No point clicked yet.";
        $scope.center = {
            lat: 59.3294,
            lng: 18.0686,
            zoom: 13
        };
        
        $scope.$on('leafletDirectiveMap.click', function(e, args) {
            for (var key in args.leafletEvent) {
                console.log(key);
            }
            console.log(args);
            $scope.navpointText = "You clicked on [ " + args.leafletEvent.latlng.lat.toString() + ", " + args.leafletEvent.latlng.lng.toString() + "]";
        });

}]);