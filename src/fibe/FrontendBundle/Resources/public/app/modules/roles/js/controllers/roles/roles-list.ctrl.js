/**
 * List roles controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesListCtrl', [
    '$scope', 'roleLabelsFact', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'rolesFact', '$cachedResource', function ($scope, roleLabelsFact, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, rolesFact, $cachedResource)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
        $scope.entities = [];


        $scope.roleLabelVersions = roleLabelsFact.all({'filters[mainEventId]' : $routeParams.mainEventId});


        var baseFilters;
        if ($routeParams.mainEventId)
        {
            $scope.filters = baseFilters = {
                mainEventId: $routeParams.mainEventId
            };
        }

        $scope.reload = function ()
        {
            $scope.entities.$promise.then(function ()
            {
                console.log('From cache:', $scope.entities);
            });
        };

        $scope.clone = function (role)
        {
            var clonerole = angular.copy(role);
            delete clonerole.id;

            var error = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
            };

            var success = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'role saved', type: 'success'});
                $scope.entities.push(response);
            };

            clonerole.$create({}, success, error);
        };


        $scope.deleteModal = function (index, role)
        {
            $scope.index = index;

            createDialogService(GLOBAL_CONFIG.app.modules.roles.urls.partials + 'roles-delete.html', {
                id        : 'complexDialog',
                title     : 'role deletion',
                backdrop  : true,
                controller: 'rolesDeleteCtrl',
                success   : {label: 'Ok', fn: function ()
                {
                    rolesFact.delete({id: role.id});
                    $scope.entities.splice(index, 1);
                }}
            }, {
                roleModel: role
            });
        }

    }]);
