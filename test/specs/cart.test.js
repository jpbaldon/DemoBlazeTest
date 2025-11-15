import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'
import ProductPage from '../pageobjects/product.page.js'
import CartPage from '../pageobjects/cart.page.js'
import { addStep } from '@wdio/allure-reporter'

describe('Demoblaze Cart Tests', () => {
    
    beforeEach(async () => {
        await browser.deleteCookies();

        await HomePage.open();
        await CartPage.open();

        if (!(await CartPage.isCartEmpty())) {
            await CartPage.clearCart();
        }

        // Final check
        await browser.waitUntil(async () => {
            return await CartPage.isCartEmpty();
        }, { timeout: 5000 });
    });
    // CART TEST #1
    it('should display empty cart initially', async () => {
        const isEmpty = await CartPage.isCartEmpty();
        expect(isEmpty).to.be.true;
    });
    // CART TEST #2
    it('should add a product to cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        await CartPage.open();
        await CartPage.getCartItems();
        const itemCount = await CartPage.getCartItemCount();
        expect(itemCount).to.equal(1);
    });
    // CART TEST #3
    it('should display correct product details in cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        const productName = await ProductPage.getProductName();
        addStep(`Product name captured: ${productName}`);
        const productPrice = await ProductPage.getProductPrice();
        addStep(`Product price captured: ${productPrice}`);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        const cartItems = await CartPage.getCartItems();
        
        expect(cartItems[0].title).to.equal(productName);
        addStep(`Verified product name in cart: ${cartItems[0].title}`);
          //fails because cart shows only number without $ sign or tax info
        const cartPriceNum = parseFloat(cartItems[0].price.match(/\d+/)[0]);
        const productPriceNum = parseFloat(productPrice.match(/\d+/)[0]);
        expect(cartPriceNum).to.equal(productPriceNum);
        addStep(`Verified product price in cart: ${cartItems[0].price}`);
    });
    // CART TEST #4
    it('should add multiple products to cart', async () => {
        // Add first product
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        // Add second product
        await HomePage.open();
        await HomePage.clickProductByIndex(1);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.totalPrice.waitForDisplayed();
        const itemCount = await CartPage.getCartItemCount();
        expect(itemCount).to.equal(2);
    });
    // CART TEST #5
    it('should calculate total price correctly', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        const price1 = await ProductPage.getProductPrice();
        await ProductPage.addToCartWithAlert();
        
        await HomePage.open();
        await HomePage.clickProductByIndex(1);
        const price2 = await ProductPage.getProductPrice();
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        const total = await CartPage.getTotalPrice();
        
        const expectedTotal = parseInt(price1.replace('$', '')) + parseInt(price2.replace('$', ''));
        expect(parseInt(total)).to.equal(expectedTotal);
    });
    // CART TEST #6
    it('should delete product from cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.deleteItemByIndex(0);
        
        const isEmpty = await CartPage.isCartEmpty();
        expect(isEmpty).to.be.true;
    });
    // CART TEST #7
    it('should display Place Order button', async () => {
        await wdioExpect(CartPage.placeOrderButton).toBeDisplayed();
    });
    // CART TEST #8
    it('should open order modal when Place Order is clicked', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.clickPlaceOrder();
        
        await wdioExpect(CartPage.orderModal).toBeDisplayed();
    });
    // CART TEST #9
    it('should have all form fields in order modal', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.clickPlaceOrder();
        
        await wdioExpect(CartPage.nameInput).toBeDisplayed();
        await wdioExpect(CartPage.countryInput).toBeDisplayed();
        await wdioExpect(CartPage.cityInput).toBeDisplayed();
        await wdioExpect(CartPage.creditCardInput).toBeDisplayed();
        await wdioExpect(CartPage.monthInput).toBeDisplayed();
        await wdioExpect(CartPage.yearInput).toBeDisplayed();
    });
});
