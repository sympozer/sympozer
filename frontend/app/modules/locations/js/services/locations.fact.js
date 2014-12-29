/**
 * Locations Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('locationsApp').factory('locationsFact', ['$resource', '$cachedResource', function ($resource)
{
    var resource = $resource(
        globalConfig.api.urls.get_locations,
        {},
        {
            get            : {method: 'GET', url: globalConfig.api.urls.get_locations + '/:id', params: {'id': '@id', cache: true}, isArray: false},
            create         : {method: 'POST', params: {}},
            update         : {method: 'PUT', url: globalConfig.api.urls.get_locations + '/:id', params: {id: '@id'}, isArray: false},
            delete         : {method: 'DELETE', url: globalConfig.api.urls.get_locations + '/:id', params: {id: '@id'}, isArray: false},
            all            : {method: 'GET', params: {}, isArray: false},
            allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/locations', params: {'mainEventId': '@mainEventId'}, isArray: false}
        }
    );

    //Construct a DTO object to send to server (Data Transfert Object)
    resource.serialize = function (object)
    {
        var DTObject = {
            'id'          : object.id,
            'capacity'    : object.capacity,
            'label'       : object.label,
            'accesibility': object.accesibility,
            'description' : object.description,
            'equipments'  : object.equipments,
            'mainEvent'   : object.mainEvent ? {id: object.mainEvent.id} : undefined,
            'address'     : object.address,
            'latitude'    : object.latitude,
            'longitude'   : object.longitude,
            'street'      : object.street,
            'streetNumber': object.streetNumber,
            'city'        : object.city,
            'state'       : object.state,
            'country'     : object.country,
            'postalCode'  : object.postalCode
        };

        //create the new resource object from DTObject
        return new resource(DTObject);
    };

    // clone function
    resource.clone = function (location, success, error)
    {
        var locationClone = angular.copy(location);
        delete locationClone.id;
        locationClone.label = location.label + " - copy";
        this.create(this.serialize(locationClone), success, error);
    };

    return resource;
}]);
