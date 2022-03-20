import { LoginPage } from "@pages/LoginPage";
import { MyAccountPage } from "@pages/MyAccountPage";
import { test } from '@playwright/test';

test(`Verify My Personal Information.`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);

    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
});
