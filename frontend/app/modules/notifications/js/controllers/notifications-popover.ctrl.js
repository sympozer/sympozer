'use strict';


/**
 * Notifications controller
 */
angular.module('notificationsApp').controller('notificationsPopoverCtrl', ['$scope', '$filter', function ($scope, $filter)
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
   * @type {{text: string, time: string, class: string, iconClasses: string, seen: boolean}[]}
   */
  $scope.notifications = [
    { text: 'Attendee Registered', time: '10m', class: 'notification-user', iconClasses: 'fa fa-user', seen: false },
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
