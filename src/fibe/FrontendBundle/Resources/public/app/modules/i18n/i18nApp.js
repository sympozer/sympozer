'use strict';

/**
 * i18n App Module
 * Responsible for all translations and the changeLang event management
 * @type {module}
 */
var i18nApp = angular.module('i18nApp', ['pascalprecht.translate']);

/**
 * Configuring $translateProvider
 */
i18nApp.config(['$translateProvider', function ($translateProvider)
{

    //Intialization of the translate provider
    $translateProvider.preferredLanguage('en_US');

    //Register translation table as object hash for US language
    $translateProvider.translations('en_US', {


        //Global
        global : {
            actions : {
                go_home : 'Go back to home',
                actions : 'Actions',
                lang : 'Language',
                save : 'Save',
                ok : 'Ok',
                cancel : 'Cancel',
                details : 'View details &raquo;'
            }
        },


        navleft : {
            home : 'Home',
            overview : 'Overview',
            settings : 'Settings',
            appearance : 'Appearance',
            directory : 'Directory',
            powered_by : 'Powered by sympozer.com',
            help : 'Help',
            infos : 'Infos',
            import : 'Import',
            resource : 'Resouces',
            highlights : 'Highlights',
            embedded_calendar : 'Embedded calendar',
            ticket_page : 'Ticket page',
            mobile_app : 'Mobile app',
            widgets : 'Widgets',
            slides : 'Slides'
        },


        //Authentication
        authentication : {
            actions : {
                signin: 'Sign In',
                signup: 'Sign Up',
                signout: 'Sign Out'
            },
            validations : {
                signin_success : 'Welcome to Sympozer',
                signin_error : 'Bad credentials',
                signout_success : 'Thanks for coming, see you soon',
                signup_success : 'Thanks for registering, You will receive an email to complete your registration',
                signup_error : 'We couldn\'t sign you up. Please contact our support service.',
                signup_confirm : 'You account is now activated.',
                signup_email_in_use : 'Email already in use.',
                signup_username_in_use : 'Username already in use.',
                signup_confirm_error : 'Invalid confirmation token.',
                reset_pwd_usernotfound : 'The user has not been found.',
                reset_pwd_alreadyrequested : 'Password reset has already been requested.',
                reset_pwd_resetexpired : 'The Password reset request has expired',
                pwd_too_short : 'Your password is required to be at least 3 characters',
                pwd_too_long : 'Your password cannot be longer than 20 characters',
                pwd_not_match : 'Passwords must match',
                username_too_short : 'Your login is required to be at least 3 characters',
                username_too_long : 'Your login cannot be longer than 20 characters'

            },
            messages : {
                reset_pwd_info : 'To reset your password, enter the email address you use to sign in to Sympozer. You will receive an email from Sympozer with the link to use in order to reset your password',
                pwd_not_set : 'You haven\'t set your password yet'
            },
            labels :{
                username : 'Username',
                password : 'Password',
                email : 'Email',
                profile : 'Profile',
                forgotten_pwd : 'Forgotten password',
                current_pwd : 'Current password',
                change_pwd : 'Change my password',
                new_pwd : 'New password',
                pwd_check : 'Password check',
                reset_pwd : 'Reset my password',
                pwd_verification : 'Verification',
                enrich_with : 'Enrich profile with ',
                enrich_profile : 'Enrich your profile ',
                signin_with : 'Sign in with ',
                account : 'Account',
                username_or_email : 'Username or email'

            }
        },


        //mainEvent
        mainEvents : {
            actions : {
                search : 'Search a conference',
                new : 'New conference',
                add : 'Add a conference',
                edit : 'Edit the conference',
                import : 'Import conference',
                export : 'Export conference',
                print : 'Print conference',
            },
            labels : {
                general_info : 'General informations',
                time_localization : 'Time & localization',
                to : 'To',
                from : 'From'
            },
            validations : {
                'EventFormValidation_start_is_after_end_error': 'the start date must not be after the end date.',
                'Label_already_used' : 'A main event with the same label already exists.',
                'end_date_after_start' : 'The end date must be after the start date',
                'start_date_before_end' : 'The start date must be before the end date'
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this conference ?'
            },
            model : {
                label : 'Label',
                startAt : 'Start at',
                endAt: 'End at',
                description : 'Description',
                logo : 'Logo',
                'url' : 'Url'
            }
        },

        //event
        events : {
            actions : {
                search : 'Search an event',
                new : 'New event',
                add : 'Add a event',
                edit : 'Edit the event',
                import : 'Import events',
                export : 'Export events',
                print : 'Print events',
            },
            links : {
                events : 'Events',
                schedule : 'Schedule',
                calendar : 'Calendar'
            },
            labels : {
                general_info : 'General informations',
                time_localization : 'Time & localization',
                to : 'To',
                from : 'From'
            },
            validations : {
                start_before_end : 'The start date must be before the end date',
                end_after_start :  'The end date must be after the start date',
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this event ?'
            },
            model : {
                label : 'Label',
                description : 'Descritpion',
                url : 'Url',
                startAt : 'Start at',
                endAt: 'End at',
            }
        },

        //event
        papers : {
            actions : {
                search : 'Search a paper',
                new : 'New paper',
                add : 'Add a paper',
                edit : 'Edit the paper',
                import : 'Import paper',
                export : 'Export paper',
                print : 'Print paper'
            },
            links : {
                papers : 'Papers'
            },
            validations : {
                delete_confirm : 'Are you sure you want to delete this paper ?'
            },
            messages : {
            },
            model : {
                label : 'Label',
                abstract : 'abstract',
                publisher : 'Publisher',
                publish_date : 'Publish date',
                url : 'url',
                authors : 'Atuhors'
            }
        },

        //teammates
        teammates : {
            actions : {
                search : 'Search a teammate',
                new : 'New teammate',
                add : 'Add a teammate',
                edit : 'Edit the teammate',
                import : 'Import teammate',
                export : 'Export teammate',
                print : 'Print teammate'
            },
            links : {
                team : 'Team'
            },
            labels : {
                teammate : 'Teammate'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this teammate ?'
            },
            model : {
            }
        },


        //topics
        topics : {
            actions : {
                search : 'Search a topic',
                new : 'New topic',
                add : 'Add a topic',
                edit : 'Edit the topic',
                import : 'Import topics',
                export : 'Export topics',
                print : 'Print topics'
            },
            links : {
                topics : 'Topics'
            },
            labels : {
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this topic ?'
            },
            model : {
                label : 'Label'
            }
        },



        //categories
        categories : {
            actions : {
                search : 'Search a category',
                new : 'New category',
                add : 'Add a category',
                edit : 'Edit the category',
                import : 'Import categories',
                export : 'Export categories',
                print : 'Print categories',
            },
            links : {
                categories : 'Categories'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this category ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                color : 'Color'
            }
        },

        //locations
        locations : {
            actions : {
                search : 'Search a location',
                new : 'New location',
                add : 'Add a location',
                edit : 'Edit the location',
                import : 'Import location',
                export : 'Export location',
                print : 'Print location',
            },
            links : {
                locations : 'Locations'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this location ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                capacity : 'Capacity',
                accessibility : 'Accessibility',
                latitude : 'Latitude',
                longitude : 'Longitude'
            }
        },


        //equipments
        equipments : {
            actions : {
                search : 'Search an equipment',
                new : 'New equipment',
                add : 'Add an equipment'
            },
            links : {
                equipments : 'Equipments'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this equipment ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                icon : 'Icon'
            }
        },


        //organizations
        organizations : {
            actions : {
                search : 'Search an organization',
                new : 'New organization',
                add : 'Add an organization',
                edit : 'Edit the organization',
                import : 'Import organization',
                export : 'Export organization',
                print : 'Print organization'
            },
            links : {
                organizations : 'Organizations'
            },
            labels : {
                member : 'Members'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this organization ?'
            },
            model : {
                label : 'Label',
                country : 'Country',
                website : 'Website',
                img : 'Image',
                description : 'Description'
            }
        },


        //roleLabelVersions
        roleLabelVersions : {
            actions : {
                search : 'Search a role label',
                new : 'New role label',
                add : 'Add a role label',
                edit : 'Edit the role label',
                import : 'Import role label',
                export : 'Export role label',
                print : 'Print role label'
            },
            links : {
                roleLabelVersions : 'role label'
            },
            labels : {

            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this role label ?'
            },
            model : {
                label : 'Label',
                description : 'Description'
            }
        },


        //roles
        roles : {
            actions : {
                search : 'Search a role',
                new : 'New role',
                add : 'Add a role',
                edit : 'Edit the role',
                import : 'Import role',
                export : 'Export role',
                print : 'Print role'
            },
            links : {
                roles : 'Roles'
            },
            labels : {

            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this role ?'
            },
            model : {
                event : 'Event',
                person : 'person',
                role_label_version: 'Role label'
            }
        },

        //person
        persons : {
            actions : {
                search : 'Search a person',
                new : 'New person',
                add : 'Add a person',
                edit : 'Edit the person',
                import : 'Import person',
                export : 'Export person',
                print : 'Print person',
                edit_account : 'Edit account',
                edit_profile : 'Edit profile'
            },
            links : {
                persons : 'Persons',
                my_events : 'My events',
                my_bookmarks : 'My bookmarks',
                my_tickets : 'My tickets',
                my_recommandations : 'My recommandations'
            },
            labels : {
                contact : 'Contact'
            },
            validations : {
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this person ?'
            },
            model : {
                label : 'Label',
                website : 'Website',
                country : 'Country',
                firstname : 'First name',
                familyname : 'Family name',
                email : 'Email',
                img : 'Image'
            }
        },


    });

    //Register translation table as object hash for FR language
    $translateProvider.translations('fr_FR', {
        //Community
        'Home': 'Accueil',
        'Search_event': 'Rechercher un evenement',
        'Search_conference': 'Rechercher une conference',
        'Search_publication': 'Rechercher une publication',
        'Search_person': 'Rechercher une personne',
        'Search_organization': 'Rechercher une organization',

        authentication : {
            actions : {
                'Login': 'Connexion'
            }
        },
        //Authentication
        'Login': 'Connexion',
        'Login_success': 'Bienvenue sur sympozer.com',
        'Login_error': 'Login impossible',
        'Forgotten_password': 'Mot de passe oublié ?',
        'Signout': 'Déconnexion',
        'signout_success': 'Merci d\'utiliser Sympozer, à bientôt',
        'Resetpwd_info' : 'Pour réinitialiser le mot de passe, entrer l\'adresse email que vous utilisez pour vous connecter à Sympozer. Vous recevrez un email de la part de Sympozer qui vous fournira un lien à partir duquel vous pourrez changer votre mot de passe',
        'Resetpwd_usernotfound_error': 'L\'utilisateur n\'a pas été trouvé',
        'Resetpwd_pwdalreadyrequested_error': 'La réinitialisation du mot de passe à déjà été demandé',
        'Resetpwd_pwdresetexpired_error': 'La demande de réinitialisation du mot de passe a expiré.',
        'Register': 'Inscription',
        'Register_success': 'Merci de vous être enregistré. Vous recevrez un e-mail pour terminer votre inscription',
        'Register_activated_success': 'Votre compte est maintenant activé.',
        'Register_error': 'L\'utilisateur n\'a pas pu etre enregistré. Veuillez contacter le support.',
        'Register_email_in_use_error': 'Adresse mail déjà utilisée',
        'Register_username_in_use_error': 'Login déjà utilisé',
        'Register_confirm_error': 'Jeton de confirmation invalide.',
        'EventFormValidation_start_is_after_end_error': "La date de fin doit être postérieure à la date de commencement.",

        //MainEvent
        'Label_already_used' : 'Un évènement portant ce label existe déjà.',
        'End_date_after_start' : 'La date de fin doit être après la date de début',
        'Start_date_before_end' : 'La date de début doit être avant la date de fin'
    });

}]);

