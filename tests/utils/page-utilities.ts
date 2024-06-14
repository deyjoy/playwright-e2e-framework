import { Locator, Page, TestInfo, expect } from '@playwright/test';

export class PageUtilities {
    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to a specified URL and waits for the page to load.
     * @param url The URL to navigate to.
     */
    public async navigateToUrl(url: string) {
        try {
            await this.page.goto(url);
            await this.page.waitForLoadState('networkidle');
            console.log(`Navigated to URL: ${url}`);
        } catch (error) {
            console.error(`Error navigating to URL "${url}":`, error);
            throw error;
        }
    }

    /**
     * Waits for a specified timeout.
     * @param timeout The timeout duration in milliseconds.
     */
    public async waitForTimeout(timeout: number) {
        try {
            await this.page.waitForTimeout(timeout);
            console.log(`Waited for ${timeout} milliseconds`);
        } catch (error) {
            console.error(`Error waiting for timeout of ${timeout} milliseconds:`, error);
            throw error;
        }
    }

    /**
     * Verifies that the current page URL contains the specified path.
     * @param path The path to verify in the URL.
     */
    public async verifyUrlContainsPath(path: string) {
        try {
            const url = new URL(this.page.url());
            expect(url.pathname).toContain(path);
            console.log(`URL pathname contains "${path}"`);
        } catch (error) {
            console.error(`Error verifying URL contains path "${path}":`, error);
            throw error;
        }
    }

    /**
     * Waits for the page to load to the network idle state.
     */
    public async isPageLoaded() {
        try {
            await this.page.waitForLoadState('networkidle');
            console.log('Page load complete');
        } catch (error) {
            console.error('Error waiting for page load:', error);
            throw error;
        }
    }

    /**
     * Clicks on an element if it is visible.
     * @param locator The locator of the element to click.
     */
    public async clickIfVisible(locator: Locator) {
        try {
            await expect(locator).toBeVisible();
            await locator.click();
            console.log(`Clicked on element ${locator}`);
        } catch (error) {
            console.error(`Error clicking on element ${locator}:`, error);
            throw error;
        }
    }

    /**
     * Verifies that the current page URL matches the expected URL.
     * @param expectedUrl The expected URL to verify.
     */
    public async verifyPageUrl(expectedUrl: string) {
        try {
            await expect.soft(this.page).toHaveURL(expectedUrl);
            console.log(`Verified page URL: ${expectedUrl}`);
        } catch (error) {
            console.error(`Error verifying page URL "${expectedUrl}":`, error);
            throw error;
        }
    }

    /**
     * Clicks on an element with the specified data test ID.
     * @param dataTestID The data test ID of the element to click.
     */
    public async clickOnElementByTestId(dataTestID: string) {
        try {
            await this.page.waitForLoadState('networkidle');
            await this.page.getByTestId(dataTestID).click();
            console.log(`Clicked on element with data test ID: ${dataTestID}`);
        } catch (error) {
            console.error(`Error clicking on element with data test ID "${dataTestID}":`, error);
            throw error;
        }
    }

    /**
     * Verifies that an element with the specified data test ID contains the given text.
     * @param dataTestID The data test ID to locate the element.
     * @param text The text to verify within the element.
     * @param timeout Optional timeout in milliseconds. Defaults to Playwright's default timeout.
     */
    public async verifyTextInElementByTestId(dataTestID: string, text: string, timeout?: number) {
        try {
            const locator = this.page.getByTestId(dataTestID);
            await expect.soft(locator).toContainText(text, { timeout });
            console.log(`Element with data test ID "${dataTestID}" contains text: "${text}"`);
        } catch (error) {
            console.error(`Error verifying text in element with data test ID "${dataTestID}":`, error);
            throw error;
        }
    }

    /**
     * Verifies the visibility of an element containing the specified text.
     * @param text The text to locate the element.
     * @param timeout Optional timeout in milliseconds. Defaults to Playwright's default timeout.
     * @param useFirst Optional boolean to indicate whether to use the first matching element. Defaults to false.
     */
    public async verifyElementVisibilityByText(text: string, timeout?: number, useFirst: boolean = false) {
        try {
            let locator: Locator = this.page.getByText(text);
            if (useFirst) {
                locator = locator.first();
            }
            await expect(locator).toBeVisible({ timeout });
            console.log(`Verified visibility of element with text: "${text}"${useFirst ? ' using first matching element' : ''}`);
        } catch (error) {
            console.error(`Error verifying visibility of element with text "${text}":`, error);
            throw error;
        }
    };

