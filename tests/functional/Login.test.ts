import test from '@lib/BaseTest';

// We can use Steps like in Cucmber format as shown below

test(`@Smoke Verify Book Store Login`, async ({ loginPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await loginPage.navigateToURL();
    });
    await test.step(`Click on Book Store Application Icon`, async () => {
        await webActions.clickByText('Book Store Application');
    });
    await test.step(`Click on Login button in Main page`, async () => {
        await loginPage.clickOnLoginMainButton();
    });
    await test.step(`Login to Book Store application`, async () => {
        await loginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Profile page`, async () => {
        await loginPage.verifyProfilePage();
    });
}); 