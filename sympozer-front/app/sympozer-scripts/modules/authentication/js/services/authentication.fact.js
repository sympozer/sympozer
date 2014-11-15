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
        /*
         * @TODO : restore backend communication
         */
        newUser = {
            "id":1,
            "username":"admin",
            "random_pwd":false,
            "person":{
                "id":1,
                "label":"admin@admin.fr ",
                "email":"admin@admin.fr",
                "firstName":"admin@admin.fr",
                "papers":[{"id":1, "label":"fake paper"}, {"id":2, "label":"fake paper 2"}],
                "organizations":[{id:1, label:"fake organization"}],
                "roles":[
                    {
                        "id":1,
                        "label":"admin@admin.fr  is Speaker at My Conference",
                        "mainEvent":
                        {"id":1,"label":"My Conference","startAt":"2014-10-27T00:03:47+0100","endAt":"2014-10-27T00:03:47+0100","description":"gkkjgkgkk","events":[{"id":2,"label":"My Event 2","startAt":"2014-10-25T00:22:47+0200","endAt":"2014-10-25T02:22:47+0200","description":"wxwxw","papers":[],"eventLocations":[],"category":{"id":2,"label":"My Category","events":[],"category":{"id":15,"label":"My Category","description":"sdsdsdsd","category_versions":[]},"description":"sdsdsdsd"},"dtype":"Event"}],"papers":[],"persons":[],"team":{"teammates":[]},"mainEventLocation":{"id":1,"label":"My Location","capacity":5000,"equipments":[],"description":"qdqdqd","accesibility":"qdqdqd","latitude":11.178402,"longitude":-90.878906,"dtype":"MainEventLocation"},"eventLocations":[],"dtype":"MainEvent"},"roleLabelVersion":{"id":1,"label":"Speaker","description":"xcxcxc","roleLabel":{"id":5,"label":"Speaker","description":"xcxcxc","roleLabelVersions":[]},"roles":[],"mainEvent":{"id":1,"label":"My Conference","startAt":"2014-10-27T00:03:47+0100","endAt":"2014-10-27T00:03:47+0100","description":"gkkjgkgkk","events":[{"id":2,"label":"My Event 2","startAt":"2014-10-25T00:22:47+0200","endAt":"2014-10-25T02:22:47+0200","description":"wxwxw","papers":[],"eventLocations":[],"category":{"id":2,"label":"My Category","events":[],"category":{"id":15,"label":"My Category","description":"sdsdsdsd","category_versions":[]},"description":"sdsdsdsd"},"dtype":"Event"}],"papers":[],"persons":[],"team":{"teammates":[]},"mainEventLocation":{"id":1,"label":"My Location","capacity":5000,"equipments":[],"description":"qdqdqd","accesibility":"qdqdqd","latitude":11.178402,"longitude":-90.878906,"dtype":"MainEventLocation"},"eventLocations":[],"dtype":"MainEvent"}}}],"dtype":"Person"}}

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

