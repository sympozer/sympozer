'use strict';

/**
 * Navigation main controller. Handles the configuration of the nav bars and search system
 * @TODO : replace code
 */
angular.module('sympozerApp').controller('navMainCtrl', ['$scope', '$rootScope', '$location', '$timeout', '$uiConfig', function ($scope, $rootScope, $location, $timeout, $uiConfig)
{

    //Array containing the open nodes (nodes clicked)
    $scope.openNodes = [];
    //Array containing the open nodes (nodes clicked)
    $scope.selectedNodes = [];

    /**
     * This menu is always present
     * @type {{label: string, iconClass: string, link: string}[]}
     */
    var basicMenu = [
        {
            label: 'mainEvents.links.mainEvents',
            iconClass: 'fa fa-calendar',
            link : '#/home/mainEvents/index'
        },
        {
            label: 'organizations.links.organizations',
            iconClass: 'fa fa-group',
            link : '#/home/organizations/index'
        },
        {
            label: 'persons.links.persons',
            iconClass: 'fa fa-user',
            link : '#/home/persons/index'
        },
        {
            label: 'papers.links.papers',
            iconClass: 'glyphicon glyphicon-book',
            link : '#/home/papers/index'
        }
    ];


    /**
     * Current main conference menu
     *
     * @type {{label: string, iconClass: string, childNodes: *[]}[]}
     */
    var menuCurrentConference = function ()
    {

        //Set number off object on nav barre
        var badgeEvents = $rootScope.currentMainEvent.events ? $rootScope.currentMainEvent.events.length : 0;
        var badgeLocations = $rootScope.currentMainEvent.eventLocations ? $rootScope.currentMainEvent.eventLocations.length : 0;

        return [
            {
                label     : $rootScope.currentMainEvent ? $rootScope.currentMainEvent.label : '',
                iconClass : 'fa fa-certificate',
                childNodes: [
                    {
                        label: 'navleft.informations',
                        iconClass: 'fa fa-info-circle',
                        link : '#/home/mainEvents/' + $rootScope.currentMainEvent.id + '/overview/settings'
                    },
                    {
                        label: 'teammates.links.team',
                        iconClass: 'fa fa-graduation-cap',
                        link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/teammates'

                    },
                    {
                        label: 'navleft.community',
                        iconClass: 'fa fa-group',
                        link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/roles/list'

                    },
                    {
                        label     : 'navleft.resource',
                        iconClass : 'fa fa-folder-open',
                        childNodes: [
                            {
                                label: 'papers.links.papers',
                                iconClass: 'glyphicon glyphicon-book',
                                link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/papers/list'
                            }
                        ]
                    },
                    {
                        label     : 'events.links.schedule',
                        iconClass : 'fa fa-calendar',
                        childNodes: [
                            {
                                label: 'events.links.events',
                                html : '<span class="badge badge-indigo">' + badgeEvents + '</span>', /** menu notification **/
                            iconClass: 'fa fa-clock-o',
                                link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/events/list'
                            },
                            {
                                label: 'locations.links.locations',
                                html : '<span class="badge badge-magenta">' + badgeLocations + '</span>',
                                iconClass: 'fa fa-map-marker red',
                                link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/locations/list'
                            }
                        ]
                    },
                    {
                        label: 'navleft.analytics',
                        iconClass: 'fa fa-line-chart',
                        link : '#/home/conference/' + $rootScope.currentMainEvent.id + '/analytics/index'
                    }
                ]
            }
        ];
    };

    /**
     * Set parent for all nodes
     *
     * @param childNodes
     * @param parent
     */
    var setParent = function (childNodes, parent)
    {
        angular.forEach(childNodes, function (child)
        {
            child.parent = parent;
            if (child.childNodes !== undefined)
            {
                setParent(child.childNodes, child);
            }
        });
    };

    /**
     * Get the menu node from the link
     * Goal : set the correct left menu node selected whenever the user
     * change the current main page (or directly from the link)
     *
     * @param childNodes
     * @param link
     * @returns {*} the node from the menu architecture
     */
    $scope.findNodeByUrl = function (childNodes, link)
    {
        for (var i = 0, length = childNodes.length; i < length; i++)
        {
            if (childNodes[i].link && childNodes[i].link.replace('#', '') == link)
            {
                return childNodes[i];
            }
            if (childNodes[i].childNodes !== undefined)
            {
                var node = $scope.findNodeByUrl(childNodes[i].childNodes, link);
                if (node)
                {
                    return node;
                }
            }
        }
    };


    /**
     * Action triggerred when a node is selected
     * @param node
     */
    $scope.navigate = function (node)
    {
        // Close the node and stop if selected node opened
        if (node.open)
        {
            node.open = false;
            return;
        }
        //Close all nodes
        for (var i = $scope.openNodes.length - 1; i >= 0; i--)
        {
            $scope.openNodes[i].open = false;
        }
        $scope.openNodes = [];
        var parentNode = node;

        //Open all the parent
        while (parentNode !== null)
        {
            parentNode.open = true;
            $scope.openNodes.push(parentNode);
            parentNode = parentNode.parent;
        }

        // handle leaf nodes
        if (!node.childNodes || (node.childNodes && node.childNodes.length < 1))
        {
            for (var j = $scope.selectedNodes.length - 1; j >= 0; j--)
            {
                $scope.selectedNodes[j].selected = false;
            }
            $scope.selectedNodes = [];
            parentNode = node;
            while (parentNode !== null)
            {
                parentNode.selected = true;
                $scope.selectedNodes.push(parentNode);
                parentNode = parentNode.parent;
            }
        }
    };

    /**
     * Select node according to the current link
     */
    var initSelected = function ()
    {
        //Find current node from link
        var currentNode = $scope.findNodeByUrl($scope.menu, $location.path());
        if (currentNode)
        {
            //Mark as selected
            $scope.navigate(currentNode);
        }
    }

    /**
     * Initialize menu with current mainEvent and current link path
     * @returns {string}
     */
    var initMenu = function ()
    {
        /**
         * Each time there is a change, the menu is actualized
         *
         */
        $scope.menu = basicMenu;

        // If there is a current conference
        if ($rootScope.currentMainEvent)
        {
            $scope.menu = $scope.menu.concat(menuCurrentConference());
        }

        /**
         * Set hierarchy for a menu node
         */
        setParent($scope.menu, null);

        /**
         * Set selected node
         */
        initSelected();

        return $location.path();
    };

    //Trigger init
    initMenu();

    /**
     * Menu search form
     * @param $e
     */
    $scope.showSearchBar = function ($e)
    {
        $e.stopPropagation();
        $uiConfig.set('searchCollapsed', true);
    };


    /**
     * Event listener whenever a new conference context loaded
     */
    $scope.$on('contextFact:changeContext', function ()
    {
        //Update conference menu with new conference infos
        initMenu();
    });

}]);











