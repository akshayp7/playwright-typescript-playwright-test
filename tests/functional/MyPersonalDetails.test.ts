import test from '@lib/BaseTest';

test(`@Smoke Verify My Personal Information.`, async ({ loginPage, myAccountPage, myPersonalInformationPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
    await myAccountPage.clickOnMyAccountLinks(`My personal information`);
    await myPersonalInformationPage.verifyMyPersonalInfoHeader();
    await myPersonalInformationPage.verifyFirstName(`Demo`);
});