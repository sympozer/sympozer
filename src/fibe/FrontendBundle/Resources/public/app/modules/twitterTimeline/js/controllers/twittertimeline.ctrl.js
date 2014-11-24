/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('twitterApp').controller('twitterTimelineCtrl', [ '$scope', '$rootScope', '$routeParams', 'twitterFact',  function ($scope, $rootScope, $routeParams, twitterFact )
{
    $scope.tweets; //array of tweets

    twitterFact.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
        twitterFact.getLatestTweets().then(function(data) {
            $scope.tweets = data;
            console.log($scope.tweets.length);
        });
    }

}]);