/**
 * List papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'papersFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, papersFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.entities = [];

    $scope.request = papersFact.allByConference;

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