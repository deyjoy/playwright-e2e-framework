# End-To-End (e2e) Test Framework with Playwright in TypeScript

## Key Advantages of Playwright in TypeScript Over Cypress for Testing https://demo.guests.plusgrade.com/purchase/{UUID}

1. **Multi-Browser Support**:
   - **Playwright**: Ensures the website functions correctly on Chromium, Firefox, and WebKit (Safari), crucial for a public-facing web app with diverse user browsers.
   - **Cypress**: Lacks Safari support, limiting cross-browser testing.

2. **Browser Contexts**:
   - **Playwright**: Efficiently handles isolated browser contexts in a single instance, ideal for parallel testing multiple user sessions and hotel booking scenarios.
   - **Cypress**: Each test in a separate browser instance can be slower, impacting efficiency.

3. **Optimized for React**:
   - **Playwright**: Designed to handle React applications efficiently, offering excellent support for testing React components and state management.
   - **Cypress**: Also supports React but Playwright's broader browser support provides a more comprehensive testing environment for React applications.

4. **Cross-Platform and Mobile Testing**:
   - **Playwright**: Supports testing on Windows, macOS, Linux, and mobile emulation, ensuring the website is accessible on all devices, including mobile.
   - **Cypress**: Limited mobile testing capabilities.

5. **TypeScript Integration**:
   - **Playwright**: Strong TypeScript support enhances code quality and maintainability for complex booking workflows.
   - **Cypress**: TypeScript support is available but less seamless.

6. **Network Interception and Mocking**:
   - **Playwright**: Advanced network interception for testing various booking and payment conditions, essential for e-commerce sites like hotel booking.
   - **Cypress**: Less flexible network interception features.

## Setup Guide

This guide helps you set up an end-to-end (E2E) test framework using Playwright in TypeScript.

## Prerequisites

1. **Install Node.js and npm**:
   - Download and install from [nodejs.org](https://nodejs.org/).

2. **Install Visual Studio Code (VS Code)**:
   - Download and install from [code.visualstudio.com](https://code.visualstudio.com/).

## Setup Instructions

1. **Install Playwright**:
   Open your terminal in VS Code and run:
   ```sh
   npm init playwright@latest
   ```
   Follow the prompts:
   - Choose TypeScript.
   - Set the test directory name (default: `tests`).
   - Opt to install Playwright browsers.

2. **Project Structure**:
   After installation, you will have:
   - `playwright.config.ts`
   - `package.json`
   - `tests/` with example tests

3. **Running Tests**:
   To verify the setup, run:
   ```sh
   npx playwright test
   ```

4. **Viewing Test Reports**:
   Generate and view HTML reports:
   ```sh
   npx playwright show-report
   ```

## Using VS Code

- **Install Extensions**:
   - Recommended: "ESLint", "Prettier - Code formatter", "Playwright Test for VSCode".

   ```sh
   Name: Playwright Test for VSCode
   Id: ms-playwright.playwright
   Description: Run Playwright Test tests in Visual Studio Code.
   Version: 1.1.6
   Publisher: Microsoft
   VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright
   ```
   
- **Run Tests**:
   - Use the built-in terminal or the Playwright Test extension to run tests directly from VS Code.

## Resources

For more details, refer to the [Playwright documentation](https://playwright.dev/docs/intro).

