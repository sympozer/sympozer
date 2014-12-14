angular.module('sympozerApp').factory('formValidation', [
    '$compile', function ($compile)
    {
        var serverError = {};
        return {
            /**
             * Transform Symfony2 default "Validation Failed" rest response
             * to a "serverError" object like :
             *  {
             *      %field 1%: ['error 1', 'error 2'],
             *      %field 2%: ['error 1', 'error 2'],
             *  }
             *
             *  to be called in the error ajax callback of a form submission
             *  use it like :
             *  formValidation.transformFromServer(response);
             *
             * @param response
             * @returns {{}}
             */
            transformFromServer: function (response)
            {

                var fieldError;
                //rempove old validation errors
                emptyArrays(serverError);
                //loop over each field in the server response
                for (var field in response.data.errors.children)
                {
                    fieldError = response.data.errors.children[field];
                    if (!(fieldError instanceof Array))
                    {
                        if (!serverError[field])
                        {
                            serverError[field] = [];
                        }
                        //loop over each error in field
                        for (var i in fieldError.errors)
                        {
                            serverError[field].push(fieldError.errors[i]);
                        }
                    }
                }
                //loop over form errors in the server response
                //if the response contains a ":"
                // then it concerns the form and is push to "serverError.form"
                //otherwise it concerns a field : a JSON.stringify is applied
                // ex : "{'field' : 'endAt', 'msg' : 'EventFormValidation_start_is_after_end_error'}"
                for (var formError in response.data.errors.errors)
                {
                    var error;
                    //no json : does concern the form itself
                    if (response.data.errors.errors[formError].indexOf(":") < 0)
                    {
                        error = response.data.errors.errors[formError];
                        if (!serverError.form)
                        {
                            serverError.form = [];
                        }
                        serverError.form.push(error);
                    }
                    else
                    {
                        error = JSON.parse(JSONize(response.data.errors.errors[formError]));
                        if (!serverError[error.field])
                        {
                            serverError[error.field] = [];
                        }
                        serverError[error.field].push(error.msg);
                    }
                }

                return serverError;
            },

            /**
             *      watch in the serverError array updated by transformFromServer
             * @param scope
             * @param element
             * @param field
             */
            watchField: function (scope, element, field, appendBefore)
            {
                //this service need the serverError scope variable in order to watch inside
                if (!scope.serverError)
                {
                    scope.serverError = serverError;
                }

                //store element in scope.serverError for further usage in $watch
                if (!scope.formFields)
                {
                    scope.formFields = {};
                }

                var field = getPtyFromNgModel(field);

                scope.formFields[field] = element;

                //watch the serverError scope var
                scope.$watch('serverError.' + field, function (newValue, oldValue, $scope)
                {
                    //not at initialization
                    if (!newValue)
                    {
                        return;
                    }

                    var field = getPtyFromNgModel(this.exp);
                    updateFormField($scope.formFields[field], $scope, newValue, appendBefore);
                }, true);

            },

            /**
             *  Empty the server error array so old errors are deleted and not shown anymore
             */
            emptyServerError: function ()
            {
                emptyArrays(serverError);
            }
        };

        /**
         * update the error next to the field (dom manipulation)
         * @param formFieldElement
         * @param $scope
         * @param newValue
         * @param appendBefore
         */
        function updateFormField(formFieldElement, $scope, newValue, appendBefore)
        {
            if (formFieldElement.parent().hasClass("input-group"))
            {
                formFieldElement = formFieldElement.parent();
            }
            //remove old errors
            formFieldElement.next(".alert-danger").remove();
            formFieldElement.removeClass("ng-invalid")
                .addClass("ng-valid");

            if (newValue.length > 0)
            {
                //element.parents("a").length > 0 ? element.parents("a") : element
                //add new errors
                formFieldElement.addClass("ng-invalid").addClass("ng-dirty")
                    .removeClass("ng-valid");
                var template = '<div class="alert alert-danger" role="alert">';
                for (var i in newValue)
                {
                    template += "<p> {{ '" + newValue[i] + "' | translate }} </p>";
                }
                template += "</div>";
                //do the translation
                var appendFn = appendBefore ? "before" : "after";
                formFieldElement[appendFn]($compile(template)($scope));
                //do it async
                setTimeout(function ()
                {
                    $(formFieldElement).focus();
                    $(formFieldElement).find("input").focus();
                }, 0)
            }
        }

        /**
         * get the model property from ngModel string
         * @param string ngModelString
         * @returns string
         */
        function getPtyFromNgModel(ngModelString)
        {
            //remove the first object from the field string like : mainEvent.location.label => location.label
            var firstDotpos = ngModelString.indexOf(".");
            return firstDotpos > 0 ? ngModelString = ngModelString.substr(firstDotpos + 1) : ngModelString;
//            var l = ngModelString.split(".").length - 1;
//            return ngModelString.split(".")[l];
        }


        /**
         *  empty error array in order to keep the watch link
         * @param serverError
         */
        function emptyArrays(serverError)
        {
            for (var i in serverError)
            {
                serverError[i] = [];
            }
        }

        /**
         * Convert this (NOT a valid JSON string):
         *
         * var str = "{ hello: 'world', places: ['Africa', 'America', 'Asia', 'Australia'] }"
         *
         * into this:
         * str = '{ "hello": "world", "places": ["Africa", "America", "Asia", "Australia"] }'
         *
         * @param str
         * @returns {string}
         * @constructor
         */

        function JSONize(str)
        {
            return str
                // wrap keys without quote with valid double quote
                .replace(/([\$\w]+)\s*:/g, function (_, $1)
                {
                    return '"' + $1 + '":'
                })
                // replacing single quote wrapped ones to double quote
                .replace(/'([^']+)'/g, function (_, $1)
                {
                    return '"' + $1 + '"'
                })
        }
    }
]);

