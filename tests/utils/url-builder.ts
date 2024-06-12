import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export function getUpgradePageUrl(): string {
    const queryParams = `?lang=EN&source=upgrade&source_type=Email&deal_kind=upgrades`;
    return `./${process.env.UUID}${queryParams}`; // Used ./ to call the baseURL from playwright.config.ts and then added UUID from .env
}
