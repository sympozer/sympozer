/**
 * Locations Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('locationsApp').factory('mainEventLocationFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        return $resource(
            globalConfig.api.urls.get_mainEvent_locations,
            {},
            {
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_mainEvent_locations + '/:id', params: {id: '@id'}, isArray: false}
            }
        );
    }]);
