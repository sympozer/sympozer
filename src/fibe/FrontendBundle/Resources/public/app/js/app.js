'use strict';

/**
 * Main angular app
 */

/**
 * Main app sub-modules
 */
angular.module('communityApp', []);
angular.module('organizationsApp', ['fundoo.services']);
angular.module('papersApp', ['fundoo.services']);
angular.module('topicsApp', []);
angular.module('rolesApp', ['fundoo.services']);
angular.module('roleLabelsApp', ['fundoo.services']);
angular.module('categoriesApp', ['fundoo.services']);
angular.module('personsApp', ['fundoo.services']);
angular.module('locationsApp', ['fundoo.services', 'equipmentsApp']);
angular.module('equipmentsApp', ['fundoo.services']);
angular.module('eventsApp', ['fundoo.services', 'categoriesApp']);
angular.module('mainEventsApp', ['fundoo.services']);
angular.module('angularTranslateApp', ['pascalprecht.translate']);
angular.module('authenticationApp', ['ngCookies', 'personsApp']);
angular.module('contextualizationApp', ['mainEventsApp']);

/**
 * Main App Module
 *
 * @type {module}
 */
var sympozerApp = angular.module('sympozerApp', [
    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngCookies',
    'ngDragDrop',
    'angular-loading-bar',
    'ngCachedResource',
    'sympozerControllers',
    'sympozerFilters',
    'sympozerServices',
    'pascalprecht.translate',
    'authenticationApp',
    'organizationsApp',
    'personsApp',
    'topicsApp',
    'locationsApp',
    'equipmentsApp',
    'eventsApp',
    'rolesApp',
    'roleLabelsApp',
    'categoriesApp',
    'mainEventsApp',
    'contextualizationApp',
    'papersApp',
    'angularMoment',
    'leaflet-directive',
    'ui.bootstrap.datetimepicker',
    'ngSanitize',
    'ui.select',
    'colorpicker.module'
]);

/**
 * Configuring $translateProvider
 */
sympozerApp.config(['$translateProvider', function ($translateProvider)
{

    // Simply register translation table as object hash
    $translateProvider.translations('en_US', {
        'Home': 'Home',
        'Search_event': 'Search an event',
        'Search_conference': 'Search a conference',
        'Search_publication': 'Search an publication',
        'Search_person': 'Search a person',
        'Search_organization': 'Search an organization',
        'Login_success': 'Welcome to Sympozer',
        'Login_error': 'Bad credentials',
        'Forgotten_password': 'Forgotten password',
        'signout_success': 'Thanks for coming, see you soon',
        'Resetpwd_usernotfound_error': 'The user has not been found.',
        'Resetpwd_pwdalreadyrequested_error': 'Password reset has already been requested',
        'Resetpwd_pwdresetexpired_error': 'The Password reset request has expired',
        'Register_success': 'Thanks for registering, You will receive an email to complete your registration',
        'Register_confirm_success': 'You account is now activated',
        'Register_error': 'Cannot register the user. Please contact the support.',
        'Register_email_in_use_error': 'Email already in use',
        'Register_username_in_use_error': 'Login already in use',
        'Register_confirm_error': 'Invalid confirmation token.'
    });

    // Simply register translation table as object hash
    $translateProvider.translations('fr_FR', {
        'Home': 'Accueil',
        'Search_event': 'Rechercher un evenement',
        'Search_conference': 'Rechercher une conference',
        'Search_publication': 'Rechercher une publication',
        'Search_person': 'Rechercher une personne',
        'Search_organization': 'Rechercher une organization',
        'Login_success': 'Bienvenue sur sympozer.com',
        'Login_error': 'Login impossible',
        'Forgotten_password': 'Mot de passe oublié ?',
        'signout_success': 'Merci d\'utiliser Sympozer, à bientôt',
        'Resetpwd_usernotfound_error': 'L\'utilisateur n\'a pas été trouvé',
        'Resetpwd_pwdalreadyrequested_error': 'La réinitialisation du mot de passe à déjà été demandé',
        'Resetpwd_pwdresetexpired_error': 'La demande de réinitialisation du mot de passe a expiré.',
        'Register_success': 'Merci de vous être enregistré. Vous recevrez un e-mail pour terminer votre inscription',
        'Register_activated_success': 'Votre compte est maintenant activé.',
        'Register_error': 'L\'utilisateur n\'a pas pu etre enregistré. Veuillez contacter le support.',
        'Register_email_in_use_error': 'Adresse mail déjà utilisée',
        'Register_username_in_use_error': 'Login déjà utilisé',
        'Register_confirm_error': 'Jeton de confirmation invalide.'
    });

    $translateProvider.preferredLanguage('en_US');
}]);

/**
 * Main app run event
 *
 * (execute after injection)
 */
sympozerApp.run(function (amMoment)
{
    amMoment.changeLanguage('de');
});

/**
 * Authentication module configuration
 *
 * @type {config}
 */
angular.module('sympozerApp').config(['$provide', '$httpProvider',
function ($provide, $httpProvider)
{
    $httpProvider.interceptors.push('globalHttpInterceptor');

}]);