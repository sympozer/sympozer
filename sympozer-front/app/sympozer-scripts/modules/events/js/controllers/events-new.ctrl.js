/**
 * New event controller
 *
 * @type {controller}
 */

angular.module('eventsApp').controller('eventsNewCtrl', [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'eventsFact', 'categoriesFact', 'topicsFact', 'locationsFact', 'papersFact', '$modal', 'formValidation', '$filter',
    function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, eventsFact, categoriesFact, topicsFact, locationsFact, papersFact, $modal, formValidation, $filter)
    {
        $scope.event = new eventsFact;
        $scope.dateRange = "";
        //Initialize date pickers visibility
        $scope.endAtOpened = false;
        $scope.startAtOpened= false;


        var error = function (response, args)
        {

            if ("Validation Failed" == response.data.message)
            {
                formValidation.transformFromServer(response);
            }
            else
            {
                //Notify of the creation action error
                pinesNotifications.notify({
                    title: translateFilter('global.validations.error'),
                    text: translateFilter('events.validations.not_created'),
                    type: 'error'
                });
            }
        };

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('events.validations.created'),
                type: 'success'
            });

            //If view is a modal instance then close (resolve promise with new role)
            if($scope.$close){
                $scope.$close($scope.event);
            }else{
                //If view is a page, go back to previous page
                $window.history.back();
            }
        };

        var setDateRange = function(dateRange){
            var dateTab = $('#dateRange').val().split('-');
            $scope.event.startAt = new Date(dateTab[0]);
            $scope.event.endAt= new Date(dateTab[1]);

            if($scope.event.startAt > $scope.event.endAt ){
                return false;
            }
            return true;
        }

        $scope.create = function (form)
        {
            $scope.event.mainEvent = $routeParams.mainEventId;

            if (form.$valid && setDateRange())
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