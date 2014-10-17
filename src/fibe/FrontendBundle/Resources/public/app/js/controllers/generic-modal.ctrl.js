
/**
 * generic ctrl handling entity creation inside a modal model is the entity used in the modal, modelName is the name of the object in the modal
 */
angular.module('sympozerApp').controller('genericModalCtrl',
    ['$scope', '$rootScope', 'model', 'modelName',
        function ($scope, $rootScope,model, modelName)
        {
            $scope[modelName] = model;

        }]);
