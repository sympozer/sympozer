/**
 * Locations Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('locationsApp').factory('locationsFact',
    ['$resource', '$cachedResource', function ($cachedResource)
    {
        return $cachedResource(
            globalConfig.api.urls.get_locations,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_locations + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_locations + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_locations + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: true},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_conferences + '/:confId/locations', params: {'confId': '@confId'}, isArray: true}

            }
        );
    }]);
