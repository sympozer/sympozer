/**
 * Global http interceptor
 * Listen every request in or out from the client.
 * Manage global serialization of entities for server request.
 * Watch for 401 or 403 request response
 *
 *
 */
angular.module('sympozerApp').factory('globalHttpInterceptor', ['$q', '$rootScope', 'pinesNotifications', 'translateFilter', function ($q, $rootScope, pinesNotifications, translateFilter)
{

    /**
     * recursive function used to clean at a depth given by maxDepth
     *  clean
     * @param object
     * @param depth
     * @returns true the entity has to be deleted
     */
    var cleanEntityDepth = function (entity, maxDepth)
    {
        maxDepth = maxDepth || 2;
        recursiveClean(entity);
        return entity;


        function recursiveClean(object, depth)
        {
            delete object["acl"];
            delete object["dtype"];

            depth = depth || 0;
            var currentDepth = depth;
            if (currentDepth > maxDepth)
            {
                return true;
            }
            else
            {
                for (var property in object)
                {
                    if ((object[property])instanceof Date)
                    { //don't clean Date
                        break;
                    }
                    else if ((object[property]) instanceof Array)
                    { //clean arrays
                        recursiveClean(object[property], currentDepth + 1);
//                            if (object[property].length == 0)
//                            {
//                                delete object[property];
//                            }
                    }
                    else if ((object[property]) instanceof Object)
                    { //clean objects
                        if (recursiveClean(object[property], currentDepth))
                        {
                            delete object[property];
                        }
                    }
                }
            }
        }

    };


    //Interceptor configurations
    return {


        //Executed whenever a request is made by the client
        'request'      : function (config)
        {
            if (["POST", "PUT", "PATCH"].indexOf(config.method) >= 0)
            {
                {
                    //Clean data to reduce network usage
                    config.data = cleanEntityDepth(config.data);
                }
            }

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
//                else if (rejection.data.error)
//                {
//                    $rootScope.$broadcast('AlertCtrl:addAlert', {code: rejection.data.error, type: 'warning'});
//                }
            else
            {
//         $rootScope.$broadcast('AlertCtrl:addAlert', {code: rejection.status + ' ' + rejection.statusText, type: 'danger'});
            }

            //Resolve the promise
            return $q.reject(rejection);
        }
    };
}
]);
