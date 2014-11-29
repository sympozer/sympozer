/**
 * Roles Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('rolesApp').factory('rolesFact', ['$resource',
    function ($resource)
    {
        var resource = $resource(
            globalConfig.api.urls.get_roles,
            {},
            {
                get   : {method: 'GET', url: globalConfig.api.urls.get_roles + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create: {method: 'POST', params: {}, isArray: false},
                update: {method: 'PUT', url: globalConfig.api.urls.get_roles + '/:id', params: {id: '@id'}, isArray: false},
                delete: {method: 'DELETE', url: globalConfig.api.urls.get_roles + '/:id', params: {id: '@id'}, isArray: false},
                all   : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/roles', params: {'mainEventId': '@mainEventId'}, isArray: false}

            }
        );

        resource.serialize = function(object){
            var DTObject = {
                'id' : object.id,
                'event' : object.event ? object.event.id : null,
                'person' : object.person.id,
                'roleLabelVersions': object.roleLabelVersion.id
            }
            return this.create(DTObject);
        }

        return resource;
    }]);