/**
 * @TODO : define tests
 */
describe('Test locationsDeleteCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp', 'locationsApp'));

    var ctrl, scope;

    //Loading of the  locationsDeleteCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('locationsDeleteCtrl', {
            $scope: scope,
            locationModel : { id: 1 }
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


