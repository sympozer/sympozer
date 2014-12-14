/**
 * mainEvents Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('mainEventsApp').factory('mainEventsFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        //Declare new resource object with crud functions
        var resource = $resource(globalConfig.api.urls.get_mainEvents,
            {},
            {
                get   : {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                create: {method: 'POST', params: {}, isArray: false},
                patch : {method: 'PATCH', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                update: {method: 'PUT', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                delete: {method: 'DELETE', url: globalConfig.api.urls.get_mainEvents + '/:id', params: {id: '@id'}, isArray: false},
                all   : {method: 'GET', params: {}, isArray: false}
            }
        );

        //Construct a DTO object to send to server (Data Transfert Object)
        resource.serialize = function (object)
        {
            //Serialize DTO object to be sent
            var DTObject = {
                'id'         : object.id,
                'label'      : object.label,
                'description': object.description,
                'location'   : object.location,
                'endAt'      : object.endAt,
                'startAt'    : object.startAt,
                'logo'       : object.logo
            };

            //create the new resource object from DTObject
            return new resource(DTObject);
        };

        return resource;

    }]);
