import { test as base } from "@playwright/test";
import { OpenUpgradePage } from "./pom";

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
    openUpgradePage: OpenUpgradePage; // Add more pages as needed
};

// Extend the base test to include the custom fixtures
export const test = base.extend<PageFixtures>({
    // Define the openUpgradePage fixture
    openUpgradePage: async ({page}, use) => {
        // Instantiate the OpenUpgradePage class and provide it to the test
        await use(new OpenUpgradePage(page))        
    },
    // More fixtures will be added here later as needed
});

// Export the expect function for assertions
export { expect } from "@playwright/test";