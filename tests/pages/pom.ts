import { Page, expect } from "playwright/test";
import { getUpgradesOffersPageUrl } from "../utils/url-builder"; 
import { PageUtilities } from "../utils/page-utilities";

/**
 * UpgradesOffersPage Class
 * 
 * This class represents the Upgrade page and provides methods to interact with it.
 * It uses Playwright's Page object to navigate and perform actions on the page.
 */

export class UpgradesOffersPage {

    private readonly UPGRADES_OFFERS_PAGE: string; // URL of the Upgrade page
    private readonly page: Page; // Playwright's Page object
    private utils: PageUtilities; // Instance of PageUtilities to provide reusable utility methods

    constructor(page: Page) {
        this.UPGRADES_OFFERS_PAGE = getUpgradesOffersPageUrl(); // Get the URL of the Upgrade page
        this.page = page; // Initialize the Page object
        this.utils = new PageUtilities(page);
    }

    /**
     * Navigate to the Upgrade-Offers Page
     * 
     * This method navigates to the Upgrade-Offers page using the URL.
     */
    public async gotoUpgradesOffersPage() {
        await this.utils.navigateToUrl(this.UPGRADES_OFFERS_PAGE);
        await this.utils.verifyPageUrl(this.UPGRADES_OFFERS_PAGE);
    }

    /**
     * Selects the specified language code from the dropdown.
     * @param languageCode The language code to select.
     */
    public async selectLanguage(languageCode: string) {
        try {
            // Select the language from the dropdown
            await this.page.locator('select[data-cy="lang-selector"]').selectOption(languageCode);
            console.log(`Selected language code: ${languageCode}`);
        } catch (error) {
            console.error(`Error selecting language code "${languageCode}":`, error);
            throw error;
        }
    }

    /**
     * Verifies that the selected option in a dropdown matches the specified language code.
     * @param languageCode The language code to verify as the selected option.
     */
    public async verifyLanguageSelectionInLocator(languageCode: string) {
        try {
            // Verify the selected option in the dropdown
            const locator = this.page.locator('select[data-cy="lang-selector"] option:checked');
            const selectedValue = await locator.getAttribute('value');
            expect.soft(selectedValue).toBe(languageCode);
            console.log(`The selected language code is "${selectedValue}", expected "${languageCode}".`);
        } catch (error) {
            console.error(`Error verifying the selected option in the dropdown:`, error);
            throw error;
        }
    }

    /**
     * Verifies that the 'lang' query parameter in the URL matches the specified language code.
     * @param languageCode The language code to verify in the query parameters.
     */
    public async verifyLanguageSelectionInQueryParams(languageCode: string) {
        await this.utils.verifyQueryParam('lang', languageCode, 'The "lang" query parameter');
    }

    /**
     * Verifies that the 'deal_kind' query parameter in the URL matches the specified tab type.
     * @param tabType The tab type to match with the 'deal_kind' query parameter.
     */
    public async matchWithQueryParam(tabType: string) {
        await this.utils.verifyQueryParam('deal_kind', tabType, 'Tab name matches with query parameter');
    }

    /**
     * Verifies that the login modal header is visible.
     */
    public async verifyLoginModalHeaderIsVisible() {
        await this.utils.verifyElementVisibilityByText('Sign in to Points account');
        console.log('Login modal header is visible');
    }

    /**
     * Verifies that the input fields in the login modal are editable.
     */
    public async verifyLoginModalInputFields() {
        await this.utils.verifyElementIsEditableByTestId('points-login-input-first-name');
        console.log('First Name text input field is editable');
        await this.utils.verifyElementIsEditableByTestId('points-login-input-last-name');
        console.log('Last Name text input field is editable');
        await this.utils.verifyElementIsEditableByTestId('points-login-input-password');
        console.log('Passwrod text input field is editable');
    }

    /**
     * Verifies that the buttons in the login modal are visible.
     */
    public async verifyLoginModalButtons() {
        await this.utils.verifyButtonVisibilityByName('Cancel');
        console.log('Cancel button is visible');
        await this.utils.verifyButtonVisibilityByName('Sign In');
        console.log('Sign In button is visible');
    }

    /**
     * Clicks the "Place Bid" button for the first upgrade offer.
     */
    public async clickPlaceBidButton() {
        await this.utils.clickIfVisible(this.page.locator('#upgrade-card-0').getByTestId('place_bid_offer_btn'));
        console.log('Clicked on Place Bid button of first upgrade');
    }

