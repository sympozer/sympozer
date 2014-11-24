/**
 * Twitter Timeline Factory
 *
 *
 * @type {factory}
 */
angular.module('twitterApp').factory('twitterFact',
    ['$http',
        function($http)
        {
            return {
                initialize: function() {
                    console.log("init service twitter")
                },

                getLatestTweets: function () {
                    // Simple GET request example :
                    $http.get('/twitter-api/search/test').
                        success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            console.log("get tweets ok");
                            return $data;
                        }).
                        error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            console.log("error");
                        });
                }
        }
}]);

/*
angular.module('sympozerApp').controller('twitterTimelineCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$http',
        function ($scope, $routeParams, GLOBAL_CONFIG, $http)
        {
            */
/**
             * Fonction effectuant une requête sur l'API Search de Twitter permettant de récupérer
             * tous les tweets en fonction d'un tag (@ ou #), traite les résultats en JSON et
             * stocke le tout dans le scope pour que la vue "twittertimeline.html" puisse afficher
             * facilement le résultat.
             *
             * @param tag
             *//*

            $scope.getTweets = function(tag)
            {
                $scope.tweets = 'Chargement en cours...';

                $http.get("/sympozer/web/app_dev.php/tweets/" + tag).
                    success(function(data) {
                        console.log(data);
                        $scope.tweets = data;
                    }).
                    error(function(data) {
                        console.log("TwitterTimeline.get(): Error");
                        $scope.tweets = 'Erreur: Impossible de récupérer les tweets associés à ' + tag;
                    });

                $scope.tag = tag;
            };
        }]);*/
