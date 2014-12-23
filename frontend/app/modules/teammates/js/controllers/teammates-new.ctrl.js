/**
 * New teammate controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesNewCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'teammatesFact', 'personsFact', '$modal', 'formValidation',
      function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, teammatesFact, personsFact, $modal, formValidation)
      {
          $scope.teammate = new teammatesFact;

          var error = function (response, args)
          {
              $scope.busy = false;


              if ("Validation Failed" == response.data.message)
              {
                  formValidation.transformFromServer(response);
              }
              else
              {
                  $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'teammates.validations.not_created', type: 'danger'});
              }
          };

          var success = function (response, args)
          {
              $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'teammates.validations.created', type: 'success'});
              if ($scope.$close)
              {
                  $scope.$close($scope.teammate);
              }
              else
              {
                  $window.history.back();
              }
          };

          $scope.create = function (form)
          {
              if (form.$valid)
              {
                  $scope.teammate.team = $scope.$root.currentMainEvent.team;
                  $scope.teammate.$create({}, success, error);
              }
          };

          $scope.cancel = function ()
          {
              $scope.$dismiss('cancel');
          };


          //Autocomplete and add person workflow
          $scope.searchPersons = personsFact.all;
          $scope.addPerson = function (personModel)
          {
              if (!personModel.id)
              {
                  var modalInstance = $modal.open({
                      templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'modals/persons-modal-form.html',
                      controller : 'personsNewCtrl',
                      size       : "large",
                      resolve    : {
                      }
                  });
                  modalInstance.result.then(function (newPerson)
                  {
                      $scope.teammate.person = newPerson;
                  }, function ()
                  {
                      //$log.info('Modal dismissed at: ' + new Date());
                  });
              }
              else
              {
                  $scope.teammate.person = personModel;
              }
          }
      }]);