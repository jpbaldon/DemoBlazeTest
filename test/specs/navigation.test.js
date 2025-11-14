import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'

describe('Demoblaze Navigation Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
    });

    it('should load the home page successfully', async () => {
        const title = await browser.getTitle();
        expect(title).to.equal('STORE');
    });

    it('should display navigation menu items', async () => {
        await wdioExpect(HomePage.navHome).toBeDisplayed();
        await wdioExpect(HomePage.navContact).toBeDisplayed();
        await wdioExpect(HomePage.navAboutUs).toBeDisplayed();
        await wdioExpect(HomePage.navCart).toBeDisplayed();
        await wdioExpect(HomePage.navLogin).toBeDisplayed();
        await wdioExpect(HomePage.navSignup).toBeDisplayed();
    });

    it('should display category filters', async () => {
        await wdioExpect(HomePage.categoryPhones).toBeDisplayed();
        await wdioExpect(HomePage.categoryLaptops).toBeDisplayed();
        await wdioExpect(HomePage.categoryMonitors).toBeDisplayed();
    });

    it('should display products on home page', async () => {
        await HomePage.waitForAllProducts();
        const products = await HomePage.productItems;
        expect(products.length).to.be.greaterThan(0);
    });

    it('should filter products by Phones category', async () => {
        await HomePage.selectCategory('Phones');
        const productNames = await HomePage.getProductNames();
        expect(productNames.length).to.be.greaterThan(0);
    });

    it('should filter products by Laptops category', async () => {
        await HomePage.selectCategory('Laptops');
        const productNames = await HomePage.getProductNames();
        expect(productNames.length).to.be.greaterThan(0);
    });

    it('should filter products by Monitors category', async () => {
        await HomePage.selectCategory('Monitors');
        const productNames = await HomePage.getProductNames();
        expect(productNames.length).to.be.greaterThan(0);
    });

    it('should navigate to cart page when cart link is clicked', async () => {
        await HomePage.goToCart();
        const url = await browser.getUrl();
        expect(url).to.include('cart.html');
    });

    it('should open login modal when login link is clicked', async () => {
        await HomePage.navLogin.click();
        await wdioExpect(HomePage.loginModal).toBeDisplayed();
    });

    it('should open signup modal when signup link is clicked', async () => {
        await HomePage.navSignup.click();
        await wdioExpect(HomePage.signupModal).toBeDisplayed();
    });

    it('should open contact modal when contact link is clicked', async () => {
        await HomePage.navContact.click();
        await wdioExpect(HomePage.contactModal).toBeDisplayed();
    });
});
