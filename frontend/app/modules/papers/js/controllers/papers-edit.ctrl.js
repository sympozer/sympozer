/**
 * Edit paper controller
 * @type {controller}
 */

angular.module('papersApp').controller('papersEditCtrl', ['$scope', '$filter', 'GLOBAL_CONFIG', '$window', '$rootScope', '$routeParams', '$location', 'papersFact', 'personsFact', 'topicsFact', '$modal', 'pinesNotifications', 'translateFilter',
    function ($scope, $filter, GLOBAL_CONFIG, $window, $rootScope, $routeParams, $location, papersFact, personsFact, topicsFact, $modal, pinesNotifications, translateFilter)
    {

        //Fetch paper
        $scope.paper = papersFact.get({id: $routeParams.paperId});

        //On PUT request error
        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text : translateFilter('papers.validations.not_created'),
                type : 'error'
            });
        };

        //On PUT request success
        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('papers.validations.created'),
                type : 'success'
            });

            //Go back to previous page
            $window.history.back();
        };

        //Send put request to persist paper
        $scope.update = function (form)
        {
            //verify form validity
            if (form.$valid)
            {
                papersFact.update(papersFact.serialize($scope.paper), success, error);
            }
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

        //Remove a specific relation between the paper and a linked entity (a topic / an author...)
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
                //Open modal instance
                var modalPersonInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'modals/persons-modal-form.html',
                    controller : 'personsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });

                //On modal instance success
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
                $scope.addRelationship('authors', personModel)
            }
        };


        //Autocomplete and add topic workflow
        $scope.searchTopics = topicsFact.all;
        $scope.paper.topics = [];
        $scope.addTopic = function (topicModel)
        {
            //If the topic selected doesn't exist, it is created and added to the paper
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
            }else{
                $scope.addRelationship('topics', topicModel)

            }
        };

        //Initialize date pickers visibility
        $scope.publishDateOpened = false;

        //Set today
        $scope.today = new Date();

        //Set min date to today if not defined (see html)
        $scope.toggleMin = function ()
        {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        //Manage start at datepicker visibility
        $scope.openPublishDateOpened = function (event)
        {
            event.preventDefault();
            event.stopPropagation();
            $scope.publishDateOpened = true;
        };


        //Set init date
        $scope.initDate = $scope.today;

        //@TODO : Define one format
        $scope.formats = ['shortDate', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy'];
        $scope.format = $scope.formats[0];

    }]);
