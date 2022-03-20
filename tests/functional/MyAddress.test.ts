import test from '@lib/BaseTest';

// We can use Steps like in Cucmber format as shown below

test(`@Smoke Verify My Address Details`, async ({ loginPage, myAccountPage, myAddressesPage }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Login to Application`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is Navigated to My Account page.`, async () => {
        await myAccountPage.verifyMyAccountHeader();
    });
    await test.step(`Click on My Addresses Link`, async () => {
        await myAccountPage.clickOnMyAccountLinks(`My addresses`);
    });
    await test.step(`Verify User is Navigated to My Addresses page.`, async () => {
        await myAddressesPage.verifyMyAddressesHeader();
    });
    await test.step(`Verify User Addresses is displayed correctly in My Addresses page.`, async () => {
        await myAddressesPage.verifyAdressDetails();
    });
});