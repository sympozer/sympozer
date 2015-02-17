/**
 * Authentication Factory
 * Manage the current user stored in local storage
 * @type {factory}
 */
angular.module('authenticationApp').factory('authenticationFact', ['$rootScope', function ($rootScope)
{
    var authenticationFact = {};

    $rootScope.isLoggedIn = false;


    $rootScope.currentUser = localStorage.getItem('currentUser') || null;
    if($rootScope.currentUser){
        $rootScope.isLoggedIn = true;
    }

    authenticationFact.addUser = function (newUser){
        $rootScope.currentUser = newUser;

        $rootScope.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    };

    authenticationFact.updatePerson = function (newPerson){
        $rootScope.currentUser.person = newPerson;
    };


    authenticationFact.removeUser = function (){
        $rootScope.isLoggedIn = false;
        localStorage.removeItem('currentUser');
        $rootScope.currentUser = {};
    };


    return authenticationFact;

}]);

