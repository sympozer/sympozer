'use strict';

/**
 * Sympozer Breadcrump module (or also called 'fil d'ariane')
 */
var breadcrumbModule = angular.module('sympozer.breadcrumb-controller', []);

/**
 * Breadcrump controller
 */
breadcrumbModule.controller('breadcrumbController', ['$scope', '$location', function ($scope, $location)
{
  /**
   * Definitions for breadcrump
   *
   * idUrl: mandatory, must correspond to the sub url of the current page
   * label: mandatory, the label to show on the breadcrump
   * url: optional, the url where to go when the user click on it
   * children: the children node (must know all routes of the next subUrl)
   *
   * @type {{idUrl: string, label: string, url: string, children: {idUrl: string, label: string, children: {idUrl: string, label: string}[]}[]}[]}
   */
  var breadcrumpDefinitions = [
    {
      idUrl: 'modules',
      label: 'Home',
      url: '#/',
      children: [
        {
          idUrl: 'events',
          label: 'Events',
          children: [
            {
              idUrl: 'index',
              label: 'Index'
            }
          ]
        }
      ]
    }
  ];

  /**
   * Find an item in an items array
   *
   * @param items A list of items
   * @param itemId The item to look for
   * @returns {*}
   */
  var findItem = function (items, itemId)
  {
    if (items !== undefined)
    {
      for (var i = 0, length = items.length; i < length; i++)
      {
        if (itemId === items[i].idUrl)
        {
          return items[i];
        }
      }
      console.log('[ERROR] - Breadcrumb.js : \n   children node \'' + itemId + '\' does not exist.\n   The parent node must contains a correct id child.');
      return null;
    }
    else
    {
      console.log('[ERROR] - Breadcrumb.js : \n   parent node for itemId \'' + itemId + '\' undefined.\n   Maybe you forgot to define a children node ?')
    }
    return null;
  };

  /**
   * Return an array containing the breadcrump to show
   *
   * @returns {Array}
   */
  var getCurrentBreadcrump = function ()
  {
    // Getting the current url...
    var currentPath = $location.path();
    // ...Removing the first '/'...
    currentPath = currentPath.substr(1);
    // ...Splitting each subroutes...
    var arrayPath = currentPath.split('/');
    // ...and for each sub paths
    var subPath = null;
    var breadcrumpArray = [];
    var isLastSubpath = false;
    var tempArray = breadcrumpDefinitions;
    for (var i = 0; i < arrayPath.length; i++)
    {
      // If it's the last subpath
      if (i === (arrayPath.length - 1))
      {
        isLastSubpath = true;
      }
      subPath = arrayPath[i];
      tempArray = findItem(tempArray, subPath);
      if (tempArray != null)
      {
        // For each element, we add the item to the breadcrump line
        breadcrumpArray = breadcrumpArray.concat([
          {
            label: tempArray.label,
            url: (tempArray.url !== undefined) ? tempArray.url : false,
            isActive: isLastSubpath ? 'active' : ''
          }
        ]);
        tempArray = tempArray.children;
      }
      else
      {
        // If an error occured, we stop the process
        i = arrayPath.length;
      }
    }
    return breadcrumpArray;
  };

  $scope.breadcrumpArray = getCurrentBreadcrump();
}]);











