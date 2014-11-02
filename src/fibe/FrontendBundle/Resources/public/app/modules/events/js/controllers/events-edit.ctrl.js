
/**
 * Edit event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsEditCtrl', [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'eventsFact', 'categoriesFact', 'topicsFact', 'locationsFact', 'papersFact', '$modal',
    function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, eventsFact, categoriesFact, topicsFact, locationsFact, papersFact, $modal)
    {
        $scope.event = eventsFact.get({id: $routeParams.eventId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the event has not been saved', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'event saved', type: 'success'});
            $location.path('/conference/' + $rootScope.currentMainEvent.id + '/events/list');
        };

        $scope.update = function (form)
        {
            //$scope.event.mainEvent = $rootScope.currentMainEvent;
            //date format fix
            $scope.event.startAt = $scope.event.startAt ? $scope.event.startAt.toString() : undefined;
            $scope.event.endAt = $scope.event.endAt ? $scope.event.endAt.toString() : undefined;
            if (form.$valid)
            {
                $scope.event.$update({}, success, error);
            }
        };

        $scope.createLocationModal = function ()
        {
            createDialogService(GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-new.html', {
                id        : 'complexDialog',
                title     : 'New location',
                backdrop  : true,
                controller: 'locationsNewCtrl',
                success   : {label: 'Save', fn: function ()
                {
                }}
            }, {
            });
        };


        $scope.deleteLocation = function (index)
        {
            $scope.event.eventLocations.splice(index, 1);
        };


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

        //Autocomplete and add paper workflow
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
                    if(!$scope.event.topics){
                        $scope.event.topics = [];
                    }
                    $scope.event.topics.push(newTopic);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                if(!$scope.event.topics){
                    $scope.event.topics = [];
                }
                $scope.event.topics.push(topicModel);
            }
        };

        $scope.deleteTopic = function (index)
        {
            $scope.event.topics.splice(index, 1);
        };

        //Autocomplete and add paper workflow
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
                    if(!$scope.event.eventLocations){
                        $scope.event.eventLocations = [];
                    }
                    $scope.event.eventLocations.push(newLocation);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                if(!$scope.event.eventLocations){
                    $scope.event.eventLocations = [];
                }
                $scope.event.eventLocations.push(locationModel);
            }
        };


        //Autocomplete and add paper workflow
        $scope.searchPapers = papersFact.all;
        $scope.event.papers = [];
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
                    if(!$scope.event.papers){
                        $scope.event.papers = [];
                    }
                    $scope.event.papers.push(newPaper);
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                if(!$scope.event.papers){
                    $scope.event.papers = [];
                }
                $scope.event.papers.push(paperModel);
            }
        };

         $scope.deletePaper = function (index)
        {
            $scope.event.papers.splice(index, 1);
        };


        //Autocomplete and add role workflow
        $scope.event.roles = [];
        $scope.addRole = function(){
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.roles.urls.partials + 'roles-modal-form.html',
                controller: 'rolesNewCtrl',
                size: "large",
                resolve: {
                }
            });
            modalInstance.result.then(function (newRole) {
                $scope.newRole.event = event;
                if(!$scope.event.roles){
                    $scope.event.roles = [];
                }
                $scope.event.roles.push(newRole);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.deleteRole = function (index)
        {
            $scope.event.roles.splice(index, 1);
        };

        

    }]);
