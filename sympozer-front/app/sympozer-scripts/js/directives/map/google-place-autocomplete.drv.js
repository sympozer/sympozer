'use strict';

/**
 * googlePlaceAutocomplete
 *
 * @Description :
 * Directive to search into google place and propose results as autocomplete
 * @example :  <input google-place-autocomplete >
 * @type {directive}
 */
angular.module('sympozerApp').directive('googlePlaceAutocomplete', function() {
    return {
        require: 'ngModel',
        scope:{
            //Optional parameters onSelect, called when an adress is selected with formattedResults
            onSelect : '=onSelect'
        },
        link: function(scope, element, attrs, model) {

            //Options for the autocomplete
            var options = {
                types: [],
                componentRestrictions: {}
            };

            //Declare new google map object and attach it to the dom element (element[0])
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            //Transform google raw results into a controlled object containing localization info
            scope.parseResults = function(rawResults){

                //Getting google address parts
                var components = rawResults.address_components||[];

                //Initialize our new localization object
                var parsedResults={};

                for(var i=0;i<components.length;i++) {
                    var currentComp = components[i];

                    //Constructing our localization object from the raw google results
                    switch (currentComp.types[0]) {

                        case "street_number" :
                            parsedResults.streetNumber = currentComp.long_name;
                            break;
                        case "route" :
                            parsedResults.street = currentComp.long_name;
                            break;
                        case "locality" :
                            parsedResults.city = currentComp.long_name;
                            break;
                        case "postal_code":
                            parsedResults.postalCode = currentComp.long_name;

                        case "administrative_area_level_1" :
                            parsedResults.state = currentComp.long_name;
                            break;
                        case "country" :
                            parsedResults.country = currentComp.long_name;
                            parsedResults.countryCode = currentComp.short_name;
                            break;
                    }

                    //Save the full address sentence
                    parsedResults.label = parsedResults.address = rawResults.formatted_address;
                }
                return parsedResults;
            }

            //Add listener on place_changed triggered when a location is selected
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {

                //If on-select function provided then format results and trigger it
                if(scope.onSelect){
                    var parsedResults = scope.parseResults(scope.gPlace.getPlace());
                    return scope.onSelect(parsedResults);
                }else{
                    //Set model value
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                }


            });


        }
    }});
