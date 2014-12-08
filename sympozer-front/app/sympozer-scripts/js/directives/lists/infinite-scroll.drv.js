'use strict';


/**
 * ng-infinite-scroll - v1.0.0 - 2013-02-23
 *
 * @Description :
 * Directive which permit to dynamically load content on a page, as the user scroll down/up
 * @example :  <tbody infinite-scroll='load()' infinite-scroll-disabled='busy' infinite-scroll-distance='0.5'>
 * @param infinite-scroll, function to trigger when a scroll event is detected that match the scroll distance attribute (this function usually loads data from server)
 * @param infinite-scroll-disabled, boolean determining the state of the directive. True, scroll event can be listened, false, a request is pending, stop listen scroll event
 * @param infinite-scroll-distance, int, screen proportion from which a load request has to be sended. for instance, 0,5 means that if scrolling more than 50% of the screen is scrolled, a new request has to be sent.
 * @type {directive}
 */
angular.module('sympozerApp').directive('infiniteScroll', [
    '$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout)
    {
        return {

            link: function (scope, elem, attrs)
            {
                //Initialize values
                var checkWhenEnabled, handler, scrollDistance, scrollEnabled;

                $window = angular.element($window);

                //scroll distance from which a request has to be sent (default 0)
                scrollDistance = 0;
                if (attrs.infiniteScrollDistance != null)
                {
                    //Observing scroll distance value to update if needed
                    scope.$watch(attrs.infiniteScrollDistance, function (value)
                    {
                        //Update scrollDistance value
                        return scrollDistance = parseInt(value, 10);
                    });
                }


                scrollEnabled = true;
                checkWhenEnabled = false;

                //setting up scrollEnabled on infiniteScrollDisable changes
                if (attrs.infiniteScrollDisabled != null)
                {
                    //observing infinite scroll disabled value to update scroll enable internal variable
                    scope.$watch(attrs.infiniteScrollDisabled, function (value)
                    {
                        //Update scroll enable Value
                        scrollEnabled = !value;

                        if (scrollEnabled && checkWhenEnabled)
                        {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    });
                }


                /**
                 * Trigger load function ( attrs.infinite-scroll) when conditons are fullfilled :
                 * - scroll distance reached
                 * - scrollEnabled is true
                 */
                handler = function ()
                {
                    var elementBottom, remaining, shouldScroll, windowBottom;

                    //Store windows size
                    windowBottom = $window.height() + $window.scrollTop();

                    //Store infinite scroll element distance from windows top border
                    elementBottom = elem.offset().top + elem.height();

                    //Calculate difference between windows height and element current height
                    remaining = elementBottom - windowBottom;

                    //Check if the scroll distance has been reach
                    shouldScroll = remaining <= $window.height() * scrollDistance;

                    //If scroll distance reached and scroll enable, trigger the user specified inifinitScroll function
                    if (shouldScroll && scrollEnabled)
                    {
                        if ($rootScope.$$phase)
                        {
                            return scope.$eval(attrs.infiniteScroll);
                        }
                        else
                        {
                            return scope.$apply(attrs.infiniteScroll);
                        }
                    }
                    else if (shouldScroll)
                    {
                        return checkWhenEnabled = true;
                    }
                };

                //Listener on windows scroll event
                $window.on('scroll', handler);

                //Removing listener on directive dispose
                scope.$on('$destroy', function ()
                {
                    return $window.off('scroll', handler);
                });


                return $timeout((function ()
                {
                    if (attrs.infiniteScrollImmediateCheck)
                    {
                        if (scope.$eval(attrs.infiniteScrollImmediateCheck))
                        {
                            return handler();
                        }
                    }
                    else
                    {
                        return handler();
                    }
                }), 0);
            }
        };
    }
])
