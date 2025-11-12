import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'

describe('Demoblaze Authentication Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
    });

    it('should open login modal', async () => {
        await HomePage.navLogin.click();
        await wdioExpect(HomePage.loginModal).toBeDisplayed();
        await wdioExpect(HomePage.loginUsername).toBeDisplayed();
        await wdioExpect(HomePage.loginPassword).toBeDisplayed();
    });

    it('should open signup modal', async () => {
        await HomePage.navSignup.click();
        await wdioExpect(HomePage.signupModal).toBeDisplayed();
        await wdioExpect(HomePage.signupUsername).toBeDisplayed();
        await wdioExpect(HomePage.signupPassword).toBeDisplayed();
    });

    it('should show alert for invalid login', async () => {
        await HomePage.login('invaliduser123456', 'invalidpass123456');
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('User does not exist');
    });

    it('should show alert for empty login credentials', async () => {
        await HomePage.navLogin.click();
        await HomePage.loginButton.click();
        await browser.pause(500);
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('Please fill out Username and Password');
    });

    it('should show alert when trying to signup with existing user', async () => {
        // Using a common test username that likely exists
        await HomePage.signup('testuser', 'testpass');
        const alertText = await HomePage.getAlertText();
        expect(alertText).to.include('already exist');
    });

    it('should display signup form fields', async () => {
        await HomePage.navSignup.click();
        
        await wdioExpect(HomePage.signupUsername).toBeDisplayed();
        await wdioExpect(HomePage.signupPassword).toBeDisplayed();
        await wdioExpect(HomePage.signupButton).toBeDisplayed();
    });

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
