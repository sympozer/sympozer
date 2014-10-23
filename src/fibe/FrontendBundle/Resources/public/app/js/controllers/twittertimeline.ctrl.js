/**
 * Show twittertimeline controller
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('twitterTimelineCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$http',
        function ($scope, $routeParams, GLOBAL_CONFIG, $http)
        {
            /**
             * Fonction effectuant une requête sur l'API Search de Twitter permettant de récupérer
             * tous les tweets en fonction d'un tag (@ ou #), traite les résultats en JSON et
             * stocke le tout dans le scope pour que la vue "twittertimeline.html" puisse afficher
             * facilement le résultat.
             *
             * @param tag
             */
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
        }]);