/**
 * Papers Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('papersApp').factory('papersFact',
    ['$resource', '$cachedResource', '$routeParams', function ($resource, $cachedResource, $routeParams)
    {
        var resource = $resource(
            globalConfig.api.urls.get_papers,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_papers + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                patch          : {method: 'PATCH', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_papers + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/papers', params: {'mainEventId': '@mainEventId'}, isArray: false}

            }
        );

        //Construct a DTO object to send to server (Data Transfert Object)
        resource.serialize = function (object)
        {
            //Serialize DTO object to be sent
            var DTObject = {
                'id'         : object.id,
                'label'      : object.label,
                'mainEvent'  : object.mainEvent ? {id: object.mainEvent.id} : undefined,
                'abstract'   : object.abstract,
                'publisher'  : object.publisher,
                'publishDate': object.publishDate,
                'url'        : object.url,
                'authors'    : []
            };
            for (var i = 0; i < object.authors.length; i++)
            {
                DTObject.authors.push({id: object.authors[i].id});
            }

            //create the new resource object from DTObject
            return new resource(DTObject);
        };
        return resource;
    }]);