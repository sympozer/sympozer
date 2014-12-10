/**
 * @TODO : define tests
 */
describe('Test personsMainCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp', 'personsApp'));

    var ctrl, scope;

    //Loading of the  personsMainCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('personsMainCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


