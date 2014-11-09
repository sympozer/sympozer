'use strict'

angular
  .module('theme.ui-nestable', [])
  .controller('NestedTreeDemoController', ['$scope', function ($scope) {
    $scope.list = [{
      "id": 1,
      "title": "Write documentation",
      "items": []
    }, {
      "id": 2,
      "title": "Compile Code",
      "items": [{
        "id": 21,
        "title": "Upload Files to Server",
        "items": [{
          "id": 211,
          "title": "Call client",
          "items": []
        }, {
          "id": 212,
          "title": "Buy Milk",
          "items": []
        }],
      }, {
        "id": 22,
        "title": "Set up meeting with client",
        "items": []
      }],
    }, {
      "id": 3,
      "title": "Pay office rent and bills",
      "items": []
    }, {
      "id": 4,
      "title": "Read book",
      "items": []
    }];

    $scope.selectedItem = {};

    $scope.options = {
    	// levelThreshold: 300000,
    };

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.toggle = function(scope) {
      scope.toggle();
    };

    $scope.newSubItem = function(scope) {
      var nodeData = scope.$modelValue;
      nodeData.items.push({
        id: nodeData.id * 10 + nodeData.items.length,
        title: nodeData.title + '.' + (nodeData.items.length + 1),
        items: []
      });
    };
  }])
