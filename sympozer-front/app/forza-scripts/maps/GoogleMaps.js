'use strict'

angular.module('theme.google_maps', [])
.controller('GMapsController', ['$scope', function ($scope) {
	$scope.basicMapOptions = {
        lat:-12.043333,
        lng:-77.028333
	};

	$scope.routeMapInstance;
	$scope.routeMapOptions = {
		lat:-12.043333,
		lng:-77.028333
	};
	$scope.startRoute = function ($event) {
		$event.preventDefault();
		$scope.routeMapInstance.travelRoute({
			origin:[-12.044012922866312, -77.02470665341184],
			destination:[-12.090814532191756, -77.02271108990476],
			travelMode:'driving',
			step:function (e) {
				$('#instructions').append('<li>' + e.instructions + '</li>');
				$('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function () {
					$scope.routeMapInstance.setCenter(e.end_location.lat(), e.end_location.lng());
					$scope.routeMapInstance.drawPolyline({
						path:e.path,
						strokeColor:'#131540',
						strokeOpacity:0.6,
						strokeWeight:6
					});
				});
			}
		});
	};

	$scope.panoramicMapOptions = {
        lat:-12.043333,
        lng:-77.028333
	};

	var infoWindow = new google.maps.InfoWindow({});

	$scope.fusionMapInstance;
	$scope.fusionMapOptions = {
        zoom:11,
        lat:41.850033,
        lng:-87.6500523
    };

    var path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];

	$scope.polylinesMapInstance;
    $scope.polylinesMapOptions = {
        lat: -12.043333,
        lng: -77.028333,
        click: function(e){
            console.log(e);
        }
    };

	$scope.geoCodingMapInstance;
    $scope.geocodeAddress = 'Rio';

    $scope.submitGeocoding = function (address) {
        GMaps.geocode({
            address: address,
            callback: function (results, status) {
                if (status=='OK'){
                    var latlng = results[0].geometry.location;
                    $scope.geoCodingMapInstance.setCenter(latlng.lat(), latlng.lng());
                    $scope.geoCodingMapInstance.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    };

	$scope.$on('GMaps:created', function (event, mapInstance) {
		if (mapInstance.key)
			$scope[mapInstance.key] = mapInstance.map;

		if (mapInstance.key == 'fusionMapInstance') {
		    $scope.fusionMapInstance.loadFromFusionTables({
		        query:{
		            select:'\'Geocodable address\'',
		            from:'1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
		        },
		        suppressInfoWindows:true,
		        events:{
		            click:function (point) {
		                infoWindow.setContent('You clicked here!');
		                infoWindow.setPosition(point.latLng);
		                infoWindow.open(fusion.map);
		            }
		        }
		    });
		} else if (mapInstance.key == 'polylinesMapInstance') {
		    $scope.polylinesMapInstance.drawPolyline({
		        path: path,
		        strokeColor: '#131540',
		        strokeOpacity: 0.6,
		        strokeWeight: 6
		    });
		} else if (mapInstance.key == 'geoCodingMapInstance') {
		}
	});
}])
.service('GMaps', ['$rootScope', function ($rootScope) {
	this.new = function (options, instance) {
		var gmaps = new GMaps(options);
		$rootScope.$broadcast('GMaps:created', { key: instance, map: gmaps });
	};
	this.newPanorama = function (options, instance) {
		var gmaps = GMaps.createPanorama(options);
		$rootScope.$broadcast('GMaps:created', { key: instance, map: gmaps });
	};
}])
.directive('gmap', ['$timeout', 'GMaps', function ($timeout, GMaps) {
	return {
		restrict: 'A',
		scope: {
			options: '=',
			instance: '@'
		},
		link: function (scope, element, attr) {
			if (!attr.id) {
				attr.id = Math.random().toString(36).substring(7);
				element.attr('id', attr.id);
			}
			scope.options.el = '#'+attr.id;

			if (attr.panorama !== undefined)
				GMaps.newPanorama(scope.options, scope.instance);
			else
				GMaps.new(scope.options, scope.instance);
		}
	}
}])