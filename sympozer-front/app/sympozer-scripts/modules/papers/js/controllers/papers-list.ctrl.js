/**
 * List papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'papersFact', '$cachedResource', 'pinesNotifications', 'translateFilter', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, papersFact, $cachedResource, pinesNotifications, translateFilter)
{

    //Initialize papers list array
    $scope.entities = [];

    //Request to trigger when scroll detected (for infinite scroll)
    $scope.request = papersFact.allByConference;


    //Clone function, create a copy of a specific paper
    $scope.clone = function (paper)
    {
        var clonePaper = angular.copy(paper);
        delete clonePaper.id;

        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('papers.validations.not_created'),
                type: 'error'
            });
        };

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('papers.validations.created'),
                type: 'success'
            });
            $scope.entities.push(response);
        };
        clonePaper.$create({}, success, error);
    };


//    $scope.deleteModal = function (index, paper)
//    {
//        $scope.index = index;
//
//        createDialogService(GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-delete.html', {
//            id        : 'complexDialog',
//            title     : 'paper deletion',
//            backdrop  : true,
//            controller: 'papersDeleteCtrl',
//            success   : {label: 'Ok', fn: function ()
//            {
//                papersFact.delete({id: paper.id});
//                $scope.entities.splice(index, 1);
//            }}
//        }, {
//            paperModel: paper
//        });
//    }


}]);