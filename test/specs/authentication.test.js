import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'

describe('Demoblaze Authentication Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
    });
    // AUTH TEST #1
    it('should open login modal', async () => {
        await HomePage.navLogin.click();
        await wdioExpect(HomePage.loginModal).toBeDisplayed();
        await wdioExpect(HomePage.loginUsername).toBeDisplayed();
        await wdioExpect(HomePage.loginPassword).toBeDisplayed();
    });
    // AUTH TEST #2
    it('should open signup modal', async () => {
        await HomePage.navSignup.click();
        await wdioExpect(HomePage.signupModal).toBeDisplayed();
        await wdioExpect(HomePage.signupUsername).toBeDisplayed();
        await wdioExpect(HomePage.signupPassword).toBeDisplayed();
    });
    // AUTH TEST #3
    it('should show alert for invalid login', async () => {
        await HomePage.login('invaliduser123456', 'invalidpass123456');
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('User does not exist');
    });
    // AUTH TEST #4
    it('should show alert for empty login credentials', async () => {
        await HomePage.navLogin.waitForClickable({ timeout: 1000 });
        await HomePage.navLogin.click();
        await HomePage.loginButton.waitForClickable({ timeout: 1000 });
        await HomePage.loginButton.click();
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('Please fill out Username and Password');
    });
    // AUTH TEST #5
    it('should show alert when trying to signup with existing user', async () => {
        // Using a common test username that likely exists
        await HomePage.signup('testuser', 'testpass');
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('already exist');
    });
    // AUTH TEST #6
    it('should display signup form fields', async () => {
        await HomePage.navSignup.click();
        
        await wdioExpect(HomePage.signupUsername).toBeDisplayed();
        await wdioExpect(HomePage.signupPassword).toBeDisplayed();
        await wdioExpect(HomePage.signupButton).toBeDisplayed();
    });
    // AUTH TEST #7
    it('should display login form fields', async () => {
        await HomePage.navLogin.click();
        
        await wdioExpect(HomePage.loginUsername).toBeDisplayed();
        await wdioExpect(HomePage.loginPassword).toBeDisplayed();
        await wdioExpect(HomePage.loginButton).toBeDisplayed();
    });

    // Note: Uncomment and modify these tests if you have valid test credentials
    /*
    it('should login successfully with valid credentials', async () => {
        await HomePage.login('validuser', 'validpass');
        const isLoggedIn = await HomePage.isLoggedIn();
        expect(isLoggedIn).to.be.true;
        
        const username = await HomePage.getLoggedInUsername();
        expect(username).to.equal('validuser');
    });

    it('should logout successfully', async () => {
        await HomePage.login('validuser', 'validpass');
        const isLoggedIn = await HomePage.isLoggedIn();
        expect(isLoggedIn).to.be.true;
        
        await HomePage.logout();
        const isStillLoggedIn = await HomePage.isLoggedIn();
        expect(isStillLoggedIn).to.be.false;
    });
    */
});
