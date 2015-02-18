/**
 * pines notification config :
 *    - set opacity on hover
 *    - add a padding on top
 *    - make it closable easily
 * @see http://sciactive.github.io/pnotify/#demos-modules
 */
angular.module('sympozerApp').factory('pinesNotifications', function ()
{
    return {
        notify: function (args)
        {
            args.delay = 5000;
            args.animation = "none";
          //set opacity on hover
            args.nonblock = {
                nonblock        : true,
              nonblock_opacity: .1
            };
          //add a padding on top
            args.before_init = function (opts)
            {
                opts.stack.firstpos1 = 50;
            };

          //new PNotify notification
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
