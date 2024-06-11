import { Page } from "playwright/test";
import { getUpgradePageUrl } from "./url-builder";

export class OpenUpgradePage {
    
    private readonly UPGRADE_PAGE: string;
    private readonly page: Page;

    constructor(page: Page) {
        this.UPGRADE_PAGE = getUpgradePageUrl();
        this.page = page
    };

    public async gotoUpgradePage() {
        await this.page.goto(this.UPGRADE_PAGE);
    };
}