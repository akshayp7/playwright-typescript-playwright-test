import test from '../../lib/BasePages';

test(`Login to PHP travels.`, async ({ loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
});