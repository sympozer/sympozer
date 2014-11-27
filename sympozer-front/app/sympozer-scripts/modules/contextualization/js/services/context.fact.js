/**
 * Context factory
 *
 * Handle context changes. A user can navigate from conference to conference. The context fact is responsible
 * for persisting the current conference.
 *
 * @type {controller}
 */
angular.module('contextualizationApp').factory('contextFact', [ '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'mainEventsFact', '$location', 'pinesNotifications', 'translateFilter',
    function ( $rootScope, $routeParams, GLOBAL_CONFIG, mainEventsFact, $location, pinesNotifications, translateFilter)
    {

        /**
         * Get current main event from local storage and set current context with it
         */
        this.initContext = function(){

            //Get The current conference from localstorage
            $rootScope.currentMainEvent = JSON.parse(localStorage.getItem('currentMainEvent')) || "";

            //If a current mainEvent exist at init, trigger changes
            if($rootScope.currentMainEvent){
                $rootScope.$broadcast('contextFact:changeContext', {'newMainEvent' : $rootScope.currentMainEvent });

            }
        }

        /**
         * Triggered whenever the current conference has to change. The id of the new conference is given as an argument and the conference fetched
         * @param mainEventId
         */
        this.changeContext = function (mainEventId)
        {
            //Check if new conference different
            if($rootScope.currentMainEvent.id != mainEventId){

                //Fetch new conference
                mainEventsFact.get({id: mainEventId}, function (mainEvent)
                {
                    //Set global currentMainEvent variable
                    $rootScope.currentMainEvent = mainEvent;

                    //Trigger event for any object synchronized with context change (nav-bar for exemple)
                    $rootScope.$broadcast('contextFact:changeContext', {'newMainEvent' : mainEvent });

                    //Persist new main event to local storage
                    localStorage.setItem('currentMainEvent', JSON.stringify(mainEvent));

                    //Welcoming user in new conference
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.success'),
                        text : translateFilter('Welcome to ' + $rootScope.currentMainEvent.label),
                        type : 'success'
                    });
                });
            }
        }

        return this;
    }]);