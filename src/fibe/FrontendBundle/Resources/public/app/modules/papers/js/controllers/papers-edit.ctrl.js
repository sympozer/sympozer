/**
 * Edit paper controller
 *
 * @type {controller}
 */

angular.module('papersApp').controller('papersEditCtrl', [ '$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', '$routeParams', '$location', 'papersFact', 'personsFact', 'topicsFact', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, $routeParams, $location, papersFact, personsFact, topicsFact)
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
    }

    $scope.updatePaper = function (field, data)
    {
        var updatePaperParam = {id: $scope.paper.id};
        updatePaperParam[field] = data;
        return papersFact.patch(updatePaperParam, success, error);
    }



    //Autocomplete and add person workflow
    $scope.searchPersons = personsFact.all;
    $scope.paper.authors = [];
    $scope.addPerson = function(personModel){
        function successFn(){
            personsFact.create(newPerson, function (data) {

                $scope.paper.authors.push(data);
            });
        }
        if(!personModel.id) {
            var newPerson = new personsFact();
            createDialogService(GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-form.html', {
                title: 'Author creation',
                controller: 'genericModalCtrl',
                success: {label: 'Ok', fn: successFn}
            }, {
                model: newPerson,
                modelName : "person"
            });
        }else{
            $scope.paper.authors.push(personModel);
        }
    };


    //Autocomplete and add person workflow
    $scope.searchTopics = topicsFact.all;
    $scope.paper.topics = [];

    $scope.addTopic = function(topicModel){
        function successFn(){
            topicsFact.create(newTopic, function (data) {
                $scope.paper.topics.push(data);
            });
        }
        if(!topicModel.id) {
            var newTopic = new topicsFact();
            createDialogService(GLOBAL_CONFIG.app.modules.topics.urls.partials + 'topics-form.html', {
                title: 'Topic creation',
                controller: 'genericModalCtrl',
                success: {label: 'Ok', fn: successFn}
            }, {
                model: newTopic,
                modelName : "topic"
            });
        }else{
            $scope.paper.topics.push(topicModel);
        }
    };
}]);
