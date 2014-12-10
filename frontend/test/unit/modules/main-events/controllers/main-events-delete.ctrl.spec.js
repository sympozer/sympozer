/**
 * @TODO : define tests
 */
describe('Test mainEventsDeleteCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp', 'mainEventsApp'));

    var ctrl, scope;

    //Loading of the  mainEventsDeleteCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('mainEventsDeleteCtrl', {
            $scope: scope,
            conferenceModel : { id: 1 }
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


