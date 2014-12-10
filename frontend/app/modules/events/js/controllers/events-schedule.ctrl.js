/**
 * List events controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl', ['$scope', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', function ($scope, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact)
{

    //Context change
    //$rootScope.$broadcast('contextCtrl:changeContext', {mainEventId:$routeParams.mainEventId});

    $scope.entities = [];

    categoriesFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
        $scope.categories = response.results;
    });

    $scope.request = eventsFact.allByConference;

    $scope.filters = {};
    $scope.filters.categoryVersionIds = [];

    var i = 0; // clone counter

    $scope.addCategoriesFilter = function (categoryVersionId)
    {
        var categoryVersionIndex = $scope.filters.categoryVersionIds.indexOf(categoryVersionId);
        if (categoryVersionIndex == -1)
        {
            $scope.filters.categoryVersionIds.push(categoryVersionId);
        }
        else
        {
            $scope.filters.categoryVersionIds.splice(categoryVersionIndex, 1);
        }
        $scope.filter();
    };

    $scope.reload = function ()
    {
        $scope.events.$promise.then(function ()
        {
            console.log('From cache:', $scope.events);
        });
    };

    $scope.clone = function (event, index)
    {

        var cloneEvent = angular.copy(event);
        delete cloneEvent.id;
        cloneEvent.label = cloneEvent.label + "(" + (++i) + ")";

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Event saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        };

        cloneEvent.$create({}, success, error);
    };



    //FROM FORZA
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.demoEvents = [
        {
            title: 'All Day Event',
            start: new Date(y, m, 8),
        //    backgroundColor: $global.getBrandColor('warning')
        },
        {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
        //    backgroundColor: $global.getBrandColor('success')
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false,
           // backgroundColor: $global.getBrandColor('primary')
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
            allDay: false,
            //backgroundColor: $global.getBrandColor('danger')
        },
        {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
        //    backgroundColor: $global.getBrandColor('info')
        },
        {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
        //    backgroundColor: $global.getBrandColor('midnightblue')
        },
        {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
        //    backgroundColor: $global.getBrandColor('primary')
        },
        {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/',
        //    backgroundColor: $global.getBrandColor('warning')
        }
    ];

    $scope.events = [
        {title: 'Demo Event 1'},
        {title: 'Demo Event 2'},
        {title: 'Demo Event 2'}
    ];
    $scope.addEvent = function ()
    {
        $scope.events.push({ title: $scope.newEvent });
        $scope.newEvent = '';
    };
}]);
