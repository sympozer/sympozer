module.exports = function(config) {
    config.set({
        //Declare all file to load before executing tests
        files : [
            'vendors/jquery/jquery.min.js',
            'vendors/angular/angular.js',
            'vendors/angular-mocks/angular-mocks.js',
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
            'vendors/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
            'vendors/angular-boostrap-ui/src/transition/transition.js',

            'vendors/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',

            'vendors/bootstrap-tags/dist/js/bootstrap-tags.min.js',
            'vendors/select2/select2.min.js',
            'vendors/angular-mocks/angular-mocks.js',

            'test/unit/**/*.js',

            'app/js/*.js',
            'app/js/**/*.js',

            'test/global-config.mock.js',
            'app/modules/**/*.js',

        ],
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers: ['/usr/bin/chromium-browser', 'PhantomJS'],
        autoWatch: false,
        singleRun: true,
        logLevel: config.LOG_DEBUG,
        colors: true
    });
};
