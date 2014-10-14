/**
 * Global http interceptor
 *
 * @TODO Florian : Comment
 *
 */
angular.module('sympozerApp').factory('globalHttpInterceptor', [
    '$q', '$rootScope', function ($q, $rootScope)
    {
        //Function used to keep only IDs of POST & PUT request
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
                        else
                        {
                            entityClone[property] = getObjectId(entity[property]);
                        }
                        break;
                    default:
                        entityClone[property] = entity[property];
                        break;
                }
            }
            return entityClone;
        };

        var getObjectId = function (object)
        {
            return object.id;
        };


        return {

            'request': function (config)
            {
                //post or put & no "no_clean" arg set to true
                if (["POST", "PUT"].indexOf(config.method) >= 0 && !(config.params && config.params.no_clean))
                {
                    {
                        config.data = cleanEntity(config.data);
                    }
                }
                return config;
            },

            'response': function (response)
            {
                return response || $q.when(response);
            },

            'responseError': function (rejection)
            {
                if (rejection.status == "401")
                {
                    $rootScope.showLoginPopup();
                    $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'You need to signin to have access to this page', type: 'warning'});
                }
                else
                {
                    $rootScope.$broadcast('AlertCtrl:addAlert', {code: rejection.status + ' ' + rejection.statusText, type: 'danger'});
                }
                return $q.reject(rejection);
            }
        };
    }
]);
