import { Page } from "playwright/test";
import { getUpgradePageUrl } from "./url-builder"; // Import the URL builder function

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
    };
}