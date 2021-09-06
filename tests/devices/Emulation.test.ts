import { LoginPage } from "../../pageFactory/pageRepository/LoginPage";
import { MyAccountPage } from "../../pageFactory/pageRepository/MyAccountPage";
import { test } from '@playwright/test';

test(`Verify My Personal Information.`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
});
