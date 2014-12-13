/**
 * Roles Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('rolesApp').factory('rolesFact', ['$resource', function ($resource)
{
    //Declare new resource object with crud functions
    var resource = $resource(
        globalConfig.api.urls.get_roles,
        {},
        {
            get            : {method: 'GET', url: globalConfig.api.urls.get_roles + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create         : {method: 'POST', params: {}, isArray: false},
            update         : {method: 'PUT', url: globalConfig.api.urls.get_roles + '/:id', params: {id: '@id'}, isArray: false},
            delete         : {method: 'DELETE', url: globalConfig.api.urls.get_roles + '/:id', params: {id: '@id'}, isArray: false},
            all            : {method: 'GET', params: {}, isArray: false},
            allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/roles', params: {'mainEventId': '@mainEventId'}, isArray: false}

        }
    );

    //Construct a DTO object to send to server (Data Transfert Object)
    resource.serialize = function (object)
    {
        var DTObject = {
            'id'       : object.id,
            'event'    : object.event ? object.event.id : null,
            'person'   : object.person.id,
            'roleLabel': object.roleLabel
        };

        //create the new resource object from DTObject
        return new resource(DTObject);
    };

    return resource;
}]);