/**
 * Edit conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'mainEventsFact', function ($scope, $rootScope, $routeParams, $location, mainEventsFact)
{
    $scope.conference = mainEventsFact.get({id: $routeParams.mainEventId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the conference has not been saved', type: 'danger'});
    };

    //Get geolocalization of the user
//    $.get("http://ipinfo.io", function(response) {
//
//        var lat = response.loc.split(",")[0];
//        var lng = response.loc.split(",")[1];
//        var latlng = L.latLng(lat, lng);
//        map.setView(latlng, 4, {animate: true});
//    }, "jsonp");


    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'conference saved', type: 'success'});
        $location.path('/mainEvents/list');
        $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});

    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.conference.$update({}, success, error);
        }
    };



    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


}]);