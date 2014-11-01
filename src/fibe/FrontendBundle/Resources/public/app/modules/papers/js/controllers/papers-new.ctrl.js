/**
 * New paper controller
 *
 * @type {controller}
 */
    angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$window', '$modal', 'createDialog', '$rootScope', 'GLOBAL_CONFIG', '$location', 'papersFact', 'personsFact', 'topicsFact',
    function ($scope, $window, $modal, createDialogService, $rootScope, GLOBAL_CONFIG, $location, papersFact, personsFact, topicsFact)
{
    $scope.paper = new papersFact();
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper created', type: 'success'});
        if($scope.$close){
            $scope.$close($scope.paper);
        }else{
            $window.history.back();
        }
    };

    $scope.create = function (form)
    {
        $scope.paper.mainEvent = $rootScope.currentMainEvent.id;
        if (form.$valid)
        {
            $scope.paper.$create({}, success, error);
        }
    }


    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    //Autocomplete and add authors workflow
    $scope.searchPersons = personsFact.all;
    $scope.paper.authors = [];
    $scope.addPerson = function(personModel){
        if(!personModel.id) {
            var modalPersonInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-modal-form.html',
                controller: 'personsNewCtrl',
                size: "large",
                resolve: {
                }
            });
            modalPersonInstance.result.then(function (newPerson) {
                if(!$scope.paper.authors){
                    $scope.paper.authors = [];
                }
                $scope.paper.authors.push(newPerson);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            if(!$scope.paper.authors){
                $scope.paper.authors = [];
            }
            $scope.paper.authors.push(personModel);

        }
    }

    $scope.deletePerson = function(personModel,index){
      
        
            $scope.paper.authors.splice(index,personModel);
        
    }

    $scope.deleteTopic = function(topicModel,index){
            $scope.paper.topics.splice(index,topicModel);    
    }


    //Autocomplete and add topic workflow
    $scope.searchTopics = topicsFact.all;
    $scope.paper.topics = [];
    $scope.addTopic = function(topicModel){
        if(!topicModel.id) {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.topics.urls.partials + 'topics-modal-form.html',
                controller: 'topicsNewCtrl',
                size: "large",
                resolve: {
                }
            });
            modalInstance.result.then(function (newTopic) {
                if(!$scope.paper.topics){
                    $scope.paper.topics = [];
                }
                $scope.paper.topics.push(newTopic);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            if(!$scope.paper.topics){
                $scope.paper.topics = [];
            }
            $scope.paper.topics.push(topicModel);
        }
    }
}]);