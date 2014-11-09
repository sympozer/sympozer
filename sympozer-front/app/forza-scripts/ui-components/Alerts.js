'use strict'

angular
  .module('theme.ui-alerts', [])
  .controller('AlertsController', ['$scope', 'pinesNotifications', function ($scope, pinesNotifications) {
    $scope.alerts = [
      { type: 'success', msg: '<strong>Well done!</strong> You successfully read this important alert message.' },
      { type: 'warning', msg: '<strong>Warning!</strong> Best check yo self, you\'re not looking too good.' },
      { type: 'info', msg: '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.' },
      { type: 'danger', msg: '<strong>Oh snap!</strong> Change a few things up and try submitting again.' }
    ];

    $scope.addAlert = function() {
      var types = ["info", "warning", "danger", "success"];
      $scope.alerts.push({msg: 'Alerts can be added dynamically!', type: _.shuffle(types).shift()});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.simpleInfo = function () {
      pinesNotifications.notify({
        title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'info'
      });
    };

    $scope.simpleSuccess = function () {
      pinesNotifications.notify({
        title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'success'
      });
    };

    $scope.simpleError = function () {
      pinesNotifications.notify({
          title: 'New Thing',
        text: 'Just to let you know, something happened.',
        type: 'error'
      });
    };

    $scope.stickyInfo = function () {
      pinesNotifications.notify({
          title: 'Sticky Info',
          text: 'Sticky info, you know, like a newspaper covered in honey.',
          type: 'info',
          hide: false
      });
    };

    $scope.stickySuccess = function () {
      pinesNotifications.notify({
        title: 'Sticky Success',
        text: 'Sticky success... I\'m not even gonna make a joke.',
        type: 'success',
        hide: false
      });
    };

    $scope.stickyError = function () {
      pinesNotifications.notify({
        title: 'Uh Oh!',
        text: 'Something really terrible happened. You really need to read this, so I won\'t close automatically.',
        type: 'error',
        hide: false
      });
    };

    $scope.bigNotice = function () {
      pinesNotifications.notify({
        title: 'Big Notice',
        text: 'Check me out! I\'m tall and wide, even though my text isn\'t.',
        width: '500px',
        type: 'error',
        min_height: '400px'
      });
    };

    $scope.showRich = function () {
      pinesNotifications.notify({
        title: '<span style="color: red;">Rich Content Notice</span>',
        type: 'success',
        text: '<span style="color: blue;">Look at my beautiful <strong>strong</strong>, <em>emphasized</em>, and <span style="font-size: 1.5em;">large</span> text.</span>'
      });
    };

    $scope.showDynamic = function () {
      var percent = 0;
      var notice = pinesNotifications.notify({
        title: "Please Wait",
        type: 'info',
        icon: 'fa fa-spin fa-refresh',
        hide: false,
        closer: false,
        sticker: false,
        opacity: 0.75,
        shadow: false,
        width: "200px"
      });

      setTimeout(function() {
        notice.notify({
          title: false
        });
        var interval = setInterval(function() {
          percent += 2;
          var options = {
            text: percent + "% complete."
          };
          if (percent == 80) options.title = "Almost There";
          if (percent >= 100) {
            window.clearInterval(interval);
            options.title = "Done!";
            options.type = "success";
            options.hide = true;
            options.closer = true;
            options.sticker = true;
            options.icon = 'fa fa-check';
            options.opacity = 1;
            options.shadow = true;
          }
          notice.notify(options);
        }, 120);
      }, 2000);
    };

    $scope.showNoHistory = function () {
      pinesNotifications.notify({
        title: 'No History Notice',
        text: 'I\'m not part of the notice history, so if you redisplay the last message, it won\'t be me.',
        history: false,
        type: 'error'
      });
    };

    $scope.showNoSticky = function () {
      pinesNotifications.notify({
        title: 'No Sticky Button Notice',
        text: 'Check me out! I\'m a sticky notice with no unsticky button. You\'ll have to close me yourself.',
        hide: false,
        sticker: false,
        type: 'error'
      });
    };

    $scope.showPermanent = function () {
      pinesNotifications.notify({
        title: 'Permanent Buttons Notice',
        text: 'My buttons are really lonely, so they\'re gonna hang out with us.',
        closer_hover: false,
        sticker_hover: false,
        type: 'error'
      });
    };

    $scope.showNoMouseReset = function () {
      pinesNotifications.notify({
        title: 'No Mouse Reset Notice',
        text: 'I don\'t care if you move your mouse over me, I\'ll disappear when I want.',
        mouse_reset: false,
        type: 'error'
      });
    };

    $scope.showChanging = function () {
      pinesNotifications.notify({
        title: 'Notice',
        type: 'error',
        text: 'Right now I\'m a notice.',
        before_close: function(notification) {
            notification.notify({
                title: 'Error',
                text: 'Uh oh. Now I\'ve become an error.',
                type: 'error',
                before_close: function(notification) {
                    notification.notify({
                        title: 'Success',
                        text: 'I fixed the error!',
                        type: 'success',
                        before_close: function(notification) {
                            notification.notify({
                                title: 'Info',
                                text: 'Everything\'s cool now.',
                                type: 'info',
                                before_close: null
                            });
                            notification.queueRemove();
                            return false;
                        }
                    });
                    notification.queueRemove();
                    return false;
                }
            });
            notification.queueRemove();
            return false;
          }
      });
    };
  }])
