
angular.module('sympozerApp').factory('formValidation', [
    '$compile', function ($compile)
    {
        var serverError = {error:{}};
        return {
            /**
             * Transform Symfony2 default "Validation Failed" rest response
             * in serverError like :
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
                emptyArrays(serverError);
                //loop over each field
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
                //loop over errors of the form
                for(var formError in response.data.errors.errors)
                {
                    var error = JSON.parse(JSONize(response.data.errors.errors[formError]));
                    if (!serverError[error.field])
                    {
                        serverError[error.field] = [];
                    }
                    serverError[error.field].push(error.msg);
                }

                return serverError;
            },

            /**
             *      watch in the serverError array updated by transformFromServer
             * @param scope
             * @param element
             * @param field
             */
            watchField : function (scope,element,field)
            {
                //@TODO : TRACK WHEN IT NEEDS TO BE EMPTIED ( directive form ?)
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
                    updateFormField($scope.formFields[field], $scope, newValue);
                }, true);

            },

            /**
             *  Empty the server error array so old errors are deleted and not shown anymore
             */
            emptyServerError : function()
            {
                emptyArrays(serverError);
            }
        };

        /**
         * update the error next to the field (dom manipulation)
         * @param formFieldElement
         * @param $scope
         * @param newValue
         */
        function updateFormField(formFieldElement, $scope, newValue)
        {
            //remove old errors
            formFieldElement.next(".alert-danger").remove();
            formFieldElement.removeClass("ng-invalid")
                .addClass("ng-valid");

            if(newValue.length > 0)
            {
                //element.parents("a").length > 0 ? element.parents("a") : element
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

        /**
         * get the model property from ngModel string
         * @param ngModelString
         * @returns {*}
         */
        function getPtyFromNgModel(ngModelString)
        {
            var l = ngModelString.split(".").length - 1;
            return ngModelString.split(".")[l];
        }


        /**
         *  empty error array in order to keep the watch link
         * @param serverError
         */
        function emptyArrays(serverError)
        {
            for(var i in serverError)
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

        function JSONize(str) {
            return str
                // wrap keys without quote with valid double quote
                .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
                // replacing single quote wrapped ones to double quote
                .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'})
        }
    }
]);

