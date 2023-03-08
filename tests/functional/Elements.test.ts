import test from '@lib/BaseTest';

test(`@Smoke Verify Elements Page`, async ({ loginPage, elementsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements'); // Click on Elements Icon identified via text selector
    await webActions.clickByText('Text Box'); //Click on TextBox Navigation Sidebar identified via text selector
    await elementsPage.enterFullName(`AutoTest`);
    await elementsPage.clickSubmit();
    await elementsPage.verifySubmittedText();
    await webActions.clickByText('Check Box');
    await elementsPage.clickHomeCheckBox();
    await elementsPage.verifyHomeCheckboxSelectedText();
    await webActions.clickByText('Radio Button');
    await elementsPage.verifyNoRadioButtonDisabled();
    await webActions.clickByText('Web Tables');
    await elementsPage.verifyFirstColumnTableHeader('First Name');
    await elementsPage.editCierraEntry();
    await elementsPage.verifyRegistrationForm();
    await elementsPage.registrationFormClose();
    await webActions.clickByText('Buttons');
    await elementsPage.doubleClickButton();
    await elementsPage.verifyDoubleClickText();
    await elementsPage.rightClickButton();
    await elementsPage.verifyRightClickText();
    await webActions.clickByText('Upload and Download');
    await elementsPage.verifyFileDownload();
    await elementsPage.verifyFileUpload();
    await webActions.clickByText('Links');
    await elementsPage.verifyNewBrowserTab("https://demoqa.com/");
});