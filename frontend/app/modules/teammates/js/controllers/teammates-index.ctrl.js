/**
 * Index teammates controller
 *
 * This controller is used for the main index page for teammates
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesIndexCtrl',
    ['$scope', '$routeParams', '$rootScope', 'teammatesFact', '$cachedResource', '$modal', 'pinesNotifications', 'translateFilter',
     function ($scope, $routeParams, $rootScope, teammatesFact, $cachedResource, $modal, pinesNotifications, translateFilter)
     {
         $scope.request = teammatesFact.allByConference;
         $scope.entities = $scope.request();


         $scope.deleteTeammateModal = function (index, teammateModel)
         {
             $modal
                 .open({
                     templateUrl: globalConfig.app.modules.teammates.urls.partials + 'page/teammates-modal-delete.html',
                     controller : 'teammatesDeleteCtrl',
                     resolve    : {
                         teammateModel: function ()
                         {
                             return teammateModel;
                         }
                     }
                 })
                 .result.then(function (teammate)
                 {
                     var index = $.grep($scope.entities, function (e)
                     {
                         return e.id == teammate.id;
                     });
                     //find teammate in $scope.entities
                     for (var i = 0; i < $scope.entities.length; i++)
                     {
                         if ($scope.entities[i].id == teammate.id)
                         {
                             $scope.entities.splice(i, 1);
                             if ($scope.entities.length == 0)
                             {
                                 $scope.currentPage--;
                             }
                             $scope.fetchPage($scope.currentPage);
                             return;
                         }
                     }

                 }, function ()
                 {
                     //delete canceled
                 });
         };


     }]);
