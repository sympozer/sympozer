/**
 * Sign in controller
 * Handles the signin process of a user
 * @type {controller}
 */

angular.module('authenticationApp').controller('signinCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'usersFact', '$location', '$modal', '$timeout', 'pinesNotifications', 'translateFilter', 'authenticationFact', function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, usersFact, $location, $modal, $timeout, pinesNotifications, translateFilter, authenticationFact)
    {
        //
        $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        $scope.user = new usersFact;


        var error = function (response, args)
        {
            //Notify of the signin action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('authentication.validations.signin_error'),
                type: 'error'
            });
        };

        var success = function (user)
        {
            $scope.user = user;

            //Modify current user
            authenticationFact.addUser(user);

            //Notify of the signin action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('authentication.validations.signin_success'),
                type: 'success'
            });

            //Close modal
            if($scope.$close){
                $scope.$close();
            }
        };

        //Manage the signin modal
        $scope.showSigninPopup = function ()
        {
            //Open signin modal
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'signin.html',
                controller : 'signinCtrl',
                size       : "large"
            });
        }

        //Send signin request with signin form information
        $scope.signinAction = function(user)
        {
            /*
             * @TODO : restore backend communication
             */
            usersFact.signin({}, {"_username": $scope.user.username, "_password": $scope.user.password}, success, error);
//            success({id:1, label:'anakin'});
        };
    }]);
