'use strict'

angular
  .module('theme.ui-tiles', [])
  .controller('TilesController', ['$scope', '$global', function ($scope, $global) {
    $scope.$global = $global;

    $scope.largeTiles = [
      { title: 'Page Views', titleBarInfo: '-7.6%', text: '1.6K', color: 'info', classes: 'fa fa-eye' },
      { title: 'Likes', titleBarInfo: '+15.4%', text: '345', color: 'orange', classes: 'fa fa-thumbs-o-up' },
      { title: 'Bugs Fixed', titleBarInfo: '+10.4%', text: '21', color: 'danger', classes: 'fa fa-check-square' },
      { title: 'New Members', titleBarInfo: '+25.4%', text: '124', color: 'midnightblue', classes: 'fa fa-group' },
      { title: 'Gifts', titleBarInfo: '+15.4%', text: '16', color: 'purple', classes: 'fa fa-gift' },
      { title: 'Profits', titleBarInfo: '+17.4%', text: '$2.5k', color: 'success', classes: 'fa fa-money' },
      { title: 'Sales Revenue', titleBarInfo: '+24.4%', text: '$30.2k', color: 'primary', classes: 'fa fa-shopping-cart' },
      { title: 'New Orders', titleBarInfo: '+15.4%', text: '679', color: 'indigo', classes: 'fa fa-comments' },
      { title: 'Comments', titleBarInfo: '+22.4%', text: '32', color: 'green', classes: 'fa fa-comments' },
      { title: 'Downloads', titleBarInfo: '+16.4%', text: '6.7K', color: 'danger', classes: 'fa fa-download' },
      { title: 'Tasks', titleBarInfo: '+26.4%', text: '17', color: 'magenta', classes: 'fa fa-tasks' },
      { title: 'Videos', titleBarInfo: '+6.4%', text: '31', color: 'inverse', classes: 'fa fa-video-camera' }
    ];
    $scope.miniTiles = [


      { text: 'Page Views', titleBarInfo: '7', color: 'info', classes: 'fa fa-eye' },
      { text: 'Likes', titleBarInfo: '15', color: 'orange', classes: 'fa fa-thumbs-o-up' },
      { text: 'Bugs Fixed', titleBarInfo: '+10', color: 'danger', classes: 'fa fa-check-square' },
      { text: 'New Members', titleBarInfo: '+25', color: 'midnightblue', classes: 'fa fa-group' },
      { text: 'Gifts', titleBarInfo: '15', color: 'purple', classes: 'fa fa-gift' },
      { text: 'Profits', titleBarInfo: '17', color: 'success', classes: 'fa fa-money' },
      { text: 'Sales Revenue', titleBarInfo: '24', color: 'primary', classes: 'fa fa-shopping-cart' },
      { text: 'New Orders', titleBarInfo: '15', color: 'indigo', classes: 'fa fa-comments' },
      { text: 'Comments', titleBarInfo: '22', color: 'green', classes: 'fa fa-comments' },
      { text: 'Downloads', titleBarInfo: '16', color: 'danger', classes: 'fa fa-download' },
      { text: 'Tasks', titleBarInfo: '26', color: 'magenta', classes: 'fa fa-tasks' },
      { text: 'Videos', titleBarInfo: '4', color: 'inverse', classes: 'fa fa-video-camera' }

    ];
  }])
