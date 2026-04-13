import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { DashboardPage } from '../pages/dashboard';
import { ProfilePage } from '../pages/profile';
import { toasterMess } from '../utils/toaster'; 

test("profileCreation", async({page})=>{
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const profile = new ProfilePage(page);

    await login.loginPage(); 
    //login into the application
    await login.login("PRIYAN", "rsoft", "RSoft!@345");

    //navigate to profile page
    await dashboard.profileIcon();
    await dashboard.crmSettings();
    await dashboard.userAccessCtrl()
    await dashboard.profileSettings();

    //create profile
    await profile.createBtn();
    await test.step("Validating the profile creation", async() =>
    {
        const profileField = await profile.profileField("Krish");
        // await profile.descField("This is a test profile");    
        await profile.subBtn();
        // const toastMessage = await toasterMess(page);
        // expect(toastMessage).toContain("Description Can't be Empty!!!");
        profileField.fill('');

        const descriptionF=await profile.descField("This is a test profile");
        await profile.subBtn(); 
        // const toastMessage2 = await toasterMess(page);
        // expect(toastMessage2).toContain("Profile Name Can't be Empty!!!");
        descriptionF.fill('');

        const profileField2 = await profile.profileField("Krish");
        const descriptionF2=await profile.descField("This is a test profile");
        await profile.subBtn(); 
        // const toastMessage3 = await toasterMess(page);
        // expect(toastMessage3).toContain("Profile Created Successfully!!!");
    });
    
})