import { Page,expect } from "@playwright/test";
export class WorkflowMessagePage {

    constructor(private page: Page) {}
    
    async otherSettings() {
        await this.page.getByRole("button", { name: "Other Settings" }).click();
    }
    async workFlowSettings() 
    {
       await this.page.getByRole('link', { name: 'Workflow', exact: true }).click();;
    //    expect(this.page.locator("h3:has-text('Workflow Messages')")).toBeVisible();
    }
    async createBtn() {
        await this.page.getByRole("button", { name: "Creating  Workflow" }).click();
    }
    async step1(searchTerm: string, workflowName: string) {
        // await this.page.locator("#select2-workflowselectmod-container").click();
        // await this.page.locator('span.select2-search.select2-search--dropdown').fill(searchTerm);
          await this.page.getByRole('textbox', { name: 'All', exact: true }).click();
           const clickFun= this.page.getByRole('textbox').nth(5);
            await clickFun.fill(searchTerm);
          await clickFun.press('Enter');
          await this.page.locator('[name="summary"]').fill(workflowName);
          await this.page.getByRole("button", { name: "Next" }).click();
        //    await clickFun.click();
        //    await this.page.getByRole('option', { name: 'Leads' }).click();
            // await this.page.getByRole('option', { name: 'Leads' }).click();
    }
    async step2() 
    {
        const allConditions = this.page.locator("#content-andcon");
        await allConditions.getByRole("button", { name: "Add Condition" }).click();

        const conditionField = allConditions.getByRole("textbox", { name: "Select an option", exact: true }).first();
        await conditionField.click();

        const searchOption = this.page.locator("input.select2-search__field").last();
        await searchOption.fill("Assigned To");
        await searchOption.press("Enter");

        await this.page.getByRole('textbox', { name: 'Select an option', exact: true }).click();
        await this.page.getByRole('treeitem', { name: 'Is', exact: true }).click();
        
        await this.page.getByRole("button", { name: "Next" }).click();
        await expect(this.page.getByRole("button", { name: "+ Add To Do" })).toBeVisible();
    }
    async step3() { 
        await this.page.getByRole("button", { name: "+ Add To Do" }).click();
        await this.page.getByText("sms SMS").click();
        await this.page.locator("input[name='smstasktitle']").fill("Test SMS Task");
        await this.page.locator('select.receiptphone').selectOption('Leads/leads_mobile');
        await this.page.getByRole('combobox', { name: 'Select an option' }).nth(0).click();
        await this.page.getByRole('treeitem', { name: 'SMS1001' }).click();
        await this.page.getByRole("button", { name: "Save" }).click();
        await this.page.locator('.switchery.switchery-default').first().click();
        await this.page.getByRole("button", { name: "Submit" }).click();
        console.log("Workflow Message created successfully");
    }
}