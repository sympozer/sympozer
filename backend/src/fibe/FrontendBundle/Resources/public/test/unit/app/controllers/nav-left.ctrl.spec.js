describe('Test navLeftCtrl - ', function() {

    //Sympozer app has to be loaded first
    beforeEach(module('sympozerApp'));

    var ctrl, scope;

    //Loading of the navLeftCtrl
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('navLeftCtrl', {
            $scope: scope
        });
    }));

    //Verify that scope values are well formed
    it('should load scope values', function() {
    });

});


