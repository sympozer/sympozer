'use strict';

/**
 * Navigation main controller. Handles the configuration of the nav bars and search system
 */
sympozerApp.controller('navMainCtrl', ['$scope', '$location', '$timeout', '$global', function ($scope, $location, $timeout, $global)
{
  /**
   * This menu is always present
   * @type {{label: string, iconClasses: string, url: string}[]}
   */
   var basicMenu = [
    {
      label: 'Events',
      iconClasses: 'fa fa-calendar',
      url: '#/modules/events/index'
    },
    {
      label: 'Organizations',
      iconClasses: 'fa fa-group',
      url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
    },
    {
      label: 'Annuary',
      iconClasses: 'fa fa-book',
      url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
    },
    {
      label: 'Publications',
      iconClasses: 'glyphicon glyphicon-book',
      url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
    }
  ];
  // Initialize the basic menu
  $scope.menu = basicMenu;

  /**
   * User menu
   *
   * @TODO FORZA : TO DELETE & REPLACE BY THE TOP USER MENU
   *
   * @type {{label: string, iconClasses: string, children: {label: string, iconClasses: string, url: string}[]}[]}
   */
  var menuLoggedIn = [
    {
      label: 'User',
      iconClasses: 'fa fa-user',
      children: [
        {
          label: 'My events',
          iconClasses: 'fa fa-calendar-o',
          url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
        }
      ]
    }
  ];
  // Initialize the User menu (if the user is logged In)
  if ($scope.isLoggedIn)
  {
    $scope.menu = $scope.menu.concat(menuLoggedIn);
  }

  /**
   * Current main conference menu
   *
   * @TODO FORZA : TO RETHINK... ?
   *
   * @type {{label: string, iconClasses: string, children: *[]}[]}
   */
  var menuCurrentConference = [
    {
      label: 'Conference',
      iconClasses: 'fa fa-certificate',
      children: [
        {
          label: 'Overview',
          iconClasses: 'fa fa-th',
          children: [
            {
              label: 'Settings',
              iconClasses: 'fa fa-cogs',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            }
          ]
        },
        {
          label: 'Directory',
          iconClasses: 'fa fa-group',
          children: [
            {
              label: 'Organizations',
              iconClasses: 'fa fa-group',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            },
            {
              label: 'Persons',
              iconClasses: 'fa fa-user',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            }
          ]
        },
        {
          label: 'Resources',
          iconClasses: 'fa fa-folder-open',
          children: [
            {
              label: 'Publications',
              iconClasses: 'glyphicon glyphicon-book',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            }
          ]
        },
        {
          label: 'Schedule',
          iconClasses: 'fa fa-calendar',
          children: [
            {
              label: 'Events',
              html: '<span class="badge badge-indigo">4</span>', /** menu notification **/
              iconClasses: 'fa fa-clock-o',
              url: '#/calendar'
            },
            {
              label: 'Locations',
              iconClasses: 'fa fa-map-marker red',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            },
            {
              label: 'Categories',
              iconClasses: 'fa fa-tag',
              url: '#/' /** @TODO FORZA : TO ALIMENT WITH THE PROPER URL**/
            }
          ]
        }
      ]
    }
  ];
  // Initialize the User menu (if the user is logged In)
  if ($scope.isContextMainEvent)
  {
    $scope.menu = $scope.menu.concat(menuCurrentConference);
  }

  /**
   * Set hierarchy among the menu items
   *
   * @param children
   * @param parent
   */
  var setParent = function (children, parent)
  {
    angular.forEach(children, function (child)
    {
      child.parent = parent;
      if (child.children !== undefined)
      {
        setParent(child.children, child);
      }
    });
  };

  /**
   * Get the menu item from the url
   * Goal : set the correct left menu item selected whenever the user
   * change the current main page (or directly from the url)
   *
   * @param children
   * @param url
   * @returns {*} the item from the menu architecture
   */
  $scope.findItemByUrl = function (children, url)
  {
    for (var i = 0, length = children.length; i < length; i++)
    {
      if (children[i].url && children[i].url.replace('#', '') == url)
      {
        return children[i];
      }
      if (children[i].children !== undefined)
      {
        var item = $scope.findItemByUrl(children[i].children, url);
        if (item)
        {
          return item;
        }
      }
    }
  };

  /**
   * Set hierarchy for a menu item
   */
  setParent($scope.menu, null);

  /**
   * Default opened menus
   *
   * @type {Array}
   */
  $scope.openItems = [];
  /**
   * Default selected menu items
   *
   * @type {Array}
   */
  $scope.selectedItems = [];
  $scope.selectedFromNavMenu = false;

  /**
   * Action triggerred when an item is selected
   * @param item
   */
  $scope.select = function (item)
  {
    // close open nodes
    if (item.open)
    {
      item.open = false;
      return;
    }
    for (var i = $scope.openItems.length - 1; i >= 0; i--)
    {
      $scope.openItems[i].open = false;
    }
    $scope.openItems = [];
    var parentRef = item;
    while (parentRef !== null)
    {
      parentRef.open = true;
      $scope.openItems.push(parentRef);
      parentRef = parentRef.parent;
    }

    // handle leaf nodes
    if (!item.children || (item.children && item.children.length < 1))
    {
      $scope.selectedFromNavMenu = true;
      for (var j = $scope.selectedItems.length - 1; j >= 0; j--)
      {
        $scope.selectedItems[j].selected = false;
      }
      $scope.selectedItems = [];
      parentRef = item;
      while (parentRef !== null)
      {
        parentRef.selected = true;
        $scope.selectedItems.push(parentRef);
        parentRef = parentRef.parent;
      }
    }
  };

  /**
   * Event listener whenever the main frame is loaded
   */
  $scope.$watch(function ()
  {
    /**
     * Each time there is a change, the menu is actualize
     *
     * @TODO FORZA : TO RETHINK... ?
     */
    $scope.menu = basicMenu;
    // If the user is logged in
    if ($scope.isLoggedIn)
    {
      $scope.menu = $scope.menu.concat(menuLoggedIn);
    }
    // If there is a current conference
    if ($scope.isContextMainEvent)
    {
      $scope.menu = $scope.menu.concat(menuCurrentConference);
    }
    return $location.path();
  }, function (newVal, oldVal)
  {
    if ($scope.selectedFromNavMenu == false)
    {
      var item = $scope.findItemByUrl($scope.menu, newVal);
      if (item)
      {
        $timeout(function ()
        {
          $scope.select(item);
        });
      }
    }
    $scope.selectedFromNavMenu = false;
  });

  /**
   * Menu search form
   * @param $e
   */
  $scope.showSearchBar = function ($e)
  {
    $e.stopPropagation();
    $global.set('showSearchCollapsed', true);
  };
  $scope.$on('globalStyles:changed:showSearchCollapsed', function (event, newVal)
  {
    $scope.style_showSearchCollapsed = newVal;
  });

  /**
   * Action trigger when the user use the search form from the menu
   */
  $scope.goToSearch = function ()
  {
    $location.path('/extras-search')
  };
}]);











