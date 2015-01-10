'use strict';

/**
 * Breadcrumb controller (or also called 'fil d'ariane')
 */
angular.module('sympozerApp').controller('breadcrumbCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location)
{
    /**
     * Definitions for breadcrump
     *
     * idUrl: mandatory, must correspond to the sub url of the current page
     * label: mandatory, the label to show on the breadcrumb
     * url: optional, the url where to go when the user click on it
     * children: the children node (must know all routes of the next subUrl)
     *
     * @type {{idUrl: string, label: string, url: string, children: {idUrl: string, label: string, children: {idUrl: string, label: string}[]}[]}[]}
     */
    var breadcrumbDefinitions = [
        {
            idUrl: 'home',
            label: 'navleft.home',
            url: '#/',
            children: [
                {
                    idUrl: 'events',
                    label: 'events.links.events',
                    children: [
                        {
                            idUrl: 'index',
                            label: 'Index'
                        }

                    ]
                },
                {
                    idUrl: 'mainEvents',
                    label: 'mainEvents.links.mainEvents',
                    url: '#/home/mainEvents/index',
                    children: [
                        {
                            idUrl: 'overview',
                            label: 'navleft.overview',
                            children: [
                                {
                                    idUrl: 'settings',
                                    label: 'navleft.settings'
                                }
                            ]
                        },
                        {
                            idUrl: 'index',
                            label: 'global.actions.search'
                        },
                        {
                            idUrl: 'new',
                            label: 'mainEvents.actions.new'
                        },
                        {
                            idUrl: 'show',
                            label: 'global.actions.show'
                        },
                        {
                            idUrl: 'edit',
                            label: 'global.actions.edit'
                        }

                    ]
                },
                {
                    idUrl: 'authentication',
                    label: 'authentication.links.authentication',
                    children: [
                        {
                            idUrl: 'account',
                            label: 'authentication.labels.account'
                        }
                    ]
                },
                {
                    idUrl: 'persons',
                    label: 'persons.links.persons',
                    children: [
                        {
                            idUrl: 'show',
                            label: 'global.actions.show'
                        },
                        {
                            idUrl: 'edit',
                            label: 'global.actions.edit'
                        },
                        {
                            idUrl: 'index',
                            label: 'global.actions.search'
                        }
                    ]
                },
                {
                    idUrl: 'papers',
                    label: 'papers.links.papers',
                    children: [
                        {
                            idUrl: 'index',
                            label: 'papers.actions.index.subtitle'
                        }
                    ]
                },
                {
                    idUrl: 'organizations',
                    label: 'organizations.links.organizations',
                    children: [
                        {
                            idUrl: 'index',
                            label: 'organizations.actions.search'
                        }
                    ]
                },
                {
                    idUrl: 'conference',
                    label: 'mainEvents.links.mainEvents',
                    url : '#/home/mainEvents/index',
                    children: [
                        {
                            idUrl: 'roles',
                            label: 'roles.links.roles',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/roles/list',
                            children: [
                                {
                                    idUrl: 'list',
                                    label: 'global.labels.list'
                                },
                                {
                                    idUrl: 'new',
                                    label: 'roles.actions.new'
                                },
                                {
                                    idUrl: 'edit',
                                    label: 'global.actions.edit'
                                }

                            ]
                        },
                        {
                            idUrl: 'events',
                            label: 'events.links.events',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/events/list',
                            children: [
                                {
                                    idUrl: 'list',
                                    label: 'global.labels.list'
                                },
                                {
                                    idUrl: 'new',
                                    label: 'events.actions.new'
                                },
                                {
                                    idUrl: 'edit',
                                    label: 'global.actions.edit'
                                },
                                {
                                    idUrl: 'show',
                                    label: 'global.actions.show'
                                },
                                {
                                    idUrl: 'schedule',
                                    label: 'Schedule'
                                }
                            ]
                        },

                        {
                            idUrl: 'locations',
                            label: 'locations.links.locations',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/locations/list',
                            children: [
                                {
                                    idUrl: 'list',
                                    label: 'global.labels.list'
                                },
                                {
                                    idUrl: 'new',
                                    label: 'locations.actions.new'
                                },
                                {
                                    idUrl: 'edit',
                                    label: 'global.actions.edit'
                                },
                                {
                                    idUrl: 'show',
                                    label: 'global.actions.show'
                                }
                            ]
                        },
                        {
                            idUrl: 'categories',
                            label: 'categories.links.categories',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/categories/list',
                            children: [
                                {
                                    idUrl: 'list',
                                    label: 'global.labels.list'
                                },
                                {
                                    idUrl: 'new',
                                    label: 'categories.actions.new'
                                },
                                {
                                    idUrl: 'edit',
                                    label: 'global.actions.edit'
                                },
                                {
                                    idUrl: 'show',
                                    label: 'global.actions.show'
                                }
                            ]
                        },
                        {
                            idUrl: 'papers',
                            label: 'papers.links.papers',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/papers/list',
                            children: [
                                {
                                    idUrl: 'list',
                                    label: 'global.labels.list'
                                },
                                {
                                    idUrl: 'new',
                                    label: 'papers.actions.new'
                                },
                                {
                                    idUrl: 'edit',
                                    label: 'global.actions.edit'
                                },
                                {
                                    idUrl: 'show',
                                    label: 'global.actions.show'
                                }
                            ]
                        },
                        {
                            idUrl: 'teammates',
                            label: 'teammates.links.team',
                            url : '#/home/conference/'+$rootScope.currentMainEvent.id+'/teammates',
                            children: [

                                {
                                    idUrl: 'new',
                                    label: 'teammates.actions.new'
                                },

                            ]
                        }
                    ]
                }
            ]
        }
    ];

    /**
     * Find an item in an items array
     *
     * @param items A list of items
     * @param itemId The item to look for
     * @returns {*}
     */
    var findItem = function (items, itemId)
    {
        if (items !== undefined)
        {
            for (var i = 0, length = items.length; i < length; i++)
            {

                if (itemId === items[i].idUrl)
                {
                    return items[i];
                }
            }



            console.error('[ERROR] - Breadcrumb.js : \n   children node \'' + itemId + '\' does not exist.\n   The parent node must contains a correct id child.');
            return null;
        }
        else
        {
            console.error('[ERROR] - Breadcrumb.js : \n   parent node for itemId \'' + itemId + '\' undefined.\n   Maybe you forgot to define a children node ?')
        }
        return null;
    };

    /**
     * Return an array containing the breadcrump to show
     *
     * @returns {Array}
     */
    var getCurrentBreadcrumb = function ()
    {
        // Getting the current url...
        var currentPath = $location.path();
        // ...Removing the first '/'...
        currentPath = currentPath.substr(1);
        // ...Splitting each subroutes...
        var arrayPath = currentPath.split('/');
        // ...and for each sub paths
        var subPath = null;
        var breadcrumbArray = [];
        var isLastSubpath = false;
        var tempArray = breadcrumbDefinitions;
        for (var i = 0; i < arrayPath.length; i++)
        {

            // If it's the last subpath
            if (i === (arrayPath.length - 1))
            {
                isLastSubpath = true;
            }


            subPath = arrayPath[i];

            //@TODO: find a solution for variable in breadcrum (something with the entities label ?). Exclude IDS from lookup for now
            if( parseInt(subPath)){
                // Add a "fake" value for the variable on the breacrum
                breadcrumbArray = breadcrumbArray.concat([
                    {
                        label: subPath,
                        url: "",
                        isActive: isLastSubpath ? 'active' : ''
                    }
                ]);
                continue;
            }

            tempArray = findItem(tempArray, subPath);

            if (tempArray != null)
            {


                // For each element, we add the item to the breadcrump line
                breadcrumbArray = breadcrumbArray.concat([
                    {
                        label: tempArray.label,
                        url: (tempArray.url !== undefined) ? tempArray.url : false,
                        isActive: isLastSubpath ? 'active' : ''
                    }
                ]);
                tempArray = tempArray.children;
            }
            else
            {
                // If an error occured, we stop the process
                i = arrayPath.length;
            }
        }
        return breadcrumbArray;
    };

    $scope.breadcrumbArray = getCurrentBreadcrumb();
}]);











