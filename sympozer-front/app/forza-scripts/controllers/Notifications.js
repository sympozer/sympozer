'use strict'

angular
  .module('theme.notifications-controller', [])
  .controller('NotificationsController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.notifications = [
      { text: 'Server#1 is live', time: '4m', class: 'notification-success', iconClasses: 'fa fa-check', seen: true },
      { text: 'New user Registered', time: '10m', class: 'notification-user', iconClasses: 'fa fa-user', seen: false },
      { text: 'CPU at 92% on server#3!', time: '22m', class: 'notification-danger', iconClasses: 'fa fa-bolt', seen: false },
      { text: 'Database overloaded', time: '30m', class: 'notification-warning', iconClasses: 'fa fa-warning', seen: false },
      { text: 'New order received', time: '1h', class: 'notification-order', iconClasses: 'fa fa-shopping-cart', seen: true },
      { text: 'Application error!', time: '9d', class: 'notification-danger', iconClasses: 'fa fa-times', seen: true },
      { text: 'Installation Succeeded', time: '1d', class: 'notification-success', iconClasses: 'fa fa-check', seen: false },
      { text: 'Account Created', time: '2d', class: 'notification-success', iconClasses: 'fa fa-check', seen: false },
    ];

    $scope.setSeen = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = true;
    };

    $scope.setUnseen = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = false;
    };

    $scope.setSeenAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach ($scope.notifications, function (item) {
        item.seen = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.notifications, {seen:false}).length;

    $scope.$watch('notifications', function (notifications) {
      $scope.unseenCount = $filter('filter')(notifications, {seen:false}).length;
    }, true);
  }])
