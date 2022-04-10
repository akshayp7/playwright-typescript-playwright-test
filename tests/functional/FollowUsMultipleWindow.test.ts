import test from '@lib/BaseTest';

test(`@Smoke Verify Follow Us Facebook new window.`, async ({ context, loginPage, myAccountPage }) => {
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();
    await myAccountPage.verifyMyAccountHeader();
    await myAccountPage.verifyFollowUsFBWindow(context, "facebook");
});