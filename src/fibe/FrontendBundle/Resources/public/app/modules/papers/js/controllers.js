/**
 * Paper controllers
 */

/**
 * Main papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersMainCtrl', [
    function ($scope)
    {

    }]);

/**
 * List papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'papersFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, papersFact, $cachedResource)
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
//        $scope.entities.$promise.then(function ()
//        {
//            console.log('From cache:', $scope.papers);
//        });
    };

    $scope.clone = function (paper)
    {
        var clonePaper = angular.copy(paper);
        delete clonePaper.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper saved', type: 'success'});
            $scope.entities.push(response);
        };
        clonePaper.$create({}, success, error);
    };


    $scope.deleteModal = function (index, paper)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-delete.html', {
            id        : 'complexDialog',
            title     : 'paper deletion',
            backdrop  : true,
            controller: 'papersDeleteCtrl',
            success   : {label: 'Ok', fn: function ()
            {
                papersFact.delete({id: paper.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            paperModel: paper
        });
    }


}]);

/**
 * New paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$rootScope', '$location', 'papersFact', function ($scope, $rootScope, $location, papersFact)
{
    $scope.paper = new papersFact(papersFact.current);

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper created', type: 'success'});
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');

    };

    $scope.create = function (form)
    {
        $scope.paper.mainEvent = $rootScope.currentMainEvent.id;
        if (form.$valid)
        {
            $scope.paper.$create({}, success, error);
        }
    }
}]);

/**
 * Edit paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'papersFact', function ($scope, $rootScope, $routeParams, $location, papersFact)
{
    $scope.paper = papersFact.get({id: $routeParams.paperId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper saved', type: 'success'});
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.paper.$update({}, success, error);
        }
    }
}]);

/**
 * Show paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersShowCtrl', [ '$scope', '$routeParams', 'papersFact', function ($scope, $routeParams, papersFact)
{
    $scope.paper = papersFact.get({id: $routeParams.paperId});

}]);

/**
 * Delete paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersDeleteCtrl', [ '$scope', 'paperModel', function ($scope, paperModel)
{
    $scope.paper = paperModel;
}]);

