/**
 * Global http interceptor
 * Listen every request in or out from the client.
 * Watch for 401 or 403 request response
 *
 *
 */
angular.module('sympozerApp').factory('globalHttpInterceptor', [
    '$q', '$rootScope', 'pinesNotifications', 'translateFilter', function ($q, $rootScope, pinesNotifications, translateFilter)
    {
        //Interceptor configurations
        return {

            //Executed whenever a request is made by the client
            'request'      : function (config)
            {
                //post or put & no "no_clean" arg set to true
//                if (["POST", "PUT", "PATCH"].indexOf(config.method) >= 0 && !(config.params && config.params.no_clean))
//                {
//                    {
//                        config.data = cleanEntity(config.data);
//                    }
//                }

                return config;
            },

            //Executed whenever a valid request is received by the client
            'response'     : function (response)
            {
                return response || $q.when(response);
            },


            //Executed whenever an error is received
            'responseError': function (rejection)
            {

                //Watch for unauthorized status
                if (rejection.status == "401")
                {
                    $rootScope.showSigninPopup();
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.error'),
                        text : translateFilter('authentication.messages.signin_required'),
                        type : 'info'
                    });
//                    $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'You need to signin to have access to this page', type: 'warning'});
                }

                //Watch for forbidden status
                else if (rejection.status == "403")
                {
                    //Notify of the field update action error
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.error'),
                        text : translateFilter('authentication.messages.forbidden'),
                        type : 'error'
                    });
                }

                //Resolve the promise
                return $q.reject(rejection);
            }
        };
    }
]);
