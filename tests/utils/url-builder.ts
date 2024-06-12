import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export function getUpgradePageUrl(): string {
    return `./${process.env.UUID}`; // Used ./ to call the baseURL from playwright.config.ts and then added UUID from .env
}
