/**
 * angular directive used to show error from server near a form input
 *
 * watch the serverError scope var
 *  must be initialized as {} in the parent controller
 *      $scope.serverError = {};
 *
 * call it in controller like at a server error response callback:
 * if ("Validation Failed" == response.data.message)
 * {
 *     formValidation.transformFromServer(response, $scope.serverError);
 * }
 *
 */
angular.module('sympozerApp').directive('input',
    ['$compile', function ($compile)
    {
        return {
            restrict: 'E',
            scope   : {
                serverError: '='
            },
            link    : function (scope, element, attrs)
            {
                //ignore not model binded element
                if (!attrs.ngModel)
                {
                    return;
                }

                //resolve modal middle scope issue
                var scopeOfServerError = scope.serverError ? scope : scope.$parent.$parent;

                //this directive need the serverError scope variable
                if (!scopeOfServerError.serverError)
                {
                    return;
                }

                //get the model property from ngModel string
                var field = getPtyFromNgModel(attrs.ngModel);


                //store element and field in scopeOfServerError for further usage in $watch

                if (!scopeOfServerError.formFields)
                {
                    scopeOfServerError.formFields = {};
                }
                scopeOfServerError.formFields[field] = element.parents("a").length > 0 ? element.parents("a") : element;

                //watch the serverError scope var
                //  must be initialized as {} in the parent controller
                //      $scope.serverError = {};
                scopeOfServerError.$watch('serverError.' + field, function (newValue, oldValue, $scope, scope)
                {
                    //not at initialization
                    if (!newValue)
                    {
                        return;
                    }

                    var field = getPtyFromNgModel(this.exp);

                    updateFormField($scope.formFields[field], $scope, newValue);

                }, true);

            }
        };

        //update the error next to the field (dom manipulation)
        function updateFormField(formFieldElement, $scope, newValue)
        {
            //remove old errors
            formFieldElement.next(".alert-danger").remove();
            formFieldElement.removeClass("ng-invalid")
                .addClass("ng-valid");

            if(newValue.length > 0)
            {
                //add new errors
                formFieldElement.addClass("ng-invalid").addClass("ng-dirty")
                    .removeClass("ng-valid");
                var template = '<div class="alert alert-danger" role="alert">';
                for (var i in newValue)
                {
                    template += "<p> {{ '"+newValue[i]+"' | translate }} </p>";
                }
                template += "</div>";
                //do the translation
                formFieldElement.after($compile(template)($scope));
                //do it async
                setTimeout(function(){
                    $(formFieldElement).focus();
                    $(formFieldElement).find("input").focus();
                },0)
            }
        }

        //get the model property from ngModel string
        function getPtyFromNgModel(ngModelString)
        {
            var l = ngModelString.split(".").length - 1;
            return ngModelString.split(".")[l];
        }
    }]);
angular.module('sympozerApp').directive('sympozerAutocomplete',
    ['$compile', function ($compile)
    {
        return {
            restrict: 'A',
            link    : function (scope, element, attrs)
            {

                //resolve modal  middle scope issue
                var scopeOfServerError = scope.$parent.serverError ? scope.$parent : scope.$parent.$parent.$parent;

                //this directive need the serverError scope variable
                if (!scopeOfServerError.serverError)
                {
                    return;
                }

                //get the model property from ngModel string
                var field = attrs.sympozerAutocomplete;

                //store element and field in scopeOfServerError for further usage in $watch

                if (!scopeOfServerError.formFields)
                {
                    scopeOfServerError.formFields = {};
                }
                scopeOfServerError.formFields[field] = element.parents("a").length > 0 ? element.parents("a") : element;

                //watch the serverError scope var
                //  must be initialized as {} in the parent controller
                //      $scope.serverError = {};
                scopeOfServerError.$watch('serverError.' + field, function (newValue, oldValue, $scope, scope)//
                {
                    //not at initialization
                    if (!newValue)
                    {
                        return;
                    }

                    var field = getPtyFromNgModel(this.exp);
                    updateFormField($scope.formFields[field], $scope, newValue);
                }, true);

            }
        };

        //update the error next to the field (dom manipulation)
        function updateFormField(formFieldElement, $scope, newValue)
        {
            //remove old errors
            formFieldElement.next(".alert-danger").remove();
            formFieldElement.removeClass("ng-invalid")
                .addClass("ng-valid");

            if(newValue.length > 0)
            {
                //add new errors
                formFieldElement.addClass("ng-invalid").addClass("ng-dirty")
                    .removeClass("ng-valid");
                var template = '<div class="alert alert-danger" role="alert">';
                for (var i in newValue)
                {
                    template += "<p> {{ '"+newValue[i]+"' | translate }} </p>";
                }
                template += "</div>";
                //do the translation
                formFieldElement.after($compile(template)($scope));
                //do it async
                setTimeout(function(){
                    $(formFieldElement).focus();
                    $(formFieldElement).find("input").focus();
                },0)
            }
        }

        //get the model property from ngModel string
        function getPtyFromNgModel(ngModelString)
        {
            var l = ngModelString.split(".").length - 1;
            return ngModelString.split(".")[l];
        }
    }]);