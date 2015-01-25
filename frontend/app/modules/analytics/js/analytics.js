/**
 * Analytics module configuration / directives / interceptor
 *
 * TODO: Type RDF pour l'interceptor Interceptor
 *
 */
angular.module('analyticsApp')
    // Configuration créant une session le service d'analyse d'audience
    .config([
        '$provide', '$httpProvider',
        function ($provide, $httpProvider)
        {
            // Code à remplacer si on souhaite changer de service d'analyse d'audience
            // Création de la session Google Analytics
            (function (i, s, o, g, r, a, m)
            {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function ()
                {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

            ga('create', gaToken, 'auto');
            //--------------------------------------------------------------------------

            // Ajout de l'intercepteur AJAX de Analytics
            $httpProvider.interceptors.push('AJAXInterceptor');
        }])
    .run(function ($analytics)
    {
        // Ajout au DOM de l'EventListener permettant d'envoyer des informations à GoogleAnalytics
        $(document).on("AnalyticsEvent", function (event, category, action, label)
        {
            $analytics.eventTrack(action, {  category: category, label: label });
            //console.log("AnalyticsEvent: " + category + "; " + action + "; " + label);
        });
    })
    // Directive "trackUiClick" permettant de tracker les clics sur l'élément attaché
    .directive('trackUiClick', function ($analytics)
    {
        return function link($scope, $elem, attrs)
        {
            $elem.on("click", function ()
            {
                $analytics.eventTrack('Click [path="' + getElementPath($elem) + '"]', {  category: 'UserInteraction', label: attrs.trackUiClick });
                //console.log("UserInteraction: Click; " + attrs.trackUiClick);
            });
        }
    })
    // Directive "trackUiChange" permettant de tracker les modifications de l'élément (<input>, <textarea>, ...) lié
    .directive('trackUiChange', function ($analytics)
    {
        return function link($scope, $elem, attrs)
        {
            $elem.on("change", function ()
            {
                $analytics.eventTrack('Change [path="' + getElementPath($elem) + '"][value="' + $elem.val() + '"]', {  category: 'UserInteraction', label: attrs.trackUiChange });
                //console.log("UserInteraction: Change; " + attrs.trackUiChange);
            });
        }
    })
    // Directive "trackUiHover" permettant de tracker les moments oû l'élément lié est survolé
    .directive('trackUiHover', function ($analytics)
    {
        return function link($scope, $elem, attrs)
        {
            $elem.hover(function ()
            {
                $analytics.eventTrack('Hover [path="' + getElementPath($elem) + '"]', {  category: 'UserInteraction', label: attrs.trackUiHover });
                //console.log("UserInteraction: Hover; " + attrs.trackUiHover);
            });
        }
    })
    // Intercepteur des réponses aux requêtes HTTP
    .factory('AJAXInterceptor', function ($q, $analytics)
    {
        return {
            // Ici on traite les réponses AJAX qui ont réussi
            response     : function (response)
            {
                //console.log("HTTPResponse: " + response.config.url);

                // Si la réponse est en JSON
                if (response.headers()['content-type'] === "application/json")
                {
                    $analytics.eventTrack(response.config.url, {  category: 'AJAXResponse', label: JSON.stringify(response.data) });
                    //console.log(JSON.stringify(response.data));
                }
                else
                {
                    $analytics.eventTrack(response.config.url, {  category: 'AJAXResponse', label: '[content-type="' + response.headers()['content-type'] + '"]' });
                }

                return response;
            },
            // Ici on traite les réponses AJAX qui ont échoué
            responseError: function (rejection)
            {
                $analytics.eventTrack(rejection.config.url, {  category: 'AJAXResponseError', label: '[status="' + rejection.status + '"]' });
                //console.log("HTTPResponseError: " + rejection.config.url + "; " + rejection.status);

                return $q.reject(rejection);
            }
        };
    });

// Méthode permettant d'obtenir le chemin d'un élément dans l'arbre DOM
function getElementPath(element)
{
    return "//" + element.parents().andSelf().map(
        function ()
        {
            var $this = $(this);
            var tagName = this.nodeName;
            if ($this.siblings(tagName).length > 0)
            {
                tagName += "[" + $this.prevAll(tagName).length + "]";
            }
            return tagName;
        }).get().join("/");
}
