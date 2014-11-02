/**
 * Edit paper controller
 *
 * @type {controller}
 */

angular.module('papersApp').controller('papersEditCtrl', [ '$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', '$routeParams', '$location', 'papersFact', 'personsFact', 'topicsFact', '$modal', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, $routeParams, $location, papersFact, personsFact, topicsFact, $modal)
{

    $scope.paper = papersFact.get({id: $routeParams.paperId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper saved', type: 'success'});
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.paper.$update({}, success, error);
        }
    };

    $scope.updatePaper = function (field, data)
    {
        var updatePaperParam = {id: $scope.paper.id};
        updatePaperParam[field] = data;
        return papersFact.patch(updatePaperParam, success, error);
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
    };

    $scope.deletePerson = function(index){
      $scope.paper.authors.splice(index,1);  
    };


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
    };

    $scope.deleteTopic = function(index){
      $scope.paper.topics.splice(index,1);  
    };
}]);
