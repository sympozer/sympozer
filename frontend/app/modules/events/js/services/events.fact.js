/**
 * Events Factory
 *
 * Service calls for CRUD actions
 *
 * @type {factory}
 */
angular.module('eventsApp').factory('eventsFact',
    ['$resource', '$cachedResource', '$routeParams', function ($resource, $cachedResource, $routeParams)
    {
        //Define CRUD functions
        var resource = $resource(
            globalConfig.api.urls.get_events,
            {},
            {
                get            : {method: 'GET', url: globalConfig.api.urls.get_events + '/:id', params: {'id': '@id', cache: true}, isArray: false},
                create         : {method: 'POST', params: {}, isArray: false},
                update         : {method: 'PUT', url: globalConfig.api.urls.get_events + '/:id', params: {id: '@id'}, isArray: false},
                delete         : {method: 'DELETE', url: globalConfig.api.urls.get_events + '/:id', params: {id: '@id'}, isArray: false},
                all            : {method: 'GET', params: {}, isArray: false},
                allByConference: {method: 'GET', url: globalConfig.api.urls.get_mainEvents + '/:mainEventId/events', params: {'mainEventId': $routeParams.mainEventId}, isArray: false}
            }
        );

        //Construct a DTO object to send to server (Data Transfert Object)
        resource.serialize = function (object)
        {
            var DTObject = {
                'id'         : object.id,
                'label'      : object.label,
                'location'   : object.location ? {id: object.location.id} : undefined,
                'endAt'      : object.endAt,
                'startAt'    : object.startAt,
                'mainEvent'  : object.mainEvent ? {id: object.mainEvent.id} : undefined,
                'roles'      : object.roles,
                'category'   : object.category ? {id: object.category.id} : undefined,
                'comment'    : object.comment,
                'description': object.description,
                'dtype'      : object.dtype,
                'facebook'   : object.facebook,
                'papers'     : object.papers,
                'priority'   : object.priority,
                'topics'     : [],
                'twitter'    : object.twitter,
                'url'        : object.url,
                'youtube'    : object.youtube
            }

            //Serialize topics
            for (var topic in object.topics)
            {
                DTObject.topics.push({id: topic.id});
            }

            //Serialize sponsors
//            for (var sponsor in object.sponsors)
//            {
//                DTObject.sponsors.push({id: sponsor.id});
//            }

            //create the new resource object from DTObject
            return new resource(DTObject);
        }

        // clone function
        resource.clone = function (event, success, error)
        {
            var cloneEvent = angular.copy(event);
            delete cloneEvent.id;
            cloneEvent.label = cloneEvent.label + "(" + (++i) + ")";
            this.create(this.serialize(cloneEvent), success, error);
        };

        return resource;
    }]);
