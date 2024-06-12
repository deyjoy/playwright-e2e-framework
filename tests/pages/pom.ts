import { Page, expect } from "playwright/test";
import { getUpgradePageUrl } from "../utils/url-builder"; // Import the URL builder function

/**
 * OpenUpgradePage Class
 * 
 * This class represents the Upgrade page and provides methods to interact with it.
 * It uses Playwright's Page object to navigate and perform actions on the page.
 */

export class OpenUpgradePage {

    private readonly UPGRADE_PAGE: string; // URL of the Upgrade page
    private readonly page: Page; // Playwright's Page object

    constructor(page: Page) {
        this.UPGRADE_PAGE = getUpgradePageUrl(); // Get the URL of the Upgrade page
        this.page = page // Initialize the Page object
    };

    /**
     * Navigate to the Upgrade Page
     * 
     * This method navigates to the Upgrade page using the URL.
     */
    public async gotoUpgradePage() {
        await this.page.goto(this.UPGRADE_PAGE);

        // Wait for any necessary navigation or changes
        await this.page.waitForLoadState('networkidle');

        // Assertion to verify the URL
        // Adding soft assertion to keep going with the test flow and collect multiple error in a single test run
        await expect.soft(this.page).toHaveURL(this.UPGRADE_PAGE);
        console.log('Open upgrade page');
    };

    public async selectLanguage() {

        // List all the language codes in a array
        const languages = ['EN', 'HE', 'DE', 'PL', 'RU', 'ES', 'FR', 'PT', 'IT'];

        for (const language of languages) {
            // Select the language from the dropdown
            await this.page.locator('select[data-cy="lang-selector"]').selectOption(language);
            console.log(`Select language code: ${language}`);

            // Wait for any necessary navigation or changes
            await this.page.waitForLoadState('networkidle');

            // Verify the selected option in the dropdown
            const selectedValue = await this.page.locator('select[data-cy="lang-selector"] option:checked').getAttribute('value');
            expect.soft(selectedValue).toBe(language);

            // Verify the query parameter in the URL
            const url = new URL(await this.page.url());
            const langParam = url.searchParams.get('lang');
            expect.soft(langParam).toBe(language);
        }
    };

    public async checkLoginButton() {
        await expect.soft(this.page.locator('div').filter({ hasText: /^Login$/ }).first()).toBeVisible();
        await expect.soft(this.page.locator('rect')).toBeVisible();
        await expect.soft(this.page.getByText('Login')).toBeVisible();
        console.log('Check login button');
      }
}