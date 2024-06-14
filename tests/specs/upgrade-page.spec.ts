import { test } from "../fixtures/base"; // Import the custom test from the base module
import { PageUtilities } from "../utils/page-utilities";

/**
 * Test Case: Open Upgrades Offers Page
 * 
 * This test case utilizes the custom fixture to navigate to the Upgrades Offers page.
 * The UpgradesOffersPage fixture is instantiated and provided by the custom fixture setup.
 */

test.describe('Upgrades Offers Page Tests', () => {
    test.beforeEach(async ({ upgradesOffersPage }) => {
        console.log('Running beforeEach hook');
        await upgradesOffersPage.gotoUpgradesOffersPage();
    });

    test.describe('App/Homepage Load', () => {
        test('Check language selection dropdown', async ({ pageUtilities, upgradesOffersPage }) => {
            // Array of language codes to be tested
            const languageCodes = ['EN', 'HE', 'DE', 'PL', 'RU', 'ES', 'FR', 'PT', 'IT'];
        
            for (const languageCode of languageCodes) {
                console.log(`Testing language: ${languageCode}`);
                try {
                    await test.step('Select language', async () => {
                        await upgradesOffersPage.selectLanguage(languageCode);
                    });
                    await test.step('Wait for page to load and verify language selection in locator', async () => {
                        // Wait for any necessary navigation or changes
                        await pageUtilities.isPageLoaded();
                        await upgradesOffersPage.verifyLanguageSelectionInLocator(languageCode);
                    });
                    await test.step('Verify language selection in query params', async () => {
                        await upgradesOffersPage.verifyLanguageSelectionInQueryParams(languageCode);
                    });
                } catch (error) {
                    console.error(`Error testing language ${languageCode}:`, error);
                    throw error;
                }
            }
        });
        
        test('Check login button', async ({ pageUtilities }) => {
            await test.step('Check for button name', async () => {
                await pageUtilities.verifyTextInElementByTestId('point-login-button', 'Login');
            });
            await test.step('Check if any login rect graphic element is visible', async () => {
                await pageUtilities.verifyElementVisibility('rect');
            });
        });
        test('Check Login modal', async ({ upgradesOffersPage, pageUtilities }) => {
            await test.step('Open Login modal', async() => {
                await pageUtilities.clickOnElementByTestId('point-login-button');
            });
            await test.step('Check header text', async() => {
                upgradesOffersPage.verifyLoginModalHeaderIsVisible();
            });
            await test.step('Check text input fields', async() => {
                await upgradesOffersPage.verifyLoginModalInputFields();
            });
            await test.step('Check buttons', async() => {
                await upgradesOffersPage.verifyLoginModalButtons();
            });
        });
    });

    test.describe('Navigations', () => {
        test.describe('Tabs navigations', () => {
            test('Navigate to Offers tab and capture screenshot', async ({ upgradesOffersPage, pageUtilities }) => {
                await test.step('Click on the Offers tab', async () => {
                    const tabName = await pageUtilities.getTabName('Offer');
                    /** Will consider using a more specific wait condition later if possible */
                    // Wait for the scroll action to complete if needed
                    await pageUtilities.waitForTimeout(1000);
                    // Click on the Offers tab
                    await pageUtilities.clickOnExactText(tabName);
                });
                await test.step('Match with query params and captures screenshot', async () => {
                    // Query params contains the name in plural in lowercase
                    await upgradesOffersPage.matchWithQueryParam('offers');
                    await pageUtilities.captureScreenshot('offers');
                });
            });
            test('Navigate to Upgrades tab and capture screenshot', async ({ upgradesOffersPage, pageUtilities }) => {
                await test.step('Click on the Upgrades tab', async () => {
                    const tabName = await pageUtilities.getTabName('Upgrade');
                    /** Will consider using a more specific wait condition later if possible */
                    // Wait for the scroll action to complete if needed
                    await pageUtilities.waitForTimeout(1000);
                    // Click on the Upgrades tab
                    await pageUtilities.clickOnExactText(tabName);
                });
                await test.step('Match with query params and captures screenshot', async () => {
                    // Query params contains the name in plural in lowercase
                    await upgradesOffersPage.matchWithQueryParam('upgrades');
                    await pageUtilities.captureScreenshot('upgrades');
                });
            });
        });

        test('Navigate to review page for bidding and return using browser back button', async ({ upgradesOffersPage }) => {
        
            await test.step('Click on Place Bid button', async () => {
                await upgradesOffersPage.clickPlaceBidButton();
            });
        
            await test.step('Verify bidding confirmation', async () => {
                await upgradesOffersPage.verifyBiddingConfirmation();
            });
        
            await test.step('Click on Continue button', async () => {
                await upgradesOffersPage.clickContinueButton();
            });

            await test.step('Verify Review page is displayed', async () => {
                await upgradesOffersPage.verifyReviewPageDisplayed();
            });
        
            await test.step('Verify Review page URL and query parameters', async () => {
                await upgradesOffersPage.verifyReviewPageUrl();
            });

            await test.step('Go back to the previous page', async () => {
                await upgradesOffersPage.goBackToPreviousPage();
            });

            await test.step('Verify query parameters on the Upgrades Offers page', async () => {
                await upgradesOffersPage.verifyQueryParamsOnUpgradesOffersPage('deal_kind', 'upgrades', 'deal_kind query parameter should contain "upgrades"');
            });
        });
    });

    test.afterEach(async ({ pageUtilities }, testInfo) => {
        console.log('Running afterEach hook');
        if (testInfo.status === 'failed') {
            // Capture a screenshot an save in test-results/screenshots folder
            await pageUtilities.captureScreenshot(testInfo);
        }
        // Close the page after each test to clean up
        await pageUtilities.closePage();
    });
});