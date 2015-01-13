/**
 * Persons Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('socialsApp').factory('twitterFact',
    ['$resource',
        function ($resource)
        {
            return $resource(
                globalConfig.api.urls,
                {'tag': '@tag', 'type': '@type' },
                {
                    getPersonTag   : {method: 'GET', url: globalConfig.api.urls.socials + '/timeline/:tag' + '/:type', params: {'tag': '@tag', 'type': '@type'}, isArray: true},
                    getHashTag     : {method: 'GET', url: globalConfig.api.urls.socials + '/timeline/:tag' + '/:type', params: {'tag': '@tag', 'type': '@type'}, isArray: false}
                }
            );
        }]);