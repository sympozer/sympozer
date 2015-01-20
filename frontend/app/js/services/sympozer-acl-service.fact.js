angular.module('sympozerApp').factory('sympozerAclService', [
    '$compile', function ($compile)
    {
        /**
         * right hierarchy map ( right : superRight )
         *
         * backend-side representative implementation.
         * The complexity results from old l*ùùùùùùùùùùùùùivecon's v1 permission hierarchy spec.
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
            OWNER   : ""
        };
        return {
            /**
             * TODO : comment
             *
             * at this moment the promise must have the acl attribute set
             */
            isGranted: function (promise, right)
            {
                if (right && right == promise.acl)
                {
                    return true;
                }
                while (hierarchy[right])
                {
                    if (hierarchy[right] == promise.acl)
                    {
                        return true;
                    }
                    right = hierarchy[right];
                }
                console.error("unknown right " + right + " asked for ", promise);
            }
        };
    }
]);

