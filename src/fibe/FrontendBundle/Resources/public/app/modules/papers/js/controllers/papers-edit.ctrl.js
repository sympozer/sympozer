/**
 * Edit paper controller
 *
 * @type {controller}
 */

angular.module('papersApp').controller('papersEditCtrl', [ '$scope', '$filter', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', '$routeParams', '$location', 'papersFact', 'personsFact', 'topicsFact', '$modal',
    function ($scope, $filter, GLOBAL_CONFIG, createDialogService, $rootScope, $routeParams, $location, papersFact, personsFact, topicsFact, $modal)
{

    $scope.paper = papersFact.get({id: $routeParams.paperId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'papers.validations.not_created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'papers.validations.created', type: 'success'});
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

    //Populate array of a specific linked entity
    $scope.addRelationship = function(key, model){
        //Check if array available for the linked entity
        if(!$scope.paper[key]){
            $scope.paper[key] = [];
        }

        //Stop if the object selected is already in array (avoid duplicates)
        if(! $filter('inArray')('id', model.id, $scope.paper[key])){
            //If no duplicate add the selected object to the specified array
            $scope.paper[key].push(model);
        };
    }

    $scope.removeRelationship = function(key, index){
        $scope.paper[key].splice(index, 1);
    }


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
                $scope.addRelationship('authors',newPerson)
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
                $scope.addRelationship('authors',personModel)
        }
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
                $scope.addRelationship('topics',newTopic)
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            $scope.addRelationship('topics',topicModel)
        }
    };

}]);
