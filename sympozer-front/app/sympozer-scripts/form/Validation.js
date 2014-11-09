'use strict'

angular
  .module('theme.form-validation', [])
  .controller('AngularFormValidationController', ['$scope', function ($scope) {
    $scope.validateDemoForm = {};
    var validateDemoFormOriginal = angular.copy($scope.validateDemoForm);

    $scope.canResetValidationForm = function () {
      return $scope.validate_demo_form.$dirty;
    };

    $scope.resetValidationForm = function () {
      $scope.validateDemoForm = angular.copy($scope.validateDemoFormOriginal);
      $scope.validate_demo_form.$setPristine();
    };

    $scope.canSubmitValidationForm = function () {
      return $scope.validate_demo_form.$valid;
    };

    $scope.submit = function () {

    };
  }])
