/**
 * Category Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('categoriesApp').factory('categoriesFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        return $resource(
            globalConfig.api.urls.get_categories,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_categories + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_categories + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_categories + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: true},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/categoryVersions', params: {'mainEventId': '@mainEventId'}, isArray: true}
            }
        );
    }]);
