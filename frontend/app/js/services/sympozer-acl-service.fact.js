angular.module('sympozerApp').factory('sympozerAclService', [
    '$compile', function ($compile)
    {
        /**
         * right hierarchy map ( right : superRight )
         */
        var hierarchy = {
            "EDIT"    : "OPERATOR",
            "CREATE"  : "OPERATOR",
            "DELETE"  : "OPERATOR",
            "OPERATOR": "MASTER",
            "MASTER"  : "OWNER"
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

