import { Page } from "@playwright/test";

export class TakeScreenShot {
  async capture(page: Page, fileName: string) {
    await page.screenshot({
      path: `screenshots/${fileName}.png`,
      fullPage: true,
    });
  }
}
