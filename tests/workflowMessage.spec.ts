import {test,Page} from "@playwright/test";
import {LoginPage} from "../pages/loginpage";
import {DashboardPage} from "../pages/dashboard";
import { ProfilePage } from "../pages/profile";
import {WorkflowMessagePage} from "../pages/workflowMessage";

test.describe("Workflow Message Creation", () => {
     test("createWorkflowMessage", async({page}) => {
        test.setTimeout(90000);
        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        //const profile = new ProfilePage(page);
        const workflowMessage = new WorkflowMessagePage(page);
        const suffix = Date.now().toString().slice(-6);
        // const moduleName = `Krish-${suffix}`;
        const workFlowName = `TestMessage-${suffix}`;
        await login.loginPage();
        // login in to the application
        await login.login("PRIYAN", "rsoft", "RSoft!@345");
        // navigate to profile page
        await dashboard.profileIcon();
        await dashboard.crmSettings();
        await workflowMessage.otherSettings();
        await workflowMessage.workFlowSettings();
        await workflowMessage.createBtn()
        await workflowMessage.step1("Leads", workFlowName);
        await workflowMessage.step2();
        await workflowMessage.step3();
       // await workflowMessage.scrollForLastView(); 
     })       

    
});