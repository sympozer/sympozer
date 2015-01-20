'use strict';


/**
 * messagesPopoverCtrl controller
 * Manage messages box in nav top
 */
angular.module('messagesApp').controller('messagesPopoverCtrl', ['$scope', 'GLOBAL_CONFIG', '$filter', function ($scope, GLOBAL_CONFIG, $filter)
{
    $scope.messages = [
        { name: 'Stephan', message: 'Hey, i loved you talk, can we meet ?', time: '3m', class: 'notification-danger', thumb: '', read: false },
        { name: 'Jacob', message: 'Let\'s meet after this amazing talk ?', time: '17m', class: 'notification-danger', thumb: '', read: false },
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