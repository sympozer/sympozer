///**
// * Topics module configuration
// * route <--> template <--> controller
// *
// * @type {config}
// */
//angular.module('topicsApp')
//  .config(
//  ['$routeProvider',
//    function ($routeProvider)
//    {
//      $routeProvider
//        .when('/topics/list', {
//          templateUrl: globalConfig.app.modules.topics.urls.partials + 'topics-list.html',
//          controller: 'topicsListCtrl'
//        })
//        .when('/topics/thumbnail', {
//          templateUrl: globalConfig.app.modules.topics.urls.partials + 'topics-thumbnail.html',
//          controller: 'topicsListCtrl'
//        })
//        .when('/topics/new', {
//          templateUrl: globalConfig.app.modules.topics.urls.partials + 'topics-new.html',
//          controller: 'topicsNewCtrl'
//        })
//        .when('/topics/edit/:topicId', {
//          templateUrl: globalConfig.app.modules.topics.urls.partials + 'topics-edit.html',
//          controller: 'topicsEditCtrl'
//        })
//        .when('/topics/show/:topicId', {
//          templateUrl: globalConfig.app.modules.topics.urls.partials + 'topics-show.html',
//          controller: 'topicsShowCtrl'
//        })
//        .otherwise({
//          redirectTo: '/topics/list'
//        });
//    }
//  ]);