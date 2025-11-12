export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--disable-gpu', 
                '--window-size=1920,1080',
                '--disable-blink-features=AutomationControlled',
                '--disable-save-password-bubble',
                '--disable-notifications',
                '--disable-infobars',
                '--no-default-browser-check',
                '--disable-popup-blocking'
            ],
            prefs: {
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false,
                'profile.default_content_setting_values.notifications': 2,
                'profile.default_content_settings.popups': 0
            },
            excludeSwitches: ['enable-automation', 'enable-logging']
        }
    }],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.demoblaze.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    
    //
    // =====
    // Hooks
    // =====
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    /**
     * Gets executed before test execution begins. At this point you can access all global
     * variables, such as `browser`. It is the perfect place to define custom commands.
     */
    before: function (capabilities, specs) {
        browser.maximizeWindow();
    },
}
