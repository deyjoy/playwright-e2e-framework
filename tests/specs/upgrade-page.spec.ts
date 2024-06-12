import { test } from "../fixtures/base"; // Import the custom test from the base module

/**
 * Test Case: Open Upgrade Page
 * 
 * This test case utilizes the custom fixture to navigate to the Upgrade page.
 * The openUpgradePage fixture is instantiated and provided by the custom fixture setup.
 */

test.describe('Upgrade Page Tests', () => {
    test.beforeEach(async ({ upgradesOffersPage }) => {
        await test.step('Navigate to the Upgrade page', async () => {
            await upgradesOffersPage.gotoUpgradePage();
        });
    });

    test.describe('App/Homepage Load', () => {
        test('Select language', async ({ upgradesOffersPage }) => {
            /** Temporary measures */
            if (process.env.CI) {
                test.skip();
            } else {
                await upgradesOffersPage.selectLanguage();
            }
        });
    
        test('Check login button and modal', async ({ upgradesOffersPage }) => {
            await test.step('Check for the presence of the login button', async () => {
                await upgradesOffersPage.checkLoginButton();
            });
            await test.step('Check for the login modal', async () => {
                await upgradesOffersPage.checkLoginModal();
            });
        });

        test('Check for tabs', async({ upgradesOffersPage }) => {
            await test.step('Check the view of Offers tab and capture screenshot', async() => {
                await upgradesOffersPage.checkTab('Offer');
            });
            await test.step('Check the view of Upgrades tab and capture screenshot', async() => {
                await upgradesOffersPage.checkTab('Upgrades');
            });
        });
    });
    // If the test fails, capture a screenshot and save it to the test-results/screenshots/ folder
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status === 'failed') {
            await page.screenshot({ path: `test-results/screenshots/${testInfo.title.replace(/ /g, '_')}.png` });
        }
        // Close the page after each test to clean up
        await page.close();
    });
});