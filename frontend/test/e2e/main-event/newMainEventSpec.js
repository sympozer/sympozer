describe('new main event workflow test - ', function() {

    var ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    var newMainEventFormSubmit = element(by.css('[name="conferenceForm"]'));

    beforeEach(function(){

    })

    it('should open the main event new form', function() {
        ptor.get('#/home/mainEvents/index');

        var newMainEventBtn = element(by.css('#newMainEventBtn'));

        newMainEventBtn.click();
        expect(ptor.getCurrentUrl()).toMatch("/home/mainEvents/new");
    })


    it('should not submit empty form', function() {
        newMainEventFormSubmit.submit();
        expect(ptor.getCurrentUrl()).toMatch("/home/mainEvents/new");
    })

    it('should not submit unvalid form', function() {
//        var usernameInput = element(by.model('user.username'));
//        usernameInput.sendKeys('usernametest');
//
//        var usernameInput = element(by.model('user.username'));
//        usernameInput.sendKeys('usernametest');
//
//        var usernameInput = element(by.model('user.username'));
//        usernameInput.sendKeys('usernametest');
//
//        var usernameInput = element(by.model('user.username'));
//        usernameInput.sendKeys('usernametest');

    })




});
