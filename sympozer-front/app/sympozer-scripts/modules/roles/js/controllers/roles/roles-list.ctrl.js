/**
 * List roles controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesListCtrl', [
    '$scope', 'roleLabelsFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'rolesFact', '$cachedResource', '$modal', 'pinesNotifications', 'translateFilter', function ($scope, roleLabelsFact, $routeParams, GLOBAL_CONFIG, $rootScope, rolesFact, $cachedResource, $modal, pinesNotifications, translateFilter)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
        $scope.entities = [];

        $scope.filters = {};

        roleLabelsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
            $scope.roleLabelVersions = response.results;
        });

        $scope.request = rolesFact.allByConference;
        $scope.filters.roleLabelVersionIds = [];

        $scope.addRoleLabelsFilter= function(roleLabelVersionId){
            var roleLabelVersionIndex = $scope.filters.roleLabelVersionIds.indexOf(roleLabelVersionId)
            if( roleLabelVersionIndex == -1){
                $scope.filters.roleLabelVersionIds.push(roleLabelVersionId);
            }else{
                $scope.filters.roleLabelVersionIds.splice(roleLabelVersionIndex, 1);
            }
            $scope.filter();
        }


        $scope.clone = function (role)
        {
            var clonerole = angular.copy(role);
            delete clonerole.id;

            var error = function (response, args)
            {
                //Notify of the creation action error
                pinesNotifications.notify({
                    title: translateFilter('global.validations.error'),
                    text: translateFilter('roles.validations.not_created'),
                    type: 'error'
                });
            };

            var success = function (response, args)
            {
                //Notify of the creation action success
                pinesNotifications.notify({
                    title: translateFilter('global.validations.success'),
                    text: translateFilter('roles.validations.created'),
                    type: 'success'
                });
                $scope.entities.push(response);
            };

            clonerole.$create({}, success, error);
        };



        $scope.deleteModal = function (index, role)
        {
            $scope.index = index;

            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.roles.urls.partials + 'modals/roles-delete-modal.html',
                controller: 'rolesDeleteCtrl',
                size: "large",
                resolve: {
                   roleModel : function(){
                        return role;
                    }
                }
            });

            modalInstance.resolve = function(){
                $scope.entities.splice(index, 1);
            }
        }


    }]);
