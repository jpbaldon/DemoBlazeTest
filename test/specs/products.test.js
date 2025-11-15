import { expect as wdioExpect } from '@wdio/globals'
import { expect } from 'chai'
import HomePage from '../pageobjects/home.page.js'
import ProductPage from '../pageobjects/product.page.js'

describe('Demoblaze Product Tests', () => {
    
    beforeEach(async () => {
        await HomePage.open();
    });
    // PRODUCTS TEST #1
    it('should display product details when a product is clicked', async () => {
        await HomePage.clickProductByIndex(0);
        const isDisplayed = await ProductPage.isProductDisplayed();
        expect(isDisplayed).to.be.true;
    });
    // PRODUCTS TEST #2
    it('should show product name on product page', async () => {
        await HomePage.clickProductByIndex(0);
        const productName = await ProductPage.getProductName();
        expect(productName).to.not.be.empty;
    });
    // PRODUCTS TEST #3
    it('should show product price on product page', async () => {
        await HomePage.clickProductByIndex(0);
        const productPrice = await ProductPage.getProductPrice();
        expect(productPrice).to.include('$');
    });
    // PRODUCTS TEST #4
    it('should have an add to cart button on product page', async () => {
        await HomePage.clickProductByIndex(0);
        await wdioExpect(ProductPage.addToCartButton).toBeDisplayed();
        await wdioExpect(ProductPage.addToCartButton).toBeClickable();
    });
    // PRODUCTS TEST #5
    it('should add product to cart successfully', async () => {
        await HomePage.clickProductByIndex(0);
        const alertText = await ProductPage.addToCartWithAlert();
        expect(alertText).to.equal('Product added');
    });
    // PRODUCTS TEST #6
    it('should be able to navigate back to home from product page', async () => {
        await HomePage.clickProductByIndex(0);
        await ProductPage.goToHome();
        const url = await browser.getUrl();
        expect(url).to.include('index.html');
    });
    // PRODUCTS TEST #7
    it('should display different products in Phones category', async () => {
        await HomePage.selectCategory('Phones');
        const products = await HomePage.getProductNames();
        expect(products.length).to.be.greaterThan(0);
    });
    // PRODUCTS TEST #8
    it('should display different products in Laptops category', async () => {
        await HomePage.selectCategory('Laptops');
        const products = await HomePage.getProductNames();
        expect(products.length).to.be.greaterThan(0);
    });
    // PRODUCTS TEST #9
    it('should display different products in Monitors category', async () => {
        await HomePage.selectCategory('Monitors');
        const products = await HomePage.getProductNames();
        expect(products.length).to.be.greaterThan(0);
    });
    // PRODUCTS TEST #10
    it('should navigate to product and verify all elements are present', async () => {
        await HomePage.clickProductByIndex(0);
        
        await wdioExpect(ProductPage.productName).toBeDisplayed();
        await wdioExpect(ProductPage.productPrice).toBeDisplayed();
        await wdioExpect(ProductPage.addToCartButton).toBeDisplayed();
        await wdioExpect(ProductPage.productImage).toBeDisplayed();
    });
});
