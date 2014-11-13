/**
 * Sign up controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('signupCtrl',
    ['$scope', '$rootScope', '$location', '$routeParams', 'GLOBAL_CONFIG', 'usersFact', 'formValidation', '$modal', function ($scope, $rootScope, $location, $routeParams, GLOBAL_CONFIG, usersFact, formValidation, $modal)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
        $scope.user = {};

        var error = function (response, args)
        {
            $scope.busy = false;

            if("Validation Failed" == response.data.message)
            {
                formValidation.transformFromServer(response);
            }
            else
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'authentication.validations.signup_error', type: 'danger'});
            }
        };
        var success = function (response, args)
        {
            $scope.busy = false;
            $scope.user = response;
            $rootScope.currentUser = response;
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'authentication.validations.signup_success', type: 'success'});
            $location.path('/');
        }

        $scope.showSignupPopup = function() {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'signup.html',
                controller: 'signupCtrl',
                size: "large",
                resolve: {
                }
            });
            modalInstance.result.then(function (userForm) {
                $scope.signupAction(userForm);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.signupAction = function (signupForm)
        {
            usersFact.signup({fos_user_registration_form: signupForm}, success, error);
        }


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
