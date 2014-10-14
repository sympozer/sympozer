/**
 * Conference (mainEvent) controllers
 */

/**
 * Main conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsMainCtrl', [function ($scope)
{

}]);

/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'mainEventsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, mainEventsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.fetch = function(filters, success, error){
        mainEventsFact.all(filters, success, error);
    };

    $scope.clone = function (conference, index)
    {

        var cloneConference = angular.copy(conference);
        delete cloneConference.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Conference saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        };

        cloneConference.$create({}, success, error);
    };


    $scope.deleteModal = function (index, conference)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.mainEvents.urls.partials + 'mainEvents-delete.html', {
            id: 'complexDialog',
            title: 'Conference deletion',
            backdrop: true,
            controller: 'mainEventsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                mainEventsFact.delete({id: conference.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            conferenceModel: conference
        });
    }
}]);

/**
 * New conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsNewCtrl', [ '$scope', '$rootScope', '$location', 'mainEventsFact', function ($scope, $rootScope, $location, mainEventsFact)
{
    $scope.conference = new mainEventsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the conference has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'conference created', type: 'success'});
        $location.path('/mainEvents/list');
    };

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.conference.$create({}, success, error);
        }
    }
}]);

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

/**
 * Show conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'mainEventsFact', function ($scope, $rootScope, $routeParams, mainEventsFact)
{
    $scope.conference = mainEventsFact.get({id: $routeParams.mainEventId});

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});

}]);

/**
 * Delete conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsDeleteCtrl', [ '$scope', '$rootScope', 'conferenceModel', function ($scope, $rootScope, conferenceModel)
{
    $scope.conference = conferenceModel;
}]);

