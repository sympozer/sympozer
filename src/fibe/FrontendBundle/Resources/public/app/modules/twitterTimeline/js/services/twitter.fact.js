/**
 * Persons Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('twitterApp').factory('twitterFact',
    ['$resource',
        function ($resource)
        {
            return $resource(
                globalConfig.app.modules.twitter.urls.getTimeline,
                {'tag': '@tag'},
                {
                    get            : {method: 'GET', url: globalConfig.app.modules.twitter.urls.getTimeline + '/:tag', params: {'tag': '@tag'}, isArray: false}
/*                    create         : {method: 'POST', params: {}, isArray: false},
                    update         : {method: 'PUT', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id'}, isArray: false},
                    patch          : {method: 'PATCH', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id'}, isArray: false},
                    delete         : {method: 'DELETE', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id'}, isArray: false},
                    all            : {method: 'GET', params: {}, isArray: true},
                    allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/persons', params: {'mainEventId': '@mainEventId'}, isArray: true}*/

                }
            );
        }]);