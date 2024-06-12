import { test } from "../fixtures/base"; // Import the custom test from the base module

/**
 * Test Case: Open Upgrade Page
 * 
 * This test case utilizes the custom fixture to navigate to the Upgrade page.
 * The openUpgradePage fixture is instantiated and provided by the custom fixture setup.
 */

test.describe('Upgrade Page Tests', () => {
    test.beforeEach(async ({ openUpgradePage }) => {
        await test.step('Navigate to the Upgrade page', async () => {
            await openUpgradePage.gotoUpgradePage();
        });
    });

    test('Select language on Upgrade page', async ({ openUpgradePage }) => {
        await test.step('Select the preferred language', async () => {
            await openUpgradePage.selectLanguage();
        });
    });

    test('Check login button on Upgrade page', async ({ openUpgradePage }) => {
        await test.step('Check the presence of the login button', async () => {
            await openUpgradePage.checkLoginButton();
        });
    });
});