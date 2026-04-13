import { Page, expect } from "@playwright/test";

export class RolePage {

    constructor(private page: Page) {}

    async roleSettings() {
        await this.page.locator("label:has-text('Role')").click();
        const roleText = this.page.locator("h3:has-text('Roles')");
        await expect(roleText).toBeVisible();
    }

    async createBtn() {
        await this.page.locator("[fieldid='2']").click();
    }

    async addRole() {
        await this.page.locator("[roledepth='2']").click();
    }
    async nameField(name:string) {
        const nameVar = this.page.locator("[name='rolename']");
        await nameVar.waitFor({ state: 'visible' });
        await nameVar.fill(name);
        return nameVar;
    }

    async saveBtn() {
        await this.page.getByRole("button", { name: "Save" }).click();
    }

    async expectRoleVisible(name: string) {
        await expect(this.page.getByRole("link", { name })).toBeVisible({ timeout: 15000 });
    }
}
