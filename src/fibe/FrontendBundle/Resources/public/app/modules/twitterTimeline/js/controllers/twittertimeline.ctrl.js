/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('twitterApp').controller('twitterTimelineCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'twitterFact',
        function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, twitterFact )
{

    $scope.info = GLOBAL_CONFIG.app.modules.socials.getInfo(GLOBAL_CONFIG.app.modules.socials.mapping, "person");

    console.log($scope.info);
    console.log($scope[$scope.info.varName]);
    console.log( ($scope[$scope.info.varName])["dType"] );
    $scope.ret = $scope[$scope.info.varName];

    $scope.tweets = twitterFact.get({tag: "test"}); //array of tweets
}]);