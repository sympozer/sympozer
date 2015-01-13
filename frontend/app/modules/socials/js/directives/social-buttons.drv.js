angular.module('socialsApp').
    directive('ngSocialFacebook', ['GLOBAL_CONFIG',
        function(GLOBAL_CONFIG) {
            'use strict';

            var options = {
                counter: {
                    url: 'http://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22' +
                        '&callback=JSON_CALLBACK',
                    getNumber: function(data) {
                        //return data.data[0].share_count;
                        return 0;
                    }
                },
                popup: {
                    //url: 'http://www.facebook.com/sharer/sharer.php?u={url}',
                    //url: 'http://www.facebook.com/sharer/sharer.php?p[url]={url}&p[images][0]={image}&p[title]={title}&p[summary]={description}&u={url}',
                    url: 'https://www.facebook.com/dialog/feed?app_id=87741124305&link={url}&name={title}&description={description}&redirect_uri=https://www.facebook.com/login.php',
                    width: 600,
                    height: 500
                },
                track: {
                    'name': 'facebook',
                    'action': 'share'
                }
            };

            return {
                restrict: 'C',
                require: '^?ngSocialButtons',
                scope: true,
                replace: true,
                transclude: true,
                template: '<li>' +
                    '<a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)"' +
                    ' class="ng-social-button">' +
                    '<span class="ng-social-icon">' +
                    '<img class="ng-social-icon" src="'+GLOBAL_CONFIG.app.urls.img+'Facebook.png "/>' +
                    '</span>' +
                    '<span class="ng-social-text" ng-transclude></span>' +
                    '</a>' +
                    '<span ng-show="count" class="ng-social-counter">{{ count }}</span>' +
                    '</li>',
                link: function(scope, element, attrs, ctrl) {
                    element.addClass('ng-social-facebook');
                    if (!ctrl) {
                        return;
                    }
                    scope.options = options;
                    scope.ctrl = ctrl;
                    ctrl.init(scope, element, options);
                }
            };
        }]);


angular.module('socialsApp').
    directive('ngSocialGooglePlus', ['$parse','GLOBAL_CONFIG',
        function($parse, GLOBAL_CONFIG) {
            'use strict';

            var protocol = location.protocol === 'https:' ? 'https:' : 'http:',
                options = {
                    counter: {
                        url: protocol === 'http:' ? 'http://share.yandex.ru/gpp.xml?url={url}' : undefined,
                        getNumber: function(data) {
                            return data.count;
                        },
                        get: function(jsonUrl, deferred, $http) {
                            if (options._) {
                                deferred.reject();
                                return;
                            }

                            if (!window.services) window.services = {};
                            window.services.gplus = {
                                cb: function(number) {
                                    options._.resolve(number);
                                }
                            };

                            options._ = deferred;
                            $http.jsonp(jsonUrl);
                        }
                    },
                    popup: {
                        //url: 'https://plus.google.com/share?url={url}',
                        url: 'https://plus.google.com/share?url={url}',
                        width: 700,
                        height: 500
                    },
                    track: {
                        'name': 'Google+',
                        'action': 'share'
                    }
                };
            return {
                restrict: 'C',
                require: '^?ngSocialButtons',
                scope: true,
                replace: true,
                transclude: true,

                template: '<li>'+
                    '<a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">' +
                    '<span class="ng-social-icon">'+
                    '<img class="ng-social-icon" src="'+GLOBAL_CONFIG.app.urls.img+'GooglePlus.png "/>'+
                    '</span>'+
                    '<span class="ng-social-text" ng-transclude></span>'+
                    '</a>'+
                    '<span ng-show="count" class="ng-social-counter">{{ count }}</span>'+
                    '</li>',
                link: function(scope, element, attrs, ctrl) {
                    element.addClass('ng-social-google-plus');
                    if (!ctrl) {
                        return;
                    }
                    scope.options = options;
                    scope.ctrl = ctrl;
                    ctrl.init(scope, element, options);
                }
            };
        }]);


angular.module('socialsApp').
    directive('ngSocialLinkedin',['GLOBAL_CONFIG',
        function(GLOBAL_CONFIG) {
            'use strict';

            var options = {
                counter: {
                    url: 'http://www.linkedin.com/countserv/count/share?url={url}&callback=JSON_CALLBACK&format=jsonp',
                    getNumber: function(data) {
                        //return data.count;
                        return 0;
                    }
                },
                popup: {
                    //https://www.linkedin.com/shareArticle?title=Linkdin+Share&summary=testing+Linkdin+Share&mini=true&url=http%3A%2F%2Fwww%2Egoogle%2Ecom%2Eau
                    url: 'https://www.linkedin.com/shareArticle?title={title}&summary={description}&source={}&mini=true&url={url}',
                    width: 600,
                    height: 500
                },
                track: {
                    'name': 'Linkedin',
                    'action': 'share'
                }
            };
            return {
                restrict: 'C',
                require: '^?ngSocialButtons',
                scope: true,
                replace: true,
                transclude: true,
                template: '<li>' +
                    '<a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)"' +
                    ' class="ng-social-button">' +
                    '<span class="ng-social-icon">' +
                    '<img class="ng-social-icon" src="'+GLOBAL_CONFIG.app.urls.img+'Linkedin.png"/>' +
                    '</span>' +
                    '<span class="ng-social-text" ng-transclude></span>' +
                    '</a>' +
                    '<span ng-show="count" class="ng-social-counter">{{ count }}</span>' +
                    '</li>',
                link: function(scope, element, attrs, ctrl) {
                    element.addClass('ng-social-linkedin');
                    if (!ctrl) {
                        return;
                    }
                    scope.options = options;
                    scope.ctrl = ctrl;
                    ctrl.init(scope, element, options);
                }
            };
        }]);

angular.module('socialsApp').
    directive('ngSocialTwitter', ['GLOBAL_CONFIG',
        function(GLOBAL_CONFIG) {
            'use strict';

            var options = {
                counter: {
                    url: 'http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK',
                    getNumber: function(data) {
                        return data.count;
                    }
                },
                popup: {
                    url: 'http://twitter.com/intent/tweet?url={url}&text={title}',
                    width: 600,
                    height: 450
                },
                click: function(options) {
                    // Add colon to improve readability
                    if (!/[\.:\-–—]\s*$/.test(options.pageTitle)) options.pageTitle += ':';
                    return true;
                },
                track: {
                    'name': 'twitter',
                    'action': 'tweet'
                }
            };
            return {
                restrict: 'C',
                require: '^?ngSocialButtons',
                scope: true,
                replace: true,
                transclude: true,
                template: '<li>'+
                    '<a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="ng-social-button">' +
                    '<span class="ng-social-icon">' +
                    '<img class="ng-social-icon" src="'+GLOBAL_CONFIG.app.urls.img+'Twitter.png"/>' +
                    '</span>' +
                    '<span class="ng-social-text" ng-transclude></span>' +
                    '</a>'+
                    '<span ng-show="count" class="ng-social-counter">{{ count }}</span>' +
                    '</li>',
                controller: function($scope) {
                },
                link: function(scope, element, attrs, ctrl) {
                    element.addClass('ng-social-twitter');
                    if (!ctrl) {
                        return;
                    }
                    scope.options = options;
                    scope.ctrl = ctrl;
                    ctrl.init(scope, element, options);
                }
            }
        }]);