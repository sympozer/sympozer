angular.module('sympozerApp').factory('sympozerAclService', [
    '$compile', function ($compile)
    {
        /**
         * right hierarchy map ( right : superRight )
         *
         * backend-side representative implementation.
         * The complexity results from old livecon's v1 permission hierarchy spec.
         * Actually in back-end side in sympozer's v2 are implemented:
         *   - READ :       default for logged user without permission
         *   - OPERATOR :   for operator role
         *   - OWNER :      for the creator in order to delete the mainEvent
         */
        var hierarchy = {
            READ    : "EDIT",
            EDIT    : "OPERATOR",
            CREATE  : "OPERATOR",
            DELETE  : "OPERATOR",
            OPERATOR: "MASTER",
            MASTER  : "OWNER",
            OWNER   : "OWNER"
        };
        return {
            /**
             * Find out through the hierarchy tree if the param right is a allowed in the "acl" field of the promise param.
             */
            isGranted: function (promise, askedRight)
            {
                if (!promise.id)
                { //promise is not yet resolved
                    return false;
                }

                var actualRight = promise.acl;

                if (askedRight && askedRight == actualRight)
                {
                    return true;
                }
                while (hierarchy[askedRight])
                {
                    if (askedRight == hierarchy[askedRight])
                    { //top of the tree reached without finding the correct askedRight
                        return false;
                    }
                    if (actualRight == hierarchy[askedRight])
                    {
                        return true;
                    }
                    askedRight = hierarchy[askedRight];
                }
                console.error("unknown askedRight " + askedRight + " asked for ", promise);
            }
        };
    }
]);

