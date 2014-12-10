/**
 * @TODO : define tests
 */
describe('Test eventsNewCtrl - ', function() {

    //eventsApp app has to be loaded first
    beforeEach(module('sympozerApp', 'eventsApp'));

    var ctrl, scope;

    //Loading of the  eventsNewCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('eventsNewCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


