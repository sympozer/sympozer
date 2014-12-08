'use strict';


/**
 * Notifications controller
 */
angular.module('notificationsApp').controller('notificationsListCtrl', ['$scope', '$filter', function ($scope, $filter)
{
  /**
   * Default notifications (which is seen in the top bar, with the alarm icon)
   *
   * Description :
   * text : The text inserted into the notification
   * time : How long ago was the event
   * class : the style of the notification
   * iconClass : the icon wich represent the notification
   * seen : if the user have seen the notification
   *
   * @TODO FORZA : when the user click a notification, he is automatically redirected to the correct page, and the notification goes to : seen
   *
   * @type {{text: string, time: string, class: string, iconClasses: string, seen: boolean}[]}
   */
  $scope.notifications = [
    { text: 'Server#1 is live', time: '4m', class: 'notification-success', iconClasses: 'fa fa-check', seen: true },
    { text: 'New user Registered', time: '10m', class: 'notification-user', iconClasses: 'fa fa-user', seen: false },
    { text: 'CPU at 92% on server#3!', time: '22m', class: 'notification-danger', iconClasses: 'fa fa-bolt', seen: false },
    { text: 'Database overloaded', time: '30m', class: 'notification-warning', iconClasses: 'fa fa-warning', seen: false },
    { text: 'New order received', time: '1h', class: 'notification-order', iconClasses: 'fa fa-shopping-cart', seen: true },
    { text: 'Application error!', time: '9d', class: 'notification-danger', iconClasses: 'fa fa-times', seen: true },
    { text: 'Installation Succeeded', time: '1d', class: 'notification-success', iconClasses: 'fa fa-check', seen: false },
    { text: 'Account Created', time: '2d', class: 'notification-success', iconClasses: 'fa fa-check', seen: false }
  ];

  /**
   * Set the notification item to seen
   *
   * @param item
   * @param $event
   */
  $scope.setSeen = function (item, $event)
  {
    $event.preventDefault();
    $event.stopPropagation();
    item.seen = true;
  };

  /**
   * Set the notification item to unseen
   *
   * @param item
   * @param $event
   */
  $scope.setUnseen = function (item, $event)
  {
    $event.preventDefault();
    $event.stopPropagation();
    item.seen = false;
  };

  /**
   * Set all notifications items to seen
   *
   * @param item
   * @param $event
   */
  $scope.setSeenAll = function ($event)
  {
    $event.preventDefault();
    $event.stopPropagation();
    angular.forEach($scope.notifications, function (item)
    {
      item.seen = true;
    });
  };

  /**
   * The unseen count to show on the alarm icon : default value on load
   */
  $scope.unseenCount = $filter('filter')($scope.notifications, {seen: false}).length;
  /**
   * The real time alimentation of the unseen count
   */
  $scope.$watch('notifications', function (notifications)
  {
    $scope.unseenCount = $filter('filter')(notifications, {seen: false}).length;
  }, true);
}]);
