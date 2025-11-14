import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'
import ProductPage from '../pageobjects/product.page.js'
import CartPage from '../pageobjects/cart.page.js'
import { addStep } from '@wdio/allure-reporter'

describe('Demoblaze Cart Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
        await CartPage.open();
        // Clear cart before each test
        const isEmpty = await CartPage.isCartEmpty();
        if (!isEmpty) {
            await CartPage.clearCart();
        }
    });

    it('should display empty cart initially', async () => {
        const isEmpty = await CartPage.isCartEmpty();
        expect(isEmpty).to.be.true;
    });

    it('should add a product to cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        await CartPage.open();
        await CartPage.getCartItems();
        const itemCount = await CartPage.getCartItemCount();
        expect(itemCount).to.equal(1);
    });

    it('should display correct product details in cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        const productName = await ProductPage.getProductName();
        const productPrice = await ProductPage.getProductPrice();
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        const cartItems = await CartPage.getCartItems();
        
        expect(cartItems[0].title).to.equal(productName);
        expect(cartItems[0].price).to.equal(productPrice);
    });

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
        const itemCount = await CartPage.getCartItemCount();
        expect(itemCount).to.equal(2);
    });

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

    it('should delete product from cart', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.deleteItemByIndex(0);
        
        const isEmpty = await CartPage.isCartEmpty();
        expect(isEmpty).to.be.true;
    });

    it('should display Place Order button', async () => {
        await wdioExpect(CartPage.placeOrderButton).toBeDisplayed();
    });

    it('should open order modal when Place Order is clicked', async () => {
        await HomePage.open();
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        await CartPage.clickPlaceOrder();
        
        await wdioExpect(CartPage.orderModal).toBeDisplayed();
    });

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
