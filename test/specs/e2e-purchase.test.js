import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'
import ProductPage from '../pageobjects/product.page.js'
import CartPage from '../pageobjects/cart.page.js'
import { addStep } from '@wdio/allure-reporter'

describe('Demoblaze End-to-End Purchase Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
    });

    it('should complete a full purchase flow', async () => {
        // Browse and add product to cart
        await HomePage.clickProductByIndex(0);
        addStep(`Product clicked:`);
        const productName = await ProductPage.getProductName();
        await ProductPage.addToCartWithAlert();
        addStep(`Alert accepted for adding product to cart`);
        
        // Go to cart
        await CartPage.open();
        const cartItems = await CartPage.getCartItems();
        addStep(`Cart items: ${JSON.stringify(cartItems)}`);
        expect(cartItems[0].title).to.equal(productName);
        
        // Place order
        const orderData = {
            name: 'John Doe',
            country: 'USA',
            city: 'New York',
            card: '1234567890123456',
            month: '12',
            year: '2025'
        };
        
        await CartPage.placeOrder(orderData);
        
        // Verify confirmation
        const confirmationMsg = await CartPage.getConfirmationMessage();
        expect(confirmationMsg).to.equal('Thank you for your purchase!');
        
        const details = await CartPage.getConfirmationDetails();
        expect(details).to.include('Amount');
        expect(details).to.include('Card Number');
        expect(details).to.include('Name');
        
        await CartPage.closeConfirmation();
    });

    it('should purchase multiple products', async () => {
        // Add first product
        await HomePage.selectCategory('Phones');
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        // Add second product
        await HomePage.open();
        await HomePage.selectCategory('Laptops');
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        // Go to cart and verify
        await CartPage.open();
        const itemCount = await CartPage.getCartItemCount();
        expect(itemCount).to.equal(2);
        
        // Complete purchase
        const orderData = {
            name: 'Jane Smith',
            country: 'Canada',
            city: 'Toronto',
            card: '9876543210987654',
            month: '06',
            year: '2026'
        };
        
        await CartPage.placeOrder(orderData);
        
        const confirmationMsg = await CartPage.getConfirmationMessage();
        expect(confirmationMsg).to.equal('Thank you for your purchase!');
        
        await CartPage.closeConfirmation();
    });

    it('should show order details in confirmation', async () => {
        // Add product and purchase
        await HomePage.clickProductByIndex(0);
        await ProductPage.addToCartWithAlert();
        
        await CartPage.open();
        const totalPrice = await CartPage.getTotalPrice();
        
        const orderData = {
            name: 'Test User',
            country: 'UK',
            city: 'London',
            card: '1111222233334444',
            month: '03',
            year: '2027'
        };
        
        await CartPage.placeOrder(orderData);
        
        const details = await CartPage.getConfirmationDetails();
        expect(details).to.include(totalPrice);
        expect(details).to.include(orderData.card);
        expect(details).to.include(orderData.name);
        
        await CartPage.closeConfirmation();
    });

    it('should verify purchase workflow from category selection', async () => {
        // Select category and product
        await HomePage.selectCategory('Monitors');
        const products = await HomePage.getProductNames();
        expect(products.length).to.be.greaterThan(0);
        
        await HomePage.clickProductByIndex(0);
        const productName = await ProductPage.getProductName();
        const productPrice = await ProductPage.getProductPrice();
        
        // Add to cart
        await ProductPage.addToCartWithAlert();
        
        // Verify in cart
        await CartPage.open();
        const cartItems = await CartPage.getCartItems();
        expect(cartItems[0].title).to.equal(productName);
        expect(cartItems[0].price).to.equal(productPrice);
        
        // Complete order
        const orderData = {
            name: 'Monitor Buyer',
            country: 'Australia',
            city: 'Sydney',
            card: '5555666677778888',
            month: '09',
            year: '2025'
        };
        
        await CartPage.placeOrder(orderData);
        
        const confirmationMsg = await CartPage.getConfirmationMessage();
        expect(confirmationMsg).to.equal('Thank you for your purchase!');
        
        await CartPage.closeConfirmation();
    });
});
