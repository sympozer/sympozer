/**
 * Position Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('positionsApp').factory('positionsFact', ['$resource', function ($resource)
{
    var resource = $resource(
        globalConfig.api.urls.get_positions,
        {},
        {
            get            : {method: 'GET', url: globalConfig.api.urls.get_positions + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create         : {method: 'POST', params: {}, isArray: false},
            update         : {method: 'PUT', url: globalConfig.api.urls.get_positions + '/:id', params: {id: '@id'}, isArray: false},
            patch          : {method: 'PATCH', url: globalConfig.api.urls.get_positions + '/:id', params: {id: '@id'}},
            delete         : {method: 'DELETE', url: globalConfig.api.urls.get_positions + '/:id', params: {id: '@id'}, isArray: false},
        }
    );

    //Construct a DTO object to send to server (Data Transfert Object)
    resource.serialize = function (object)
    {
        //Serialize DTO object to be sent
        var DTObject = {
            'id'           : object.id,
            'label'        : object.label,
            'position'     : object.position,
            'person'       : object.person ? {id: object.person.id} : undefined,
            'organization' : object.organization.id ? {id: object.organization.id} : {label: object.organization}
        };

        //create the new resource object from DTObject
        return new resource(DTObject);
    };

    return resource;
}]);