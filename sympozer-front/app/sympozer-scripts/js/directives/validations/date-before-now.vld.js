/**
 * dateBeforeNowValidator
 * @description : angular directive used to validate that the date model in argument
 * is superior than today
 *
 */
angular.module('sympozerApp').directive('dateBeforeNowValidator', function(){
    return{
        require:'ngModel',
        link: function(scope, elem, attrs, ctrl){

            //Add the validation function to the validation workflow of angularjs
            ctrl.$formatters.unshift(validateDateBeforeNow);
            ctrl.$parsers.unshift(validateDateBeforeNow);

            //Function that validate the entry date compare to today
            function validateDateBeforeNow(dateValue){
                var now = new Date();
                var date = new Date(dateValue);

                //Set validity of field if date > today
                if(date > now){
                    ctrl.$setValidity('dateBeforeNow', false);
                }else{
                    ctrl.$setValidity('dateBeforeNow', true);
                }

                return dateValue;
            }
        }
    };
});