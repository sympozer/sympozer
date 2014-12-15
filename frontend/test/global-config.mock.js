var globalConfig = {
    api      : {
        urls: {
            get_organizations        : "{{ path('community_organization_post') }}",
            get_organization_versions: "{{ path('community_organization_versions_post') }}",

            get_persons            : "{{ path('community_persons_post') }}",
            get_locations          : "{{ path('content_event_locations_post') }}",
            get_mainEvent_locations: "{{ path('content_mainEvent_locations_post') }}",
            get_equipments         : "{{ path('content_equipments_post') }}",
            get_events             : "{{ path('schedule_events_post') }}",

            get_roles            : "{{ path('content_roles_post') }}",
            get_roleLabel_verions: "{{ path('content_roleLabel_versions_post') }}",
            get_roleLabels       : "{{ path('content_roleLabels_post') }}",

            get_papers       : "{{ path('content_papers_post') }}",
            get_topics       : "{{ path('content_topics_post') }}",
            get_categories   : "{{ path('schedule_category_versions_post') }}",
            get_mainEvents   : "{{ path('schedule_mainEvents_post') }}",
            login            : "{{ path('login_check', {_format: 'json'}) }}",
            logout           : "{{ path('logout') }}",
            registration     : "{{ path('security_signup') }}",
            confirm          : "{{ path('security_confirm') }}",
            changepwd        : "{{ path('security_changepwd') }}",
            reset_pwd_request: "{{ path('security_resetpwdrequest') }}",
            reset_pwd        : "{{ path('security_resetpwd') }}",
            socialnetworks   : [
                {
                    name        : "{{ owner }}",
                    urls        : {
                        login : "{{ hwi_oauth_login_url(owner) }}",
                        enrich: "{{ path('enrich_account', { 'socialService': owner }) }}"
                    },
                    can_register: true
                }
            ]
        }
    },
    app      : {
        options: {
            shouldLogin: true
        },
        urls   : {
            base    : "{{ asset('bundles/frontend/app/') }}",
            partials: "{{ asset('bundles/frontend/app/partials/') }}",
            img     : "{{ asset('bundles/frontend/app/img/') }}"
        },
        modules: {
            organizations : {
                urls: {
                    base             : "{{ asset('bundles/frontend/app/modules/organizations/') }}",
                    partials         : "{{ asset('bundles/frontend/app/modules/organizations/partials/') }}",
                    communityPartials: "{{ asset('bundles/frontend/app/modules/organizations/partials/community/') }}",
                    img              : "{{ asset('bundles/frontend/app/modules/organizations/img') }}"
                }
            },
            locations     : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/locations/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/locations/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/locations/img') }}"
                }
            },
            equipments    : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/equipments/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/equipments/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/equipments/img') }}"
                }
            },
            events        : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/events/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/events/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/events/img') }}"
                }
            },
            papers        : {
                urls: {
                    base             : "{{ asset('bundles/frontend/app/modules/papers/') }}",
                    partials         : "{{ asset('bundles/frontend/app/modules/papers/partials/') }}",
                    communityPartials: "{{ asset('bundles/frontend/app/modules/papers/partials/community/') }}",
                    img              : "{{ asset('bundles/frontend/app/modules/papers/img') }}"
                }
            },
            categories    : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/categories/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/categories/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/categories/img') }}"
                }
            },
            mainEvents    : {
                urls: {
                    base             : "{{ asset('bundles/frontend/app/modules/main-events/') }}",
                    partials         : "{{ asset('bundles/frontend/app/modules/main-events/partials/') }}",
                    partialsCommunity: "{{ asset('bundles/frontend/app/modules/main-events/partials/community/') }}",
                    img              : "{{ asset('bundles/frontend/app/modules/main-events/img') }}"
                }
            },
            persons       : {
                urls: {
                    base             : "{{ asset('bundles/frontend/app/modules/persons/') }}",
                    partials         : "{{ asset('bundles/frontend/app/modules/persons/partials/') }}",
                    communityPartials: "{{ asset('bundles/frontend/app/modules/persons/partials/community/') }}",
                    img              : "{{ asset('bundles/frontend/app/modules/persons/img') }}"
                }
            },
            teammates     : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/authentication/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/authentication/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/authentication/img') }}"
                }
            },
            roles         : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/roles/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/roles/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/roles/img') }}"
                }
            },
            roleLabels    : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/roles/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/roles/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/roles/img') }}"
                }
            },
            topics        : {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/topics/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/topics/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/topics/img') }}"
                }
            },
            authentication: {
                urls: {
                    base    : "{{ asset('bundles/frontend/app/modules/authentication/') }}",
                    partials: "{{ asset('bundles/frontend/app/modules/authentication/partials/') }}",
                    img     : "{{ asset('bundles/frontend/app/modules/authentication/img') }}"
                }
            }
        }
    },
    language : 'EN',
    severTime: "{{ 'now'|date('m/d/Y') }}"
};
angular.module('sympozerApp').value('GLOBAL_CONFIG', globalConfig);