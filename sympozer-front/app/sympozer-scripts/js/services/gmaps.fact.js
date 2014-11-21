/**
 * gmaps service
 * service to use gmap js plugin
 */
angular.module('sympozerApp').service('GMaps', ['$rootScope', function ($rootScope)
{
    //Instanciate a new map object
    this.new = function (options, instance)
    {
        var gmaps = new GMaps(options);
        $rootScope.$broadcast('GMaps:created', { key: instance, map: gmaps });
    };
    //Instanciate a new panorama object
    this.newPanorama = function (options, instance)
    {
        var gmaps = GMaps.createPanorama(options);
        $rootScope.$broadcast('GMaps:created', { key: instance, map: gmaps });
    };
}])
