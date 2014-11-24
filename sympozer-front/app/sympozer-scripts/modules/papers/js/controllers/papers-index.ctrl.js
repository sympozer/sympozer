/**
 * Index papers controller
 *
 * This controller is used for the main index page for papers
 *
 * @type {controller}
 */
angular.module('papersApp').controller(
  'papersIndexCtrl',
  ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'papersFact', '$cachedResource',
    function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, papersFact, $cachedResource)
{
  $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
  $scope.entities = [];
  //@TODO : TO REPLACE BY REAL RESULTS
  $scope.entities = [
    {
      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, obcaecati consequuntur aspernatur neque voluptatum mollitia eaque tenetur ea tempora itaque dolore incidunt explicabo voluptate quaerat at reprehenderit iste iusto asperiores?',
      url: 'http://www.google.com',
      publisher: 'Admin',
      publishDate: new Date(),
      topics: ['topic 1', 'topic 2'],
      authors: ['Florian Bacle', 'Vincent Sébille']
    },
    {
      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
      abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, obcaecati consequuntur aspernatur neque voluptatum mollitia eaque tenetur ea tempora itaque dolore incidunt explicabo voluptate quaerat at reprehenderit iste iusto asperiores?',
      url: 'http://www.google.com',
      publisher: 'Admin',
      publishDate: new Date(),
      topics: ['topic 1', 'topic 2', 'topic 3'],
      authors: ['Florian Bacle']
    },
    {
      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
      publishDate: new Date()
    },
    {
      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined',
      publisher: 'Admin'
    },
    {
      label: 'Forza - With the powers of Bootstrap, jQuery and AngularJS combined'
    }
  ];

  $scope.request = papersFact.all; // @TODO : TO BIND WITH SERVICES
  /* @TODO : TO REPLACE & ADAPT

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
      id: 'complexDialog',
      title: 'paper deletion',
      backdrop: true,
      controller: 'papersDeleteCtrl',
      success: {
        label: 'Ok', fn: function ()
        {
          papersFact.delete({id: paper.id});
          $scope.entities.splice(index, 1);
        }
      }
    }, {
      paperModel: paper
    });

  }
   */

    //Manage the signin modal
        $scope.showNewTopicsPopup = $scope.$root.showNewTopicsPopup = function ()
        {
            //Open topic creation modal
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.topics.urls.partials + 'topics-new.html',
                controller : 'topicsNewCtrl',
                size       : "large"
            });
        };

}]);
