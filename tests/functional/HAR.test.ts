import test from '@lib/BaseTest';

test(`Generate and verify HAR file for Personal Information.`, async ({ page, loginPage, myAccountPage, myPersonalInformationPage }) => {
    // To record HAR file use below line where "update:true"
    // This line creates a directory named har and stores all the har related files in it.
    await page.routeFromHAR('har/personalInfo.har',{update:true});

    // Once you record the har file you can uncomment the below line for Network Replay with update:false
    //The below line uses the har file from the recoded directory.
    // await page.routeFromHAR('har/personalInfo.har',{update:false});
    await loginPage.navigateToURL();
    await loginPage.loginToApplication();   
    await myAccountPage.verifyMyAccountHeader();
    await myAccountPage.clickOnMyAccountLinks(`My personal information`);
    await myPersonalInformationPage.verifyMyPersonalInfoHeader();
    await myPersonalInformationPage.verifyFirstName(`Demo`);
});