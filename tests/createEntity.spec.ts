import {test,expect} from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { DashboardPage } from "../pages/dashboard";
import { WorkflowMessagePage } from "../pages/workflowMessage";
import { leadsModule } from "../pages/leadModule";
import { leadWithNoTask } from "../pages/untillFirstConTrue";
import { everyTimeRecordSave } from "../pages/everyTimeSave";
import { everyTimeModifiedRecord } from "../pages/everyTimeModified";
import { creatEntity } from "../pages/createEntity";
import { takeScreenshot } from '../utils/screenshot';

test.describe("createEntityTask",async()=>{
    test("methods",async({page},testInfo)=>{
        test.setTimeout(400000);
        const login=new LoginPage(page);
        const dashBoard=new DashboardPage(page);
        const workFlow=new WorkflowMessagePage(page);
        const leadsMo=new leadsModule(page);
        const leadsWithNo=new leadWithNoTask(page);
        const everyTimeSave=new everyTimeRecordSave(page);
        const everyModi=new everyTimeModifiedRecord(page);
        const entity= new creatEntity(page);
        const sShot= {takeScreenshot};

        const suffix = Date.now().toString().slice(-6);
        const workFlowName = `TestMessage-${suffix}`;

        await login.loginPage();
        await login.login("NAVEEN","rsoft","RSoft!@345");
        await expect(page).toHaveURL(/\/admin\/Dashboard/i);
        await expect(page.getByRole('button', { name: 'Dayin' })).toBeVisible();
        console.log("START: WorkflowCreation-redirectToWorkflowToChangeTheFlow1");
        await test.step("redirectToWorkFlow",async()=>
        {
            await dashBoard.profileIcon();
            await dashBoard.crmSettings();
            await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
            await workFlow.otherSettings();
            await workFlow.workFlowSettings();
            await expect(page.getByRole('heading',{name:'Workflow'})).toBeVisible();
            await workFlow.createBtn();
            await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
            await workFlow.step1("Leads", workFlowName);
            await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
            await workFlow.step2();
            await expect(page.getByRole('heading',{name:'Creating workflow'})).toBeVisible();
            await entity.workFlowStep3();
        })
        await test.step("todoEntity",async()=>{
            await entity.popupDropDown();
            await entity.popDropDown2();
            await entity.popupDropDown3();
            await entity.targetModule();
            await entity.sourceModule();
            await entity.addFieldBtn();
            await entity.mapTheFields();
            await entity.mapTheField2();
            await entity.popupBtn();
            await entity.toggleTask();
            await workFlow.enableToggleByWorkflowName(workFlowName);
        })
      // Only on the first save
        await test.step("redirectToLead",async()=>{
            await leadsMo.menuIcon();
            await expect(page.getByRole('heading',{name:'Leads'})).toBeVisible();
            await leadsMo.addLead();
            await expect(page.getByRole('heading',{name:'Create Leads'})).toBeVisible();
            await entity.dataForLeads( "Krish","Rsoft", "1000");
            await leadsMo.saveBtn();
            await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
            await sShot.takeScreenshot(page,testInfo,"Only on the first save-Create entity executed")
            await entity.relatedModule();
            //await sShot.takeScreenshot(page,"Lead captured in the related module")
            await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
            await sShot.takeScreenshot(page,testInfo,"Only on the first save-Related module updated")
        })
        await test.step("editFirstRecord",async()=>
        {
            await leadsMo.menuIcon();
            await expect(page.getByRole('heading',{name:'Leads'})).toBeVisible();
            await leadsWithNo.editFirstRow(); 
            await entity.changeAssign();
            await leadsMo.saveBtn();
            await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
            await sShot.takeScreenshot(page,testInfo,"Only on the first save-condition not-matched")
        })
        await test.step("navigateToWorkFlow",async()=>
         {
        await dashBoard.profileIcon();
        await dashBoard.crmSettings();
        await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
        await workFlow.otherSettings();
        await workFlow.workFlowSettings();
        await expect(page.getByRole('heading',{name:'Workflow'})).toBeVisible();
        await workFlow.clickEditIcon();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.whenToExecuteWorkFlow1();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.editNext();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.editNext();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.editSubBtn();
        await leadsMo.menuIcon();
        })
        // Until the first time the condition is true
  console.log("START: LeadWithNoTask");
  await test.step("LeadWithNoTask", async () => {
    await leadsMo.addLead();
    await expect(page.getByRole('heading',{name:'Create Leads'})).toBeVisible();
    await entity.changeAssign();
    await entity.dataForLeads( "Krish","Rsoft", "1000");
    await leadsMo.saveBtn();
    await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page, testInfo,"Until the first time the condition is true-condition-not-matched")
    //console.log("Condition not matched , task not get triggered")
    console.log("END: LeadWithNoTask");
  });
  await test.step("conditionMatched",async()=>{
    // await leadsWithNo.editFirstRow
    await leadsMo.menuIcon();
    await leadsWithNo.editFirstRow();
    await leadsWithNo.againDropDown();
    await leadsMo.saveBtn();
    await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page, testInfo,"Until the first time the condition is true-condition-matched-entity-executed")
    await entity.relatedModule();
    await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Until the first time the condition is true-condition-matched-entity-executed-related module")
    await leadsMo.menuIcon();
    await leadsWithNo.editFirstRow();
    await page.waitForLoadState('networkidle')
    await leadsMo.saveBtn();
    await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page, testInfo,"Until the first time the condition is true-condition-not matched-entity-not executed")
  })

  //Every time the record is save
  await test.step("navigateToWorkFlowFor3",async()=>
  {
  await dashBoard.profileIcon();
  await dashBoard.crmSettings();
  await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
  await workFlow.otherSettings();
  await workFlow.workFlowSettings();
  await expect(page.getByRole('heading',{name:'Workflow'})).toBeVisible();
  await workFlow.clickEditIcon();
  await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
  await everyTimeSave.thirdWorkFlow();
  await workFlow.editNext();
  await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
  await workFlow.editNext();
  await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
  await workFlow.editSubBtn();  
  console.log("END: redirectToWorkflowToChangeTheFlow3");
  })
  await test.step("redirectToLeadModule",async()=>{
    await leadsMo.menuIcon();
    await leadsMo.addLead();
    await expect(page.getByRole('heading',{name:'Create Leads'})).toBeVisible();
    await entity.dataForLeads( "Krish","Rsoft", "1000");
    await leadsMo.saveBtn();
    await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Every time the record is save-condition-matched-entity-executed")
    await entity.relatedModule();
            //await sShot.takeScreenshot(page,"Lead captured in the related module")
    await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Every time the record is save-condition-matched-entity-executed- Related module updated")
  })
  await test.step("editRow",async()=>{
    await leadsMo.menuIcon();
    await leadsWithNo.editFirstRow();
    await entity.dataForLeads( "Krishna","Rsoft", "1000");
     await leadsMo.saveBtn();
    await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Every time the record is save-condition-matched-entity-executed-after the edit")
    await entity.relatedModule();
            //await sShot.takeScreenshot(page,"Lead captured in the related module")
    await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Every time the record is save-condition-matched-entity-executed-Related module updated")
  })
  await test.step("conditionMismatch",async()=>{
     await leadsMo.menuIcon();
    await leadsWithNo.editFirstRow();
    await leadsWithNo.diffDropDown();
    await leadsMo.saveBtn();
     await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
    await sShot.takeScreenshot(page,testInfo,"Every time the record is save-condition-not matched-entity-not executed")

  })

      //Every time the record is modified
      await test.step("redirectToWork",async()=>
      {
        await dashBoard.profileIcon();
        await dashBoard.crmSettings();
        await expect(page.getByRole('heading',{name:'Summary'})).toBeVisible();
        await workFlow.otherSettings();
        await workFlow.workFlowSettings();
        await expect(page.getByRole('heading',{name:'Workflow'})).toBeVisible();
        await workFlow.clickEditIcon();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await everyModi.everyTimeModified();
        await workFlow.editNext();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.editNext();
        await expect(page.getByRole('heading',{name:'Editing Workflow'})).toBeVisible();
        await workFlow.editSubBtn();  
        console.log("END: redirectToWorkflowToChangeTheFlow3");
      })

      await test.step("redirectToLeadCreation",async()=>{
       await leadsMo.menuIcon();
       await leadsMo.addLead();
       await expect(page.getByRole('heading',{name:'Create Leads'})).toBeVisible();
       await entity.dataForLeads( "Krish","Rsoft", "1000");
       await leadsMo.saveBtn();
       await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
       await sShot.takeScreenshot(page,testInfo,"Every time the record is modified-condition-not-matched-entity-not-executed")
      })
      await test.step("editTheFirstRow",async()=>{
        await leadsMo.menuIcon();
        await leadsWithNo.editFirstRow();
        await page.waitForLoadState('networkidle')
       await leadsMo.saveBtn();
        await expect(page.getByRole('heading',{name:"Leads Detail View"})).toBeVisible();
       await sShot.takeScreenshot(page,testInfo,"Every time the record is modified-condition-matched-entity-executed")
         await entity.relatedModule();
            //await sShot.takeScreenshot(page,"Lead captured in the related module")
       await expect(page.getByRole("heading",{name:"All UI Module Detail View"})).toBeVisible();
       await sShot.takeScreenshot(page,testInfo," Every time the record is modified-condition-matched-entity-executed-Related module updated")
      })

    
             
    })
    
})
