/**
 * progress loader service
 * Handles lazy loading of the scripts
 */
angular.module('sympozerApp').service('lazyLoad', ['$q', '$timeout', function ($q, $t)
{
    var deferred = $q.defer();
    var promise = deferred.promise;
    this.load = function (files)
    {
        angular.forEach(files, function (file)
        {
            if (file.indexOf('.js') > -1)
            { // script
                (function (d, script)
                {
                    var fDeferred = $q.defer();
                    script = d.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.onload = function ()
                    {
                        $t(function ()
                        {
                            fDeferred.resolve();
                        });
                    };
                    script.onerror = function ()
                    {
                        $t(function ()
                        {
                            fDeferred.reject();
                        });
                    };

                    promise = promise.then(function ()
                    {
                        script.src = file;
                        d.getElementsByTagName('head')[0].appendChild(script);
                        return fDeferred.promise;
                    });
                }(document));
            }
        });

        deferred.resolve();

        return promise;
    };
}])