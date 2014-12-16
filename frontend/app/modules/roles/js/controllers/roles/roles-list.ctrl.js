/**
 * List roles controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesListCtrl', [
    '$scope', 'roleLabelsFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'rolesFact', '$cachedResource', '$modal', 'pinesNotifications', 'translateFilter', function ($scope, roleLabelsFact, $routeParams, GLOBAL_CONFIG, $rootScope, rolesFact, $cachedResource, $modal, pinesNotifications, translateFilter)
    {

        //prepare array with role list (managed by entity-list-handler)
        $scope.entities = [];

        //Prepare filters
        $scope.filters = {};


        roleLabelsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function (response)
        {
            $scope.roleLabels = response.results;
        });

        //Request to trigger when loading a new page or more data (with infinite-scroll)
        $scope.request = rolesFact.allByConference;


        $scope.filters.roleLabelIds = [];

        //Filter role list by rolelabel
        $scope.addRoleLabelsFilter = function (roleLabelId)
        {
            var roleLabelIndex = $scope.filters.roleLabelIds.indexOf(roleLabelId)
            if (roleLabelIndex == -1)
            {
                $scope.filters.roleLabelIds.push(roleLabelId);
            }
            else
            {
                $scope.filters.roleLabelIds.splice(roleLabelIndex, 1);
            }
            $scope.filter();
        };


        $scope.clone = function (role)
        {
            var clonerole = angular.copy(role);
            delete clonerole.id;

            var error = function (response, args)
            {
                //Notify of the creation action error
                pinesNotifications.notify({
                    title: translateFilter('global.validations.error'),
                    text : translateFilter('roles.validations.not_created'),
                    type : 'error'
                });
            };

            var success = function (response, args)
            {
                //Notify of the creation action success
                pinesNotifications.notify({
                    title: translateFilter('global.validations.success'),
                    text : translateFilter('roles.validations.created'),
                    type : 'success'
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
                controller : 'rolesDeleteCtrl',
                size       : "large",
                resolve    : {
                    roleModel: function ()
                    {
                        return role;
                    }
                }
            });

            //When modal instance promise is resolved with 'ok' then remove the role from the list
            modalInstance.result.then(function (role)
            {
                $scope.entities.splice(index, 1);
            })
        }


    }]);
