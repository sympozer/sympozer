/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('twitterApp').controller('twitterTimelineCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'twitterFact',
        function ($scope, $rootScope, $routeParams, twitterFact )
{
    console.log("init service twitter");

    console.log(globalConfig.app.modules.twitter.urls.getTimeline);
    console.log(globalConfig.app.modules.twitter);

    console.log($scope.currentMainEvent);

    $scope.tweets = twitterFact.get({tag: "test"}); //array of tweets
}]);