import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { RolePage } from '../pages/role';
import { DashboardPage } from '../pages/dashboard';
import { ProfilePage } from '../pages/profile';

test.describe("Role Creation", () => {

    test("createRole", async({page}) => {
        test.setTimeout(90000);

        const login = new LoginPage(page);
        const dashboard = new DashboardPage(page);
        const profile = new ProfilePage(page);
        const role = new RolePage(page);
        const suffix = Date.now().toString().slice(-6);
        const profileName = `Krish-${suffix}`;
        const roleName = `TestRole-${suffix}`;

        await login.loginPage();
        // login in to the application
        await login.login("PRIYAN", "rsoft", "RSoft!@345");

        // navigate to profile page
        await dashboard.profileIcon();
        await dashboard.crmSettings();
        await dashboard.userAccessCtrl();

        // create profile first
        await dashboard.profileSettings();
        await profile.createBtn();
        await profile.profileField(profileName);
        await profile.descField("This is a test profile");
        await profile.subBtn();

        // continue with role creation for the created profile
        await role.roleSettings();
        await role.createBtn();
        await test.step("Validating the role creation", async () => 
        {
            await role.addRole();
            await role.nameField(roleName);
            await role.saveBtn();
            await role.expectRoleVisible(roleName);
            console.log(`Role "${roleName}" created successfully and is visible in the list.`);
        });
    });

});
