/**
 * New paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$window', '$filter', '$modal', '$rootScope', 'GLOBAL_CONFIG', '$location', 'papersFact', 'personsFact', 'topicsFact', 'pinesNotifications', 'translateFilter',
    function ($scope, $window, $filter, $modal, $rootScope, GLOBAL_CONFIG, $location, papersFact, personsFact, topicsFact, pinesNotifications, translateFilter)
    {
        $scope.paper = new papersFact();

        //Initialize date picker visibility
        $scope.publishDateOpened = false;

        //@TODO : Define one format
        $scope.formats = ['shortDate', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
        $scope.format = $scope.formats[0];

        //Set today
        $scope.today = new Date();

        //Manage start at datepicker visibility
        $scope.openPublishDatePicker = function (event)
        {
            event.preventDefault();
            event.stopPropagation();
            $scope.publishDateOpened = true;
        };

        //On post paper error
        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('papers.validations.not_created'),
                type: 'error'
            });
        };

        //On post paper success
        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('papers.validations.created'),
                type: 'success'
            });

            //If the view is a modal, close it
            if ($scope.$close)
            {
                $scope.$close($scope.paper);
            }
            //If not, go back to previous page
            else
            {
                $window.history.back();
            }
        };

        //Send post request to server
        $scope.create = function (form)
        {
            //Set main event id
            $scope.paper.mainEvent = $rootScope.currentMainEvent.id;

            //Verify form validity
            if (form.$valid)
            {
                $scope.paper.$create({}, success, error);
            }
        };


        //If the view is a modal instance, close it
        $scope.cancel = function ()
        {
            $scope.$dismiss('cancel');
        };

        //Populate array of a specific linked entity
        $scope.addRelationship = function (key, model)
        {
            //Check if array available for the linked entity
            if (!$scope.paper[key])
            {
                $scope.paper[key] = [];
            }

            //Stop if the object selected is already in array (avoid duplicates)
            if (!$filter('inArray')('id', model.id, $scope.paper[key]))
            {
                //If no duplicate add the selected object to the specified array
                $scope.paper[key].push(model);
            }
        };

        $scope.removeRelationship = function (key, index)
        {
            $scope.paper[key].splice(index, 1);
        };

        //Autocomplete and add authors workflow
        $scope.searchPersons = personsFact.all;
        $scope.paper.authors = [];
        $scope.addPerson = function (personModel)
        {
            if (!personModel.id)
            {
                var modalPersonInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-modal-form.html',
                    controller : 'personsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalPersonInstance.result.then(function (newPerson)
                {
                    $scope.addRelationship('authors', newPerson)
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.addRelationship('authors', personModel);
            }
        };

        //Autocomplete and add topic workflow
        $scope.searchTopics = topicsFact.all;
        $scope.paper.topics = [];
        $scope.addTopic = function (topicModel)
        {
            if (!topicModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.topics.urls.partials + 'modals/topics-modal-form.html',
                    controller : 'topicsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newTopic)
                {
                    $scope.addRelationship('topics', newTopic)
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.addRelationship('topics', topicModel)
            }
        };
    }]);