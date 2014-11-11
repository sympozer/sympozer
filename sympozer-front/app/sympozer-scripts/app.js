'use strict';

/**
 * Main Sympozer Angular app depedencies
 */
var sympozerApp = angular.module('sympozerApp', [
  'easypiechart',
  'toggle-switch',
  'ui.bootstrap',
  'ui.tree',
  'ui.select2',
  'ngGrid',
  'xeditable',
  'flow',
  'theme.services',
  'theme.directives',
  'theme.navigation-controller',
  'theme.notifications-controller',
  'theme.messages-controller',
  'theme.colorpicker-controller',
  'theme.layout-horizontal',
  'theme.layout-boxed',
  'theme.vector_maps',
  'theme.google_maps',
  'theme.calendars',
  'theme.gallery',
  'theme.tasks',
  'theme.ui-tables-basic',
  'theme.ui-panels',
  'theme.ui-ratings',
  'theme.ui-modals',
  'theme.ui-tiles',
  'theme.ui-alerts',
  'theme.ui-sliders',
  'theme.ui-progressbars',
  'theme.ui-paginations',
  'theme.ui-carousel',
  'theme.ui-tabs',
  'theme.ui-nestable',
  'theme.form-components',
  'theme.form-directives',
  'theme.form-validation',
  'theme.form-inline',
  'theme.form-image-crop',
  'theme.form-uploads',
  'theme.tables-ng-grid',
  'theme.tables-editable',
  'theme.charts-flot',
  'theme.charts-canvas',
  'theme.charts-svg',
  'theme.charts-inline',
  'theme.pages-controllers',
  'theme.dashboard',
  'theme.templates',
  'theme.template-overrides',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  /** SYMPOZER GLOBAL CONTROLLERS **/
  'sympozer.breadcrumb-controller'
]);

/**
 * Main Sympozer Angular app controller
 */
sympozerApp.controller('MainController', ['$scope', '$global', '$timeout', 'progressLoader', '$location', function ($scope, $global, $timeout, progressLoader, $location)
{
  /**
   * Getting main html attribute configurations
   */
  $scope.style_fixedHeader = $global.get('fixedHeader');
  $scope.style_headerBarHidden = $global.get('headerBarHidden');
  $scope.style_layoutBoxed = $global.get('layoutBoxed');
  $scope.style_fullscreen = $global.get('fullscreen');
  $scope.style_leftbarCollapsed = $global.get('leftbarCollapsed');
  $scope.style_leftbarShown = $global.get('leftbarShown');
  $scope.style_rightbarCollapsed = $global.get('rightbarCollapsed');
  $scope.style_isSmallScreen = false;
  $scope.style_showSearchCollapsed = $global.get('showSearchCollapsed');
  $scope.style_layoutHorizontal = $global.get('layoutHorizontal');

  /**
   * Action that hide the search bar
   */
  $scope.hideSearchBar = function ()
  {
    $global.set('showSearchCollapsed', false);
  };

  /**
   * Action that hide the header bar
   */
  $scope.hideHeaderBar = function ()
  {
    $global.set('headerBarHidden', true);
  };

  /**
   * Action that show the header bar
   */
  $scope.showHeaderBar = function ($event)
  {
    $event.stopPropagation();
    $global.set('headerBarHidden', false);
  };

  /**
   * Action that toggle the left menu bar
   */
  $scope.toggleLeftBar = function ()
  {
    if ($scope.style_isSmallScreen)
    {
      return $global.set('leftbarShown', !$scope.style_leftbarShown);
    }
    $global.set('leftbarCollapsed', !$scope.style_leftbarCollapsed);
  };

  /**
   * Action that toggle the right bar
   */
  $scope.toggleRightBar = function ()
  {
    $global.set('rightbarCollapsed', !$scope.style_rightbarCollapsed);
  };

  /**
   * Event triggered whenever a global change of layout append
   * (usually when the user click somewhere on the app)
   */
  $scope.$on('globalStyles:changed', function (event, newVal)
  {
    $scope['style_' + newVal.key] = newVal.value;
  });
  $scope.$on('globalStyles:maxWidth767', function (event, newVal)
  {
    $timeout(function ()
    {
      $scope.style_isSmallScreen = newVal;
      if (!newVal)
      {
        $global.set('leftbarShown', false);
      }
      else
      {
        $global.set('leftbarCollapsed', false);
      }
    });
  });

  // there are better ways to do this, e.g. using a dedicated service
  // but for the purposes of this demo this will do :P
  $scope.isLoggedIn = true;
  $scope.logOut = function ()
  {
    $scope.isLoggedIn = false;
  };
  $scope.logIn = function ()
  {
    $scope.isLoggedIn = true;
  };

  // there are better ways to do this, e.g. using a dedicated service
  // but for the purposes of this demo this will do :P
  $scope.isContextMainEvent = true;
  $scope.setContextMainEventOn = function ()
  {
    $scope.isContextMainEvent = true;
  };
  $scope.setContextMainEventOff = function ()
  {
    $scope.isContextConference = false;
  };


  /**
   * Specify if the right accordeon show only one element at a time of severals
   * @type {boolean}
   */
  $scope.rightbarAccordionsShowOne = false;
  /**
   * Specify wich accordeons have to be open when the page is loaded
   * @type {{open: boolean}[]}
   */
  $scope.rightbarAccordions = [
    {open: true},
    {open: true},
    {open: true},
    {open: true},
    {open: true},
    {open: true},
    {open: true}
  ];

  /**
   * Progress Bar configuration
   */
  $scope.$on('$routeChangeStart', function (e)
  {
    // console.log('start: ', $location.path());
    progressLoader.start();
    progressLoader.set(50);
  });
  $scope.$on('$routeChangeSuccess', function (e)
  {
    // console.log('success: ', $location.path());
    progressLoader.end();
  });
}]);

