/**
 * @TODO : define tests
 */
describe('Test equipmentsShowCtrl - ', function() {

    //equipmentsApp app has to be loaded first
    beforeEach(module('sympozerApp', 'equipmentsApp'));

    var ctrl, scope;

    //Loading of the  equipmentsShowCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('equipmentsShowCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


