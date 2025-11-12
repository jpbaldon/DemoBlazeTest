import BasePage from './base.page.js';

/**
 * Product Page Object for demoblaze.com
 * Contains selectors and methods for individual product pages
 */
class ProductPage extends BasePage {
    /**
     * Define selectors using getter methods
     */
    get productName() { return $('.name'); }
    get productPrice() { return $('.price-container'); }
    get productDescription() { return $('#more-information p'); }
    get productImage() { return $('.item.active img'); }
    get addToCartButton() { return $('.btn-success'); }
    get homeLink() { return $('a[href="index.html"]'); }

    /**
     * Get product name
     * @returns {Promise<string>} product name
     */
    async getProductName() {
        await this.productName.waitForDisplayed();
        return await this.productName.getText();
    }

    /**
     * Get product price
     * @returns {Promise<string>} product price
     */
    async getProductPrice() {
        await this.productPrice.waitForDisplayed();
        const priceText = await this.productPrice.getText();
        // Extract just the price value (e.g., "$790" from "*includes tax\n$790")
        return priceText.split('\n')[1] || priceText;
    }

    /**
     * Get product description
     * @returns {Promise<string>} product description
     */
    async getProductDescription() {
        try {
            await this.productDescription.waitForDisplayed({ timeout: 3000 });
            return await this.productDescription.getText();
        } catch (error) {
            return '';
        }
    }

    /**
     * Add product to cart
     */
    async addToCart() {
        await this.addToCartButton.waitForClickable();
        await this.addToCartButton.click();
        await browser.pause(500); // Wait for alert
    }

    /**
     * Add product to cart and handle alert
     * @returns {Promise<string>} alert text
     */
    async addToCartWithAlert() {
        await this.addToCart();
        const alertText = await browser.getAlertText();
        await browser.acceptAlert();
        return alertText;
    }

    /**
     * Go back to home page
     */
    async goToHome() {
        await this.homeLink.click();
        await browser.pause(500);
    }

    /**
     * Check if product is displayed
     * @returns {Promise<boolean>} true if product details are displayed
     */
    async isProductDisplayed() {
        try {
            await this.productName.waitForDisplayed({ timeout: 5000 });
            await this.addToCartButton.waitForDisplayed({ timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new ProductPage();
