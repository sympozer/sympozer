/**
 * Persons Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('personsApp').factory('personsFact', ['$resource', function ($resource)
{

    return $resource(
        globalConfig.api.urls.get_persons,
        {},
        {
            get            : {method: 'GET', url: globalConfig.api.urls.get_persons + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create         : {method: 'POST', params: {}, isArray: false},
            update         : {method: 'PUT', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id'}, isArray: false},
            patch          : {method: 'PATCH', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id', no_clean: true}, isArray: false},
            delete         : {method: 'DELETE', url: globalConfig.api.urls.get_persons + '/:id', params: {id: '@id'}, isArray: false},
            all            : {method: 'GET', params: {}},
            allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/persons', params: {'mainEventId': '@mainEventId'}}

        }
    );

    //Construct a DTO object to send to server (Data Transfert Object)
    resource.serialize = function (object)
    {
        //Serialize DTO object to be sent
        var DTObject = {
            firstName   : object.firstName,
            familyName  : object.familyName,
            email       : object.email,
            image       : object.image,
            website     : object.website,
            description : object.description,
            localization: object.localization ? {id: object.localization.id} : undefined,
            positions   : object.positions,
            twitter     : object.twitter,
            share       : object.share
        };

        //create the new resource object from DTObject
        return new resource(DTObject);
}]);
