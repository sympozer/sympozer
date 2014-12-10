/**
 * Organizations Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('organizationsApp').factory('organizationsFact',
    ['$resource', '$cachedResource', '$routeParams', function ($resource, $cachedResource, $routeParams)
    {
        return $resource(
            globalConfig.api.urls.get_organization_versions,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: true},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/organizations', params: {'mainEventId': '@mainEventId'}, isArray: true}
            }
        );
    }]);
