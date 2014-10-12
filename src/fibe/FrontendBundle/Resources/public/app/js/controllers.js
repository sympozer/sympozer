'use strict';

/**
 * Main and global controllers
 */

/**
 * Main app controllers
 *
 * @type {module}
 */
var sympozerControllers = angular.module('sympozerControllers', []);

/**
 * Main controller
 *
 * @type {controller}
 */
sympozerControllers.controller('mainCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG',
     function ($scope, $routeParams, GLOBAL_CONFIG)
     {
         $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

         $scope.scrollTop = function ()
         {
             $('html, body').animate({scrollTop: 0}, 'slow');
         }
     }]);


/**
 * Global alert controller
 *
 * @type {controller}
 */
sympozerControllers.controller('AlertCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$timeout',
     function ($scope, $routeParams, GLOBAL_CONFIG, $timeout)
     {
         $scope.alerts = [];

         $scope.$on('AlertCtrl:addAlert', function (event, args)
         {
             $scope.addAlert(args)
         });

         $scope.addAlert = function (alert)
         {
             $scope.alerts.push(alert);
             $scope.resetAlertTimeout();
         };

         $scope.closeAlert = function (index)
         {
             $scope.alerts.splice(index, 1);
         };


         $scope.clearAlert = function ()
         {
             $("#alertBox").children().first("span").fadeOut('500');
             $scope.closeAlert(0);
             $scope.alertTimeout = $timeout($scope.clearAlert, 3000);
         };

         $scope.resetAlertTimeout = function ()
         {
             $timeout.cancel($scope.alertTimeout);
             $scope.alertTimeout = $timeout($scope.clearAlert, 3000);
         }


     }]);

/*********************************** NAVS **********************************************/

/**
 * Nav left controller (left panel controller)
 *
 * @type {controller}
 */
sympozerControllers.controller('navLeftCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG',
     function ($scope, $routeParams, GLOBAL_CONFIG)
     {
         $scope.sympozerLogoPath = GLOBAL_CONFIG.sympozerLogoPath;
         $scope.status = {
             isFirstOpen    : true,
             isFirstDisabled: false
         };
     }]);

/**
 * Nav right controller (right panel controller)
 *
 * @type {controller}
 */
sympozerControllers.controller('navRightCtrl',
    ['$scope', '$routeParams',
     function ($scope, $routeParams)
     {
     }]);

/**
 * Nav top controller (top panel controller)
 *
 * @type {controller}
 */
sympozerControllers.controller('navTopCtrl',
    ['$translate', '$scope', '$routeParams', 'GLOBAL_CONFIG',
     function ($translate, $scope, $routeParams, GLOBAL_CONFIG)
     {
         $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
         $scope.toggleNavLeft = function ()
         {
             var localWrapper = $("#wrapper");
             localWrapper.removeClass("active-right");
             localWrapper.toggleClass("active-left");
         };

         $scope.locals = [
             { label: 'EN', code: 'en_US', src: GLOBAL_CONFIG.app.urls.img + '/english-flag.png'},
             { label: 'FR', code: 'fr_FR', src: GLOBAL_CONFIG.app.urls.img + '/french-flag.png'}
         ];

         $scope.changeLocal = function (local)
         {
             $translate.use(local.code);
             return local;
         };

     }]);

/**
 * Dashboard controller
 *
 * @type {controller}
 */
sympozerControllers.controller('dashboardCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG',
     function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG)
     {

     }]);

/**
 * Main event controller (conference controller)
 */
sympozerControllers.controller('conferenceCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'conferencesFact',
     function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, conferencesFact)
     {
         $scope.conferences = conferencesFact.all({offset: 0, limit: 20});

     }]);


/**
 * generic ctrl handling entity creation inside a modal
 */
sympozerControllers.controller('genericDialogCtrl',
    ['$scope', '$rootScope', 'scope', 'formDialogTemplateUrl', '$timeout', '$location', '$injector',
     function ($scope, $rootScope, scope, $formDialogTemplateUrl, $timeout, $location, $injector)
     {
         $scope = $.extend($scope, scope);

         $scope.formDialogTemplateUrl = $formDialogTemplateUrl;
         $scope.formId = $scope.formId || "entity-form";
         var modalSuccessFn = $scope.$modalSuccess;

         $scope.submit = function ()
         {
             if (this[$scope.formId].$valid)
             {
                 $scope.busy = true;
                 modalSuccessFn();
             }
         };
         //validate form from a button placed outside
         $scope.$modalSuccess = function ()
         {
             //modify dom asynchoneously : in https://docs.angularjs.org/error/$rootScope/inprog
             $timeout(function ()
             {
                 var submitHiddenBtn = $("#" + $scope.formId + " > input[type='submit']");
                 if (submitHiddenBtn.length > 0)
                 {
                     submitHiddenBtn.click();
                 }
                 else
                 {
                     modalSuccessFn();
                 }
             }, 0);
         }
     }]);
