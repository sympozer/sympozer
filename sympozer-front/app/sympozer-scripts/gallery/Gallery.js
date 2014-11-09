'use strict'

angular
  .module('theme.gallery', [])
  .controller('GalleryController', ['$scope', '$modal', '$timeout', function ($scope, $modal, $t) {
    $scope.galleryFilter = 'all';

    $scope.openImageModal = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      var modalInstance = $modal.open({
        templateUrl: 'imageModalContent.html',
        controller: ['$scope', '$modalInstance', 'src', function ($scope, $modalInstance, src) {
          $scope.src = src;
          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        }],
        size: 'lg',
        resolve: {
          src: function () {
            console.log($event.target.src.replace('thumb_', ''));
            return $event.target.src.replace('thmb_', '');
          }
        }
      });
    };
  }])
  .directive('gallery', function () {
    return {
      restrict: 'A',
      scope: {
        filterClass: '@filterClass',
        sortClass: '@sortClass'
      },
      link: function (scope, element, attr) {
        element.shuffle({ itemSelector: '.item' });

        $('.'+scope.filterClass).click(function (e) {
            e.preventDefault();
            $('.'+scope.filterClass).removeClass('active');
            $(this).addClass('active');
            var groupName = $(this).attr('data-group');
            element.shuffle('shuffle', groupName );
        });
        $('.'+scope.sortClass).click(function (e) {
          e.preventDefault();
          var opts = {
            reverse: $(this).data('order') == 'desc',
            by: function (el) {
              return el.data(el.data('data-sort'));
            }
          }
          $('.'+scope.sortClass).removeClass('active');
          $(this).addClass('active');
          element.shuffle('sort', opts);
        });
      }
    };
  })
