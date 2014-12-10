/**
 * @TODO : define tests
 */
describe('Test topicsDeleteCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp', 'topicsApp'));

    var ctrl, scope;

    //Loading of the  topicsDeleteCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('topicsDeleteCtrl', {
            $scope: scope,
            topicModel : { id: 1 }
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