    /**
    * Verifies that an element with the specified test ID is editable.
    * @param testId The test ID to locate the element.
    * @param timeout Optional timeout in milliseconds. Defaults to Playwright's default timeout.
    */
    public async verifyElementIsEditableByTestId(testId: string, timeout?: number) {
        try {
            const locator: Locator = this.page.getByTestId(testId);
            await expect.soft(locator).toBeEditable({ timeout });
        } catch (error) {
            console.error(`Error verifying editability of element with test ID "${testId}":`, error);
            throw error;
        }
    }

    /**
     * Verifies that a button with the specified name is visible.
     * @param name The name of the button to locate the element.
     * @param timeout Optional timeout in milliseconds. Defaults to Playwright's default timeout.
     */
    public async verifyButtonVisibilityByName(name: string, timeout?: number) {
        try {
            const locator: Locator = this.page.getByRole('button', { name });
            await expect.soft(locator).toBeVisible({ timeout });
        } catch (error) {
            console.error(`Error verifying visibility of button with name "${name}":`, error);
            throw error;
        }
    }

    /**
     * Captures a screenshot of the current page.
     * @param identifier The TestInfo object to derive the filename or a custom name.
     * @param customName An optional custom name for the screenshot file.
     */
    public async captureScreenshot(identifier: TestInfo | string, customName?: string) {
        try {
            // Wait for the page to stabilize
            await this.waitForTimeout(1000);

            // Determine the filename based on the type of identifier
            let fileName: string;
            if (typeof identifier === 'string') {
                fileName = identifier.replace(/ /g, '_');
            } else {
                fileName = customName ? customName.replace(/ /g, '_') : identifier.title.replace(/ /g, '_');
            }

            const filePath = `test-results/screenshots/${fileName}.png`;

            // Take a screenshot
            await this.page.screenshot({ path: filePath });

            console.log(`Captured screenshot and saved to ${filePath}`);
        } catch (error) {
            console.error(`Error capturing screenshot:`, error);
            throw error;
        }
    }

    /**
     * Verifies that an element specified by a selector is visible.
     * @param selector The selector to locate the element.
     * @param timeout Optional timeout in milliseconds. Defaults to Playwright's default timeout.
     */
    public async verifyElementVisibility(selector: string, timeout?: number) {
        try {
            const locator = this.page.locator(selector);
            await expect.soft(locator).toBeVisible({ timeout });
            console.log(`Element ${selector} is visible`);
        } catch (error) {
            console.error(`Error verifying visibility of element with selector "${selector}":`, error);
            throw error;
        }
    }

    /**
     * Retrieves the text content of a tab identified by its type.
     * @param tabType The text of the tab to locate.
     * @returns A promise that resolves to the text content of the tab.
     */
    public async getTabName(tabType: string): Promise<string> {
        try {
            // Locate the tab container and then find the tab by its text
            const tabText = await this.page.getByTestId('container-tabs').getByText(tabType).innerText();
            console.log(`Retrieved text for tab "${tabType}": ${tabText}`);
            return tabText;
        } catch (error) {
            // Log an error message if the operation fails
            console.error(`Error retrieving text for tab "${tabType}":`, error);
            throw error;
        }
    }

    /**
     * Clicks on an element with the exact specified text.
     * @param text The exact text of the element to click.
     */
    public async clickOnExactText(text: string) {
        try {
            // Locate the element by its exact text and click on it
            await this.page.getByText(text, { exact: true }).click();
            console.log(`Clicked on the element with text: "${text}"`);
        } catch (error) {
            // Log an error message if the operation fails
            console.error(`Error clicking on the element with text "${text}":`, error);
            throw error;
        }
    }

    /**
       * Verifies that a specific query parameter in the URL matches the expected value.
       * @param paramName The name of the query parameter to verify.
       * @param expectedValue The expected value of the query parameter.
       * @param description A description of the verification for logging purposes.
       */
    public async verifyQueryParam(paramName: string, expectedValue: string, description: string) {
        try {
            // Parse the current URL and retrieve the specified query parameter
            const url = new URL(this.page.url());
            const paramValue = url.searchParams.get(paramName);

            // Soft assertion to verify the parameter value matches the expected value
            expect.soft(paramValue).toBe(expectedValue);

            console.log(`${description}: "${paramValue}", expected "${expectedValue}".`);
        } catch (error) {
            // Log an error message if the operation fails
            console.error(`Error verifying the "${paramName}" query parameter:`, error);
            throw error;
        }
    }

    /**
     * Closes the current page.
     */
    public async closePage() {
        try {
            await this.page.close();
            console.log('Closed the page successfully');
        } catch (error) {
            console.error('Error closing the page:', error);
            throw error;
        }
    }
}