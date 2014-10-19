/**
 * Papers Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('papersApp').factory('papersFact',
    ['$resource', '$cachedResource', '$routeParams', function ($resource, $cachedResource, $routeParams)
    {
        return $resource(
            globalConfig.api.urls.get_papers,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_papers + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                patch          : {method: 'PATCH', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: true},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/papers', params: {'mainEventId': $routeParams.mainEventId}, isArray: true}

            }
        );
    }]);
