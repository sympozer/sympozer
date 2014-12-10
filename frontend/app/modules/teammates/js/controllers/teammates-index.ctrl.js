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

//         $scope.deleteTeammate = function (teammate)
//         {
//             teammatesFact.delete({id: teammate.id});
//             var index = $scope.entities.indexOf(teammate);
//             $scope.entities.splice(index, 1);
//         };

//  $scope.entities = [
//    {
//      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
//      abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, obcaecati consequuntur aspernatur neque voluptatum mollitia eaque tenetur ea tempora itaque dolore incidunt explicabo voluptate quaerat at reprehenderit iste iusto asperiores?',
//      url: 'http://www.google.com',
//      publisher: 'Admin',
//      publishDate: new Date(),
//      topics: ['topic 1', 'topic 2'],
//      authors: ['Florian Bacle', 'Vincent Sébille']
//    },
//    {
//      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
//      abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, obcaecati consequuntur aspernatur neque voluptatum mollitia eaque tenetur ea tempora itaque dolore incidunt explicabo voluptate quaerat at reprehenderit iste iusto asperiores?',
//      url: 'http://www.google.com',
//      publisher: 'Admin',
//      publishDate: new Date(),
//      topics: ['topic 1', 'topic 2', 'topic 3'],
//      authors: ['Florian Bacle']
//    },
//    {
//      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
//      publishDate: new Date()
//    },
//    {
//      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
//      publisher: 'Admin'
//    },
//    {
//      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined'
//    }
//  ];

//  $scope.request = teammatesFact.all; // @TODO : TO BIND WITH SERVICES
         /* @TODO : TO REPLACE & ADAPT

          $scope.reload = function ()
          {
          //        $scope.entities.$promise.then(function ()
          //        {
          //            console.log('From cache:', $scope.teammates);
          //        });
          };

          $scope.clone = function (teammate)
          {
          var cloneTeammate = angular.copy(teammate);
          delete cloneTeammate.id;

          var error = function (response, args)
          {
          $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
          };

          var success = function (response, args)
          {
          $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'teammate saved', type: 'success'});
          $scope.entities.push(response);
          };
          cloneTeammate.$create({}, success, error);
          };


          $scope.deleteModal = function (index, teammate)
          {
          $scope.index = index;

          createDialogService(GLOBAL_CONFIG.app.modules.teammates.urls.partials + 'teammates-delete.html', {
          id: 'complexDialog',
          title: 'teammate deletion',
          backdrop: true,
          controller: 'teammatesDeleteCtrl',
          success: {
          label: 'Ok', fn: function ()
          {
          teammatesFact.delete({id: teammate.id});
          $scope.entities.splice(index, 1);
          }
          }
          }, {
          teammateModel: teammate
          });

          }
          */

     }]);
