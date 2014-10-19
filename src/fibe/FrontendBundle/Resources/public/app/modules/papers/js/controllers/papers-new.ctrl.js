/**
 * New paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$window', 'createDialog', '$rootScope', 'GLOBAL_CONFIG', '$location', 'papersFact', 'personsFact', 'topicsFact', '$modalInstance', function ($scope, $window, createDialogService, $rootScope, GLOBAL_CONFIG, $location, papersFact, personsFact, topicsFact, $modalInstance)
{
    $scope.paper = new papersFact();
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper created', type: 'success'});
        if($modalInstance){
            $modalInstance.close($scope.paper);
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
        $modalInstance.dismiss('cancel');
    };


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