/**
 * sympozerKeepOnlyId filter
 * remove everything except ids from an entire JSON object
 * @param entity, the entity to delete properties from
 * @type {filter}
 */

'use strict';
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
