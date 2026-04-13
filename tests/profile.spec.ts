import {test} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { DashboardPage } from '../pages/dashboard';
import { ProfilePage } from '../pages/profile';

test("profileCreation", async({page})=>{
    test.setTimeout(90000);
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
    const suffix = Date.now().toString().slice(-6);

    const profileName = `Krish-${suffix}`;
    const roleName = `TestRole-${suffix}`;

    //create profile
    await profile.createBtn();
    await test.step("Validating the profile creation", async() =>
    {
        const profileField = await profile.profileField(profileName);
        // await profile.descField("This is a test profile");    
        await profile.subBtn();
        // const toastMessage = await toasterMess(page);
        // expect(toastMessage).toContain("Description Can't be Empty!!!");
        await profileField.fill('');

        const descriptionF=await profile.descField(roleName);
        await profile.subBtn(); 
        // const toastMessage2 = await toasterMess(page);
        // expect(toastMessage2).toContain("Profile Name Can't be Empty!!!");
        await descriptionF.fill('');

        const profileField2 = await profile.profileField(profileName);
        const descriptionF2=await profile.descField(roleName);
        await profile.subBtn(); 
        // const toastMessage3 = await toasterMess(page);
        // expect(toastMessage3).toContain("Profile Created Successfully!!!");
    });
    
})
