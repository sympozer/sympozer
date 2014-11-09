'use strict'

angular
  .module('theme.navigation-controller', [])
  .controller('NavigationController', ['$scope', '$location', '$timeout', '$global', function ($scope, $location, $timeout, $global) {
    $scope.menu = [
        {
            label: 'Dashboard',
            iconClasses: 'fa fa-home',
            url: '#/'
        },
        {
            label:"Apps",
            iconClasses:"fa fa-th-large",
            children: [
                {
                    label:"Tasks",
                    iconClasses:"fa fa-tasks",
                    url:"#/tasks"
                },
                {
                    label:"Chat",
                    iconClasses:"fa fa-comments-o",
                    url:"#/extras-chatroom"
                },
                {
                    label:"Calendar",
                    iconClasses:"fa fa-calendar",
                    url:"#/calendar"
                },
                {
                    label:"Gallery",
                    iconClasses:"fa fa-camera",
                    url:"#/gallery"
                }
            ]
        },
        {
            label: 'Layout Options',
            iconClasses: 'fa fa-cog',
            children: [
                {
                    label: 'Grids',
                    url: '#/layout-grid'
                },
                {
                    label: 'Horizontal Navigation',
                    url: '#/layout-horizontal'
                },
                {
                    label: 'Horizontal Navigation 2',
                    url: '#/layout-horizontal2'
                },
                {
                    label: 'Fixed Boxed Layout',
                    url: '#/layout-fixed'
                }
            ]
        },
        {
            label: 'UI Elements',
            iconClasses: 'fa fa-magic',
            html: '<span class="badge badge-indigo">4</span>',
            children: [
                {
                    label: 'Typography',
                    url: '#/ui-typography'
                },
                {
                    label: 'Buttons',
                    url: '#/ui-buttons'
                },
                {
                    label: 'Tables',
                    url: '#/tables-basic'
                },
                {
                    label: 'Forms',
                    url: '#/form-layout'
                },
                {
                    label: 'Panels',
                    url: '#/ui-panels'
                },
                {
                    label: 'Images',
                    url: '#/ui-images'
                },
            ]
        },
        {
            label: 'UI Components',
            iconClasses: 'fa fa-random',
            html: '<span class="badge badge-info">12</span>',
            children: [
                {
                    label: 'Tiles',
                    url: '#/ui-tiles'
                },
                {
                    label: 'Modals & Bootbox',
                    url: '#/ui-modals'
                },
                {
                    label: 'Progress Bars',
                    url: '#/ui-progressbars'
                },
                {
                    label: 'Pagers & Pagination',
                    url: '#/ui-paginations'
                },
                {
                    label: 'Breadcrumbs',
                    url: '#/ui-breadcrumbs'
                },
                {
                    label: 'Labels & Badges',
                    url: '#/ui-labelsbadges'
                },
                {
                    label: 'Alerts & Notifications',
                    url: '#/ui-alerts'
                },
                {
                    label: 'Sliders & Ranges',
                    url: '#/ui-sliders'
                },
                {
                    label: 'Ratings',
                    url: '#/ui-ratings'
                },
                {
                    label: 'Tabs & Accordions',
                    url: '#/ui-tabs'
                },
                {
                    label: 'Carousel',
                    url: '#/ui-carousel'
                },
                {
                    label: 'Nestable Lists',
                    url: '#/ui-nestable'
                },
                {
                    label: 'Wells',
                    url: '#/ui-wells'
                },
                {
                    label: 'Tour',
                    url: '#/ui-tour'
                }
            ]
        },
        {
            label: 'Advanced Tables',
            iconClasses: 'fa fa-table',
            children: [
                {
                    label: 'ngGrid',
                    url: '#/tables-data'
                },
                {
                    label: 'Responsive Tables',
                    url: '#/tables-responsive'
                },
                {
                    label: 'Editable Tables',
                    url: '#/tables-editable'
                }
            ]
        },
        {
            label: 'Advanced Forms',
            iconClasses: 'fa fa-pencil',
            html: '<span class="badge badge-primary">5</span>',
            children: [
                {
                    label: 'Components',
                    url: '#/form-components'
                },
                {
                    label: 'Wizards',
                    url: '#/form-wizard'
                },
                {
                    label: 'Validation',
                    url: '#/form-validation'
                },
                {
                    label: 'Masks',
                    url: '#/form-masks'
                },
                {
                    label: 'Multiple File Uploads',
                    url: '#/form-fileupload'
                },
                {
                    label: 'WYSIWYG Editor',
                    url: '#/form-ckeditor'
                },
                {
                    label: 'Inline Editor',
                    url: '#/form-xeditable'
                },
                {
                    label: 'Image Cropping',
                    url: '#/form-imagecrop'
                }
            ]
        },
        {
            label: 'Maps',
            iconClasses: 'fa fa-map-marker',
            children: [
                {
                    label: 'Google Maps',
                    url: '#/maps-google'
                },
                {
                    label: 'Vector Maps',
                    url: '#/maps-vector'
                }
            ]
        },
        {
            label: 'Charts',
            iconClasses: 'fa fa-bar-chart-o',
            children: [
                {
                    label: 'Extensible',
                    url: '#/charts-flot'
                },
                {
                    label: 'Interactive',
                    url: '#/charts-svg'
                },
                {
                    label: 'Lightweight',
                    url: '#/charts-canvas'
                },
                {
                    label: 'Inline',
                    url: '#/charts-inline'
                }
            ]
        },
        {
            label: 'Pages',
            iconClasses: 'fa fa-briefcase',
            html: '<span class="badge badge-danger">1</span>',
            children: [
                {
                    label: 'Timeline',
                    url: '#/extras-timeline'
                },
                {
                    label: 'Profile',
                    url: '#/extras-profile'
                },
                {
                    label: 'Inbox',
                    url: '#/extras-inbox'
                },
                {
                    label: 'Search Page',
                    url: '#/extras-search'
                },
                {
                    label: 'Registration',
                    url: '#/extras-registration'
                },
                {
                    label: 'Sign Up',
                    url: '#/extras-signupform'
                },
                {
                    label: 'Password Reset',
                    url: '#/extras-forgotpassword'
                },
                {
                    label: 'Login 1',
                    url: '#/extras-login'
                },
                {
                    label: 'Login 2',
                    url: '#/extras-login2'
                },
                {
                    label: '404 Page',
                    url: '#/extras-404'
                },
                {
                    label: '500 Page',
                    url: '#/extras-500'
                }
            ]
        },
        {
            label: 'Font Icons',
            iconClasses: 'fa fa-flag',
            html: '<span class="badge badge-orange">2</span>',
            children: [
                {
                    label: 'Font Awesome',
                    url: '#/icons-fontawesome'
                },
                {
                    label: 'Glyphicons',
                    url: '#/icons-glyphicons'
                }
            ]
        },
        {
            label: 'Unlimited Level Menu',
            iconClasses: 'fa fa-sitemap',
            hideOnHorizontal: true,
            children: [
                {
                    label: 'Menu Item 1'
                },
                {
                    label: 'Menu Item 2',
                    children: [
                        {
                            label: 'Menu Item 2.1'
                        },
                        {
                            label: 'Menu Item 2.1',
                            children : [
                                {
                                  label: 'Menu Item 2.1.1'
                                },
                                {
                                  label: 'Menu Item 2.1.2',
                                  children: [
                                      {
                                        label: 'And Deeper Yet!'
                                      }
                                  ]
                                }
                            ]
                        },
                    ]
                }
                
            ]
        }
    ];
    
    var setParent = function (children, parent) {
        angular.forEach(children, function (child) {
            child.parent = parent;
            if (child.children !== undefined) {
                setParent (child.children, child);
            }
        });
    };

    $scope.findItemByUrl = function (children, url) {
      for (var i = 0, length = children.length; i<length; i++) {
        if (children[i].url && children[i].url.replace('#', '') == url) return children[i];
        if (children[i].children !== undefined) {
          var item = $scope.findItemByUrl (children[i].children, url);
          if (item) return item;
        }
      }
    };
    
    setParent ($scope.menu, null);
    
    $scope.openItems = [];
    $scope.selectedItems = [];
    $scope.selectedFromNavMenu = false;
    
    $scope.select = function (item) {
        // close open nodes
        if (item.open) {
            item.open = false;
            return;
        }
        for (var i = $scope.openItems.length - 1; i >= 0; i--) {
            $scope.openItems[i].open = false;
        };
        $scope.openItems = [];
        var parentRef = item;
        while (parentRef !== null) {
            parentRef.open = true;
            $scope.openItems.push(parentRef);
            parentRef = parentRef.parent;
        }

        // handle leaf nodes
        if (!item.children || (item.children && item.children.length<1)) {
            $scope.selectedFromNavMenu = true;
            for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
                $scope.selectedItems[j].selected = false;
            };
            $scope.selectedItems = [];
            var parentRef = item;
            while (parentRef !== null) {
                parentRef.selected = true;
                $scope.selectedItems.push(parentRef);
                parentRef = parentRef.parent;
            }
        };
    };

    $scope.$watch(function () {
      return $location.path();
    }, function (newVal, oldVal) {
      if ($scope.selectedFromNavMenu == false) {
        var item = $scope.findItemByUrl ($scope.menu, newVal);
        if (item)
          $timeout (function () { $scope.select (item); });
      }
      $scope.selectedFromNavMenu = false;
    });

    // searchbar
    $scope.showSearchBar = function ($e) {
        $e.stopPropagation();
        $global.set('showSearchCollapsed', true);
    }
    $scope.$on('globalStyles:changed:showSearchCollapsed', function (event, newVal) {
      $scope.style_showSearchCollapsed = newVal;
    });
    $scope.goToSearch = function () {
        $location.path('/extras-search')
    };
  }])











