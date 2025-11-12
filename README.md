# Demoblaze Test Automation

WebDriverIO automated testing project for [demoblaze.com](https://www.demoblaze.com) - a demo e-commerce website.

## Project Structure

```
├── test/
│   ├── pageobjects/
│   │   ├── base.page.js       # Base page object with common methods
│   │   ├── home.page.js        # Home page object (navigation, categories, products)
│   │   ├── product.page.js     # Product details page object
│   │   └── cart.page.js        # Shopping cart page object
│   └── specs/
│       ├── navigation.test.js      # Navigation and UI tests
│       ├── products.test.js        # Product browsing tests
│       ├── cart.test.js            # Shopping cart tests
│       ├── authentication.test.js  # Login/signup tests
│       └── e2e-purchase.test.js    # End-to-end purchase flow tests
├── wdio.conf.js               # WebDriverIO configuration
└── package.json

```

## Features Tested

### Navigation
- Home page loading
- Category filtering (Phones, Laptops, Monitors)
- Navigation menu functionality
- Modal interactions (Login, Signup, Contact)

### Product Management
- Product listing and display
- Product details viewing
- Add to cart functionality
- Category-based product filtering

### Shopping Cart
- Add/remove products
- Cart total calculation
- Empty cart handling
- Multiple product management

### Purchase Flow
- Complete checkout process
- Order form validation
- Purchase confirmation
- Multi-product purchases

### Authentication
- Login modal interaction
- Signup modal interaction
- Form validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chrome browser
- Java 17+ (for Allure reports)

## Installation

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npm test -- --spec test/specs/navigation.test.js
```

Run tests in Chrome:
```bash
npm run test:chrome
```

## Allure Reports

Run tests and generate Allure report:
```bash
npm run test:allure
```

Or generate report from existing results:
```bash
npm run allure:generate
npm run allure:open
```

**Note:** Allure requires Java. If you encounter Java compatibility issues, see [JAVA_SETUP.md](JAVA_SETUP.md) for solutions.

## Configuration

The WebDriverIO configuration is in `wdio.conf.js`. Key settings:

- **Base URL**: https://www.demoblaze.com
- **Browser**: Chrome
- **Framework**: Mocha
- **Timeout**: 60 seconds
- **Reporters**: Spec, Allure

## Page Objects

### BasePage
Common methods used across all page objects:
- `open(path)` - Navigate to a page
- `waitForDisplayed(element, timeout)` - Wait for element to display
- `waitForClickable(element, timeout)` - Wait for element to be clickable
- `getTitle()` - Get page title

### HomePage
Methods for home page interaction:
- `selectCategory(category)` - Filter by category
- `getProductNames()` - Get all product names
- `clickProduct(productName)` - Click on a product
- `login(username, password)` - Perform login
- `signup(username, password)` - Perform signup
- `goToCart()` - Navigate to cart

### ProductPage
Methods for product details:
- `getProductName()` - Get product name
- `getProductPrice()` - Get product price
- `addToCart()` - Add product to cart
- `addToCartWithAlert()` - Add to cart and handle alert

### CartPage
Methods for cart management:
- `getCartItems()` - Get all items in cart
- `getTotalPrice()` - Get total price
- `deleteItemByIndex(index)` - Remove item from cart
- `placeOrder(orderData)` - Complete purchase
- `clearCart()` - Remove all items

## Test Execution Notes

- Tests automatically clear the cart before cart-related tests
- Authentication tests use invalid credentials (uncomment valid credential tests if available)
- Alerts are automatically handled in relevant methods
- Wait times are configured for dynamic content loading

## Troubleshooting

If tests fail:
1. Ensure Chrome browser is up to date
2. Check internet connection
3. Verify demoblaze.com is accessible
4. Clear browser cache and cookies
5. Check console logs for detailed error messages

## Contributing

1. Follow the existing page object pattern
2. Use descriptive test names
3. Add comments for complex logic
4. Ensure tests are independent and can run in any order

## License

ISC
