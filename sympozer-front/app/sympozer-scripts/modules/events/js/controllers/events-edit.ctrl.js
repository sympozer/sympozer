/**
 * Edit event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsEditCtrl', ['$scope', '$filter', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'eventsFact', 'categoriesFact', 'topicsFact', 'locationsFact', 'papersFact', '$modal', 'pinesNotifications', 'translateFilter',
    function ($scope, $filter, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, eventsFact, categoriesFact, topicsFact, locationsFact, papersFact, $modal, pinesNotifications, translateFilter)
    {
        $scope.event = eventsFact.get({id: $routeParams.eventId});

        //Error on event edit request
        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('events.validations.not_created'),
                type: 'error'
            });
        };

        //Success on event request
        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('events.validations.created'),
                type: 'success'
            });
            //Go back to previous page
            $window.history.back();
        };

        //Send put request to the server
        $scope.update = function (form)
        {
            //Verify form validity
            if (form.$valid)
            {
                $scope.event.$update({}, success, error);
            }
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


        $scope.createLocationModal = function ()
        {
            //TODO : fix this
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

        //Autocomplete and add paper workflow
        $scope.searchCategories = categoriesFact.allByConference;
        $scope.addCategory = function (categoryModel)
        {
            if (!categoryModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.categories.urls.partials + 'categories-modal-form.html',
                    controller : 'categoriesNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newCategory)
                {
                    $scope.event.category = newCategory;
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.event.category = categoryModel;
            }
        };

        //Autocomplete and add paper workflow
        $scope.searchTopics = topicsFact.all;
        $scope.addTopic = function (topicModel)
        {
            if (!topicModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.topics.urls.partials + 'topics-modal-form.html',
                    controller : 'topicsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newTopic)
                {
                    $scope.addRelationship('topics', newTopic);

                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.addRelationship('topics', topicModel);

            }
        };

        //Autocomplete and add location workflow
        $scope.searchLocations = locationsFact.allByConference;
        $scope.addLocation = function (locationModel)
        {
            if (!locationModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-modal-form.html',
                    controller : 'locationsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newLocation)
                {
                    $scope.addRelationship('eventLocations', newLocation);
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.addRelationship('eventLocations', locationModel);
            }
        };


        //Autocomplete and add paper workflow
        $scope.searchPapers = papersFact.all;
        $scope.event.papers = [];
        $scope.addPaper = function (paperModel)
        {
            if (!paperModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-modal-form.html',
                    controller : 'papersNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newPaper)
                {
                    $scope.addRelationship('papers', newPaper);
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
            alert("role");
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.roles.urls.partials + 'roles-modal-form.html',
                controller : 'rolesNewCtrl',
                size       : "large",
                resolve    : {
                }
            });
            modalInstance.result.then(function (newRole)
            {
                $scope.newRole.event = event;
                if (!$scope.event.roles)
                {
                    $scope.event.roles = [];
                }
                $scope.event.roles.push(newRole);
            }, function ()
            {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.deleteRole = function (index)
        {
            $scope.event.roles.splice(index, 1);
        };
    }]);
