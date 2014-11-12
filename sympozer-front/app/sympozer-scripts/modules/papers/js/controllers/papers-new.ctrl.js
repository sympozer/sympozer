/**
 * New paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$window', '$filter', '$modal', 'createDialog', '$rootScope', 'GLOBAL_CONFIG', '$location', 'papersFact', 'personsFact', 'topicsFact',
                                                          function ($scope, $window, $filter, $modal, createDialogService, $rootScope, GLOBAL_CONFIG, $location, papersFact, personsFact, topicsFact)
                                                          {
                                                              $scope.paper = new papersFact();
                                                              var error = function (response, args)
                                                              {
                                                                  $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'papers.validations.not_created', type: 'danger'});
                                                              };

                                                              var success = function (response, args)
                                                              {
                                                                  $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'papers.validations.created', type: 'success'});
                                                                  if ($scope.$close)
                                                                  {
                                                                      $scope.$close($scope.paper);
                                                                  }
                                                                  else
                                                                  {
                                                                      $window.history.back();
                                                                  }
                                                              };

                                                              $scope.create = function (form)
                                                              {
                                                                  $scope.paper.mainEvent = $rootScope.currentMainEvent.id;
                                                                  if (form.$valid)
                                                                  {
                                                                      $scope.paper.$create({}, success, error);
                                                                  }
                                                              };


                                                              $scope.cancel = function ()
                                                              {
                                                                  $scope.$dismiss('cancel');
                                                              };

                                                              //Populate array of a specific linked entity
                                                              $scope.addRelationship = function (key, model)
                                                              {
                                                                  //Check if array available for the linked entity
                                                                  if (!$scope.paper[key])
                                                                  {
                                                                      $scope.paper[key] = [];
                                                                  }

                                                                  //Stop if the object selected is already in array (avoid duplicates)
                                                                  if (!$filter('inArray')('id', model.id, $scope.paper[key]))
                                                                  {
                                                                      //If no duplicate add the selected object to the specified array
                                                                      $scope.paper[key].push(model);
                                                                  }
                                                              };

                                                              $scope.removeRelationship = function (key, index)
                                                              {
                                                                  $scope.paper[key].splice(index, 1);
                                                              };

                                                              //Autocomplete and add authors workflow
                                                              $scope.searchPersons = personsFact.all;
                                                              $scope.paper.authors = [];
                                                              $scope.addPerson = function (personModel)
                                                              {
                                                                  if (!personModel.id)
                                                                  {
                                                                      var modalPersonInstance = $modal.open({
                                                                          templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-modal-form.html',
                                                                          controller : 'personsNewCtrl',
                                                                          size       : "large",
                                                                          resolve    : {
                                                                          }
                                                                      });
                                                                      modalPersonInstance.result.then(function (newPerson)
                                                                      {
                                                                          $scope.addRelationship('authors', newPerson)
                                                                      }, function ()
                                                                      {
                                                                          //$log.info('Modal dismissed at: ' + new Date());
                                                                      });
                                                                  }
                                                                  else
                                                                  {
                                                                      $scope.addRelationship('authors', personModel);
                                                                  }
                                                              };

                                                              //Autocomplete and add topic workflow
                                                              $scope.searchTopics = topicsFact.all;
                                                              $scope.paper.topics = [];
                                                              $scope.addTopic = function (topicModel)
                                                              {
                                                                  if (!topicModel.id)
                                                                  {
                                                                      var modalInstance = $modal.open({
                                                                          templateUrl: GLOBAL_CONFIG.app.modules.topics.urls.partials + 'topics-modal-form.html',
                                                                          controller : 'topicsNewCtrl',
                                                                          size       : "large",
                                                                          resolve    : {
                                                                          }
                                                                      });
                                                                      modalInstance.result.then(function (newTopic)
                                                                      {
                                                                          $scope.addRelationship('topics', newTopic)
                                                                      }, function ()
                                                                      {
                                                                          //$log.info('Modal dismissed at: ' + new Date());
                                                                      });
                                                                  }
                                                                  else
                                                                  {
                                                                      $scope.addRelationship('topics', topicModel)
                                                                  }
                                                              };
                                                          }]);