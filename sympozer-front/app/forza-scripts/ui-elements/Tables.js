'use strict'

angular
  .module('theme.ui-tables-basic', [])
  .controller('TablesBasicController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.data = {
      headings: ['#', 'First Name', 'Last Name', 'Username'],
      rows: [
        ['1', 'Mark', 'Otto', '@mdo'],
        ['2', 'Jacob', 'Thornton', '@fat'],
        ['3', 'Larry', 'the Bird', '@twitter']
      ]
    };
  }])
