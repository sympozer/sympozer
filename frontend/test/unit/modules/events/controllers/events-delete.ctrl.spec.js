/**
 * @TODO : define tests
 */
describe('Test eventsDeleteCtrl - ', function() {

    //eventsApp app has to be loaded first
    beforeEach(module('sympozerApp', 'eventsApp'));

    var ctrl, scope;

    //Loading of the  eventsDeleteCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('eventsDeleteCtrl', {
            $scope: scope,
            eventModel : { id: 1 }
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


