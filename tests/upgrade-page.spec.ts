import { test } from "playwright/test";
import { OpenUpgradePage } from "./pom";

test("Open Upgrade page", async ({ page }) => {
    const loginPage = new OpenUpgradePage(page);
    await loginPage.gotoUpgradePage();
});