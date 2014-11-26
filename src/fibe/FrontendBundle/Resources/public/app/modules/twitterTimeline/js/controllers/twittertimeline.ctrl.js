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

    /*console.log($scope.info);
    console.log($scope[$scope.info.varName]);
    console.log( ($scope[$scope.info.varName])["firstName"] );*/

    console.log("console.log($scope.person);");
    var ret1 = $scope.person;
    console.log(ret1);
    console.log("console.log($scope.person.id);");
    var ret2 = $scope.person.id;
    console.log(ret2);


    $scope.tweets = twitterFact.get({tag: "test"}); //array of tweets
}]);