'use strict'

angular.module('theme.tasks', [])
  .controller('TasksController', ['$scope', function ($scope) {
    $scope.newTaskTitle = ''
    $scope.newTaskLabelText = '';
    $scope.showTasksTab = true;
    $scope.showCompletedTab = false;

    $scope.tasks = [{
      title: "Write documentation",
      label: 'Due tomorrow',
      color: 'success'
    }, {
      title: "Compile Code",
      label: "Today",
      color: 'danger'
    }, {
      title: "Upload Files to Server",
      label: '6 days',
      color: 'primary'
		}, {
      title: "Call client",
      label: 'Tomorrow',
      color: 'warning'
    }, {
      title: "Buy Milk",
      label: 'Today',
      color: 'danger'
    }, {
      title: "Set up meeting with client",
      label: 'Any day',
      color: 'inverse'
    }, {
	    title: "Pay office rent and bills",
      label: '5 days from now',
      color: 'success'
    }];

    $scope.tasksComplete = [];

    $scope.selectedItem = {};

    $scope.options = {
    };

    $scope.remove = function(scope) {
      scope.remove();
    };

    $scope.complete = function(scope, item) {
      $scope.tasksComplete.push(item);
      scope.remove();
    };

    $scope.incomplete = function(item, index) {
    	$scope.tasks.push(item);
      $scope.tasksComplete.splice(index, 1);
    };

    $scope.newItem = function (title, label, color) {
      if (this.newTaskTitle == '') return;
    	$scope.tasks.push({
    		title: title,
    		label: label,
    		color: color
    	});
    	this.newTaskTitle = '';
    	this.newTaskLabelText = '';
      this.showForm = false;
    };

    $scope.edit = function (item) {
      item.editing = true;
      item.titlePrev = item.title;
      item.labelPrev = item.label;
      item.colorPrev = item.color;
    };

    $scope.cancelEdit = function ($event, item) {
      if ($event.keyCode != 27) return;
      item.title = item.titlePrev;
      item.label = item.labelPrev;
      item.color = item.colorPrev;
      item.editing = false;
    };

    $scope.cancelAdd = function ($event) {
      if ($event.keyCode != 27) return;
      this.newTaskTitle = '';
      this.newTaskLabelText = '';
      this.showForm = false;
    };

    $scope.doneEditing = function (item) {
      item.editing = false;
    };
  }])