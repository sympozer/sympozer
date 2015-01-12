/**
 * @type {factory}
 */
angular.module('eventsApp').factory('importFact', [
    '$resource',
    function ($resource)
    {
        return $resource(
            globalConfig.api.urls.get_events,
            {},
            {
                get_header: {method: 'GET', url: globalConfig.api.urls.get_import_header + '/:entityLabel', params: {'entityLabel': '@entityLbl', cache: true}},
                import: {method: 'POST', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/import/:entityLabel?commit=:commit', params: {'mainEventId': '@mainEventId', 'entityLabel': '@entityLbl', 'commit': '@commit'}}
            }
        );
    }
]);
