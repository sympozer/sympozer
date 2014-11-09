'use strict';

/**
 * Main sympozer angular app
 */
angular.module('sympozerApp', [
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
  ])
  .controller('MainController', ['$scope', '$global', '$timeout', 'progressLoader', '$location', function ($scope, $global, $timeout, progressLoader, $location) {
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

    $scope.hideSearchBar = function () {
        $global.set('showSearchCollapsed', false);
    };

    $scope.hideHeaderBar = function () {
        $global.set('headerBarHidden', true);
    };

    $scope.showHeaderBar = function ($event) {
      $event.stopPropagation();
      $global.set('headerBarHidden', false);
    };

    $scope.toggleLeftBar = function () {
      if ($scope.style_isSmallScreen) {
        return $global.set('leftbarShown', !$scope.style_leftbarShown);
      }
      $global.set('leftbarCollapsed', !$scope.style_leftbarCollapsed);
    };

    $scope.toggleRightBar = function () {
      $global.set('rightbarCollapsed', !$scope.style_rightbarCollapsed);
    };

    $scope.$on('globalStyles:changed', function (event, newVal) {
      $scope['style_'+newVal.key] = newVal.value;
    });
    $scope.$on('globalStyles:maxWidth767', function (event, newVal) {
      $timeout( function () {      
        $scope.style_isSmallScreen = newVal;
        if (!newVal) {
          $global.set('leftbarShown', false);
        } else {
          $global.set('leftbarCollapsed', false);
        }
      });
    });

    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do :P
    $scope.isLoggedIn = true;
    $scope.logOut = function () {
      $scope.isLoggedIn = false;
    };
    $scope.logIn = function () {
      $scope.isLoggedIn = true;
    };

    $scope.rightbarAccordionsShowOne = false;
    $scope.rightbarAccordions = [{open:true},{open:true},{open:true},{open:true},{open:true},{open:true},{open:true}];

    $scope.$on('$routeChangeStart', function (e) {
      // console.log('start: ', $location.path());
      progressLoader.start();
      progressLoader.set(50);
    });
    $scope.$on('$routeChangeSuccess', function (e) {
      // console.log('success: ', $location.path());
      progressLoader.end();
    });
  }])
  .config(['$provide', '$routeProvider', function ($provide, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'forza-views/index.html',
      })
      .when('/calendar', {
        templateUrl: 'forza-views/calendar.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'common-assets/plugins/fullcalendar/fullcalendar.js'
            ]);
          }]
        }
      })
      .when('/form-ckeditor', {
        templateUrl: 'forza-views/form-ckeditor.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'common-assets/plugins/form-ckeditor/ckeditor.js',
              'common-assets/plugins/form-ckeditor/lang/en.js'
            ]);
          }]
        }
      })
      .when('/form-imagecrop', {
        templateUrl: 'forza-views/form-imagecrop.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'common-assets/plugins/jcrop/js/jquery.Jcrop.js'
            ]);
          }]
        }
      })
      .when('/form-wizard', {
        templateUrl: 'forza-views/form-wizard.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'bower/jquery-validation/dist/jquery.validate.js',
              'bower/stepy/lib/jquery.stepy.js'
            ]);
          }]
        }
      })
      .when('/form-masks', {
        templateUrl: 'forza-views/form-masks.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'bower/jquery.inputmask/dist/jquery.inputmask.bundle.js'
            ]);
          }]
        }
      })
      .when('/maps-vector', {
        templateUrl: 'forza-views/maps-vector.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'bower/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
              'bower/jqvmap/jqvmap/maps/jquery.vmap.usa.js'
            ]);
          }]
        }
      })
      .when('/charts-canvas', {
        templateUrl: 'forza-views/charts-canvas.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'bower/Chart.js/Chart.min.js'
            ]);
          }]
        }
      })
      .when('/charts-svg', {
        templateUrl: 'forza-views/charts-svg.html',
        resolve: {
          lazyLoad: ['lazyLoad', function (lazyLoad) {
            return lazyLoad.load([
              'bower/raphael/raphael.js',
              'bower/morris.js/morris.js'
            ]);
          }]
        }
      })
      .when('/:templateFile', {
        templateUrl: function (param) { return 'forza-views/'+param.templateFile+'.html' }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
