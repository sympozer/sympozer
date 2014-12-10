/**
 * @TODO : define tests
 */
describe('Test contextCtrl - ', function() {

    //contextualizationApp app has to be loaded first
    beforeEach(module('sympozerApp', 'contextualizationApp'));

    var ctrl, scope;

    //Loading of the  contextCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('contextCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


