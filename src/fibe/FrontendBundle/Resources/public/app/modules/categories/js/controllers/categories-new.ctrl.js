angular.module('categoriesApp').controller('categoriesNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'categoriesFact', function ($scope, $window, $routeParams, $rootScope, $location, categoriesFact) {

    $scope.category = new categoriesFact;

    var error = function(response, args){
        $rootScope.$broadcast('AlertCtrl:addAlert', {code:'the category has not been created', type:'danger'});
    };

    var success = function(response, args){
        $rootScope.$broadcast('AlertCtrl:addAlert', {code:'category created', type:'success'});
        if($scope.$close){
            $scope.$close($scope.person);
        }else{
            $window.history.back();
        }
        //$location.path('/conference/'+$routeParams.mainEventId+'/categories/list');
    };

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    $scope.create = function(form){
        $scope.category.mainEvent = $routeParams.mainEventId;
        if ( form.$valid ) {
            $scope.category.$create({}, success, error);
        }
    }
}
]);
