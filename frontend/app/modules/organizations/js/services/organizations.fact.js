/**
 * Organizations Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('organizationsApp').factory('organizationsFact',
    ['$resource', '$routeParams', function ($resource, $routeParams)
    {
        return $resource(
            globalConfig.api.urls.get_organizations,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_organizations + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_organizations + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_organizations + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/organizations', params: {'mainEventId': '@mainEventId'}, isArray: false},

                getVersions            : {method: 'GET', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                createVersions         : {method: 'POST', url: globalConfig.api.urls.get_organization_versions, params: {}, isArray: false},
                updateVersions         : {method: 'PUT', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {id: '@id'}, isArray: false},
                deleteVersions         : {method: 'DELETE', url: globalConfig.api.urls.get_organization_versions + '/:id', params: {id: '@id'}, isArray: false},
                allVersions            : {method: 'GET', url: globalConfig.api.urls.get_organization_versions, params: {}, isArray: false},
                allVersionsByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/organizations', params: {'mainEventId': '@mainEventId'}, isArray: false}
            }
        );
    }]);
