module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //CONSTANT VALUES
    var PROD_SERVER_PATH = "http://localhost/sympozer/web/app.php";
    var DEV_SERVER_PATH = "http://localhost/sympozer/web/app_dev.php/";
    var FRONT_APP_DIR = "./src/fibe/FrontendBundle/Resources/public/";

    grunt.initConfig({

        /****************************************************
         *
         *                    SERVER TASKS                 *
         *
         * *************************************************/

        open: {
            //Start default navigator on dev mode
            devserver: {
                path: DEV_SERVER_PATH
            },
            //Start default navigator on prod mode
            prodserver: {
                path: PROD_SERVER_PATH
            },
            adminserver: {
                path: PROD_SERVER_PATH+'sonata/admin'
            }
        },

        shell: {
            options: {
                stdout: true
            },
            selenium: {
                command: './selenium/start',
                options: {
                    stdout: false,
                    async: true
                }
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            npm_install: {
                command: 'npm install'
            }
        },

        /****************************************************
         *
         *                    BUILD ASSETS TASKS           *
         *
         * *************************************************/

        //Task for uglifiying js files
        uglify: {
            js : {
                options : {
                    sourceMap : true,
                    sourceMapName : './app/assets/sourceMap.map'
                },
                src : './app/assets/app.js',
                dest : './app/assets/app.min.js'
            }
        },

        //Task for concatenatefiles
        concat: {
            styles: {
                dest: './app/assets/app.css',
                src: [
                    //place your Stylesheet files here
                    'vendors/bootstrap/dist/css/bootstrap.min.css',
                    'vendors/bootstrap/dist/css/bootstrap-theme.min.css',
                    'vendors/angular-loading-bar/src/loading-bar.css',
                    'vendors/leaflet/dist/leaflet.css',
                    'vendors/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                    'vendors/angular-ui-select/dist/select.css',
                    'vendors/select2/select2.css',
                    'vendors/angular-bootstrap-colorpicker/css/colorpicker.css',
                    'vendors/angular-xeditable/dist/css/xeditable.css',
                    'vendors/bootstrap-tags/dist/css/bootstrap-tags.css',
                    'vendors/bootstrap-social/bootstrap-social.css',

                    'app/css/app.css',
                    'app/css/animations.css'
                ]
            },
            scripts: {
                options: {
                    separator: ';'
                },
                dest: './app/assets/app.js',
                src: [
                    //place your JavaScript files here
                    'vendors/jquery/jquery.min.js',
                    'vendors/angular/angular.min.js',
                    'vendors/angular-resource/angular-resource.min.js',
                    'vendors/angular-translate/angular-translate.js',
                    'vendors/angular-route/angular-route.js',
                    'vendors/angular-animate/angular-animate.js',
                    'vendors/bootstrap/dist/js/bootstrap.min.js',
                    'vendors/angular-ui-router/release/angular-ui-router.min.js',
                    'vendors/angular-ui-select/dist/select.js',
                    'vendors/angular-sanitize/angular-sanitize.js',
                    'vendors/angular-loading-bar/src/loading-bar.js',
                    'vendors/angular-cached-resource/angular-cached-resource.min.js',
                    'vendors/angular-cookies/angular-cookies.min.js',
                    'vendors/moment/min/moment-with-locales.min.js',
                    'vendors/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
                    'vendors/angularjs-modal-service/src/createDialog.js',
                    'vendors/angular-xeditable/dist/js/xeditable.min.js',
                    'vendors/angular-moment/angular-moment.min.js',
                    'vendors/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
                    'vendors/leaflet/dist/leaflet.js',

                    'vendors/angular-boostrap-ui/src/modal/modal.js',
                    'vendors/angular-boostrap-ui/ui-bootstrap-tpls-0.11.2.min.js',
                    'vendors/angular-boostrap-ui/src/transition/transition.js',

                    'vendors/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',

                    'vendors/bootstrap-tags/dist/js/bootstrap-tags.min.js',
                    'vendors/select2/select2.min.js',
                    'vendors/angular-mocks/angular-mocks.js',
                    'app/js/app.js',
                    'app/modules/js/**/*.js',
                    'app/js/**/*.js'
                ]
            }
        },

        /****************************************************
         *
         *                    SYMFONY TASKS                *
         *
         * *************************************************/

        'sf2-console': {
            options: {
                bin: 'app/console'
            },
            //Clear the cache of the production environnement
            cache_clear_prod: {
                cmd: 'cache:clear',
                args: {
                    env: 'prod'
                }
            },
            //Clear the cache of the development environnement
            cache_clear_dev: {
                cmd: 'cache:clear',
                args: {
                    env: 'dev'
                }
            },
            //Clear the cache of the production/developpement environnement
            cache_clear: {
                cmd: 'cache:clear'
            },
            //concat and minimify all assets for prod environnement
            assets_dump : {
                cmd: 'assetic:dump',
                args: {}
            },
            //Install all assets (take everything from Resources directory of each bundle to append it in web/bundle/
            assets_install : {
                cmd: 'assets:install web',
                args: { symlink: true}
            },
            //Remove the database (specified in app/config/parameters.yml)
            database_drop : {
                cmd: 'doctrine:database:drop',
                args: { force: true}
            },
            //Create the database (specified in app/config/parameters.yml)
            database_create : {
                cmd: 'doctrine:database:create'
            },
            //Create the schema of the database
            database_update : {
                cmd: 'doctrine:schema:update',
                args: { force: true}
            },
            //Insert basic data including all default values for categories or roles
            database_init : {
                cmd: 'sympozer:database:init'
            },
            //create an admin user on the system
            admin_create: {
                cmd: 'sympozer:admin:create admin admin@admin.fr admin'
            }
        },


        /****************************************************
         *
         *            RIGHT MANAGEMENT TASKS                *
         *
         * *************************************************/

        //Set rights on folders
        chmod: {
            options: {
                mode: '777'
            },
            cache_log : {
                src: ['app/cache/**/*','app/logs/**/*']
            }
        },
        /****************************************************
         *
         *                    TESTING TASKS                *
         *
         * *************************************************/

        //Protractor task config
        protractor: {
            options: {
                keepAlive: true,
                configFile: FRONT_APP_DIR+'/test/protractor.conf.js'
                //debug : true
            },
            singlerun: {},
            auto: {
                keepAlive: true
            }
        },

        //Executing task when change on files happens
        watch: {
            options : {
                livereload: 7777
            },
            assets: {
                files: [FRONT_APP_DIR+'/app/css/**/*.js', FRONT_APP_DIR+'app/modules/**/*.js', FRONT_APP_DIR+'test/**/*.js'],
                tasks: ['karma:unit']
            },
            protractor: {
                files: [FRONT_APP_DIR+'/app/css/**/*.js', FRONT_APP_DIR+'app/modules/**/*.js', FRONT_APP_DIR+'test/**/*.js'],
                tasks: ['protractor:auto']
            }
        },


        //Karma unit test config
        karma: {
            unit: {
                configFile: FRONT_APP_DIR+'/test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_auto: {
                configFile: FRONT_APP_DIR+'/test/karma-unit.conf.js',
                autoWatch: true,
                singleRun: false
            },
            unit_coverage: {
                configFile: FRONT_APP_DIR+'/test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true,
                reporters: ['progress', 'coverage'],
                preprocessors: {
                    'app/scripts/*.js': ['coverage']
                },
                coverageReporter: {
                    type : 'html',
                    dir : 'coverage/'
                }
            }
        }
    });

    /** DEFAULTS **/
    grunt.registerTask('default', ['dev']);

    /** TEST **/
    //single run tests
    grunt.registerTask('test', ['test:unit', 'test:e2e']);
    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('test:e2e', ['chmod:cache_log', 'sf2-console:assets_dump','protractor:singlerun']);

    //autotest and watch tests
    grunt.registerTask('autotest', ['karma:unit_auto']);
    grunt.registerTask('autotest:unit', ['karma:unit_auto']);
    grunt.registerTask('autotest:e2e', ['connect:devserver','shell:selenium','watch:protractor']);

    //coverage testing
    grunt.registerTask('test:coverage', ['karma:unit_coverage']);
    grunt.registerTask('coverage', ['karma:unit_coverage','open:coverage','connect:coverage']);

    //installation-related
    grunt.registerTask('install', ['update','shell:protractor_install']);
    grunt.registerTask('update', ['shell:npm_install']);



    /** DEVELOPEMENT **/
    grunt.registerTask('reset', ['chmod:cache_log', 'sf2-console:database_create','sf2-console:database_drop',
        'sf2-console:database_create','sf2-console:database_update',
        'sf2-console:database_init', 'sf2-console:assets_install',
        'sf2-console:admin_create', 'sf2-console:cache_clear', 'chmod:cache_log']);

    grunt.registerTask('dev', ['sf2-console:assets_install', 'sf2-console:cache_clear',
        'chmod:cache_log', 'open:devserver']);

    /** PRODUCTION **/
    grunt.registerTask('build', ['sf2-console:database_update', 'sf2-console:assets_dump',
        'sf2-console:cache_clear', 'chmod:cache_log', 'open:prodserver' ]);


};
