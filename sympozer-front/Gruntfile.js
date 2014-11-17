// Generated on 2014-06-02 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist            : 'dist',
            sympozer_scripts: '<%= yeoman.app %>/sympozer-scripts',
            local_config    : grunt.file.readJSON('local-config.json')
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            less: {
                files: ['<%= yeoman.app %>/assets/less/*.less'],
                tasks: ['less:server']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/assets/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            // courtesy of Phubase Tiewthanom
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower',
                                connect.static('./bower')
                            ),
                            connect.static(require('./bower.json').appPath || 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/css/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        bowerInstall: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: '<%= yeoman.app %>/',
                exclude: ['requirejs',
                    'mocha',
                    'jquery.vmap.europe.js',
                    'jquery.vmap.usa.js',
                    'Chart.min.js',
                    'raphael',
                    'morris',
                    'jquery.inputmask',
                    'jquery.validate.js',
                    'jquery.stepy.js'
                ]
            }
        },

        // Renames files for browser caching purposes
        rev: {
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
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/assets/css/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            options: {
                // root: '<%= yeoman.app %>',
                relativeTo: '<%= yeoman.app %>',
                processImport: true,
                noAdvanced: true
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'images/{,*/}*.{webp}',
                        'fonts/*',
                        'assets/**',
                        'bower/jquery.inputmask/dist/jquery.inputmask.bundle.js',
                        'bower/jquery-validation/dist/jquery.validate.js',
                        'bower/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
                        'bower/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
                        'bower/stepy/lib/jquery.stepy.js',
                        'bower/Chart.js/Chart.min.js',
                        'bower/raphael/raphael.js',
                        'bower/morris.js/morris.js'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/assets/css',
                dest: '.tmp/assets/css',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'copy:dist'
                // 'imagemin',
                // 'svgmin'
            ]
        },
        ngtemplates:  {
            app: {
                src:      'app/views/templates/**.html',
                dest:     'app/scripts/templates/templates.js',
                options:  {
                    url:    function(url) { return url.replace('app/views/', ''); },
                    bootstrap: function(module, script) {
                        return "angular.module('theme.templates', []).run(['$templateCache', function ($templateCache) {\n"+script+"}])";
                    }
                }
            }
        },

        less: {
            server: {
                options: {
                    // strictMath: true,
                    dumpLineNumbers: true,
                    sourceMap: true,
                    sourceMapRootpath: "",
                    outputSourceFiles: true
                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= yeoman.app %>/assets/less",
                        src: "styles.less",
                        dest: ".tmp/assets/css",
                        ext: ".css"
                    }
                ]
            },
            dist: {
                options: {
                    cleancss: true,
                    report: 'min'
                },
                files: [
                    {
                        expand: true,
                        cwd: "<%= yeoman.app %>/assets/less",
                        src: "styles.less",
                        dest: ".tmp/assets/css",
                        ext: ".css"
                    }
                ]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        processhtml: {
            options: {
                commentMarker: 'prochtml',
                process: true
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
                }
            }
        },
        uglify: {
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
                bin: '../app/console'
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
                cmd : 'assets:install web',
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
            //copy the ws config file
            copy_ws_config  : {
                cmd: 'sympozer:wsconfig:copy --to-path <%= yeoman.sympozer_scripts %>/js/ws-config.js --server-base-path <%= yeoman.local_config.serverRootPath %>'
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bowerInstall',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bowerInstall',
        'ngtemplates',
        'useminPrepare',
        'concurrent:dist',
        'less:dist',
        'autoprefixer',
        'concat',
        // 'ngmin',
        'copy:dist',
        // 'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'processhtml:dist',
        'sf2-console:copy_ws_config'
        // 'htmlmin',

    ]);

    grunt.registerTask('default', [
        // 'newer:jshint',
        // 'test',
        'build'
    ]);
};
