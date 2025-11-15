import BasePage from './base.page.js';

/**
 * Cart Page Object for demoblaze.com
 * Contains selectors and methods for the shopping cart page
 */
class CartPage extends BasePage {
    /**
     * Define selectors using getter methods
     */
    get cartTitle() { return $('h2=Products'); }
    get cartItems() { return $$('#tbodyid tr'); }
    get cartItemTitles() { return $$('#tbodyid tr td:nth-child(2)'); }
    get cartItemPrices() { return $$('#tbodyid tr td:nth-child(3)'); }
    get deleteButtons() { return $$('#tbodyid tr td:nth-child(4) a'); }
    get totalPrice() { return $('#totalp'); }
    get placeOrderButton() { return $('.btn-success'); }
    get continueShoppingButton() { return $('button=Continue Shopping'); }

    // Place Order Modal
    get orderModal() { return $('#orderModal'); }
    get nameInput() { return $('#name'); }
    get countryInput() { return $('#country'); }
    get cityInput() { return $('#city'); }
    get creditCardInput() { return $('#card'); }
    get monthInput() { return $('#month'); }
    get yearInput() { return $('#year'); }
    get purchaseButton() { return $('button[onclick="purchaseOrder()"]'); }
    get closeModalButton() { return $('#orderModal .close'); }

    // Confirmation Modal
    get confirmationModal() { return $('.sweet-alert'); }
    get confirmationMessage() { return $('.sweet-alert h2'); }
    get confirmationDetails() { return $('.sweet-alert .lead'); }
    get confirmationOkButton() { return $('.sweet-alert .confirm'); }

    /**
     * Opens the cart page
     */
    open() {
        return super.open('/cart.html');
    }

    /**
     * Get all items in cart
     * @returns {Promise<Array>} array of cart items with title and price
     */
    async getCartItems() {
        await this.totalPrice.waitForDisplayed();  //wait for total price to ensure all items are loaded
        const items = [];
        const titles = await this.cartItemTitles;
        const prices = await this.cartItemPrices;

        for (let i = 0; i < titles.length; i++) {
            items.push({
                title: await titles[i].getText(),
                price: await prices[i].getText()
            });
        }
        return items;
    }

    /**
     * Get total price
     * @returns {Promise<string>} total price
     */
    async getTotalPrice() {
        await this.totalPrice.waitForDisplayed();
        return await this.totalPrice.getText();
    }

    /**
     * Get number of items in cart
     * @returns {Promise<number>} number of items
     */
    async getCartItemCount() {
        try {
            const items = await this.cartItems;
            return items.length;
        } catch (error) {
            return 0;
        }
    }

    /**
     * Check if cart is empty
     * @returns {Promise<boolean>} true if cart is empty
     */
    async isCartEmpty() {
        await browser.refresh();  // make sure the DOM has been updated (in case we just deleted an item)
        const count = await this.getCartItemCount();
        return count === 0;
    }

    /**
     * Delete item from cart by index
     * @param {number} index - index of item to delete (0-based)
     */
    async deleteItemByIndex(index) {
        await this.cartItems[index].waitForDisplayed();
        const items = await this.cartItems;
        const deleteButtons = await this.deleteButtons;
        await deleteButtons[index].waitForClickable();
        await deleteButtons[index].click();
        // wait for the row to be gone
        await browser.waitUntil(async () => {
            const newItems = await this.cartItems;
            return newItems.length < items.length;
        }, { timeout: 3000, timeoutMsg: 'Item not removed from cart' });
    }

    /**
     * Delete item from cart by title
     * @param {string} title - title of item to delete
     */
    async deleteItemByTitle(title) {
        const items = await this.cartItems;
        for (let i = 0; i < items.length; i++) {
            const titleElement = await items[i].$('td:nth-child(2)');
            const itemTitle = await titleElement.getText();
            if (itemTitle === title) {
                const deleteButton = await items[i].$('a');
                await deleteButton.click();
                await browser.pause(500);
                break;
            }
        }
    }

    /**
     * Delete all items from cart
     */
    async clearCart() {
        let itemCount = await this.getCartItemCount();
        while (itemCount) {
            await this.deleteItemByIndex(0);
            itemCount = await this.getCartItemCount();
        }
    }

    /**
     * Click place order button
     */
    async clickPlaceOrder() {
        await this.placeOrderButton.waitForClickable();
        await this.placeOrderButton.click();
        await this.orderModal.waitForDisplayed();
    }

    /**
     * Fill order form
     * @param {Object} orderData - order information
     * @param {string} orderData.name - customer name
     * @param {string} orderData.country - country
     * @param {string} orderData.city - city
     * @param {string} orderData.card - credit card number
     * @param {string} orderData.month - expiry month
     * @param {string} orderData.year - expiry year
     */
    async fillOrderForm(orderData) {
        await this.nameInput.setValue(orderData.name);
        await this.countryInput.setValue(orderData.country);
        await this.cityInput.setValue(orderData.city);
        await this.creditCardInput.setValue(orderData.card);
        await this.monthInput.setValue(orderData.month);
        await this.yearInput.setValue(orderData.year);
    }

    /**
     * Complete purchase
     */
    async completePurchase() {
        await this.purchaseButton.click();
        await this.confirmationModal.waitForDisplayed();
    }

    /**
     * Place order with details
     * @param {Object} orderData - order information
     */
    async placeOrder(orderData) {
        await this.clickPlaceOrder();
        await this.fillOrderForm(orderData);
        await this.completePurchase();
    }

    /**
     * Get confirmation message
     * @returns {Promise<string>} confirmation message
     */
    async getConfirmationMessage() {
        await this.confirmationMessage.waitForDisplayed();
        return await this.confirmationMessage.getText();
    }

    /**
     * Get confirmation details (order info)
     * @returns {Promise<string>} confirmation details
     */
    async getConfirmationDetails() {
        await this.confirmationDetails.waitForDisplayed();
        return await this.confirmationDetails.getText();
    }

    /**
     * Close confirmation modal
     */
    async closeConfirmation() {
        await this.confirmationOkButton.click();
        await browser.pause(500);
    }

    /**
     * Continue shopping
     */
    async continueShopping() {
        await browser.back();
    }
}

export default new CartPage();
