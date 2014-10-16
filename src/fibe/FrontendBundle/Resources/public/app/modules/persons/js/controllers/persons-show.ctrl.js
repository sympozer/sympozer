/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'personsFact', 'organizationsFact', 'createDialog', 'GLOBAL_CONFIG', function ($scope, $rootScope, $routeParams, personsFact, organizationsFact, createDialogService, GLOBAL_CONFIG)
{
    $scope.person = personsFact.get({id: $routeParams.personId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    }

    $scope.updatePerson = function(field, data){
        var updatePersonParam = {id: $scope.person.id};
        updatePersonParam[field] = data;
        return personsFact.patch(updatePersonParam, success, error);
    }

    $scope.searchOrganizations = organizationsFact.all;

    $scope.addOrganization = function(organizationModel){
        if(!organizationModel.id) {
            var newOrganization = new organizationsFact();
            createDialogService(GLOBAL_CONFIG.app.modules.organizations.urls.partials + 'organizations-form.html', {
                id: 'complexDialog',
                title: 'Organization creation',
                backdrop: true,
                controller: 'organizationsDeleteCtrl',
                success: {label: 'Ok', fn: function () {
                    organizationsFact.create(newOrganization, function (data) {
                        $scope.person.organizations.push(data);
                        $scope.updatePerson("organizations", $scope.person.organizations);
//
//                        personsFact.patch($scope.person.organization, success, error);

                    });
                }}
            }, {
                organizationModel: newOrganization
            });
        }else{
            $scope.person.organizations.push(organizationModel);
        }
    }

}]);