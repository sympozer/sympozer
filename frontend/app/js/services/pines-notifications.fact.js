/**
 * pines notification service
 * Handles success/infos/warning/error alerts for every controllers
 */
angular.module('sympozerApp').factory('pinesNotifications', function ()
{
    return {
        notify: function (args)
        {
            //Declare a new PNotify notification
            var notification = new PNotify(args);

            //Add parameters to the notification
            notification.notify = notification.update;

            return notification;
        }
    }
});
