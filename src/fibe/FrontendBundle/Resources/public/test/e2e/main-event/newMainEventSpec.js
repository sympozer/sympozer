describe('new main event workflow test - ', function() {

    var ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
//    var newMainEventBtn = element.all(by.css('.sidebar-nav a:first-child')).get(0);
//    var newMainEventFormSubmit = element(by.css('[name="conferenceNewForm"]'));

    it('should open the main event new form', function() {
        ptor.get('#/');
//        newMainEventBtn.click();
//        expect(ptor.getCurrentUrl()).toMatch("/mainEvents/new");
    })


    it('should not submit empty form', function() {
//        newMainEventFormSubmit.submit();
//        expect(ptor.getCurrentUrl()).toMatch("/mainEvents/new");
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
