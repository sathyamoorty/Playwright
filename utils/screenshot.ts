// export async function takeScreenshot(page: any, name: string) {
//   await page.screenshot({
//     path: `screenshots/${name}.png`,
//     fullPage: true,
//   });
// }
import { Page, TestInfo } from "@playwright/test";

export async function takeScreenshot(
  page: Page,
  testInfo: TestInfo,
  name: string
) {
  const filePath = `screenshots/${name}.png`;

  await page.screenshot({
    path: filePath,
    fullPage: false,
  });

  await testInfo.attach(name, {
    path: filePath,
    contentType: "image/png",
  });
}

