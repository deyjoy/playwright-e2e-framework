import { test } from "../fixtures/base"; // Import the custom test from the base module

/**
 * Test Case: Open Upgrade Page
 * 
 * This test case utilizes the custom fixture to navigate to the Upgrade page.
 * The openUpgradePage fixture is instantiated and provided by the custom fixture setup.
 */

test("Open Upgrade page", async ({ openUpgradePage }) => {
    // Navigate to the Upgrade page using the method from the OpenUpgradePage object
    await openUpgradePage.gotoUpgradePage();
    await openUpgradePage.selectLanguage();
    await openUpgradePage.checkLoginButton();
});