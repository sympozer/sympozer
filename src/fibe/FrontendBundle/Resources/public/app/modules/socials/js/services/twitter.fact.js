/**
 * Persons Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('socials').factory('twitterFact',
    ['$resource',
        function ($resource)
        {
            return $resource(
                globalConfig.app.modules.socials.twitter.urls.getTimeline,
                {'tag': '@tag', 'type': '@type' },
                {
                    getPersonTag   : {method: 'GET', url: globalConfig.app.modules.socials.twitter.urls.getTimeline + '/:tag' + '/:type', params: {'tag': '@tag', 'type': '@type'}, isArray: true},
                    getHashTag     : {method: 'GET', url: globalConfig.app.modules.socials.twitter.urls.getTimeline + '/:tag' + '/:type', params: {'tag': '@tag', 'type': '@type'}, isArray: false}

                }
            );
        }]);