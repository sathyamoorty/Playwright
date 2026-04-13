import { expect, Page } from "@playwright/test";

export class DashboardPage {

    constructor(private page: Page) {}  

    async profileIcon(){
        await this.page.locator("#livewireOverly").waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
        await this.page.locator("//li[@class='dropdown dropdown-user nav-item']//a[@class='dropdown-toggle nav-link dropdown-user-link']//img").click();
    }

    async crmSettings(){
        await this.page.getByText(" CRM Setting").nth(1).click();
        // await this.page.waitForTimeout(2000);
        
    }

    async userAccessCtrl(){
        // const labelTex= this.page.locator(".mb-0 text-uppercase");
        // await expect(labelTex).toBeVisible();
        await this.page.getByRole('button', { name: 'User & Access Control' }).click();
    }
    async profileSettings(){
        await this.page.locator("label:has-text('Profile')").click();
        const profileText = this.page.locator("h3:has-text('Profiles')");
        await expect(profileText).toBeVisible();
    }
}
