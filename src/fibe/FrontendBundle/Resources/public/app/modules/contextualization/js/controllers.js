/**
 * Context controller
 *
 * Controller for conference context changes
 *
 * @type {controller}
 */
angular.module('contextualizationApp').controller('contextCtrl', ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'mainEventsFact', '$location',
  function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, mainEventsFact, $location)
  {

    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $rootScope.currentMainEvent = JSON.parse(localStorage.getItem('currentMainEvent')) || "";

    var changeContext = function (mainEventId)
    {

      if (mainEventId != $rootScope.currentMainEvent.id)
      {
        mainEventsFact.get({id: mainEventId}, function (mainEvent)
        {
          localStorage.setItem('currentMainEvent', JSON.stringify(mainEvent));
          $rootScope.currentMainEvent = mainEvent;
          $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Welcome to ' + $rootScope.currentMainEvent.label, type: 'success'});
          $('#collapseMySpace').collapse('hide');
          $('#collapseCommunity').collapse('hide');
          $('#collapseConference').collapse('show');
        });
      }

    }

    $scope.$on('contextCtrl:changeContext', function (event, params)
    {
      changeContext(params.mainEventId)
    });

  }]);
