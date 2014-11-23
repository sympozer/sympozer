/**
 * Teammates Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('teammatesApp').factory('teammatesFact',
    ['$resource', '$cachedResource',
     function ($resource)
     {
         return $resource(
             globalConfig.api.urls.get_teammates,
             {},
             {
                 get            : {method: 'GET', url: globalConfig.api.urls.get_teammates + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                 //TODO : route to filter by team
                 create         : {method: 'POST', url: globalConfig.api.urls.get_teammates, params: {}, isArray: false},
                 update         : {method: 'PUT', url: globalConfig.api.urls.get_teammates + '/:id', params: {id: '@id'}, isArray: false},
                 patch          : {method: 'PATCH', url: globalConfig.api.urls.get_teammates + '/:id', params: {id: '@id'}, isArray: false},
                 delete         : {method: 'DELETE', url: globalConfig.api.urls.get_teammates + '/:id', params: {id: '@id'}, isArray: false},
                 all            : {method: 'GET', params: {}},
                 allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/teammates', params: {'mainEventId': '@mainEventId'}}

             }
         );
     }]);
