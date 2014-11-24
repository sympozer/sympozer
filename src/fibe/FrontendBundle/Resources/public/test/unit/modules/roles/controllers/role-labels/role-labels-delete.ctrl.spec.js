/**
 * @TODO : define tests
 */
describe('Test roleLabelsDeleteCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp', 'roleLabelsApp'));

    var ctrl, scope;

    //Loading of the  roleLabelsDeleteCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('roleLabelsDeleteCtrl', {
            $scope: scope,
            roleLabelModel : { id: 1 }
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


