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
                pwd_not_enough_strength : 'Your password must contains 2 Uppercase Letters, 1 Special Caracteres as !@#$&*,2 digits,3 Lowercase letters, 0 space',
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
                'start_date_before_end' : 'The start date must be before the end date',
                'created' : 'The conference has been saved',
                'not_created' : 'Sorry, the conference has not been saved'

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
                'created' : 'The event has been saved',
                'not_created' : 'Sorry, the event has not been saved'
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
                delete_confirm : 'Are you sure you want to delete this paper ?',
                'created' : 'The paper has been saved',
                'not_created' : 'Sorry, the paper has not been saved'
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
                'created' : 'The teammate has been saved',
                'not_created' : 'Sorry, the teammate has not been saved'
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this teammate ?',

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
                'created' : 'The topic has been saved',
                'not_created' : 'Sorry, the topic has not been saved'
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this topic ?',

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
                'created' : 'The category has been saved',
                'not_created' : 'Sorry, the category has not been saved'
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this category ?',

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
                'created' : 'The location has been saved',
                'not_created' : 'Sorry, the location has not been saved'
            },
            messages : {
                delete_confirm : 'Are you sure you want to delete this location ?',

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
                'created' : 'The equipment has been saved',
                'not_created' : 'Sorry, the equipment has not been saved'
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
                'created' : 'The organization has been saved',
                'not_created' : 'Sorry, the organization has not been saved'
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
                'created' : 'The role label has been saved',
                'not_created' : 'Sorry, the role label has not been saved'
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
                'created' : 'The role has been saved',
                'not_created' : 'Sorry, the role has not been saved'
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
                'created' : 'The person has been saved',
                'not_created' : 'Sorry, the person has not been saved'
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
        //Global
        global : {
            actions : {
                go_home : 'Retour à l\'accueil',
                actions : 'Actions',
                lang : 'Language',
                save : 'Enregistrer',
                ok : 'Ok',
                cancel : 'Annuler',
                details : 'Détails &raquo;'
            }
        },


        navleft : {
            home : 'Accueil',
            overview : 'Aperçu',
            settings : 'Parametres',
            appearance : 'Apparence',
            directory : 'Participants',
            powered_by : 'Propulsé par sympozer.com',
            help : 'Aide',
            infos : 'Information',
            import : 'Import',
            resource : 'Ressouces',
            highlights : 'Live wall',
            embedded_calendar : 'Planning embarqué',
            ticket_page : 'Page tickets',
            mobile_app : 'Application mobile',
            widgets : 'Widgets',
            slides : 'Slides'
        },


        //Authentication
        authentication : {
            actions : {
                signin: 'Connexion',
                signup: 'Inscription',
                signout: 'Déconnexion'
            },
            validations : {
                signin_success : 'Bienvenu sur Sympozer!',
                signin_error : 'Accès refusé',
                signout_success : 'Merci d\'utiliser Sympozer, à bientôt',
                signup_success : 'Bienvenue sur Sympozer, vous allez recevoir un email pour terminer votre inscription',
                signup_error : 'Désolé nous n\'avons pas pu vous connecter',
                signup_confirm : 'Votre compte est désormais actif.',
                signup_email_in_use : 'Email déjà utilisé.',
                signup_username_in_use : 'nom d\'utilisateur déjà utilisé.',
                signup_confirm_error : 'Token de confirmation non valide.',
                reset_pwd_usernotfound : 'Utilisateur non trouvé.',
                reset_pwd_alreadyrequested : 'La requête de changement de mot de passe a déjà été effectuée.',
                reset_pwd_resetexpired : 'La requête de changement de mot de passe à expirée',
                pwd_too_short : 'Votre mot de passe est trop court',
                pwd_too_long : 'Votre mot de passe est trop long',
                pwd_not_enough_strength : 'Le mot de passe doit contenir au moins 2 caractéres en majuscule, 1 caractére special comme !@#$&*,2 chiffres,3 caractéres minuscules, 0 espace',
                pwd_not_match : 'Les deux mots de passe doivent être identiques',
                username_too_short : 'Votre nom d\'utilisateur est trop court',
                username_too_long : 'Votre nom d\'utilisateur est trop long'

            },
            messages : {
                reset_pwd_info : 'Pour reinitialiser votre mot de passe, entrer votre email ou nom d\'utilisateur. Vous recevrez alors un email pour mettre à jour votre mot de passe',
                pwd_not_set : 'Vous n\'avez pas encore défini votre mot de passe'
            },
            labels :{
                username : 'Utilisateur',
                password : 'Mot de passe',
                email : 'Email',
                profile : 'Profile',
                forgotten_pwd : 'Mot de passe oublié ?',
                current_pwd : 'Votre mot de passe',
                change_pwd : 'Changer mon mot de passe',
                new_pwd : 'Nouveau mot de passe',
                pwd_check : 'Confirmation mot de passe',
                reset_pwd : 'Reinitialiser mon mot de passe',
                pwd_verification : 'Vérification',
                enrich_with : 'Enrichir mon profile avec',
                enrich_profile : 'Enrichir mon profile avec',
                signin_with : 'Connexion avec ',
                account : 'Compte',
                username_or_email : 'Nom d\'utilisateur ou email'

            }
        },


        //mainEvent
        mainEvents : {
            actions : {
                search : 'Rechercher une conférence',
                new : 'Nouvelle conférence',
                add : 'Ajouter a conférence',
                edit : 'Editer la conférence',
                import : 'Importer conférence',
                export : 'Exporter conférence',
                print : 'Imprimer conférence'
            },
            labels : {
                general_info : 'Informations générales',
                time_localization : 'Durée & localisation',
                to : 'Jusqu\'à',
                from : 'Depuis'
            },
            validations : {
                'EventFormValidation_start_is_after_end_error': 'La date de début doit être avant la date de fin',
                'Label_already_used' : 'Une conférence avec le même nom existe déjà',
                'end_date_after_start' : 'La date de fin doit être après la date de début',
                'start_date_before_end' : 'La date de début doit être avant la date de fin',
                'created' : 'La conférence a été enregistrée',
                'not_created' : 'Désolé, la conférence n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette conférence ?'
            },
            model : {
                label : 'Label',
                startAt : 'Début',
                endAt: 'Fin',
                description : 'Description',
                logo : 'Logo',
                'url' : 'Lien'
            }
        },

        //event
        events : {
            actions : {
                search : 'Rechercher un évènement',
                new : 'Nouvel évènement',
                add : 'Ajouter un évènement',
                edit : 'Editer l\'évènement',
                import : 'Importer évènements',
                export : 'Exporter évènements',
                print : 'Imprimer évènements'
            },
            links : {
                events : 'Evènements',
                schedule : 'Calendrier',
                calendar : 'Planning'
            },
            labels : {
                general_info : 'Informations générales',
                time_localization : 'Durée & localisation',
                to : 'Jusqu\'à',
                from : 'Depuis'
            },
            validations : {
                start_before_end : 'La date de fin doit être après la date de début',
                end_after_start :  'La date de début doit être avant la date de fin',
                'created' : 'L\'évènement a été enregistrée',
                'not_created' : 'Désolé, l\'évènement n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cet évènement ?'
            },
            model : {
                label : 'Label',
                description : 'Descritpion',
                url : 'Lien',
                startAt : 'Début',
                endAt: 'Fin'
            }
        },

        //event
        papers : {
            actions : {
                search : 'Rechercher une publication',
                new : 'Nouvelle publication',
                add : 'Ajouter une publication',
                edit : 'Editer la publication',
                import : 'Importer publications',
                export : 'Exporter publications',
                print : 'Imprimer publications'
            },
            links : {
                papers : 'Publications'
            },
            validations : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette publication ?',
                'created' : 'La publication a été enregistrée',
                'not_created' : 'Désolé, la publication n\'a pas été sauvegardée'
            },
            messages : {
            },
            model : {
                label : 'Label',
                abstract : 'Résumé',
                publisher : 'Editeur',
                publish_date : 'Date de publication',
                url : 'lien',
                authors : 'Auteurs'
            }
        },

        //teammates
        teammates : {
            actions : {
                search : 'Rechercher un équipier',
                new : 'Nouvel équipier',
                add : 'Ajouter un équipier',
                edit : 'Editer l\'équipier',
                import : 'Importer équipiers',
                export : 'Exporter équipiers',
                print : 'Imprimer équipiers'
            },
            links : {
                team : 'Equipe'
            },
            labels : {
                teammate : 'Equipier'
            },
            validations : {
                'created' : 'L\'équipier a été enregistrée',
                'not_created' : 'Désolé, l\'équipier n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cet équipier ?'
            },
            model : {
            }
        },


        //topics
        topics : {
            actions : {
                search : 'Rechercher un tag',
                new : 'Nouveau tag',
                add : 'Ajouter un tag',
                edit : 'Editer le tag',
                import : 'Importer tags',
                export : 'Exporter tags',
                print : 'Imprimer tags'
            },
            links : {
                topics : 'Tags'
            },
            labels : {
            },
            validations : {
                'created' : 'Le tag a été enregistré',
                'not_created' : 'Désolé, Le tag n\'a pas été sauvegardé'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer ce tag ?'
            },
            model : {
                label : 'Label'
            }
        },



        //categories
        categories : {
            actions : {
                search : 'Rechercher une catégorie',
                new : 'Nouvelle catégorie',
                add : 'Ajouter une catégorie',
                edit : 'Editer la catégorie',
                import : 'Importer catégories',
                export : 'Exporter catégories',
                print : 'Imprimer catégories'
            },
            links : {
                categories : 'Catégories'
            },
            validations : {
                'created' : 'La catégorie a été enregistré',
                'not_created' : 'Désolé, la catégorie n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette catégorie ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                color : 'Couleur'
            }
        },

        //locations
        locations : {
            actions : {
                search : 'Rechercher une localisation',
                new : 'Nouvelle localisation',
                add : 'ajouter une localisation',
                edit : 'Editer la localisation',
                import : 'Importer localisations',
                export : 'Exporter localisations',
                print : 'Imprimer localisations'
            },
            links : {
                locations : 'Localisations'
            },
            validations : {
                'created' : 'La localisation a été enregistré',
                'not_created' : 'Désolé, la localisation n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette localisation ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                capacity : 'Capacité',
                accessibility : 'Accessibilité',
                latitude : 'Latitude',
                longitude : 'Longitude'
            }
        },


        //equipments
        equipments : {
            actions : {
                search : 'Rechercher un équipement',
                new : 'Nouvel équipement',
                add : 'Ajouter un équipement'
            },
            links : {
                equipments : 'Equipements'
            },
            validations : {
                'created' : 'L\'équipement a été enregistré',
                'not_created' : 'Désolé, l\'équipement n\'a pas été sauvegardé'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cet équipement ?'
            },
            model : {
                label : 'Label',
                description : 'Description',
                icon : 'Icone'
            }
        },


        //organizations
        organizations : {
            actions : {
                search : 'Rechercher une organisation',
                new : 'Nouvelle organisation',
                add : 'Ajouter une organisation',
                edit : 'Editer l\'organisation',
                import : 'Importer organisations',
                export : 'Exporter organisations',
                print : 'Imprimer organisations'
            },
            links : {
                organizations : 'Organisations'
            },
            labels : {
                member : 'Membres'
            },
            validations : {
                'created' : 'L\'organization a été enregistrée',
                'not_created' : 'Désolé, l\'organization n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette organisation ?'
            },
            model : {
                label : 'Label',
                country : 'Pays',
                website : 'Site web',
                img : 'Image',
                description : 'Description'
            }
        },


        //roleLabelVersions
        roleLabelVersions : {
            actions : {
                search : 'Rechercher un type de rôle',
                new : 'Nouveau type de rôle',
                add : 'Ajouter un type de rôle',
                edit : 'Editer le type de rôle',
                import : 'Importer types de rôle',
                export : 'Exporter types de rôles',
                print : 'Imprimer types de rôles'
            },
            links : {
                roleLabelVersions : 'Types de roles'
            },
            labels : {

            },
            validations : {
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer ce type de rôle ?'
            },
            model : {
                label : 'Label',
                description : 'Description'
            }
        },


        //roles
        roles : {
            actions : {
                search : 'Ajouter un rôle',
                new : 'Nouveau rôle',
                add : 'ajouter a rôle',
                edit : 'Editer le rôle',
                import : 'Importer rôles',
                export : 'Exporter rôles',
                print : 'Imprimer rôles'
            },
            links : {
                roles : 'Roles'
            },
            labels : {

            },
            validations : {
                'created' : 'Le rôle a été enregistré',
                'not_created' : 'Désolé, le rôle n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer ce rôle ?'
            },
            model : {
                event : 'Evènement',
                person : 'Personne',
                role_label_version: 'Type de rôle'
            }
        },

        //person
        persons : {
            actions : {
                search : 'Rechercher une personne',
                new : 'Nouvelle personne',
                add : 'Ajouter une personne',
                edit : 'Editer la personne',
                import : 'Importer personnes',
                export : 'Exporter personnes',
                print : 'Imprimer personnes',
                edit_account : 'Modifier mon compte',
                edit_profile : 'Editer mon profile'
            },
            links : {
                persons : 'Personnes',
                my_events : 'Mes évènements',
                my_bookmarks : 'Mes marques page',
                my_tickets : 'Mes tickets',
                my_recommandations : 'Mes recommandations'
            },
            labels : {
                contact : 'Contact'
            },
            validations : {
                'created' : 'La personne a été enregistrée',
                'not_created' : 'Désolé, La personne n\'a pas été sauvegardée'
            },
            messages : {
                delete_confirm : 'Etes-vous sur de vouloir supprimer cette personne ?'
            },
            model : {
                label : 'Label',
                website : 'Site web',
                country : 'Pays',
                firstname : 'Prénom',
                familyname : 'Nom',
                email : 'Email',
                img : 'Image'
            }
        }
    });

}]);

