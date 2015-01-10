'use strict';


/**
 * messagesPopoverCtrl controller
 * Manage messages box in nav top
 */
angular.module('messagesApp').controller('messagesPopoverCtrl', ['$scope', 'GLOBAL_CONFIG', '$filter', function ($scope, GLOBAL_CONFIG, $filter)
{
    $scope.messages = [
        { name: 'Stephan', message: 'This was a really cool overview, i\'d really like to discuss it with you', time: '3m', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/paton.png', read: false },
        { name: 'Jacob', message: 'Let\'s meet after this amazing talk ?', time: '17m', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/corbett.png', read: false },
        /*{ name: 'Matt Tennant', message: 'Everything is working just fine here', time: '2h', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/tennant.png', read: true },
        { name: 'Alan Doyle', message: 'Please mail me the files by tonight', time: '5d', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/doyle.png', read: false },
        { name: 'Polly Paton', message: 'Uploaded all the files to server', time: '3m', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/paton.png', read: false },
        { name: 'Simon Corbett', message: 'I am signing off for today', time: '17m', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/corbett.png', read: false },
        { name: 'Matt Tennant', message: 'Everything is working just fine here', time: '2h', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/tennant.png', read: true },
        { name: 'Alan Doyle', message: 'Please mail me the files by tonight', time: '5d', class: 'notification-danger', thumb: GLOBAL_CONFIG.app.urls.base+'demo/avatar/doyle.png', read: false },*/
    ];

    $scope.setRead = function (item, $event)
    {
        $event.preventDefault();
        $event.stopPropagation();
        item.read = true;
    };

    $scope.setUnread = function (item, $event)
    {
        $event.preventDefault();
        $event.stopPropagation();
        item.read = false;
    };

    $scope.setReadAll = function ($event)
    {
        $event.preventDefault();
        $event.stopPropagation();
        angular.forEach($scope.messages, function (item)
        {
            item.read = true;
        });
    };

    $scope.unseenCount = $filter('filter')($scope.messages, {read: false}).length;

    $scope.$watch('messages', function (messages)
    {
        $scope.unseenCount = $filter('filter')(messages, {read: false}).length;
    }, true);
}])