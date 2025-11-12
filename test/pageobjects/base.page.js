/**
 * Base Page Object
 * Contains common methods that can be used across all page objects
 */
export default class BasePage {
    /**
     * Opens a sub page of the base URL
     * @param {string} path - path of the sub page (e.g. /login)
     */
    open(path) {
        return browser.url(path);
    }

    /**
     * Wait for an element to be displayed
     * @param {WebdriverIO.Element} element - element to wait for
     * @param {number} timeout - timeout in milliseconds
     */
    waitForDisplayed(element, timeout = 5000) {
        element.waitForDisplayed({ timeout });
    }

    /**
     * Wait for an element to be clickable
     * @param {WebdriverIO.Element} element - element to wait for
     * @param {number} timeout - timeout in milliseconds
     */
    waitForClickable(element, timeout = 5000) {
        element.waitForClickable({ timeout });
    }

    /**
     * Get the page title
     * @returns {string} page title
     */
    getTitle() {
        return browser.getTitle();
    }
}
