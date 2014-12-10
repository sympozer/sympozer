describe('Test navTopCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp'));

    var ctrl, scope;

    //Loading of the navTopCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('navTopCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


