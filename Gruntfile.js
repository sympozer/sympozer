'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt)
{

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var FRONT_APP_DIR = "./src/fibe/FrontendBundle/Resources/public/";


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // file structure
            backend       : 'backend',
            frontend      : 'frontend',
            dist          : 'frontend/dist',
            test          : 'frontend/test',
            tmp           : 'frontend/.tmp',
            app           : 'frontend/app',
            local_config  : grunt.file.readJSON('local-config.json'),

            // server  path
            devserver_url : 'http://localhost:9000',
            prodserver_url: 'http://localhost:9001',
            testserver_url: 'http://localhost:9002'

        },


        /****************************************************
         *
         *                    SERVER TASKS                 *
         *
         * *************************************************/

        shell  : {
            options           : {
                stdout: true
            },
            selenium          : {
                command: './selenium/start',
                options: {
                    stdout: false,
                    async : true
                }
            },
            protractor_install: {
                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
            },
            npm_install       : {
                command: 'npm install'
            },
            cd_frontend       : {
                command: 'cd frontend'
            },
            clear_cache_dir   : {
                command: 'rm -R backend/app/cache/*'
            }

        },

        //Open a navigator page displaying a choosen url
        open   : {
            //development server access
//            devserver: {
//                path: '<%= yeoman.devserver_url %>',
//                app: '<%= yeoman.local_config.defaultBrowser %>'
//            },
            devserver  : {
                path: '<%= yeoman.local_config.clientRootPath %>',
                app : '<%= yeoman.local_config.defaultBrowser %>'
            },
            //production server access
            prodserver : {
                path: '<%= yeoman.prodserver_url %>',
                app : '<%= yeoman.local_config.defaultBrowser %>'
            },
            //test server access
            testserver : {
                path: '<%= yeoman.testserver_url %>',
                app : '<%= yeoman.local_config.defaultBrowser %>'
            },
            //admin interface access
            adminserver: {
                path: '<%= yeoman.local_config.serverRootPath %>' + 'sonata/admin'
            }
        },

        // The actual grunt server settings
        connect: {
            options   : {
                base      : '<%= yeoman.app %>',
                hostname  : 'localhost',
                livereload: 35729
            },
            devserver : {
                options: {
                    port     : 9000,
                    keepalive: true
                }
            },
            prodserver: {
                options: {
                    port     : 9001,
                    keepalive: false
                }
            },
            testserver: {
                options: {
                    port     : 9002,
                    keepalive: false

                }
            }
        },


        /****************************************************
         *
         *                     BOWER TASKS                 *
         *
         * *************************************************/

        //Launch bower install command
        'bower-install-simple': {
            options: {
                color: true,
                cwd  : 'frontend/'
            },
            "prod" : {
                options: {
                    production: true
                }
            },
            "dev"  : {
                options: {
                    production: false
                }
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall          : {
            app: {
                directory : 'frontend/',
                cwd       : 'frontend/',
                src       : ['<%= yeoman.app %>/index.html'],
                ignorePath: '<%= yeoman.app %>/',
                exclude   : ['requirejs',
                             'mocha',
                             'jquery.vmap.europe.js',
                             'jquery.vmap.usa.js',
                             'Chart.min.js',
                             'raphael',
                             'morris',
                             'jquery.inputmask'
                ]
            }
        },

        /****************************************************
         *
         *            RIGHT MANAGEMENT TASKS                *
         *
         * *************************************************/

        //Set rights on folders
        chmod: {
            options  : {
                mode: '777'
            },
            cache_log: {
                src: ['backend/app/cache/**/*', 'backend/app/logs/**/*']
            }
        },


        /****************************************************
         *
         *                    TESTING TASKS                *
         *
         * *************************************************/

        //Protractor task config
        protractor  : {
            options  : {
                keepAlive : true,
                configFile: '<%= yeoman.test %>' + '/protractor.conf.js',
                //debug : true
                // A base URL for your application under test. Calls to protractor.get()
                // with relative paths will be prepended with this.
                args      : {
                    baseUrl          : '<%= yeoman.testserver_url %>',
                    // The location of the selenium standalone server .jar file.
                    seleniumServerJar: 'node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
                    // attempt to find chromedriver using PATH.
                    chromeDriver     : 'node_modules/protractor/selenium/chromedriver',
                    capabilities     : {
                        'browserName': 'chrome'
                    }
                }
            },
            singlerun: {},
            auto     : {
                keepAlive: true
            }
        },


        //Karma unit test config
        karma       : {
            unit: {
                configFile: '<%= yeoman.test %>' + '/karma-unit.conf.js',
                autoWatch : false,
                singleRun : true
            }
//            unit_auto: {
//                configFile: '<%= yeoman.test %>'+'/karma-unit.conf.js',
//                autoWatch: true,
//                singleRun: false
//            },
//            unit_coverage: {
//                configFile: '<%= yeoman.test %>'+'/karma-unit.conf.js',
//                autoWatch: false,
//                singleRun: true,
//                reporters: ['progress', 'coverage'],
//                preprocessors: {
//                    'app/scripts/*.js': ['coverage']
//                },
//                coverageReporter: {
//                    type : 'html',
//                    dir : 'coverage/'
//                }
//            }
        },


        // Watches files for changes and runs tasks based on the changed files
        watch       : {
            bower    : {
                files: ['<%= yeoman.app %>/bower.json'],
                tasks: ['bowerInstall']
            },
            less     : {
                files: ['<%= yeoman.app %>/assets/less/**/*.less'],
                tasks: ['less:server']
            },
            gruntfile: {
                files: ['Gruntfile.old.js']
            }

        },


        // Make sure code styles are up to par and there are no obvious mistakes
        jshint      : {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all    : [
                'Gruntfile.old.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test   : {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src    : ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean       : {
            dist  : {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= yeoman.tmp %>/*',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist   : {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.tmp %>/assets/css/',
                        src   : '{,*/}*.css',
                        dest  : '<%= yeoman.tmp %>/assets/css/'
                    }
                ]
            }
        },

        /****************************************************
         *
         *                    BUILD TASKS                  *
         *
         * *************************************************/



        // Renames files for browser caching purposes
        rev          : {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/assets/css/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html   : '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js : ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post : {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin       : {
            html   : ['<%= yeoman.dist %>/{,*/}*.html'],
            css    : ['<%= yeoman.dist %>/assets/css/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin       : {
            options: {
                // root: '<%= yeoman.app %>',
                relativeTo   : '<%= yeoman.app %>',
                processImport: true,
                noAdvanced   : true
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>/assets/img',
                        src   : '{,*/}*.{png,jpg,jpeg,gif}',
                        dest  : '<%= yeoman.dist %>/assets/img'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.app %>/images',
                        src   : '{,*/}*.svg',
                        dest  : '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },

        htmlmin   : {
            options: {
                collapseBooleanAttributes    : false,
                collapseWhitespace           : false,
                removeAttributeQuotes        : true,
                removeComments               : true, // Only if you don't use comment directives!
                removeEmptyAttributes        : true,
                removeRedundantAttributes    : true,
                removeScriptTypeAttributes   : true,
                removeStyleLinkTypeAttributes: true
            },
            app    : {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.frontend %>/app',
                        src   : ['partials/**/*.html'],
                        dest  : '<%= yeoman.dist %>/'
                    }
                ]
            },
            modules: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.frontend %>/app',
                        src   : ['modules/**/*.html'],
                        dest  : '<%= yeoman.dist %>/'
                    }
                ]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin     : {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd   : '<%= yeoman.tmp %>/concat/scripts',
                        src   : '*.js',
                        dest  : '<%= yeoman.tmp %>/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify    : {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy      : {
            dist  : {
                files: [
                    {
                        expand: true,
                        dot   : true,
                        cwd   : '<%= yeoman.app %>',
                        dest  : '<%= yeoman.dist %>',
                        src   : [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'images/{,*/}*.{webp}',
                            'fonts/*',
                            'assets/**',
                            'bower/font-awesome/fonts/*',
                            'bower/bootstrap/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd   : '<%= yeoman.tmp %>/images',
                        dest  : '<%= yeoman.dist %>/images',
                        src   : ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd   : '<%= yeoman.app %>/assets/css',
                dest  : '<%= yeoman.tmp %>/assets/css',
                src   : '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test  : [
                'copy:styles'
            ],
            dist  : [
                'copy:styles',
                'copy:dist'
                // 'imagemin',
                // 'svgmin'
            ]
        },

        ngtemplates: {
            app: {
                src    : '<%= yeoman.app %>/partials/**/*.html',
                dest   : '<%= yeoman.dist %>/templates/app-templates.js',
                options: {
                    url      : function (url)
                    {
//                        return  url.replace('frontend/.tmp/templates/app/', 'http://localhost/sympozer/frontend/dist/templates');
                        return  url.replace('frontend/app/', 'http://localhost/frontend/dist/');
                        //return url;
                    },
                    bootstrap: function (module, script)
                    {
                        return "angular.module('sympozerApp', []).run(['$templateCache', function ($templateCache) {\n" + script + "}])";
                    }
                }
            },

            modules: {
                src    : '<%= yeoman.app %>/modules/**/*.html',
                dest   : '<%= yeoman.dist %>/templates/modules-templates.js',
                options: {
                    url      : function (url)
                    {
                        // return  url.replace('frontend/.tmp/templates/app/', 'http://localhost/sympozer/frontend/dist/templates');
                        return  url.replace('frontend/app/', 'http://localhost/frontend/dist/');

                        // return url;
                    },
                    bootstrap: function (module, script)
                    {
                        return "angular.module('sympozerApp', []).run(['$templateCache', function ($templateCache) {\n" + script + "}])";
                    }
                }
            }
        },

        less: {

            server: {
                options: {
                    // strictMath: true,
                    dumpLineNumbers  : true,
                    sourceMap        : true,
                    sourceMapRootpath: "",
                    outputSourceFiles: true
                },
                files  : [
                    {
                        expand: true,
                        cwd   : "<%= yeoman.app %>/assets/less",
                        src   : "**/*.less",
                        dest  : "<%= yeoman.tmp %>/assets/css",
                        ext   : ".css"
                    }
                ]
            },
            dist  : {
                options: {

                    compress     : true,
                    yuicompress  : false,
                    optimization : 2,
                    cleancss     : true,
                    paths        : ["css"],
                    syncImport   : false,
                    strictUnits  : false,
                    strictMath   : true,
                    strictImports: true,
                    ieCompat     : false,
                    report       : 'min'
                },
                files  : [
                    {
                        expand: true,
                        cwd   : "<%= yeoman.app %>/assets/less",
                        src   : "import.less",
                        dest  : "<%= yeoman.dist %>/assets/css",
                        ext   : ".css"
                    }
                ]
            }
        },

        processhtml: {
            options: {
                commentMarker: 'prochtml',
                process      : true
            },
            dist   : {
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
                }
            }
        },
        uglify     : {
            options: {
                mangle: false
            }
        },

        /****************************************************
         *
         *                    SYMFONY TASKS                *
         *
         * *************************************************/

        'sf2-console': {
            options         : {
                bin: 'backend/app/console'
            },
            //Clear the cache of the production environnement
            cache_clear_prod: {
                cmd : 'cache:clear',
                args: {
                    env: 'prod'
                }
            },
            //Clear the cache of the development environnement
            cache_clear_dev : {
                cmd : 'cache:clear',
                args: {
                    env: 'dev'
                }
            },
            //Clear the cache of the production/developpement environnement
            cache_clear     : {
                cmd: 'cache:clear'
            },
            //concat and minimify all assets for prod environnement
            assets_dump     : {
                cmd : 'assetic:dump',
                args: {}
            },
            //Install all assets (take everything from Resources directory of each bundle to append it in web/bundle/
            assets_install  : {
                cmd : 'assets:install backend/web',
                args: { symlink: true}
            },
            //Remove the database (specified in app/config/parameters.yml)
            database_drop   : {
                cmd : 'doctrine:database:drop',
                args: { force: true}
            },
            //Create the database (specified in app/config/parameters.yml)
            database_create : {
                cmd: 'doctrine:database:create'
            },
            //Create the schema of the database
            database_update : {
                cmd : 'doctrine:schema:update',
                args: { force: true}
            },
            //Insert basic data including all default values for categories or roles
            database_init   : {
                cmd: 'sympozer:database:init'
            },
            //create an admin user on the system
            admin_create    : {
                cmd: 'sympozer:admin:create admin admin@admin.fr admin'
            },
            //clear metadata from cache
            clear_metadata  : {
                cmd: 'doctrine:cache:clear-metadata'
            },
            //clear query from cache
            clear_query     : {
                cmd: 'doctrine:cache:clear-query'
            },
            //clear query result result from cache
            clear_result    : {
                cmd: 'doctrine:cache:clear-result'
            },
            //copy the ws config file
            copy_ws_config  : {
                cmd: 'sympozer:wsconfig:copy --to-path <%= yeoman.app %>/js/ws-config.js --server-base-path <%= yeoman.local_config.serverRootPath %>'
            }
        },

        //Insert all import tag for theme files if exists into the import.less file
        unfold       : {
            options: {
                types: {
                    'less': {
                        template: '<link href="$PATH$" rel="stylesheet/less" media="all">'
                    }
                }

            },

            files: {
                src: '<%= yeoman.app %>/index.html'

            }
        }

    });

    /************************* TASKS CHAINS *******************************************/


    /** TEST **/
        //single run tests
    grunt.registerTask('test', ['test:unit', 'test:e2e']);
    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('test:e2e', ['chmod:cache_log', 'connect:testserver', 'protractor:singlerun']);


    /** UTILS **/
    grunt.registerTask('cache_clear', ['chmod:cache_log', 'shell:clear_cache_dir', 'sf2-console:clear_metadata', 'sf2-console:clear_query', 'sf2-console:clear_result', 'chmod:cache_log'])


    /** INSTALL **/
    grunt.registerTask('install', ['shell:protractor_install', 'sf2-console:database_create', 'update']);

    /** DEVELOPMENT **/
    grunt.registerTask('reset_db', ['chmod:cache_log', 'sf2-console:database_drop', 'sf2-console:database_create', 'sf2-console:database_update',
                                    'sf2-console:database_init', 'sf2-console:admin_create', 'cache_clear']);

    /** DEVELOPMENT **/
    grunt.registerTask('update_db', ['chmod:cache_log', 'sf2-console:database_update', 'cache_clear']);


    grunt.registerTask('update_dependencies', ['bower-install-simple', 'bowerInstall', 'unfold', 'cache_clear']);

    grunt.registerTask('dev', ['reset_db', 'update_dependencies', 'watch', 'open:devserver']);

    grunt.registerTask('update', ['update_db', 'update_dependencies', 'sf2-console:copy_ws_config']);


    /** PRODUCTION **/

    grunt.registerTask('prod', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        //Empty dist folder
        'clean:dist',
        //Install bower dependencies
        'bowerInstall',
        //Compile html template files (remove comments etc..) and append to Dist dir
        'htmlmin:app',
        //Compile module html template files (remove comments etc..) and append to Dist dir
        'htmlmin:modules',
        //Append all html template into a single js file
//        'ngtemplates:app',
        //Append all module html template into a single js file
//        'ngtemplates:modules',
        //Read the index.html build markup
        'useminPrepare',
        'concurrent:dist',
        'less:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        // 'cdnify',
        'cssmin',
        'uglify',
//        'rev',
        'usemin',
        'imagemin',
        'processhtml:dist',
        'sf2-console:copy_ws_config'
    ]);

    grunt.registerTask('default', [
        // 'newer:jshint',
        // 'test',
        'build'
    ]);

};