module.exports = function (config)
{
    config.set({
        //Declare all file to load before executing tests
        files     : [

            <!-- google map to load first -->
            '../app/assets/plugins/google-map/google-map-places-api.js',

            <!-- bower files -->

            '../app/bower/modernizr/modernizr.js',
            '../app/bower/jquery/dist/jquery.js',
            '../app/bower/underscore/underscore.js',
            '../app/bower/angular/angular.js',
            '../app/bower/angular-resource/angular-resource.js',
            '../app/bower/angular-cookies/angular-cookies.js',
            '../app/bower/angular-sanitize/angular-sanitize.js',
            '../app/bower/angular-route/angular-route.js',
            '../app/bower/angular-animate/angular-animate.js',
            '../app/bower/bootstrap/dist/js/bootstrap.js',
            '../app/bower/seiyria-bootstrap-slider/js/bootstrap-slider.js',
            '../app/bower/angular-bootstrap/ui-bootstrap-tpls.js',
            '../app/bower/jquery.ui/ui/jquery.ui.core.js',
            '../app/bower/jquery.ui/ui/jquery.ui.widget.js',
            '../app/bower/jquery.ui/ui/jquery.ui.mouse.js',
            '../app/bower/jquery.ui/ui/jquery.ui.draggable.js',
            '../app/bower/jquery.ui/ui/jquery.ui.resizable.js',
            '../app/bower/jquery.slimscroll/jquery.slimscroll.min.js',
            '../app/bower/jquery.easing/js/jquery.easing.js',
            '../app/bower/flot/jquery.flot.js',
            '../app/bower/flot/jquery.flot.stack.js',
            '../app/bower/flot/jquery.flot.pie.js',
            '../app/bower/flot/jquery.flot.resize.js',
            '../app/bower/flot.tooltip/js/jquery.flot.tooltip.js',
            '../app/bower/angular-ui-tree/dist/angular-ui-tree.js',
            '../app/bower/moment/moment.js',
            '../app/bower/jqvmap/jqvmap/jquery.vmap.js',
            '../app/bower/jqvmap/jqvmap/maps/jquery.vmap.world.js',
            '../app/bower/jqvmap/jqvmap/data/jquery.vmap.sampledata.js',
            '../app/bower/angular-toggle-switch/angular-toggle-switch.min.js',
            '../app/bower/ng-grid/build/ng-grid.js',
            '../app/bower/angular-xeditable/dist/js/xeditable.js',
            '../app/bower/select2/select2.js',
            '../app/bower/angular-ui-select2/src/select2.js',
            '../app/bower/google-code-prettify/src/prettify.js',
            '../app/bower/bootbox.js/bootbox.js',
            '../app/bower/jquery-autosize/jquery.autosize.js',
            '../app/bower/gmaps/gmaps.js',
            '../app/bower/jquery.pulsate/jquery.pulsate.js',
            '../app/bower/jquery.knob/js/jquery.knob.js',
            '../app/bower/jquery.sparkline/index.js',
            '../app/bower/flow.js/dist/flow.js',
            '../app/bower/ng-flow/dist/ng-flow.js',
            '../app/bower/jScrollPane/script/jquery.mousewheel.js',
            '../app/bower/jScrollPane/script/mwheelIntent.js',
            '../app/bower/jScrollPane/script/jquery.jscrollpane.min.js',
            '../app/bower/enquire/dist/enquire.js',
            '../app/bower/shufflejs/dist/jquery.shuffle.js',
            '../app/bower/pnotify/pnotify.core.js',
            '../app/bower/pnotify/pnotify.buttons.js',
            '../app/bower/pnotify/pnotify.callbacks.js',
            '../app/bower/pnotify/pnotify.confirm.js',
            '../app/bower/pnotify/pnotify.desktop.js',
            '../app/bower/pnotify/pnotify.history.js',
            '../app/bower/pnotify/pnotify.nonblock.js',
            '../app/bower/json3/lib/json3.js',
            '../app/bower/placeholdr/placeholdr.js',
            '../app/bower/iCheck/icheck.min.js',
            '../app/bower/angular-mocks/angular-mocks.js',
            '../app/bower/angular-moment/angular-moment.js',
            '../app/bower/angular-translate/angular-translate.js',
            '../app/bower/bootstrap-tags/dist/js/bootstrap-tags.js',
            '../app/bower/angular-cached-resource/angular-cached-resource.js',
            '../app/bower/angular-validation-match/dist/angular-input-match.js',
            '../app/bower/angular-validation-match/dist/angular-input-match.js',
            '../app/bower/flow.js/dist/flow.js',
            <!-- endbower -->
            <!-- plugin files -->
            '../app/assets/plugins/form-daterangepicker/daterangepicker.min.js',
            '../app/assets/plugins/fullcalendar/fullcalendar.min.js',
            '../app/assets/plugins/form-datepicker/js/bootstrap-datepicker.js',
            '../app/assets/plugins/easypiechart/angular.easypiechart.js',
            '../app/assets/plugins/datepaginator/bootstrap-datepaginator.js',
            '../app/assets/plugins/form-multiselect/js/jquery.multi-select.min.js',
            '../app/assets/plugins/form-colorpicker/js/bootstrap-colorpicker.min.js',
            '../app/assets/plugins/form-fseditor/jquery.fseditor-min.js',
            '../app/assets/plugins/form-jasnyupload/fileinput.js',
            '../app/assets/plugins/progress-skylo/skylo.js',
            '../app/assets/plugins/bootstro.js/bootstro.min.js',
            <!-- endplugin -->

            <!-- test files -->
            'unit/**/*.js',
            <!-- endtest -->

            <!-- sympozer app sources files -->
            '../app/js/app.js',
            '../app/js/ws-config.js',
            '../app/js/routes.js',
            '../app/js/config.js',
            '../app/js/**/*.js',
//            'test/global-config.mock.js',
            '../app/modules/**/*.js',
            <!-- endsources -->

        ],
//        basePath: '../app/',
        frameworks: ['jasmine'],
        reporters : ['progress'],
        browsers  : ['/usr/bin/chromium-browser', 'PhantomJS'],
        autoWatch : false,
        singleRun : true,
        logLevel  : config.LOG_DEBUG,
        colors    : true
    });
};
