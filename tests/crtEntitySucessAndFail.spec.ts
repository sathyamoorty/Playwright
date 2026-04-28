import {test,Page,expect} from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { DashboardPage } from '../pages/dashboard'
import { WorkflowMessagePage } from '../pages/workflowMessage'
import { leadsModule } from '../pages/leadModule'
import { leadWithNoTask } from '../pages/untillFirstConTrue'
import { creatEntity } from '../pages/createEntity'
import { sucessAndFailCase } from '../pages/sucessAndFailedCase'
import { takeScreenshot } from '../utils/screenshot'

test.describe("sucessAndFailCase",async()=>{
    test("entity",async({page},testInfo)=>
    {
        test.setTimeout(200000)
        const logIn=new LoginPage(page);
        const dashBoard=new DashboardPage(page);
        const workFlowMess=new WorkflowMessagePage(page);
        const leadsMod=new leadsModule(page);
        const leadWithNo=new leadWithNoTask(page);
        const createEnti=new creatEntity(page);
        const sucessAndFail=new sucessAndFailCase(page);
        const sShot={takeScreenshot};
        const suffix = Date.now().toString().slice(-6);
        const workFlowName = `TestMessage-${suffix}`;

        await logIn.loginPage();
        await logIn.login("NAVEEN","rsoft","RSoft!@345");
        await expect(page).toHaveURL(/\/admin\/Dashboard/i);
        await expect(page.getByRole('button', { name: 'Dayin' })).toBeVisible();
        console.log("START: WorkflowCreation-redirectToWorkflowToChangeTheFlow1");

        await test.step("workFlowCreation",async()=>{
        await dashBoard.profileIcon();
        await dashBoard.crmSettings();
        await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
        await workFlowMess.otherSettings();
        await workFlowMess.workFlowSettings();
        await expect(page.getByRole('heading',{name:'Workflow'})).toBeVisible();
        await workFlowMess.createBtn();
        await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
        await workFlowMess.step1("Leads", workFlowName);
        await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
        await workFlowMess.step2();
        await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
        await createEnti.workFlowStep3();
        })
        await test.step("task",async()=>{
        await createEnti.popupDropDown();
        await createEnti.popDropDown2();
        await createEnti.popupDropDown3();
        await createEnti.targetModule();
        await createEnti.sourceModule();
        await createEnti.addFieldBtn();
        await createEnti.mapTheFields();
        await createEnti.mapTheField2();
        })
        await test.step('sucessTab',async()=>{
        await sucessAndFail.updateOnSucessCaseTab();
        await sucessAndFail.toggleTaskEnti();
        await sucessAndFail.dropDownModule1();
        await sucessAndFail.dropDownModifiedBy();
        await sucessAndFail.targetMod();
        await sucessAndFail.sourceModule();
        await sucessAndFail.savebtn();
        await sucessAndFail.savebtn();
        // await createEnti.popupBtn();
        await createEnti.toggleTask();
        await workFlowMess.enableToggleByWorkflowName(workFlowName);
        })
        await test.step("redirectToLeadModule",async()=>{
        await leadsMod.menuIcon();
        await expect(page.getByRole('heading',{name:'Leads'})).toBeVisible();
        await leadsMod.addLead();
        await expect(page.getByRole('heading',{name:'Create Leads'})).toBeVisible();
        await createEnti.dataForLeads( "Krish","Rsoft", "1000");
        await leadsMod.saveBtn();  
        await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
        await sShot.takeScreenshot(page,testInfo,"Only on the first save-Create entity executed")
        await createEnti.relatedModule();
        //await sShot.takeScreenshot(page,"Lead captured in the related module")
        await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
        await sShot.takeScreenshot(page,testInfo,"Only on the first save-Related module updated")
        })
        await test.step("redirectToEditField",async()=>{
        await dashBoard.profileIcon();
        await dashBoard.crmSettings();
        await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
        await sucessAndFail.editModule();
        await sucessAndFail.chooseMod();
        await sucessAndFail.dupPreToggle();
        await sucessAndFail.savebtn();
        
        })
    })
})