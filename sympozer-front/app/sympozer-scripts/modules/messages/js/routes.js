/**
 * Events module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('messagesApp').config([ '$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/messages/inbox', {
            templateUrl: globalConfig.app.modules.messages.urls.partials + 'pages/messages-inbox.html',
            controller : 'messagesInboxCtrl'
        })
        .when('/messages/chatroom', {
            templateUrl: globalConfig.app.modules.messages.urls.partials + 'pages/messages-chatroom.html',
            controller : 'messagesChatroomCtrl'
        })
        .otherwise({
            redirectTo: '/messages'
        });
}
]);