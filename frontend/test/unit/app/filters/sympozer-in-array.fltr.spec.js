/**
 * @TODO: define tests
 */
describe('Test inArrayDrv - ', function() {

    //Test mock objects
    var obj1 = {id: '1', label : 'val1'};
    var obj2 = {id: '2', label : 'val2'};
    var obj3 = {id: '3', label : 'val3'};
    var testArray = [obj1, obj2, obj3];

    //Sympozer app has to be l  oaded first
    beforeEach(function(){
        module('sympozerApp')
    });

    it('should be defined', inject(function(inArrayFilter) {
        expect(inArrayFilter).not.toBeNull();
    }));

    //Check if correct values return true
    it("should return true", inject(function (inArrayFilter) {
        expect(inArrayFilter('id', 1, testArray)).toBeTruthy();
        expect(inArrayFilter('id', 2, testArray)).toBeTruthy();
        expect(inArrayFilter('id', 3, testArray)).toBeTruthy();
        expect(inArrayFilter('label', 'val3', testArray)).toBeTruthy();

    }));

    //Check if wrong values return false
    it("should return false", inject(function (inArrayFilter) {
        expect(inArrayFilter('id', 5, testArray)).toBeFalsy();
        expect(inArrayFilter('label', 'testlabel', testArray)).toBeFalsy();
        expect(inArrayFilter('testKey', 'o', testArray)).toBeFalsy();
    }));
});


