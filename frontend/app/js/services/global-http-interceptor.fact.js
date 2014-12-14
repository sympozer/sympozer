/**
 * Global http interceptor
 * Listen every request in or out from the client.
 * Manage global serialization of entities for server request.
 * Watch for 401 or 403 request response
 *
 *
 */
angular.module('sympozerApp').factory('globalHttpInterceptor', [
    '$q', '$rootScope', 'pinesNotifications', 'translateFilter', function ($q, $rootScope, pinesNotifications, translateFilter)
    {

        /**
         * Remove every links in the given entity to keep only ids. For instance a person with papers like :
         *
         * person : {
         *  papers : [ { id :1, label : blahblah }, { id:2, label : blohbloh } ]
         * }
         *
         * becomes :  person : { papers :[ 1, 2 ] }
         *
         * This is mandatory for backend persistence on "entity" form fields in symfony where only IDs has to be given
         * @param entity
         * @returns {{}}
         */
        var cleanEntity = function (entity)
        {
            var entityClone = {};
            for (var property in entity)
            {
                switch (typeof entity[property])
                {
                    case "object":
                        if ((entity[property])instanceof Array)
                        {
                            entityClone[property] = {};
                            for (var object in entity[property])
                            {
                                entityClone[property][object] = getObjectId(entity[property][object]);
                            }
                        }
                        else if ((entity[property])instanceof Date)
                        {
                            entityClone[property] = entity[property]
                        }
                        else
                        {
                            entityClone[property] = entity[property];
                        }
                        break;
                    default:
                        entityClone[property] = entity[property];
                        break;
                }
            }
            return entityClone;

            /**
             * Return the id property of an object if exists
             * @param object
             * @returns {*}
             */
            function getObjectId(object)
            {
                return object.id || object;
            }
        };


        var cleanEntityDepth = function (entity, maxDepth)
        {
            maxDepth = maxDepth || 2;
            recursiveClean(entity);
            return entity;

            /**
             * recursive function used to clean at a depth given by maxDepth
             *  clean
             * @param object
             * @param depth
             * @returns true the entity has to be deleted
             */
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
                        config.data = cleanEntityDepth(config.data);
                    }
                }
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
