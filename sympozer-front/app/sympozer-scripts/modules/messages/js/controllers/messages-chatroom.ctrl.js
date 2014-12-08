'use strict';


/**
 * Messages controller
 */
angular.module('messagesApp').controller('messagesChatroomCtrl', ['$scope', '$filter', function ($scope, $filter)
{
//    var eliza = new ElizaBot();
    var avatars = ['potter.png', 'tennant.png', 'johansson.png', 'jackson.png', 'jobs.png'];
    $scope.messages = [];
    $scope.userText = '';
    $scope.elizaTyping = false;
    $scope.elizaAvatar = 'johansson.png';

    $scope.sendMessage = function (msg)
    {
        var im = {
            class: 'me',
            avatar: 'jackson.png',
            text: msg
        };
        this.messages.push(im);
        this.userText = '';

//        $t(function ()
//        {
//            $scope.elizaAvatar = _.shuffle(avatars).shift();
//            $scope.elizaTyping = true;
//        }, 500);
//
//        $t(function ()
//        {
////            var reply = eliza.transform(msg)
//            var im = {
//                class: 'chat-success',
//                avatar: $scope.elizaAvatar,
//                text: reply
//            };
//            $scope.elizaTyping = false;
//            $scope.messages.push(im);
//        }, 1200)
    };
}])
