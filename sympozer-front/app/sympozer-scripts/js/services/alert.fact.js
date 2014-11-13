/**
 * Alert service
 * Handles success/infos/warning/error alerts for every controllers
 */
angular.module('sympozerApp').factory('alertFact', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

    //Initialize alert service and keep object
    var alertService = {};

    //Initalize alerts list
    $rootScope.alerts = [];

    //Add an alert and resetTimeout
    alertService.addAlert = function (alert)
    {
        $rootScope.alerts.push(alert);
        alertService.resetAlertTimeout();
    };

    //Remove the first alert from the array
    alertService.closeAlert = function (index)
    {
        $rootScope.alerts.splice(index, 1);
    };

    //Fade out the first alert
    alertService.clearAlert = function ()
    {
        $("#alertBox").children().first("span").fadeOut('500');
        alertService.closeAlert(0);
        alertService.alertTimeout = $timeout(alertService.clearAlert, 3000);
    };

    //Restart the timeout
    alertService.resetAlertTimeout = function ()
    {
        $timeout.cancel(alertService.alertTimeout);
        alertService.alertTimeout = $timeout(alertService.clearAlert, 3000);
    }

    return alertService;

}]);
