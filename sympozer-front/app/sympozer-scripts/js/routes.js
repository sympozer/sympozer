'use strict';

/**
 * Main app module routing configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
/**
 * Man Sympozer angular application router from SYMPOZER
 */
//sympozerApp.config(['$routeProvider',
//  function ($routeProvider)
//  {
//    $routeProvider.
//      when('/dashboard/overview', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-overview.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/dashboard/schedule', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-schedule.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/dashboard/myspace', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-myspace.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/dashboard/directory', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-directory.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/dashboard/resources', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-resources.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/dashboard/widget', {
//        templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-widget.html',
//        controller: 'dashboardCtrl'
//      }).
//      when('/', {
//        templateUrl: globalConfig.app.urls.partials + 'home/home.html',
//        controller: 'homeCtrl'
//      }).
//      otherwise({
//        redirectTo: '/'
//      });
//  }
//]);



/**
 * Man Sympozer angular application router from FORZA
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

