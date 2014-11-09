angular.module('theme.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/bs-modal.html',
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">I'm a modal!</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <ul>\n" +
    "        <li ng-repeat=\"item in items\">\n" +
    "            <a ng-click=\"selected.item = item\">{{ item }}</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    Selected: <b>{{ selected.item }}</b>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "    <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/contextual-progressbar.html',
    "<div class=\"contextual-progress\">\n" +
    "\t<div class=\"clearfix\">\n" +
    "\t\t<div class=\"progress-title\">{{heading}}</div>\n" +
    "\t\t<div class=\"progress-percentage\">{{percent | number:0}}%</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"progress\">\n" +
    "\t\t<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/nav_renderer.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\n" +
    "\t<i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\n" +
    "\t<span ng-bind-html=\"item.html\"></span>\n" +
    "</a>\n" +
    "<ul ng-if=\"item.children.length\" data-slide-out-nav=\"item.open\">\n" +
    "    <li ng-repeat=\"item in item.children\"\n" +
    "\t    ng-class=\"{ hasChild: (item.children!==undefined),\n" +
    "                      active: item.selected,\n" +
    "                        open: (item.children!==undefined) && item.open }\"\n" +
    "    \tng-include=\"'templates/nav_renderer.html'\"\n" +
    "    ></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('templates/nav_renderer_horizontal.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\n" +
    "  <i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\n" +
    "  <span ng-bind-html=\"item.html\"></span>\n" +
    "</a>\n" +
    "<ul ng-if=\"item.children.length\">\n" +
    "    <li ng-repeat=\"item in item.children\"\n" +
    "      ng-class=\"{ hasChild: (item.children!==undefined),\n" +
    "                      active: item.selected,\n" +
    "                        open: (item.children!==undefined) && item.open }\"\n" +
    "      ng-include=\"'templates/nav_renderer_horizontal.html'\"\n" +
    "    ></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('templates/panel-tabs-without-heading.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "        <h4>\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "        </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "            ng-repeat=\"tab in tabs\"\n" +
    "            ng-class=\"{active: tab.active}\"\n" +
    "            tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/panel-tabs.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "        <h4><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h4>\n" +
    "        <div class=\"options\">\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "            ng-repeat=\"tab in tabs\"\n" +
    "            ng-class=\"{active: tab.active}\"\n" +
    "            tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/panel.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "        <h4><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h4>\n" +
    "        <div class=\"options\">\n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\" ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/themed-tabs-bottom.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "        ng-repeat=\"tab in tabs\"\n" +
    "        ng-class=\"{active: tab.active}\"\n" +
    "        tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/themed-tabs.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "        ng-repeat=\"tab in tabs\"\n" +
    "        ng-class=\"{active: tab.active}\"\n" +
    "        tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/tile-generic.html',
    "<div class=\"info-tiles tiles-{{type}}\">\n" +
    "\t<div class=\"tiles-heading\">\n" +
    "\t\t{{heading}}\n" +
    "\t</div>\n" +
    "\t<div class=\"tiles-body\" ng-transclude>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/tile-large.html',
    "<a class=\"info-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\n" +
    "    <div class=\"tiles-heading\">\n" +
    "        <div class=\"pull-left\">{{item.title}}</div>\n" +
    "        <div class=\"pull-right\">{{item.titleBarInfo}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"tiles-body\">\n" +
    "        <div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\n" +
    "        <div class=\"pull-right\" ng-show=\"item.text\">{{item.text}}</div>\n" +
    "        <div class=\"pull-right\" ng-show=\"!item.text\" ng-transclude></div>\n" +
    "    </div>\n" +
    "</a>\n"
  );


  $templateCache.put('templates/tile-mini.html',
    "<a class=\"shortcut-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\n" +
    "\t<div class=\"tiles-body\">\n" +
    "\t\t<div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\n" +
    "\t\t<div class=\"pull-right\"><span class=\"badge\">{{item.titleBarInfo}}</span></div>\n" +
    "\t</div>\n" +
    "\t<div class=\"tiles-footer\">\n" +
    "\t\t{{item.text}}\n" +
    "\t</div>\n" +
    "</a>\n"
  );
}])