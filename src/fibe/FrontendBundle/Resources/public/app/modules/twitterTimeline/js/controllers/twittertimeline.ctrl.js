/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('twitterApp').controller('twitterTimelineCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'twitterFact', '$location',
        function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, twitterFact, $location)
{

    $scope.info = GLOBAL_CONFIG.app.modules.socials.getInfo(GLOBAL_CONFIG.app.modules.socials.mapping, $location.$$path.split('/')[1]);

    $scope.$watch($scope.info.varName+'.'+$scope.info.tags, function(newtag, oldtag) {
        if(newtag != undefined){
            $scope.tweets = twitterFact.get({tag: newtag});
        }
    });
}]);