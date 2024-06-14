import { test as base } from "@playwright/test";
import { UpgradesOffersPage } from "../pages/pom";
import { PageUtilities } from "../utils/page-utilities";

/**
 * Custom Fixtures Setup for Playwright Tests
 * 
 * This file sets up custom fixtures for Playwright, combining the Page Object Model (POM) pattern
 * with custom fixtures to enable reusable and maintainable test components.
 * 
 * - Define the PageFixtures type to list all required page objects.
 * - Use base.extend to create custom fixtures for each page object.
 * - Instantiate and provide each page object to the test via the use function.
 * 
 * This approach enhances code maintainability and test readability by encapsulating page-specific logic in fixtures.
 */

// Define a type for your fixtures, which can include multiple page objects
type PageFixtures = {
    upgradesOffersPage: UpgradesOffersPage; 
    pageUtilities: PageUtilities;
};

// Extend the base test to include the custom fixtures
export const test = base.extend<PageFixtures>({
    // Define the openUpgradePage fixture
    upgradesOffersPage: async ({page}, use) => {
        // Instantiate the OpenUpgradePage class and provide it to the test
        await use(new UpgradesOffersPage(page))        
    },
    // Define the pageUtilities fixture
    pageUtilities: async ({ page }, use) => {
        const pageUtilities = new PageUtilities(page);
        await use(pageUtilities);
    }
});

// Export the expect function for assertions
export { expect } from "@playwright/test";