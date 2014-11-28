/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('socials').controller('twitterTimelineCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'twitterFact', '$location',
        function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, twitterFact, $location)
{
    // Retrieve the url and get the specific scope
    $scope.info = GLOBAL_CONFIG.app.modules.socials.getInfo(
        GLOBAL_CONFIG.app.modules.socials.mapping, $location.$$path.split('/')[1]);

    $scope.$watch($scope.info.varName+'.'+$scope.info.display, function(newdisplay, olddisplay) {
        if(newdisplay){
            $scope.$watch($scope.info.varName+'.'+$scope.info.tags, function(newtag, oldtag) {
                if(newtag != undefined ) {
                    if ($scope.info.varName == "person") {
                        $scope.tweets = twitterFact.getPersonTag({tag: newtag, type: $scope.info.varName });
                    }else {
                        $scope.tweets = twitterFact.getHashTag({tag: newtag, type: $scope.info.varName });
                    }
                }
            });
        }
    });

}]);