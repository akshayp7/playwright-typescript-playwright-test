import test from '@lib/BaseTest';

test(`Login to PHP travels.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
});