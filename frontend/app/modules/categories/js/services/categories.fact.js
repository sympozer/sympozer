/**
 * Category Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('categoriesApp').factory('categoriesFact',
    ['$resource', '$cachedResource', function ($resource, $cachedResource)
    {
        var resource = $resource(
            globalConfig.api.urls.get_categories,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_categories + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_categories + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_categories + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/categoryVersions', params: {'mainEventId': '@mainEventId'}, isArray: false}
            }
        );

        //Construct a DTO object to send to server (Data Transfert Object)
        resource.serialize = function (object) {
            var DTObject = {
                'id': object.id,
                'label': object.label
            }

            //create the new resource object from DTObject
            return new resource(DTObject);
        }

        return resource;
    }]);
