/**
 * Context controller
 *
 * Controller for conference context changes
 *
 * @type {controller}
 */
angular.module('contextualizationApp').controller('contextCtrl', ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'conferencesFact', '$location',
  function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, conferencesFact, $location)
  {

    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $rootScope.currentConference = JSON.parse(localStorage.getItem('currentConference')) || "";

    var changeContext = function (conference)
    {

      if (conference.confId != $rootScope.currentConference.id)
      {
        conferencesFact.get({id: conference.confId}, function (conference)
        {
          localStorage.setItem('currentConference', JSON.stringify(conference));
          $rootScope.currentConference = conference;
          $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Welcome to ' + $rootScope.currentConference.label, type: 'success'});
          $('#collapseMySpace').collapse('hide');
          $('#collapseCommunity').collapse('hide');
          $('#collapseConference').collapse('show');
        });
      }

    }

    $scope.$on('contextCtrl:changeContext', function (event, conferenceId)
    {
      changeContext(conferenceId)
    });

  }]);