/**
 * Man Sympozer angular application router
 */
sympozerApp.config(['$provide', '$routeProvider', function ($provide, $routeProvider)
{
  $routeProvider
    .when('/', {
      /**
       * MAIN PAGE
       * @TODO FORZA : TO TRANSFORM
       */
      templateUrl: 'views/forza-views/index.html'
    })
    .when('/calendar', {
      /**
       * CALENDAR VIEW
       * @TODO FORZA : TO TRANSFORM
       */
      templateUrl: 'views/forza-views/calendar.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'common-assets/plugins/fullcalendar/fullcalendar.js'
          ]);
        }]
      }
    })
    .when('/form-ckeditor', {
      /**
       * CKEDITOR VIEW (The web embedded editor)
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/form-ckeditor.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'common-assets/plugins/form-ckeditor/ckeditor.js',
            'common-assets/plugins/form-ckeditor/lang/en.js'
          ]);
        }]
      }
    })
    .when('/form-imagecrop', {
      /**
       * IMAGE CROPPER TOOL VIEW
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/form-imagecrop.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'common-assets/plugins/jcrop/js/jquery.Jcrop.js'
          ]);
        }]
      }
    })
    .when('/form-wizard', {
      /**
       * WIZARD VIEW
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/form-wizard.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'bower/jquery-validation/dist/jquery.validate.js',
            'bower/stepy/lib/jquery.stepy.js'
          ]);
        }]
      }
    })
    .when('/form-masks', {
      /**
       * ESPECIALIZED MASKS VIEW
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/form-masks.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'bower/jquery.inputmask/dist/jquery.inputmask.bundle.js'
          ]);
        }]
      }
    })
    .when('/maps-vector', {
      /**
       * VECTOR MAPS VIEW
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/maps-vector.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'bower/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
            'bower/jqvmap/jqvmap/maps/jquery.vmap.usa.js'
          ]);
        }]
      }
    })
    .when('/charts-canvas', {
      /**
       * CHARTS CANVAS VIEW
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/charts-canvas.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'bower/Chart.js/Chart.min.js'
          ]);
        }]
      }
    })
    .when('/charts-svg', {
      /**
       * CHARTS SVG VIEW (simpler charts)
       * @TODO FORZA : TO DELETE
       */
      templateUrl: 'views/forza-views/charts-svg.html',
      resolve: {
        lazyLoad: ['lazyLoad', function (lazyLoad)
        {
          return lazyLoad.load([
            'bower/raphael/raphael.js',
            'bower/morris.js/morris.js'
          ]);
        }]
      }
    })
    .when('/modules/:module/:file', {
      templateUrl: function (param)
      {
        /**
         * REDIRECTION TO A SPECIFIC SYMPOZER MODULE
         */
        return 'views/modules/' + param.module + '/' + param.file + '.html'
      }
    })
    .when('/:templateFile', {
      templateUrl: function (param)
      {
        /**
         * REDIRECTION TO A SPECIFIC TEMPLATE
         */
        return 'views/forza-views/' + param.templateFile + '.html'
      }
    })
    .otherwise({
      /**
       * IF UNKNOWN ROUTE : redirection to the main page (see above)
       */
      redirectTo: '/'
    });
}]);
