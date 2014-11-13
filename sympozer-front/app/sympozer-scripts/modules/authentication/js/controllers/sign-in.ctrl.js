/**
 * Sign in controller
 *
 * @type {controller}
 */

angular.module('authenticationApp').controller('signinCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'usersFact', '$location', '$modal', '$timeout', function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, usersFact, $location, $modal, $timeout)
    {

        $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        $scope.user = new usersFact;

        $scope.showSigninPopup = $scope.$root.showSigninPopup = showSigninPopup;
        $scope.signinAction = signinAction;

//        if (GLOBAL_CONFIG.app.options.shouldLogin)
//        {
//            GLOBAL_CONFIG.app.options.shouldLogin = false;
//            $timeout(showLoginPopup, 1);
//        }

        var error = function (response, args)
        {
            $scope.busy = false;
            showLoginPopup();
        };

        var success = function (response, args)
        {
            $scope.busy = false;
            $scope.user = response;
            $rootScope.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Login_success', type: 'success'});
        };

        function showSigninPopup()
        {

            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'signin.html',
                controller : 'signinCtrl',
                size       : "large",
                resolve    : {
                }
            });
            modalInstance.result.then(function (userForm)
            {
                signinAction(userForm);
            }, function ()
            {
                //$log.info('Modal dismissed at: ' + new Date());
            });

//            var dialogCtrlArgs = {
//                scope                : {
//                    signinAction : $scope.signinAction,
//                    GLOBAL_CONFIG: GLOBAL_CONFIG,
//                    user         : $scope.user
//                },
//                formDialogTemplateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'signin.html'
//            };
//            var dialogOptions = {
//                id        : 'complexDialog',
//                title     : 'Login',
//                backdrop  : true,
//                controller: 'genericDialogCtrl',
//                success   : {label: 'Ok', fn: $scope.signinAction},
//                cancel    : {label: 'Cancel', fn: function ()
//                {
//                    console.log("login canceled");
//                }}
//            };
//            createDialogService(GLOBAL_CONFIG.app.urls.partials + 'layout/generic-dialog.html', dialogOptions, dialogCtrlArgs);
        }

        function signinAction(user)
        {
            $scope.busy = true;
            usersFact.signin({}, {"_username": $scope.user.username, "_password": $scope.user.password}, success, error);
        };
    }]);
