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
                {'tag': '@tag'},
                {
                    getPersonTag: {method: 'GET', url: globalConfig.api.urls.socials + '/timeline/@:tag', params: {'tag': '@tag'}, isArray: true},
                    getHashTag  : {method: 'GET', url: globalConfig.api.urls.socials + '/timeline/%23:tag', params: {'tag': '@tag'}, isArray: false}
                }
            );
        }]);