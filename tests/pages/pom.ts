import { Page, expect } from "playwright/test";
import { getUpgradesOffersPageUrl } from "../utils/url-builder"; // Import the URL builder function
import { extractWord } from "../utils/helpers";

/**
 * OpenUpgradePage Class
 * 
 * This class represents the Upgrade page and provides methods to interact with it.
 * It uses Playwright's Page object to navigate and perform actions on the page.
 */

export class upgradesOffersPage {

    private readonly UPGRADE_PAGE: string; // URL of the Upgrade page
    private readonly page: Page; // Playwright's Page object

    constructor(page: Page) {
        this.UPGRADE_PAGE = getUpgradesOffersPageUrl(); // Get the URL of the Upgrade page
        this.page = page // Initialize the Page object
    };

    /**
     * Navigate to the Upgrade-Offers Page
     * 
     * This method navigates to the Upgrade-Offers page using the URL.
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
            const url = new URL(this.page.url());
            const langParam = url.searchParams.get('lang');
            expect.soft(langParam).toBe(language);
        }
    };

    public async checkLoginButton() {
        await expect.soft(this.page.locator('div').filter({ hasText: /^Login$/ }).first()).toBeVisible();
        await expect.soft(this.page.locator('rect')).toBeVisible();
        await expect.soft(this.page.getByText('Login')).toBeVisible();
        console.log('Login button and symbol are visible');
    };

    public async checkLoginModal() {
        await this.page.getByTestId('point-login-button').click();
        console.log('Open Login modal');
        await expect.soft(this.page.getByTestId('login-points-modal').locator('div').filter({ hasText: 'Sign in to Points account' }).nth(1)).toBeVisible();
        await expect.soft(this.page.getByTestId('points-login-input-first-name')).toBeEditable();
        await expect.soft(this.page.getByTestId('points-login-input-last-name')).toBeEditable();
        await expect.soft(this.page.getByTestId('points-login-input-password')).toBeEditable();
        await expect.soft(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        await expect.soft(this.page.getByRole('button', { name: 'Sign In' })).toBeVisible();
        console.log('Check title, main fields and buttons');
    };

    public async checkTab(tabName: string) {
        // Scrape the text content of the tab with the help of provided Data Test ID
        const tab = await this.page.getByTestId('container-tabs').getByText(tabName).innerText();

        // Wait for the scroll action to complete if needed
        await this.page.waitForTimeout(500);

        // Click on the tab
        await this.page.getByText(tab, { exact: true }).click();
        console.log(`Click on the ${tabName}`);

        // Verify the query parameter in the URL
        const extractedWord = extractWord(tab);
        const url = new URL(this.page.url());
        const dealKind = url.searchParams.get('deal_kind');
        expect.soft(dealKind).toBe(extractedWord);
        console.log(`Tab name matches with query parameter's string`);

        // Wait for the page to stabilize and take a screenshot
        await this.page.waitForTimeout(1000);
        await this.page.screenshot({ path: `test-results/screenshots/${tabName}_tab.png` });
        console.log(`Capture screenshot and saving to /test-results/screenshots/ folder`);
    };
};
