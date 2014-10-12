/**
 * Conference (mainEvent) controllers
 */

/**
 * Main conference controller
 *
 * @type {controller}
 */
angular.module('conferencesApp').controller('conferencesMainCtrl', [function ($scope)
{

}]);

/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('conferencesApp').controller('conferencesListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'conferencesFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, conferencesFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.fetch = function(filters, success, error){
        conferencesFact.all(filters, success, error);
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

        createDialogService(GLOBAL_CONFIG.app.modules.conferences.urls.partials + 'conferences-delete.html', {
            id: 'complexDialog',
            title: 'Conference deletion',
            backdrop: true,
            controller: 'conferencesDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                conferencesFact.delete({id: conference.id});
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
angular.module('conferencesApp').controller('conferencesNewCtrl', [ '$scope', '$rootScope', '$location', 'conferencesFact', function ($scope, $rootScope, $location, conferencesFact)
{
    $scope.conference = new conferencesFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the conference has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'conference created', type: 'success'});
        $location.path('/conferences/list');
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
angular.module('conferencesApp').controller('conferencesEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'conferencesFact', function ($scope, $rootScope, $routeParams, $location, conferencesFact)
{
    $scope.conference = conferencesFact.get({id: $routeParams.confId});

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
        $location.path('/conferences/list');
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.conference.$update({}, success, error);
        }
    };



    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {confId: $routeParams.confId});


}]);

/**
 * Show conference controller
 *
 * @type {controller}
 */
angular.module('conferencesApp').controller('conferencesShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'conferencesFact', function ($scope, $rootScope, $routeParams, conferencesFact)
{
    $scope.conference = conferencesFact.get({id: $routeParams.confId});

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {confId: $routeParams.confId});

}]);

/**
 * Delete conference controller
 *
 * @type {controller}
 */
angular.module('conferencesApp').controller('conferencesDeleteCtrl', [ '$scope', '$rootScope', 'conferenceModel', function ($scope, $rootScope, conferenceModel)
{
    $scope.conference = conferenceModel;
}]);

