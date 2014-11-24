/**
 * angular directives used to display errors near incorrect fields
 *
 * call it in controller at a callback for a server error response :
 * if ("Validation Failed" == response.data.message)
 * {
 *     formValidation.transformFromServer(response);
 * }
 *
 */
angular.module('sympozerApp').directive('input',
    ['formValidation', function (formValidation)
    {
        return {
            restrict: 'E',
            scope   : false,
            link    : function (scope, element, attrs)
            {
                //ignore not model binded element
                if (!attrs.ngModel)
                {
                    return;
                }

                //get the model property from ng-model string
                var l = attrs.ngModel.split(".").length - 1;
                var field = attrs.ngModel.split(".")[l];

                formValidation.watchField(scope, element, field);
            }
        };
    }]);


/**
 * TODO : comment
 */
angular.module('sympozerApp').directive('sympozerAutocomplete',
    ['formValidation', function (formValidation)
    {
        return {
            scope: false,
            link : function (scope, element, attrs)
            {
                //get the model property from sympozer-autocomplete string
                var field = attrs.sympozerAutocomplete;
                formValidation.watchField(scope, element, field);
            }
        };
    }]);

/**
 * TODO : comment
 */
angular.module('sympozerApp').directive('form',
    ['formValidation', function (formValidation)
    {
        return {
            restrict: 'E',
            scope   : false,
            link    : function (scope, element)
            {
                formValidation.emptyServerError();
                var field = "form";
                formValidation.watchField(scope, element, field, true);
            }
        };
    }]);