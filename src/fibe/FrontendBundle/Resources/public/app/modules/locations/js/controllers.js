/**
 * Locations controllers
 */

/**
 * Main location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsMainCtrl', [function ($scope)
{

}]);

/**
 * List location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'locationsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, locationsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    var baseFilters;
    if ($routeParams.mainEventId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.mainEventId
        };
    }

    $scope.reload = function ()
    {
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.entities);
        });
    }

    $scope.clone = function (location)
    {
        var clonelocation = angular.copy(location);
        delete clonelocation.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location saved', type: 'success'});
            $scope.entities.push(response);
        }

        clonelocation.$create({}, success, error);
    }


    $scope.deleteModal = function (index, location)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-delete.html', {
            id: 'complexDialog',
            title: 'Location deletion',
            backdrop: true,
            controller: 'locationsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                locationsFact.delete({id: location.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            locationModel: location
        });
    }

}]);

/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsNewCtrl', [ '$scope', '$routeParams', '$rootScope', '$location', 'locationsFact', function ($scope, $routeParams, $rootScope, $location, locationsFact)
{
    $scope.location = new locationsFact;

    //initialize map zoom
    $scope.center = { zoom: 2 }
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location created', type: 'success'});
        $location.path('/conference/'+$routeParams.mainEventId+'/locations/list');
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.location.mainEvent = $routeParams.mainEventId;
            $scope.location.$create({}, success, error);
        }
    }

    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function (event, args)
    {
        var leafEvent = args.leafletEvent;
        $scope.markers.splice(0,$scope.markers.length)
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            message: "Event Marker"
        });

        $scope.location.latitude = leafEvent.latlng.lat;
        $scope.location.longitude = leafEvent.latlng.lng;

    });
}
]);

/**
 * Edit location controller
 * @TODO implement a directive for the map handling to remove code duplication
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'locationsFact', function ($scope, $rootScope, $routeParams, $location, locationsFact)
{
    //initialize map zoom
    $scope.center = { zoom: 2 }


    $scope.location = locationsFact.get({id: $routeParams.locationId}, function(location){
        //initialize map with current location
        $scope.center.lat = location.latitude || 48;
        $scope.center.long = location.longitude  || 8;
        $scope.center.zoom = 4;
        $scope.markers.push($scope.center);
    });

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location saved', type: 'success'});
        $location.path('/conference/'+$rootScope.currentMainEvent.id+'/locations/list');
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.location.$update({}, success, error);
        }
    }



    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function (event, args)
    {
        var leafEvent = args.leafletEvent;
        $scope.markers.splice(0,$scope.markers.length)
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            message: "Event Marker"
        });

        $scope.location.latitude = leafEvent.latlng.lat;
        $scope.location.longitude = leafEvent.latlng.lng;

    });
}]);

/**
 * Show location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsShowCtrl', [ '$scope', '$routeParams', 'locationsFact', function ($scope, $routeParams, locationsFact)
{
    $scope.location = locationsFact.get({id: $routeParams.locationId});

}]);

/**
 * Delete location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsDeleteCtrl', [ '$scope', 'locationModel', function ($scope, locationModel)
{
    $scope.location = locationModel;
}]);

