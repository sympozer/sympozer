/**
 * New event controller
 *
 * @type {controller}
 */

angular.module('eventsApp').controller('eventsNewCtrl', [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'eventsFact', 'categoriesFact', 'topicsFact', 'locationsFact', 'papersFact', '$modal', 'formValidation', '$filter',
    function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, eventsFact, categoriesFact, topicsFact, locationsFact, papersFact, $modal, formValidation, $filter)
    {
        $scope.event = new eventsFact;

        var error = function (response, args)
        {
            $scope.busy = false;

            if ("Validation Failed" == response.data.message)
            {
                formValidation.transformFromServer(response);
            }
            else
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the event has not been saved', type: 'danger'});
            }
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'event created', type: 'success'});
            if($scope.$close){
                $scope.$close($scope.event);
            }else{
                $window.history.back();
            }
        };

        $scope.create = function (form)
        {
            $scope.event.mainEvent = $routeParams.mainEventId;
            if (form.$valid)
            {
                $scope.event.$create({}, success, error);
            }
        };

        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

        //Populate array of a specific linked entity
        $scope.addRelationship = function(key, model){
            //Check if array available for the linked entity
            if(!$scope.event[key]){
                $scope.event[key] = [];
            }

            //Stop if the object selected is already in array (avoid duplicates)
            if(! $filter('inArray')('id', model.id, $scope.event[key])){
                //If no duplicate add the selected object to the specified array
                $scope.event[key].push(model);
            };
        }

        $scope.removeRelationship = function(key, index){
            $scope.event[key].splice(index, 1);
        }

        //Autocomplete and add paper workflow
        $scope.searchCategories = categoriesFact.allByConference;
        $scope.addCategory = function(categoryModel){
            if(!categoryModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.categories.urls.partials + 'categories-modal-form.html',
                    controller: 'categoriesNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newCategory) {
                    $scope.event.category = newCategory;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.event.category = categoryModel;
            }
        };

        //Autocomplete and add topic workflow
        $scope.searchTopics = topicsFact.all;
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
                    $scope.addRelationship('topics', newTopic);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.addRelationship('topics', topicModel);
            }
        };

        $scope.deleteTopic = function (index)
        {
            $scope.event.topics.splice(index, 1);
        };


        //Autocomplete and add location workflow
        $scope.searchLocations = locationsFact.allByConference;
        $scope.addLocation = function(locationModel){
            if(!locationModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-modal-form.html',
                    controller: 'locationsNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newLocation) {
                    $scope.addRelationship('eventLocations', locationModel);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.addRelationship('eventLocations', locationModel);
            }
        };

        $scope.deleteLocation = function (index)
        {
            $scope.event.eventLocations.splice(index, 1);
        };


        //Autocomplete and add paper workflow
        $scope.searchPapers = papersFact.all;
        $scope.addPaper = function(paperModel){
            if(!paperModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-modal-form.html',
                    controller: 'papersNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newPaper) {
                    $scope.addRelationship('papers', paperModel);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.addRelationship('papers', paperModel);
            }
        };

        //Autocomplete and add role workflow
        $scope.event.roles = [];
        $scope.addRole = function(){
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.roles.urls.partials + 'roles-modal-form.html',
                controller: 'rolesNewCtrl',
                size: "large",
                resolve: {
                    modalInstanceParent : modalInstance
                }
            });
            modalInstance.result.then(function (newRole) {
                $scope.addRelationship('roles', newRole);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

        };

    }
]);