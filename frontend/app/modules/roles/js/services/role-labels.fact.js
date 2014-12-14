/**
 * Roles labels Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('roleLabelsApp').factory('roleLabelsFact', ['$resource', function ($resource)
{
    var resource = $resource(
        globalConfig.api.urls.get_roleLabels,
        {},
        {
            get            : {method: 'GET', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create         : {method: 'POST', params: {}, isArray: false},
            update         : {method: 'PUT', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {id: '@id'}, isArray: false},
            delete         : {method: 'DELETE', url: globalConfig.api.urls.get_roleLabels + '/:id', params: {id: '@id'}, isArray: false},
            all            : {method: 'GET', url: globalConfig.api.urls.get_roleLabels, params: {}, isArray: false},
            allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/roleLabels', params: {'mainEventId': '@mainEventId'}, isArray: false}
        }
    );

    //Construct a DTO object to send to server (Data Transfert Object)
    resource.serialize = function (object)
    {
        var DTObject = {
            'id'       : object.id,
            'mainEvent': object.mainEvent ? {id: object.mainEvent.id} : undefined,
            'label'    : object.label
        };

        //create the new resource object from DTObject
        return new resource(DTObject);
    };
    return resource;
}]);
