'use strict'

angular
  .module('theme.form-inline', [])
  .controller('InlineEditableController', ['$scope', '$filter', '$http', '$timeout', function ($scope, $filter, $http, $timeout) {
    $scope.user = {
      name: 'awesome user',
      status: 2,
      group: 4,
      groupName: 'admin',
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null,
      desc: 'Awesome user \ndescription!',
      remember: true,
      dob: new Date(1984, 4, 15),
      timebs: new Date(1984, 4, 15, 19, 20),
    };  
    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ]; 

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.groups = [
      {id: 1, text: 'MVP'},
      {id: 2, text: 'VIP'},
      {id: 3, text: 'ADMIN'},
      {id: 4, text: 'USER'}
    ]; 

    $scope.$watch('user.group', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
        $scope.user.groupName = selected.length ? selected[0].text : null;
      }
    });
  }])