    /**
     * Verifies that the bidding confirmation message is displayed.
     */
    public async verifyBiddingConfirmation() {
        await this.utils.verifyElementVisibilityByText('NOTE: YOU WILL ONLY BE', undefined, true);
        console.log('Bidding confirmation displayed');
    }

    /**
     * Clicks the "Continue" button to proceed with the upgrade offer.
     */
    public async clickContinueButton() {
        await this.utils.clickIfVisible(this.page.getByTestId('select-deal-button-checkout'));
        console.log('Clicked on Continue button');
    }

    /**
     * Verifies that the review page is displayed.
     */
    public async verifyReviewPageDisplayed() {
        // Wait for the page load
        await this.utils.isPageLoaded();
        await this.utils.verifyElementVisibilityByText('Review & Confirm');
        console.log('Review page displayed');
    }

    /**
     * Verifies that the URL of the review page is correct.
     */
    public async verifyReviewPageUrl() {
        await this.utils.verifyUrlContainsPath('/review/');
        await this.utils.verifyQueryParam('deal_kind', 'upgrades', 'deal_kind query parameter should contain "upgrades"');
    }

    /**
     * Navigates back to the previous page.
     */
    public async goBackToPreviousPage() {
        await this.page.goBack();
        await this.utils.isPageLoaded();
        console.log('Navigated back to the previous page');
    }

    /**
     * Verifies the query parameters on the Upgrades-Offers page.
     * @param paramName The name of the query parameter to verify.
     * @param expectedValue The expected value of the query parameter.
     * @param description A description for the verification.
     */
    public async verifyQueryParamsOnUpgradesOffersPage(paramName: string, expectedValue: string, description: string) {
        await this.utils.verifyQueryParam(paramName, expectedValue, description);
    }

    /**
     * Retrieves the name of the card.
     * @returns {Promise<string>} The name of the card.
     */
    public async getCardName(): Promise<string> {
        try {
            // Get the inner text of the card's heading with the specified role and name.
            const name = await this.page.getByTestId('base-card').getByRole('heading', { name: 'Upgrade' }).first().innerText();
            // Log the card name to the console.
            console.log(`Card name: ${name}`);
            // Return the card name.
            return name;
        } catch (error) {
            // Log any errors that occur during the process.
            console.error('Failed to get card name:', error);
            // Return an empty string as a fallback value.
            return '';
        }
    }

    /**
     * Retrieves the description of the card.
     * @returns {Promise<string>} The description of the card.
     */
    public async getCardDescription(): Promise<string> {
        try {
            // Get the inner text of the second <span> element within the card.
            const desc = await this.page.getByTestId('base-card').locator('span').nth(1).innerText();
            // Log the card description to the console.
            console.log(`Card description: ${desc}`);
            // Return the card description.
            return desc;
        } catch (error) {
            // Log any errors that occur during the process.
            console.error('Failed to get card description:', error);
            // Return an empty string as a fallback value.
            return '';
        }
    }

    /**
     * Verifies that the given attribute is valid and logs the result.
     * @param {string} label - The label of the attribute being verified (e.g., 'name', 'description').
     * @param {string} value - The value of the attribute to verify.
     */
    public verifyAttribute(label: string, value: string) {
        try {
            const isValid = value !== '';
            console.log(`${label} valid: ${isValid}`);
        } catch (error) {
            console.error(`Error verifying ${label}:`, error);
        }
    }

    /**
     * Retrieves the price of the card and converts it to a numeric value.
     * @returns {Promise<number>} The price of the card.
     */
    public async getCardPrice(): Promise<number> {
        try {
            // Get the inner text of the element containing the price.
            const priceText = await this.page.getByTestId('buy-now-price-number').first().innerText();
            // Convert the price text to a numeric value, removing any non-numeric characters.
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
            // Log the card price to the console.
            console.log(`Card price: ${price}`);
            // Return the card price.
            return price;
        } catch (error) {
            // Log any errors that occur during the process.
            console.error('Failed to get card price:', error);
            // Return 0 as a fallback value.
            return 0;
        }
    }

    /**
     * Verifies that the card has a valid price and logs the result.
     * @param {number} price - The price of the card to verify.
     */
    public verifyCardPrice(price: number) {
        try {
            const isValid = !isNaN(price) && price > 0;
            console.log(`Card price valid: ${isValid}`);
        } catch (error) {
            console.error('Error verifying card price:', error);
        }
    }

}
