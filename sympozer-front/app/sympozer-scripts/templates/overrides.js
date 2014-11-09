'use strict'

angular.module('theme.template-overrides', [])
  .config(['$provide', function ($provide) {
    $provide.decorator('tabsetDirective', function($delegate) {
        $delegate[0].templateUrl = function (element, attr) {
          if (attr.tabPosition || attr.tabTheme) {
            if (attr.tabPosition && (attr.tabPosition == "'bottom'" || attr.tabPosition == "bottom"))
              return 'templates/themed-tabs-bottom.html';
            return 'templates/themed-tabs.html';
          } else if (attr.panelTabs && attr.heading !== undefined) {
            return 'templates/panel-tabs.html';
          } else if (attr.panelTabs && attr.heading == undefined) {
            return 'templates/panel-tabs-without-heading.html';
          } else {
            return 'templates/themed-tabs.html';
          }
        };

        angular.extend($delegate[0].scope, {
          heading: '@',
          panelClass: '@',
          panelIcon: '@',
          theme: '@tabTheme',
          position: '@tabPosition'
        });

        return $delegate;
    });
    $provide.decorator('progressbarDirective', function ($delegate) {
      $delegate[0].templateUrl = function (element, attr) {
        if (attr.contextual && attr.contextual == 'true') {
          return 'templates/contextual-progressbar.html';
        }

        return 'template/progressbar/progressbar.html';
      };

      angular.extend($delegate[0].scope, {
        heading: '@'
      });

      return $delegate;
    });
  }])
  .run(["$templateCache", function($templateCache) {
    $templateCache.put('footerTemplate.html',
      "<div ng-show=\"showFooter\" class=\"ng-grid-footer\" ng-style=\"footerStyle()\">\r" +
      "\n" +
      "    <div class=\"col-md-4\" >\r" +
      "\n" +
      "        <div class=\"ngFooterTotalItems\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\" >\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show=\"filterText.length > 0\" class=\"ngLabel\">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "        <div class=\"ngFooterSelectedItems\" ng-show=\"multiSelect\">\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "    </div>\r" +
      "\n" +
      "    <div class=\"col-md-4\" ng-show=\"enablePaging\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\">\r" +
      "\n" +
      "            <label class=\"control-label ng-grid-pages center-block\">{{i18n.ngPageSizeLabel}}\r" +
      "\n" +
      "               <select class=\"form-control input-sm\" ng-model=\"pagingOptions.pageSize\" >\r" +
      "\n" +
      "                      <option ng-repeat=\"size in pagingOptions.pageSizes\">{{size}}</option>\r" +
      "\n" +
      "                </select>\r" +
      "\n" +
          "        </label>\r" +
      "\n" +
          "</div>\r" +
      "\n" +
      // "<pagination total-items=\"totalFilteredItemsLength()\" ng-model=\"pagingOptions.currentPage\"></pagination>" +
      // "\n" +
      "     <div class=\"col-md-4\">\r" +
      "\n" +
      "        <div class=\"pull-right ng-grid-pagination\">\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToFirst()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerFirstTitle}}\"><i class=\"fa fa-angle-double-left\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageBackward()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerPrevTitle}}\"><i class=\"fa fa-angle-left\"></i></button>\r" +
      "\n" +
      "            <label class=\"control-label\">\r" +
      "\n" +
      "                   <input class=\"form-control input-sm\" min=\"1\" max=\"{{currentMaxPages}}\" type=\"number\" style=\"width:50px; height: 24px; margin-top: 1px; padding: 0 4px;\" ng-model=\"pagingOptions.currentPage\"/>\r" +
      "\n" +
      "            </label>\r" +
      "\n" +
      "            <span class=\"ngGridMaxPagesNumber\" ng-show=\"maxPages() > 0\">/ {{maxPages()}}</span>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageForward()\" ng-disabled=\"cantPageForward()\" title=\"{{i18n.ngPagerNextTitle}}\"><i class=\"fa fa-angle-right\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToLast()\" ng-disabled=\"cantPageToLast()\" title=\"{{i18n.ngPagerLastTitle}}\"><i class=\"fa fa-angle-double-right\"></i></button>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "     </div>\r" +
      "\n" +
      "</div>\r" +
      "\n"
    );

    $templateCache.put("template/rating/rating.html",
      "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
      "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\" ng-class=\"$index < value && (r.stateOn || 'fa-star') || (r.stateOff || 'fa-star-o')\">\n" +
      "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
      "    </i>\n" +
      "</span>");
  }])
