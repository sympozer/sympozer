/**
 * Roles labels Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('roleLabelsApp').factory('roleLabelsFact', ['$resource', function ($resource )
{
    return $resource(
        globalConfig.api.urls.get_roleLabels,
        {},
        {
            get   : {method: 'GET', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create: {method: 'POST', params: {}, isArray: false},
            update: {method: 'PUT', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {id: '@id'}, isArray: false},
            delete: {method: 'DELETE', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {id: '@id'}, isArray: false},
            all   : {method: 'GET', url: globalConfig.api.urls.get_roleLabels, params: {}, isArray: false},
            allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/roleLabels', params: {'mainEventId': '@mainEventId'}, isArray: false}
        }
    );
}]);
