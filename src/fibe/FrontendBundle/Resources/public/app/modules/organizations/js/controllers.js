/**
 * Organizations controllers
 */

/**
 * Main organizations controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsMainCtrl', [function ($scope)
{

}]);

/**
 * List organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'organizationsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, organizationsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.entities = [];

    var baseFilters;
    if ($routeParams.confId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.confId
        };
    }

    $scope.reload = function ()
    {
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.entities);
        });
    }

    $scope.clone = function (organization, index)
    {
        var cloneOrganization = angular.copy(organization);
        delete cloneOrganization.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Organization saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        }

        cloneOrganization.$create({}, success, error);
    }


    $scope.deleteModal = function (index, organization)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.organizations.urls.partials + 'organizations-delete.html', {
            id: 'complexDialog',
            title: 'Organization deletion',
            backdrop: true,
            controller: 'organizationsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                organizationsFact.delete({id: organization.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            organizationModel: organization
        });
    }

}]);

/**
 * New organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsNewCtrl', [ '$scope', '$rootScope', '$location', 'organizationsFact', function ($scope, $rootScope, $location, organizationsFact)
{
    $scope.organization = new organizationsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the organization has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organization created', type: 'success'});
        $location.path('/organizations/list');
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.organization.$create({}, success, error);
        }
    }
}]);

/**
 * Edit organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'organizationsFact', function ($scope, $rootScope, $routeParams, $location, organizationsFact)
{
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the organization has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organization saved', type: 'success'});
        $location.path('/organizations/list');
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.organization.$update({}, success, error);
        }
    }
}]);

/**
 * Show organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsShowCtrl', [ '$scope', '$routeParams', 'organizationsFact', function ($scope, $routeParams, organizationsFact)
{
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});

    console.log($scope.organization);
}]);

/**
 * Delete organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsDeleteCtrl', [ '$scope', 'organizationModel', function ($scope, organizationModel)
{
    $scope.organization = organizationModel;
}]);