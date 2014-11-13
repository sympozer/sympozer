/**
 * Authentication Factory
 * Manage the current user stored in local storage
 * @type {factory}
 */
angular.module('authenticationApp').factory('authenticationFact', ['$rootScope', function ($rootScope)
{
    var authenticationFact = {};

    $rootScope.isLoggedIn = false;

    authenticationFact.addUser = function (newUser){
        $rootScope.currentUser = newUser;
        $rootScope.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    }

    authenticationFact.removeUser = function (){
        $rootScope.isLoggedIn = false;
        localStorage.removeItem('currentUser');
        $rootScope.currentUser = {};
    }


    return authenticationFact;

}]);

