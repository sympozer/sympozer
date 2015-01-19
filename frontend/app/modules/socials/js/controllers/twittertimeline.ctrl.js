/**
 * Show twitter timeline controller
 *
 * @type {controller}
 */
angular.module('socialsApp').controller('twitterTimelineCtrl', [
    '$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'twitterFact', '$location',
    function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, twitterFact, $location)
    {
        // Retrieve the url and get the specific scope
        //TODO change this !
        // => use angular's scope inheritance properties or $routeParams or something more appropriated
        $scope.entitiesLbl = $location.$$path.split('/')[2];


        if ($scope.entitiesLbl == "mainEvents" && $scope.$root.currentMainEvent.twitter)
        {
            $scope.tweets = twitterFact.getHashTag({tag: $scope.currentMainEvent.twitter}, function success(data)
            {
                $scope.tweets = data.statuses;
            });
        }
        else if ($scope.entitiesLbl == "persons")
        {
            $scope.$watch('$parent.person', function (person)
            {
                if (person && person.twitter)
                {
                    $scope.tweets = twitterFact.getPersonTag({tag: person.twitter }, function success(data)
                    {
                        $scope.tweets = data;
                    });
                }
            }, true);
        }
    }]);