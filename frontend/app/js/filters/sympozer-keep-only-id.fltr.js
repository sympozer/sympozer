'use strict';
/**
 * sympozerKeepOnlyId directive
 * Remove every links in the given entity to keep only ids. For instance a person with papers like :
 *
 * person : {
         *  papers : [ { id :1, label : blahblah }, { id:2, label : blohbloh } ]
         * }
 *
 * becomes :  person : { papers :[ 1, 2 ] }
 *
 * This is mandatory for backend persistence on "entity" form fields in symfony where only IDs has to be given
 * @param entity
 * @returns {{}}
 */
angular.module('sympozerApp').filter('sympozerKeepOnlyId', function ()
{
    return function (entity)
    {
        var cleanEntity = function (entity)
        {
            var entityClone = {};
            for (var property in entity)
            {
                switch (typeof entity[property])
                {
                    case "object":
                        if ((entity[property])instanceof Array)
                        {
                            entityClone[property] = {};
                            for (var object in entity[property])
                            {
                                entityClone[property][object] = getObjectId(entity[property][object]);
                            }
                        }
                        else if ((entity[property])instanceof Date)
                        {
                            entityClone[property] = entity[property]
                        }
                        else
                        {
                            entityClone[property] = entity[property];
                        }
                        break;
                    default:
                        entityClone[property] = entity[property];
                        break;
                }
            }
            return entityClone;
        };

        /**
         * Return the id property of an object if exists
         * @param object
         * @returns {*}
         */
        var getObjectId = function (object)
        {
            return object.id || object;
        };

        return cleanEntity(entity);
    }
});
