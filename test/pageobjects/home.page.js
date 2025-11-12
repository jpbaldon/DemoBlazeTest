import BasePage from './base.page.js';

/**
 * Home Page Object for demoblaze.com
 * Contains selectors and methods for the home page
 */
class HomePage extends BasePage {
    /**
     * Define selectors using getter methods
     */
    get navHome() { return $('#navbarExample a[href="index.html"]'); }
    get navContact() { return $('a[data-target="#exampleModal"]'); }
    get navAboutUs() { return $('a[data-target="#videoModal"]'); }
    get navCart() { return $('#cartur'); }
    get navLogin() { return $('#login2'); }
    get navSignup() { return $('#signin2'); }
    get navLogout() { return $('#logout2'); }
    get navUsername() { return $('#nameofuser'); }
    
    // Categories
    get categoryPhones() { return $('=Phones'); }
    get categoryLaptops() { return $('=Laptops'); }
    get categoryMonitors() { return $('=Monitors'); }
    
    // Product items
    get productItems() { return $$('.card'); }
    get productTitles() { return $$('.card-title a'); }
    get productPrices() { return $$('.card-block h5'); }
    
    // Carousel
    get carouselNext() { return $('.carousel-control-next'); }
    get carouselPrev() { return $('.carousel-control-prev'); }
    
    // Modal elements
    get loginModal() { return $('#logInModal'); }
    get loginUsername() { return $('#loginusername'); }
    get loginPassword() { return $('#loginpassword'); }
    get loginButton() { return $('button[onclick="logIn()"]'); }
    
    get signupModal() { return $('#signInModal'); }
    get signupUsername() { return $('#sign-username'); }
    get signupPassword() { return $('#sign-password'); }
    get signupButton() { return $('button[onclick="register()"]'); }
    
    get contactModal() { return $('#exampleModal'); }
    get contactEmail() { return $('#recipient-email'); }
    get contactName() { return $('#recipient-name'); }
    get contactMessage() { return $('#message-text'); }
    get contactSendButton() { return $('button[onclick="send()"]'); }

    /**
     * Opens the home page
     */
    open() {
        return super.open('/');
    }

    /**
     * Click on a specific category
     * @param {string} category - category name (Phones, Laptops, Monitors)
     */
    async selectCategory(category) {
        const categoryElement = await $(`=${category}`);
        await categoryElement.waitForClickable();
        await categoryElement.click();
        await browser.pause(1000); // Wait for products to load
    }

    /**
     * Get all product names displayed on the page
     * @returns {Promise<string[]>} array of product names
     */
    async getProductNames() {
        const titles = await this.productTitles;
        const names = [];
        for (const title of titles) {
            names.push(await title.getText());
        }
        return names;
    }

    /**
     * Click on a product by name
     * @param {string} productName - name of the product to click
     */
    async clickProduct(productName) {
        const productLink = await $(`a=${productName}`);
        await productLink.waitForClickable();
        await productLink.click();
    }

    /**
     * Click on a product by index
     * @param {number} index - index of the product (0-based)
     */
    async clickProductByIndex(index) {
        await browser.pause(500); // Wait for products to load
        const titles = await $$('.card-title a');
        if (titles.length > index) {
            await titles[index].waitForClickable({ timeout: 5000 });
            await titles[index].click();
        } else {
            throw new Error(`Product at index ${index} not found. Found ${titles.length} products`);
        }
    }

    /**
     * Open login modal and perform login
     * @param {string} username - username
     * @param {string} password - password
     */
    async login(username, password) {
        await this.navLogin.click();
        await this.loginUsername.waitForDisplayed();
        await this.loginUsername.setValue(username);
        await this.loginPassword.setValue(password);
        await this.loginButton.click();
        await browser.pause(1000); // Wait for login to complete
    }

    /**
     * Open signup modal and perform signup
     * @param {string} username - username
     * @param {string} password - password
     */
    async signup(username, password) {
        await this.navSignup.click();
        await this.signupUsername.waitForDisplayed();
        await this.signupUsername.setValue(username);
        await this.signupPassword.setValue(password);
        await this.signupButton.click();
        await browser.pause(1000); // Wait for signup to complete
    }

    /**
     * Check if user is logged in
     * @returns {Promise<boolean>} true if logged in
     */
    async isLoggedIn() {
        try {
            await this.navUsername.waitForDisplayed({ timeout: 2000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get logged in username
     * @returns {Promise<string>} username
     */
    async getLoggedInUsername() {
        const text = await this.navUsername.getText();
        return text.replace('Welcome ', '');
    }

    /**
     * Logout
     */
    async logout() {
        await this.navLogout.click();
        await browser.pause(500);
    }

    /**
     * Navigate to cart
     */
    async goToCart() {
        await this.navCart.click();
        await browser.pause(500);
    }

    /**
     * Send contact message
     * @param {string} email - contact email
     * @param {string} name - contact name
     * @param {string} message - message text
     */
    async sendContactMessage(email, name, message) {
        await this.navContact.click();
        await this.contactEmail.waitForDisplayed();
        await this.contactEmail.setValue(email);
        await this.contactName.setValue(name);
        await this.contactMessage.setValue(message);
        await this.contactSendButton.click();
    }

    /**
     * Handle alert and return its text
     * @returns {Promise<string>} alert text
     */
    async getAlertText() {
        await browser.pause(500);
        const alertText = await browser.getAlertText();
        await browser.acceptAlert();
        return alertText;
    }
}

export default new HomePage();
