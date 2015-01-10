/**
 * New event controller
 *
 * @type {controller}
 */

angular.module('eventsApp').controller('eventsNewCtrl', [
    '$scope', '$rootScope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'eventsFact', 'categoriesFact', 'topicsFact', 'locationsFact', 'papersFact', '$modal', 'formValidation', '$filter', 'pinesNotifications', 'translateFilter',
    function ($scope, $rootScope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, eventsFact, categoriesFact, topicsFact, locationsFact, papersFact, $modal, formValidation, $filter, pinesNotifications, translateFilter)
    {
        $scope.event = new eventsFact;
        $scope.dateRange = "";
        //Initialize date pickers visibility
        $scope.endAtOpened = false;
        $scope.startAtOpened = false;

        //In case the view is a modal
        $scope.modalTitle = 'events.actions.new';

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
                    text : translateFilter('events.validations.not_created'),
                    type : 'error'
                });
            }
        };

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('events.validations.created'),
                type : 'success'
            });

            //If view is a modal instance then close (resolve promise with new role)
            if ($scope.$close)
            {
                $scope.$close($scope.event);
            }
            else
            {
                //If view is a page, go back to previous page
                $window.history.back();
            }
        };

        //Initialize the day dropdown value
        $scope.event.selectedDay = new Date($rootScope.currentMainEvent.startAt);
        //Initialize the timer for start time
        $scope.event.timeStart = new Date($rootScope.currentMainEvent.startAt);
        //Initialize the timer for end time
        $scope.event.timeEnd = new Date($rootScope.currentMainEvent.endAt);

        /**
         * Convert the selected day + selected and time and selected start time to actual dates.
         * Validates end > start
         * @returns {boolean}
         */
        var setStartEndDates = function ()
        {
            //Initialize start date from the selected day
            $scope.event.startAt = new Date($scope.event.selectedDay);
            //Set hours from timer for start value
            $scope.event.startAt.setHours($scope.event.timeStart.getHours());
            //Set minutes from timer for start value
            $scope.event.startAt.setMinutes($scope.event.timeStart.getMinutes());

            //Initialize end date from the selected day
            $scope.event.endAt = new Date($scope.event.selectedDay);
            //Set hours from timer for end value
            $scope.event.endAt.setHours($scope.event.timeEnd.getHours());
            //Set minutes from timer for end value
            $scope.event.endAt.setMinutes($scope.event.timeEnd.getMinutes());

            //Validate start < end date
            return $scope.event.startAt <= $scope.event.endAt;

        };

        $scope.save = function (form)
        {
            $scope.event.mainEvent = $rootScope.currentMainEvent;

            if (form.$valid && setStartEndDates())
            {
                eventsFact.create(eventsFact.serialize($scope.event), success, error);
            }
        };

        $scope.cancel = function ()
        {
            $scope.$dismiss('cancel');
        };

        //Populate array of a specific linked entity
        $scope.addRelationship = function (key, model)
        {
            //Check if array available for the linked entity
            if (!$scope.event[key])
            {
                $scope.event[key] = [];
            }

            //Stop if the object selected is already in array (avoid duplicates)
            if (!$filter('inArray')('id', model.id, $scope.event[key]))
            {
                //If no duplicate add the selected object to the specified array
                $scope.event[key].push(model);
            }
        };

        $scope.removeRelationship = function (key, index)
        {
            $scope.event[key].splice(index, 1);
        };

        //Autocomplete and add paper workflow
        $scope.searchCategories = categoriesFact.allByConference;
        $scope.addCategory = function (categoryModel)
        {
            if (!categoryModel.id)
            {
                //If topic doesn't exist, create it
                categoriesFact.create(categoriesFact.serialize({ label : categoryModel}), function(category){
                    $scope.event.category = category;

                },function(error){
                    //Notify of the creation action error
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.error'),
                        text : translateFilter('categories.validations.not_created'),
                        type : 'error'
                    });
                });
            }
            else
            {
                $scope.event.category = category;
            }
        };

        //Autocomplete and add topic workflow
        $scope.searchTopics = topicsFact.all;
        $scope.addTopic = function (topicModel)
        {
            if (!topicModel.id)
            {
                //If topic doesn't exist, create it
                topicsFact.create(topicsFact.serialize({ label : topicModel}), function(topic){
                    $scope.addRelationship('topics', topic);

                },function(error){
                    //Notify of the creation action error
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.error'),
                        text : translateFilter('topics.validations.not_created'),
                        type : 'error'
                    });
                });
            }
            else
            {
                $scope.addRelationship('topics', topicModel)
            }
        };


        //Autocomplete and add location workflow
        $scope.searchLocations = locationsFact.allByConference;
        $scope.addLocation = function (locationModel)
        {
            if (!locationModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.locations.urls.partials + 'modals/locations-modal-form.html',
                    controller : 'locationsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newLocation)
                {
                    $scope.event.location = newLocation;
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.event.location = locationModel;
            }
        };


        //Autocomplete and add paper workflow
        $scope.searchPapers = papersFact.all;
        $scope.addPaper = function (paperModel)
        {
            if (!paperModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.papers.urls.partials + 'modals/papers-modal-form.html',
                    controller : 'papersNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newPaper)
                {
                    $scope.addRelationship('papers', paperModel);
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.addRelationship('papers', paperModel);
            }
        };

        //Autocomplete and add role workflow
        $scope.event.roles = [];
        $scope.addRole = function ()
        {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.roles.urls.partials + 'modals/roles-modal-form.html',
                controller : 'rolesNewCtrl',
                size       : "large",
                resolve    : {
                    modalInstanceParent: modalInstance
                }
            });
            modalInstance.result.then(function (newRole)
            {
                $scope.addRelationship('roles', newRole);
            }, function ()
            {
                //$log.info('Modal dismissed at: ' + new Date());
            });

        };

        //Delete the location of the event
        $scope.deleteLocation = function(){
            delete $scope.event.location;
        }

        //Delete the category of the event
        $scope.deleteCategory = function(){
            delete $scope.event.category;
        }

        //Delete a paper from the event paper list using its index
        $scope.deletePaper = function(index){
            $scope.removeRelationship('papers', index)
        }

    }
]);