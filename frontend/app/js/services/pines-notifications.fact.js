/**
 * pines notification service
 * Handles success/infos/warning/error alerts for every controllers
 *
 * @see http://sciactive.github.io/pnotify/#demos-modules
 */
angular.module('sympozerApp').factory('pinesNotifications', function ()
{
    return {
        notify: function (args)
        {
            args.delay = 5000;
            args.animation = "none";
            args.nonblock = {
                nonblock        : true,
                nonblock_opacity: .2
            };
            args.before_init = function (opts)
            {
                opts.stack.firstpos1 = 50;
            };
            //Declare a new PNotify notification
            var notification = new PNotify(args);
            notification.get().click(function ()
            {
                notification.get().hide();
            });

            //Add parameters to the notification
            notification.notify = notification.update;

            return notification;
        }
    }
});
