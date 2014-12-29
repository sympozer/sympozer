/**
 * Sign up controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('signupCtrl',
    ['$scope', '$rootScope', 'GLOBAL_CONFIG', '$location', '$routeParams', 'translateFilter', 'usersFact', 'formValidation', '$modal', 'authenticationFact', 'pinesNotifications', function ($scope, $rootScope, GLOBAL_CONFIG, $location, $routeParams, translateFilter, usersFact, formValidation, $modal, authenticationFact, pinesNotifications)
    {
        $scope.user = {};

        var error = function (response, args)
        {

            if("Validation Failed" == response.data.message)
            {
                formValidation.transformFromServer(response);
            }
            else
            {
                //Notify of the signup action error
                pinesNotifications.notify({
                    title: translateFilter('global.validations.error'),
                    text: translateFilter('authentication.validations.signup_error'),
                    type: 'error'
                });
            }
        };
        var success = function (user, args)
        {
            //Notify of the signin action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('authentication.validations.signup_success'),
                type: 'success'
            });

            //Close modal
            if($scope.$close){
                $scope.$close();
            }

            //Go back to index
            $location.path('/');
        }

        //Manage signup popup
        $scope.showSignupPopup = function() {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'signup.html',
                controller: 'signupCtrl',
                size: "large",
                resolve: {
                }
            });
        }

        //Send signup request
        $scope.signupAction = function (signupForm)
        {
            if (signupForm.$valid)
            {
                usersFact.signup({fos_user_registration_form: $scope.user}, success, error);
            }
        }


        //Manage user agreement popup with sympozer conditon and termes
        $scope.showUserAgreementPopup = function() {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'agreement.html',
                controller: 'signupCtrl',
                size: "large",
                resolve: {
                }
            });
        }
    }]);
