var globalConfig = {
    app     : {

        urls   : {
            base    : "assets/",
            partials: "partials/",
            img     : "assets/img/"
        },
        modules: {
            authentication: {
                urls   : {
                    base    : "modules/authentication/",
                    partials: "modules/authentication/partials/",
                    img     : "modules/authentication/img/"
                },
                options: {
                    shouldLogin: true
                }
            },
            organizations : {
                urls: {
                    base    : "modules/organizations/",
                    partials: "modules/organizations/partials/",
                    img     : "modules/organizations/img/"
                }
            },
            locations     : {
                urls: {
                    base    : "modules/locations/",
                    partials: "modules/locations/partials/",
                    img     : "modules/locations/img/"
                }
            },
            equipments    : {
                urls: {
                    base    : "modules/equipments/",
                    partials: "modules/equipments/partials/",
                    img     : "modules/equipments/img/"
                }
            },
            events        : {
                urls: {
                    base    : "modules/events/",
                    partials: "modules/events/partials/",
                    img     : "modules/events/img"
                }
            },
            papers        : {
                urls: {
                    base             : "modules/papers/",
                    partials         : "modules/papers/partials/",
                    communityPartials: "modules/papers/partials/community/",
                    img              : "modules/papers/img/"
                }
            },
            categories    : {
                urls: {
                    base    : "modules/categories/",
                    partials: "modules/categories/partials/",
                    img     : "modules/categories/img/"
                }
            },
            mainEvents    : {
                urls: {
                    base             : "modules/main-events/",
                    partials         : "modules/main-events/partials/",
                    partialsCommunity: "modules/main-events/partials/community/",
                    img              : "modules/main-events/img/"
                }
            },
            persons       : {
                urls: {
                    base    : "modules/persons/",
                    partials: "modules/persons/partials/",
                    img     : "modules/persons/img/"
                }
            },
            teammates     : {
                urls: {
                    base    : "modules/teammates/",
                    partials: "modules/teammates/partials/",
                    img     : "modules/teammates/img"
                }
            },
            roles         : {
                urls: {
                    base    : "modules/roles/",
                    partials: "modules/roles/partials/roles/",
                    img     : "modules/roles/img/"
                }
            },
            roleLabels    : {
                urls: {
                    base    : "modules/roles/",
                    partials: "modules/roles/partials/role-labels/",
                    img     : "modules/roles/img/"
                }
            },
            topics        : {
                urls: {
                    base    : "modules/topics/",
                    partials: "modules/topics/partials/",
                    img     : "modules/topics/img/"
                }
            },
            messages      : {
                urls: {
                    base    : "modules/messages/",
                    partials: "modules/messages/partials/",
                    img     : "modules/messages/img/"
                }
            },
            notifications : {
                urls: {
                    base    : "modules/notifications/",
                    partials: "modules/notifications/partials/",
                    img     : "modules/notifications/img/"
                }
            },

            analytics: {
                urls: {
                    base    : "modules/analytics/",
                    partials: "modules/analytics/partials/",
                    img     : "modules/analytics/img/"
                }
            },

            import: {
                urls: {
                    base    : "modules/import/",
                    partials: "modules/import/partials/"
                }
            }
        }
    },
    language: 'EN'

};


angular.module('sympozerApp').constant('GLOBAL_CONFIG', $.extend(globalConfig, wsConfig));
