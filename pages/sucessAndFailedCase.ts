import { Page,expect } from "@playwright/test";
export class sucessAndFailCase{
    constructor (private page:Page){}

    async updateOnSucessCaseTab(){
        await this.page.locator("#dup_156").click();
        await this.page.getByRole('button',{name:" Add Section"}).click();
    }
    async toggleTaskEnti(){
        // await this.page.locator(".switchery.switchery-default").first().click();   
        // const toggle = this.page.locator('input[type="checkbox"]').nth(0);
        // await toggle.check();
        await this.page.getByRole('tabpanel',{name:"Update On Success Case"}).locator("small").click();
    }   
    async dropDownModule1(){
        await this.page.getByRole('combobox',{name:"Select An Option"}).first().click();
        await this.page.getByRole('treeitem',{name:"Leads"}).click();
    }
    async dropDownModifiedBy(){
        await this.page.getByRole('combobox',{name:"Select An Option"}).first().click();
        await this.page.getByRole('treeitem',{name:"(Leads) Assigned To"}).click();
    }
    async targetMod(){
        await this.page.getByRole('combobox',{name:"Select an option"}).first().click();
        await this.page.getByLabel("Leads").getByRole('treeitem',{name:"Related Is related "}).click()
    }
    async sourceModule(){
        await this.page.getByRole('combobox',{name:"Select an Option"}).first().click();
        await this.page.getByRole("treeitem",{name:"Name"}).click();
    }
    async savebtn(){
        await this.page.getByRole('button',{name:"Save"}).first().click();
    }
    async editModule(){
        await this.page.getByRole('button', { name: ' Studio' }).click();
        // await this.page.getByLabel('Studio').click();
        await this.page.getByRole('link',{name:'Edit Field'}).click();
    }
    async chooseMod(){
        await this.page.getByRole('link').filter({ hasText: /^$/ }).nth(1).click();
        await this.page.getByRole('combobox',{name:'Emails'}).click();
        await this.page.getByRole('treeitem',{name:"All UI Module",exact:true}).click();
        await this.page.getByRole('link',{name:"Duplicate Prevention"}).click();
    }
    async dupPreToggle(){
        const checkbox = this.page.locator("#myonoffswitch");
        const switchUi = this.page.locator('label[for="myonoffswitch"]'); // or the visible switch element

        if (!(await checkbox.isChecked())) {
          await switchUi.click();
        }
    }
    
}