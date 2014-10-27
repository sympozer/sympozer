
angular.module('sympozerApp').factory('formValidation', [
    function ()
    {
        return {
            /**
             * Transform default Symfony2 "Validation Failed" rest response
             * in serverError like :
             *  {
             *      %field 1%: ['error 1', 'error 2'],
             *      %field 2%: ['error 1', 'error 2'],
             *  }
             *
             *  to be called in the error ajax callback of a form submission
             *  use it like :
             *  formValidation.transformFromServer(response, $scope.serverError);
             *
             * @param response
             * @param serverError
             * @returns {{}}
             */
            transformFromServer: function (response,serverError)
            {

                var fieldError;
                emptyServerError(serverError);
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
            }
        };
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

        function emptyServerError(serverError)
        {
            for(var i in serverError)
            {
                serverError[i] = [];
            }
        }
    }
]);

