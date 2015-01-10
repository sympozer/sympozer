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
        global: {
            actions    : {
                go_home: 'Go back to home',
                actions: 'Actions',
                lang   : 'Language',
                save   : 'Save',
                ok     : 'Ok',
                cancel : 'Cancel',
                details: 'View details &raquo;',
                show   : 'Show',
                edit   : 'Edit',
                search : 'Search',
                placeHolderSearch: 'Search...'
            },
            labels     : {
                or    : 'Or',
                on    : 'on',
                at    : 'at',
                day   : 'day',
                days  : 'Days',
                to    : 'To',
                from  : 'From',
                search: {
                    displaying: 'Displaying results for',
                    no_result: 'No results.',
                    results  : 'Results'
                },
                list  : 'List',
                http  : 'http://...'

            },
            validations: {
                error              : 'Error',
                success            : 'Success',
                modifications_saved: 'Modifications saved'

            }
        },


        navleft       : {
            home        : 'Home',
            overview    : 'Overview',
            analytics   : 'Analytics',
            informations: 'Informations',
            settings    : 'Settings',
            appearance  : 'Appearance',
            directory   : 'Directory',
            community   : 'Community',
            powered_by  : 'Powered by sympozer.com',
            help        : 'Help',
            infos       : 'Infos',
            import      : 'Import',
            resource    : 'Resouces',
            highlights  : 'Highlights',
            embedded_calendar: 'Embedded calendar',
            ticket_page : 'Ticket page',
            mobile_app  : 'Mobile app',
            widgets     : 'Widgets',
            slides      : 'Slides'
        },


        //Authentication
        authentication: {
            actions    : {
                signin: 'Sign In',
                signup: 'Sign Up',
                signout: 'Sign Out'
            },
            validations: {
                signin_success          : 'Welcome to Sympozer',
                signin_error            : 'Bad credentials',
                signout_success         : 'Thanks for coming, see you soon',
                signup_success          : 'Thanks for registering, You will receive an email to complete your registration',
                signup_error            : 'We couldn\'t sign you up. Please contact our support service.',
                signup_confirm          : 'You account is now activated.',
                signup_email_in_use     : 'Email already in use.',
                signup_username_in_use  : 'Username already in use.',
                signup_confirm_error    : 'Invalid confirmation token.',
                change_pwd_success      : 'Your password has been changed',
                change_pwd_error        : 'Sorry, we couldn\'t change your password',
                reset_pwd_request_sended: 'The email that will allow you to change your password has been sended',
                reset_pwd_usernotfound  : 'The user has not been found.',
                reset_pwd_alreadyrequested: 'Password reset has already been requested.',
                reset_pwd_resetexpired  : 'The Password reset request has expired',
                pwd_too_short           : 'Your password is required to be at least 3 characters',
                pwd_too_long            : 'Your password cannot be longer than 20 characters',
                pwd_not_enough_strength : 'Your password must contains 2 Uppercase Letters, 1 Special Caracteres as !@#$&*,2 digits,3 Lowercase letters, 0 space',
                pwd_not_match           : 'Passwords must match',
                username_too_short      : 'Your login is required to be at least 3 characters',
                username_too_long       : 'Your login cannot be longer than 20 characters'

            },
            messages   : {
                signin_required             : 'This action needs you to be connected.',
                reset_pwd_info              : 'To reset your password, enter the email address you use to sign in to Sympozer. You will receive an email from Sympozer with the link to use in order to reset your password',
                pwd_not_set                 : 'You haven\'t set your password yet',
                forbidden                   : 'You don\'t have the authorization to perform this action',
                cannot_demote_youself       : 'You cannot demote yourself.',
                cannot_add_owner_as_teammate: 'You cannot add the owner as teammate.'
            },
            links      : {
                authentication: 'Authentication'
            },
            labels     : {
                username          : 'Username',
                password          : 'Password',
                email             : 'Email',
                profile           : 'Profile',
                forgotten_pwd     : 'Forgotten password ?',
                remember_me       : 'Remember me ',
                current_pwd       : 'Current password',
                change_pwd        : 'Change my password',
                new_pwd           : 'New password',
                pwd_check         : 'Password check',
                reset_pwd         : 'Reset my password',
                pwd_verification  : 'Verification',
                enrich_with       : 'Enrich profile with ',
                enrich_profile    : 'Enrich your profile ',
                signin_with       : 'Sign in with ',
                signin_get_started: 'Sign In to get started or ',
                account           : 'Account',
                agreement         : 'User Agreement',
                agreement_acceptance: 'I accept the ',
                username_or_email : 'Username or email',
                settings          : 'Settings'

            }
        },


        //mainEvent
        mainEvents    : {
            actions    : {
                search  : 'Search a conference',
                new     : 'New conference',
                add     : 'Add a conference',
                edit    : 'Edit the conference',
                import  : 'Import conference',
                export  : 'Export conference',
                print   : 'Print conference',
                view    : 'View the conference',
                add_logo: 'Add a logo',
                choose_logo: 'Choose a logo'

            },
            labels     : {
                general_info: 'General informations',
                time_localization: 'Time & localization',
                to          : 'To',
                from        : 'From'
            },
            links      : {
                mainEvents: 'Conferences',
                mainEvent: 'Conference'
            },
            validations: {
                'EventFormValidation_start_is_after_end_error': 'the start date must not be after the end date.',
                'Label_already_used'   : 'A main event with the same label already exists.',
                'end_date_after_start' : 'The end date must be after the start date',
                'start_date_before_end': 'The start date must be before the end date',
                'created'              : 'The conference has been saved',
                'not_created'          : 'Sorry, the conference has not been saved'

            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this conference ?',
                no_description: 'The conference doesn\'t have a decritpion yet'
            },
            model      : {
                country: 'Country',
                city   : 'City',
                label  : 'Label',
                startAt: 'Start at',
                endAt  : 'End at',
                description: 'Description',
                logo   : 'Logo',
                'url'  : 'Url'
            }
        },

        //event
        events        : {
            actions    : {
                search: 'Search an event',
                new  : 'New event',
                add  : 'Add a event',
                edit : 'Edit the event',
                import: 'Import events',
                export: 'Export events',
                print: 'Print events'
            },
            links      : {
                events: 'Events',
                event : 'Event',
                schedule: 'Schedule',
                calendar: 'Calendar'
            },
            labels     : {
                general_info     : 'General informations',
                time_localization: 'Time & localization',
                to               : 'To',
                from             : 'From',
                unscheduled_Event: 'Unscheduled events'
            },
            validations: {
                start_before_end: 'The start date must be before the end date',
                end_after_start : 'The end date must be after the start date',
                created         : 'The event has been saved',
                not_created     : 'Sorry, the event has not been saved',
                deletion_success: 'Event deleted',
                deletion_error  : 'Sorry, we couldn\'nt delete this event'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this event ?'
            },
            model      : {
                label   : 'Label',
                description: 'Description',
                url     : 'Url',
                day     : 'Day',
                startAt : 'Start at',
                endAt   : 'End at',
                sessions: 'Sessions'

            }
        },

        //papers
        papers        : {
            actions    : {
                search: 'Search a paper',
                new  : 'New paper',
                add  : 'Add a paper',
                edit : 'Edit the paper',
                import: 'Import paper',
                export: 'Export paper',
                print: 'Print paper',
                view : 'Paper details',
                index: {
                    subtitle: 'Search papers'
                }
            },
            links      : {
                papers: 'Papers',
                paper: 'Paper'
            },
            validations: {
                created    : 'The paper has been saved',
                not_created: 'Sorry, the paper has not been saved',
                deletion_success: 'Paper deleted',
                deletion_error  : 'Sorry, we couldn\'nt delete this Paper'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this paper ?',
                no_abstract: 'This paper has no abstract.'
            },
            model      : {
                label    : 'Label',
                abstract : 'abstract',
                publisher: 'Publisher',
                publish_date: 'Publish date',
                url      : 'url',
                authors  : 'Authors'
            },
            labels     : {
                publishedBy: 'Published by',
                authors: 'Authors:',
                author : 'Author:'
            }
        },

        //teammates
        teammates     : {
            actions    : {
                search: 'Search a teammate',
                new  : 'New teammate',
                add  : 'Add a teammate',
                edit : 'Edit the teammate',
                import: 'Import teammate',
                export: 'Export teammate',
                print: 'Print teammate',
                index: {
                    subtitle: 'Search in the team'
                }
            },
            links      : {
                team: 'Team'
            },
            labels     : {
                teammate: 'Teammate'
            },
            validations: {
                'created': 'The teammate has been saved',
                'deleted': 'The teammate has been deleted',
                'not_created': 'Sorry, the teammate has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this teammate ?'

            },
            model      : {}
        },


        //topics
        topics        : {
            actions    : {
                search: 'Search a topic',
                new  : 'New topic',
                add  : 'Add a topic',
                edit : 'Edit the topic',
                import: 'Import topics',
                export: 'Export topics',
                print: 'Print topics'
            },
            links      : {
                topics: 'Topics',
                topic: 'Topic'
            },
            labels     : {},
            validations: {
                'created': 'The topic has been saved',
                'not_created': 'Sorry, the topic has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this topic ?'

            },
            model      : {
                label: 'Label'
            }
        },


        //categories
        categories    : {
            actions    : {
                search: 'Search a category',
                new  : 'New category',
                add  : 'Add a category',
                edit : 'Edit the category',
                import: 'Import categories',
                export: 'Export categories',
                print: 'Print categories'
            },
            links      : {
                categories: 'Categories',
                category: 'Category'
            },
            validations: {
                'created': 'The category has been saved',
                'not_created': 'Sorry, the category has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this category ?'

            },
            model      : {
                label: 'Label',
                description: 'Description',
                color: 'Color'
            }
        },

        //locations
        locations     : {
            actions    : {
                search: 'Search a location',
                new  : 'New location',
                add  : 'Add a location',
                edit : 'Edit the location',
                import: 'Import location',
                export: 'Export location',
                print: 'Print location'
            },
            links      : {
                locations: 'Locations',
                location: 'Location'
            },
            validations: {
                'created'    : 'The location has been saved',
                'not_created': 'Sorry, the location has not been saved',
                deletion_success: 'Location deleted',
                deletion_error  : 'Sorry, we could delete this location'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this location ?'

            },
            model      : {
                label      : 'Label',
                description: 'Description',
                capacity   : 'Capacity',
                accessibility: 'Accessibility',
                latitude   : 'Latitude',
                longitude  : 'Longitude'
            }
        },


        //equipments
        equipments    : {
            actions    : {
                search: 'Search an equipment',
                new: 'New equipment',
                add: 'Add an equipment'
            },
            links      : {
                equipments: 'Equipments',
                equipment: 'Equipment'
            },
            validations: {
                'created': 'The equipment has been saved',
                'not_created': 'Sorry, the equipment has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this equipment ?'
            },
            model      : {
                label: 'Label',
                description: 'Description',
                icon : 'Icon'
            }
        },


        //organizations
        organizations : {
            actions    : {
                search: 'Search an organization',
                new  : 'New organization',
                add  : 'Add an organization',
                edit : 'Edit the organization',
                import: 'Import organization',
                export: 'Export organization',
                print: 'Print organization'
            },
            links      : {
                organizations: 'Organizations',
                organization : 'Organization'
            },
            labels     : {
                member: 'Members'
            },
            validations: {
                'created': 'The organization has been saved',
                'not_created': 'Sorry, the organization has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this organization ?',
                no_description: 'This organization has no description yet'
            },
            model      : {
                label      : 'Label',
                localization: 'localization',
                country    : 'Country',
                city       : 'City',
                website    : 'Website',
                img        : 'Image',
                description: 'Description'
            }
        },


        //roleLabels
        roleLabels    : {
            actions    : {
                search: 'Search a role label',
                new  : 'New role label',
                add  : 'Add a role label',
                edit : 'Edit the role label',
                import: 'Import role label',
                export: 'Export role label',
                print: 'Print role label'
            },
            links      : {
                roleLabels: 'roles labels',
                roleLabel : 'role label'
            },
            labels     : {},
            validations: {
                'created': 'The role label has been saved',
                'not_created': 'Sorry, the role label has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this role label ?'
            },
            model      : {
                label: 'Label',
                description: 'Description'
            }
        },


        //roles
        roles         : {
            actions    : {
                search: 'Search a role',
                new  : 'New role',
                add  : 'Add a role',
                edit : 'Edit the role',
                import: 'Import role',
                export: 'Export role',
                print: 'Print role'
            },
            links      : {
                roles: 'Roles',
                role: 'Role'
            },
            labels     : {},
            validations: {
                'created'    : 'The role has been saved',
                'not_created': 'Sorry, the role has not been saved',
                'deletion_success': 'The role had been deleted'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this role ?'
            },
            model      : {
                event : 'Event',
                person: 'person',
                role_label: 'Role label'
            }
        },

        //person
        persons       : {
            actions    : {
                search      : 'Search a person',
                new         : 'New person',
                add         : 'Add a person',
                edit        : 'Edit the person',
                import      : 'Import person',
                export      : 'Export person',
                print       : 'Print person',
                edit_account: 'Edit account',
                edit_profile: 'Edit profile',
                view_profile  : 'View my profile',
                add_picture   : 'Add a picture',
                choose_picture: 'Choose a picture'

            },
            links      : {
                persons     : 'Persons',
                person      : 'Person',
                my_events   : 'My events',
                my_bookmarks: 'My bookmarks',
                my_tickets  : 'My tickets',
                my_recommandations: 'My recommandations'
            },
            labels     : {
                contact: 'Contact',
                social: 'Social',
                about : 'About'
            },
            validations: {
                'created': 'The person has been saved',
                'not_created': 'Sorry, the person has not been saved'
            },
            messages   : {
                delete_confirm: 'Are you sure you want to delete this person ?',
                no_description: 'This person has no description yet'
            },
            model      : {
                label       : 'Label',
                positions: 'Positions',
                website     : 'Website',
                localization: 'Localization',
                country     : 'Country',
                city        : 'City',
                description : 'Description',
                firstname   : 'First name',
                familyname  : 'Family name',
                email       : 'Email',
                img         : 'Image'
            }
        },

        import: {
            import    : 'Import',
            validating: 'The server is validating datas... This may take a while.',
            select_file    : 'Select the csv file to import.',
            download_sample: 'Download a sample file.',
            send_to_server : 'Send to server.',
            processing     : 'The server is processing datas... This may take a while.'
        }

    });

    //Register translation table as object hash for FR language
    $translateProvider.translations('fr_FR', {
        //Global
        global: {
            actions    : {
                go_home: 'Retour à l\'accueil',
                actions: 'Actions',
                lang  : 'Language',
                save  : 'Enregistrer',
                ok    : 'Ok',
                cancel: 'Annuler',
                details: 'Détails &raquo;',
                show  : 'Voir',
                edit  : 'Modifier',

                search: 'Rechercher',
                placeHolderSearch: 'Rechercher...'
            },
            labels     : {
                or    : 'Ou',
                at    : 'à',
                from  : 'De',
                to    : 'Jusq\'à',
                day   : 'jour',
                days  : 'Jours',
                searchResult: 'Résultat pour',
                search: {
                    displaying: 'Résultat pour',
                    no_result: 'Aucun résultat.',
                    results  : 'Résultats'
                },
                on    : 'le',
                list  : 'Liste'

            },
            validations: {
                error              : 'Erreur',
                success            : 'Success',
                modifications_saved: 'Modifications sauvegardées'
            }
        },


        navleft       : {
            home        : 'Accueil',
            overview    : 'Aperçu',
            analytics   : 'Analytics',
            informations: 'Informations',
            settings    : 'Parametres',
            appearance  : 'Apparence',
            directory   : 'Participants',
            community   : 'Communauté',
            powered_by  : 'Propulsé par sympozer.com',
            help        : 'Aide',
            infos       : 'Information',
            import      : 'Import',
            resource    : 'Ressouces',
            highlights  : 'Live wall',
            embedded_calendar: 'Planning embarqué',
            ticket_page : 'Page tickets',
            mobile_app  : 'Application mobile',
            widgets     : 'Widgets',
            slides      : 'Slides'
        },


        //Authentication
        authentication: {
            actions    : {
                signin: 'Connexion',
                signup: 'Inscription',
                signout: 'Déconnexion'
            },
            validations: {
                signin_success          : 'Bienvenu sur Sympozer!',
                signin_error            : 'Accès refusé',
                signout_success         : 'Merci d\'utiliser Sympozer, à bientôt',
                signup_success          : 'Bienvenue sur Sympozer, vous allez recevoir un email pour terminer votre inscription',
                signup_error            : 'Désolé nous n\'avons pas pu vous connecter',
                signup_confirm          : 'Votre compte est désormais actif.',
                signup_email_in_use     : 'Email déjà utilisé.',
                signup_username_in_use  : 'nom d\'utilisateur déjà utilisé.',
                signup_confirm_error    : 'Token de confirmation non valide.',
                change_pwd_success      : 'Votre mot de passe a été modifié',
                change_pwd_error        : 'Désolé, nous n\'avons pas pu changer votre mot de passe',
                reset_pwd_request_sended: 'Un email vous permettant de mettre à jour votre mot de passe vous a été envoyé',
                reset_pwd_usernotfound  : 'Utilisateur non trouvé.',
                reset_pwd_alreadyrequested: 'La requête de changement de mot de passe a déjà été effectuée.',
                reset_pwd_resetexpired  : 'La requête de changement de mot de passe à expirée',
                pwd_too_short           : 'Votre mot de passe est trop court',
                pwd_too_long            : 'Votre mot de passe est trop long',
                pwd_not_enough_strength : 'Le mot de passe doit contenir au moins 2 caractéres en majuscule, 1 caractére special comme !@#$&*,2 chiffres,3 caractéres minuscules, 0 espace',
                pwd_not_match           : 'Les deux mots de passe doivent être identiques',
                username_too_short      : 'Votre nom d\'utilisateur est trop court',
                username_too_long       : 'Votre nom d\'utilisateur est trop long'

            },
            messages   : {
                signin_required: 'Cette action nécessite d\'être connecté.',
                reset_pwd_info              : 'Pour reinitialiser votre mot de passe, entrer votre email ou nom d\'utilisateur. Vous recevrez alors un email pour mettre à jour votre mot de passe',
                pwd_not_set                 : 'Vous n\'avez pas encore défini votre mot de passe',
                forbidden                   : 'Vous n\'avez pas le droit d\'exécuter cette action',
                cannot_demote_youself       : 'Vous ne pouvez pas vous désinscrire vous même.',
                cannot_add_owner_as_teammate: 'Vous ne pouvez pas ajouter le créateur de l\'évènement en tant qu\'équipier.'
            },
            links      : {
                authentication: 'Authentification'
            },
            labels     : {
                username          : 'Utilisateur',
                password          : 'Mot de passe',
                email             : 'Email',
                profile           : 'Profile',
                forgotten_pwd     : 'Mot de passe oublié ?',
                remember_me       : 'Se souvenir de moi ',
                current_pwd       : 'Votre mot de passe',
                change_pwd        : 'Changer mon mot de passe',
                new_pwd           : 'Nouveau mot de passe',
                pwd_check         : 'Confirmation mot de passe',
                reset_pwd         : 'Reinitialiser mon mot de passe',
                pwd_verification  : 'Vérification',
                enrich_with       : 'Enrichir mon profile avec',
                enrich_profile    : 'Enrichir mon profile avec',
                signin_with       : 'Connexion avec ',
                signin_get_started: 'Se connecter ou ',
                account           : 'Compte',
                agreement         : 'Convention d\'utilisation',
                agreement_acceptance: 'J\'accepte les termes',
                username_or_email : 'Nom d\'utilisateur ou email',
                settings          : 'Parametres'
            }
        },


        //mainEvent
        mainEvents    : {
            actions    : {
                search  : 'Rechercher une conférence',
                new     : 'Nouvelle conférence',
                add     : 'Ajouter a conférence',
                edit    : 'Editer la conférence',
                import  : 'Importer conférence',
                export  : 'Exporter conférence',
                print   : 'Imprimer conférence',
                view    : 'Voir la conférence',
                add_logo: 'Ajouter un logo',
                choose_logo: 'Choix du logo'


            },
            labels     : {
                general_info: 'Informations générales',
                time_localization: 'Durée & localisation',
                to          : 'Jusqu\'à',
                from        : 'Depuis'
            },
            links      : {
                mainEvents: 'Conférences',
                mainEvent : 'Conférence'
            },
            validations: {
                'EventFormValidation_start_is_after_end_error': 'La date de début doit être avant la date de fin',
                'Label_already_used'   : 'Une conférence avec le même nom existe déjà',
                'end_date_after_start' : 'La date de fin doit être après la date de début',
                'start_date_before_end': 'La date de début doit être avant la date de fin',
                'created'              : 'La conférence a été enregistrée',
                'not_created'          : 'Désolé, la conférence n\'a pas été sauvegardée'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette conférence ?',
                no_description: 'Cette conférence n\'a pas de description pour le moment'
            },
            model      : {
                country: 'Pays',
                city   : 'Ville',
                label  : 'Label',
                startAt: 'Début',
                endAt  : 'Fin',
                description: 'Description',
                logo   : 'Logo',
                'url'  : 'Lien'
            }
        },

        //event
        events        : {
            actions    : {
                search: 'Rechercher un évènement',
                new  : 'Nouvel évènement',
                add  : 'Ajouter un évènement',
                edit : 'Editer l\'évènement',
                import: 'Importer évènements',
                export: 'Exporter évènements',
                print: 'Imprimer évènements'
            },
            links      : {
                events: 'Evènements',
                event : 'Evènement',
                schedule: 'Calendrier',
                calendar: 'Planning'
            },
            labels     : {
                general_info     : 'Informations générales',
                time_localization: 'Durée & localisation',
                to               : 'Jusqu\'à',
                from             : 'Depuis',
                unscheduled_Event: 'Non plannifié'

            },
            validations: {
                start_before_end: 'La date de fin doit être après la date de début',
                end_after_start : 'La date de début doit être avant la date de fin',
                'created'       : 'L\'évènement a été enregistrée',
                'not_created'   : 'Désolé, l\'évènement n\'a pas été sauvegardée',
                deletion_success: 'Event supprimé',
                deletion_error  : 'Désolé,  nous n\'avons pas pu supprimer l\'évènement'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cet évènement ?'
            },
            model      : {
                label   : 'Label',
                description: 'Descritpion',
                day     : 'Jour',
                url     : 'Lien',
                startAt : 'Début',
                endAt   : 'Fin',
                sessions: 'Sessions'
            }
        },

        //event
        papers        : {
            actions    : {
                search: 'Rechercher une publication',
                new  : 'Nouvelle publication',
                add  : 'Ajouter une publication',
                edit : 'Editer la publication',
                import: 'Importer publications',
                export: 'Exporter publications',
                print: 'Imprimer publications',
                view : 'Détails du papier',
                index: {
                    subtitle: 'Consulter des publications'
                }
            },
            links      : {
                papers: 'Publications',
                paper: 'Publication'
            },
            validations: {
                created    : 'La publication a été enregistrée',
                not_created: 'Désolé, la publication n\'a pas été sauvegardée',
                deletion_success: 'Publication supprimée',
                deletion_error  : 'Désolé, nous n\'avons pas pu supprimer cette publication'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette publication ?',
                no_abstract: 'Cette publication n\'a pas pas de résumé.'
            },
            model      : {
                label    : 'Label',
                abstract : 'Résumé',
                publisher: 'Editeur',
                publish_date: 'Date de publication',
                url      : 'lien',
                authors  : 'Auteurs'
            },
            labels     : {
                publishedBy: 'Publié par',
                authors: 'Auteurs :',
                author : 'Auteur :'
            }
        },

        //teammates
        teammates     : {
            actions    : {
                search: 'Rechercher un équipier',
                new  : 'Nouvel équipier',
                add  : 'Ajouter un équipier',
                edit : 'Editer l\'équipier',
                import: 'Importer équipiers',
                export: 'Exporter équipiers',
                print: 'Imprimer équipiers',
                index: {
                    subtitle: 'Consulter l\'équipe'
                }
            },
            links      : {
                team: 'Equipe'
            },
            labels     : {
                teammate: 'Equipier'
            },
            validations: {
                'created': 'L\'équipier a été enregistrée',
                'deleted': 'L\'équipier a été supprimé',
                'not_created': 'Désolé, l\'équipier n\'a pas été sauvegardée'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cet équipier ?'
            },
            model      : {}
        },


        //topics
        topics        : {
            actions    : {
                search: 'Rechercher un tag',
                new  : 'Nouveau tag',
                add  : 'Ajouter un tag',
                edit : 'Editer le tag',
                import: 'Importer tags',
                export: 'Exporter tags',
                print: 'Imprimer tags'
            },
            links      : {
                topics: 'Tags',
                topic: 'Tag'
            },
            labels     : {},
            validations: {
                'created': 'Le tag a été enregistré',
                'not_created': 'Désolé, Le tag n\'a pas été sauvegardé'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer ce tag ?'
            },
            model      : {
                label: 'Label'
            }
        },


        //categories
        categories    : {
            actions    : {
                search: 'Rechercher une catégorie',
                new  : 'Nouvelle catégorie',
                add  : 'Ajouter une catégorie',
                edit : 'Editer la catégorie',
                import: 'Importer catégories',
                export: 'Exporter catégories',
                print: 'Imprimer catégories'
            },
            links      : {
                categories: 'Catégories',
                category: 'Catégory'
            },
            validations: {
                'created': 'La catégorie a été enregistré',
                'not_created': 'Désolé, la catégorie n\'a pas été sauvegardée'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette catégorie ?'
            },
            model      : {
                label: 'Label',
                description: 'Description',
                color: 'Couleur'
            }
        },

        //locations
        locations     : {
            actions    : {
                search: 'Rechercher une localisation',
                new  : 'Nouvelle localisation',
                add  : 'ajouter une localisation',
                edit : 'Editer la localisation',
                import: 'Importer localisations',
                export: 'Exporter localisations',
                print: 'Imprimer localisations'
            },
            links      : {
                locations: 'Locations',
                location : 'Location'
            },
            validations: {
                'created'    : 'La localisation a été enregistré',
                'not_created': 'Désolé, la localisation n\'a pas été sauvegardée',
                deletion_success: 'Location supprimée',
                deletion_error  : 'Désolé, nous n\'avons pas pu supprimer cette location'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette localisation ?'
            },
            model      : {
                label      : 'Label',
                description: 'Description',
                capacity   : 'Capacité',
                accessibility: 'Accessibilité',
                latitude   : 'Latitude',
                longitude  : 'Longitude'
            }
        },


        //equipments
        equipments    : {
            actions    : {
                search: 'Rechercher un équipement',
                new: 'Nouvel équipement',
                add: 'Ajouter un équipement'
            },
            links      : {
                equipments: 'Equipements',
                equipment: 'Equipement'
            },
            validations: {
                'created': 'L\'équipement a été enregistré',
                'not_created': 'Désolé, l\'équipement n\'a pas été sauvegardé'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cet équipement ?'
            },
            model      : {
                label: 'Label',
                description: 'Description',
                icon : 'Icone'
            }
        },


        //organizations
        organizations : {
            actions    : {
                search: 'Rechercher une organisation',
                new  : 'Nouvelle organisation',
                add  : 'Ajouter une organisation',
                edit : 'Editer l\'organisation',
                import: 'Importer organisations',
                export: 'Exporter organisations',
                print: 'Imprimer organisations'
            },
            links      : {
                organizations: 'Organisations',
                organization : 'Organisation'

            },
            labels     : {
                member: 'Membres'
            },
            validations: {
                'created': 'L\'organization a été enregistrée',
                'not_created': 'Désolé, l\'organization n\'a pas été sauvegardée'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette organisation ?',
                no_description: 'Cette organization n\'a pas de description pour le moment'

            },
            model      : {
                label      : 'Label',
                localization: 'localization',
                country    : 'Pays',
                city       : 'Ville',
                website    : 'Site web',
                img        : 'Image',
                description: 'Description'
            }
        },


        //roleLabels
        roleLabels    : {
            actions : {
                search: 'Rechercher un type de rôle',
                new  : 'Nouveau type de rôle',
                add  : 'Ajouter un type de rôle',
                edit : 'Editer le type de rôle',
                import: 'Importer types de rôle',
                export: 'Exporter types de rôles',
                print: 'Imprimer types de rôles'
            },
            links   : {
                roleLabels: 'Types de roles',
                roleLabel : 'Type de role'
            },
            labels  : {},
            validations: {},
            messages: {
                delete_confirm: 'Etes-vous sur de vouloir supprimer ce type de rôle ?'
            },
            model   : {
                label: 'Label',
                description: 'Description'
            }
        },


        //roles
        roles         : {
            actions    : {
                search: 'Ajouter un rôle',
                new  : 'Nouveau rôle',
                add  : 'ajouter a rôle',
                edit : 'Editer le rôle',
                import: 'Importer rôles',
                export: 'Exporter rôles',
                print: 'Imprimer rôles'
            },
            links      : {
                roles: 'Roles',
                role: 'Role'
            },
            labels     : {},
            validations: {
                'created'    : 'Le rôle a été enregistré',
                'not_created': 'Désolé, le rôle n\'a pas été sauvegardée',
                'deletion_success': 'Le rôle a été supprimé'

            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer ce rôle ?'
            },
            model      : {
                event : 'Evènement',
                person: 'Personne',
                role_label: 'Type de rôle'
            }
        },

        //person
        persons       : {
            actions    : {
                search      : 'Rechercher une personne',
                new         : 'Nouvelle personne',
                add         : 'Ajouter une personne',
                edit        : 'Editer la personne',
                import      : 'Importer personnes',
                export      : 'Exporter personnes',
                print       : 'Imprimer personnes',
                edit_account: 'Modifier mon compte',
                edit_profile: 'Editer mon profile',
                view_profile  : 'voir mon profile',
                add_picture   : 'Ajouter une photo',
                choose_picture: 'Choisir une photo'
            },
            links      : {
                persons     : 'Personnes',
                person      : 'Personne',
                my_events   : 'Mes évènements',
                my_bookmarks: 'Mes marques page',
                my_tickets  : 'Mes tickets',
                my_recommandations: 'Mes recommandations'
            },
            labels     : {
                contact: 'Contact',
                social: 'Social',
                profil: 'Profil',

                about: 'A propos'

            },
            validations: {
                'created': 'La personne a été enregistrée',
                'not_created': 'Désolé, La personne n\'a pas été sauvegardée'
            },
            messages   : {
                delete_confirm: 'Etes-vous sur de vouloir supprimer cette personne ?',
                no_description: 'Aucune description disponible pour le moment'

            },
            model      : {
                label       : 'Label',
                localization: 'Localisation',
                positions: 'Positions',
                website     : 'Site web',
                country     : 'Pays',
                city        : 'Ville',
                description : 'Description',
                firstname   : 'Prénom',
                familyname  : 'Nom',
                email       : 'Email',
                img         : 'Image'
            }
        },

        import: {
            import    : 'Importer',
            validating: 'Le serveur valide les données... Cela peut prendre un moment.',
            select_file    : 'Sélectionnez le fichier csv à importer.',
            download_sample: 'Téléchargez un fichier d\'éxample.',
            send_to_server : 'Envoyer au server.',
            processing     : 'Le serveur traite les données... Cela peut prendre un moment.'
        }
    });

}]);

