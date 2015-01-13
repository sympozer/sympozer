/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('socialsApp').controller('twitterTimelineCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'twitterFact', '$location',
      function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, twitterFact, $location)
      {
          // Retrieve the url and get the specific scope
          //TODO change this !!!
          $scope.info = GLOBAL_CONFIG.app.modules.socials.getInfo(
              GLOBAL_CONFIG.app.modules.socials.mapping, $location.$$path.split('/')[2]);

          if ($scope.currentMainEvent.twitter)
          {
              if ($scope.info.varName == "persons")
              {
                  $scope.tweets = twitterFact.getPersonTag({tag: $scope.currentMainEvent.twitter, type: $scope.info.varName });
              }
              else
              {
                  $scope.tweets = twitterFact.getHashTag({tag: $scope.currentMainEvent.twitter, type: $scope.info.varName });
              }
          }
      }]);