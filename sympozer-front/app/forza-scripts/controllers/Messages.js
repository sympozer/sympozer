'use strict'

angular
  .module('theme.messages-controller', [])
  .controller('MessagesController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.messages = [
      { name: 'Polly Paton', message: 'Uploaded all the files to server', time: '3m', class: 'notification-danger', thumb: 'assets/demo/avatar/paton.png', read: false },
      { name: 'Simon Corbett', message: 'I am signing off for today', time: '17m', class: 'notification-danger', thumb: 'assets/demo/avatar/corbett.png', read: false },
      { name: 'Matt Tennant', message: 'Everything is working just fine here', time: '2h', class: 'notification-danger', thumb: 'assets/demo/avatar/tennant.png', read: true },
      { name: 'Alan Doyle', message: 'Please mail me the files by tonight', time: '5d', class: 'notification-danger', thumb: 'assets/demo/avatar/doyle.png', read: false },
      { name: 'Polly Paton', message: 'Uploaded all the files to server', time: '3m', class: 'notification-danger', thumb: 'assets/demo/avatar/paton.png', read: false },
      { name: 'Simon Corbett', message: 'I am signing off for today', time: '17m', class: 'notification-danger', thumb: 'assets/demo/avatar/corbett.png', read: false },
      { name: 'Matt Tennant', message: 'Everything is working just fine here', time: '2h', class: 'notification-danger', thumb: 'assets/demo/avatar/tennant.png', read: true },
      { name: 'Alan Doyle', message: 'Please mail me the files by tonight', time: '5d', class: 'notification-danger', thumb: 'assets/demo/avatar/doyle.png', read: false },
    ];

    $scope.setRead = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = true;
    };

    $scope.setUnread = function (item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = false;
    };

    $scope.setReadAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach ($scope.messages, function (item) {
        item.read = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.messages, {read:false}).length;

    $scope.$watch('messages', function (messages) {
      $scope.unseenCount = $filter('filter')(messages, {read:false}).length;
    }, true);
  }])
