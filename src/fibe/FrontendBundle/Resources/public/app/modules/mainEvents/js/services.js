/**
 * mainEvents Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('mainEventsApp').factory('mainEventsFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        return $resource(
            globalConfig.api.urls.get_mainEvents,
            {},
            {
                get   : {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                create: {method: 'POST', params: {}, isArray: false},
                update: {method: 'PUT', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                delete: {method: 'DELETE', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                all   : {method: 'GET', params: {}, isArray: true}
            }
        );
    }]);
