describe('login workflow test - ', function() {

    var ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;

    var usernameInput = element(by.model('user.username'));
    var passwordInput = element(by.model('user.password'));
    var formSubmit =  element(by.css('[ng-click="$modalSuccess()"]'));
    var loginModalTrigger = element(by.css('[ng-click="showLoginPopup()"]'));
    var loginModal = by.id('complexDialog');


    it('should open the login modal', function() {
        ptor.get('#');
        loginModalTrigger.click();
        expect(ptor.isElementPresent(loginModal)).toBe(true);
    });

    it('should not submit the login form', function() {
        usernameInput.sendKeys('usernametest');
        formSubmit.click();
        expect(ptor.isElementPresent(loginModal)).toBe(true);
        usernameInput.clear();
    });

    it('should login the admin user', function() {
        usernameInput.sendKeys('admin');
        passwordInput.sendKeys('admin');
        formSubmit.click();
        expect(ptor.isElementPresent(loginModal)).toBe(false);
    });
});
