import { Page } from "@playwright/test";
 
export async function toasterMess(page:Page){
    return await page.locator("//div[@class='toast-message']").textContent();
}