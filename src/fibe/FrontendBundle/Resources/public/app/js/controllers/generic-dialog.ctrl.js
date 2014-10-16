
/**
 * generic ctrl handling entity creation inside a modal
 */
angular.module('sympozerApp').controller('genericDialogCtrl',
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
