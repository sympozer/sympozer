/**
 * Conferences Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('conferencesApp').factory('conferencesFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        return $resource(
            globalConfig.api.urls.get_conferences,
            {},
            {
                get   : {method: 'GET', url: globalConfig.api.urls.get_conferences + '/:id', params: {id: '@id'}, isArray: false},
                create: {method: 'POST', params: {}, isArray: false},
                update: {method: 'PUT', url: globalConfig.api.urls.get_conferences + '/:id', params: {id: '@id'}, isArray: false},
                delete: {method: 'DELETE', url: globalConfig.api.urls.get_conferences + '/:id', params: {id: '@id'}, isArray: false},
                all   : {method: 'GET', params: {}, isArray: true}
            }
        );
    }]);
