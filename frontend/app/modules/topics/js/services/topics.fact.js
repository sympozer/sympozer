/**
 * Topics Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('topicsApp').factory('topicsFact',
    ['$resource', '$cachedResource', function ($cachedResource)
    {
        return $cachedResource(
            globalConfig.api.urls.get_topics,
            {},
            {
                get   : {method: 'GET', url: globalConfig.api.urls.get_topics + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create: {method: 'POST', params: {}, isArray: false},
                update: {method: 'PUT', url: globalConfig.api.urls.get_topics + '/:id', params: {id: '@id'}, isArray: false},
                delete: {method: 'DELETE', url: globalConfig.api.urls.get_topics + '/:id', params: {id: '@id'}, isArray: false},
                all   : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/topics', params: {'mainEventId': '@mainEventId'}, isArray: false}
            }
        );
    }]);
