import test from '@lib/BaseTest';
import { LoginPage } from '@pages/LoginPage';
import { expect } from '@playwright/test';

test(`Verify Elements Page`, { tag: '@Smoke'}, async ({ loginPage, elementsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements'); // Click on Elements Icon identified via text selector
    await webActions.clickByText('Text Box'); //Click on TextBox Navigation Sidebar identified via text selector
    await elementsPage.enterFullName(`AutoTest`);
    await elementsPage.clickSubmit();
    await expect(elementsPage.SUBMITTED_TEXT).toBeVisible();
    await webActions.clickByText('Check Box');
    await elementsPage.clickHomeCheckBox();
    await expect(elementsPage.HOME_SELECTED_TEXT).toContainText(`home`);
    await webActions.clickByText('Radio Button');
    await expect(elementsPage.NO_RADIO_BUTTON).toBeDisabled();
    await webActions.clickByText('Web Tables');
    expect(await elementsPage.getFirstColumnTableHeader()).toBe(`First Name`);
    await elementsPage.editCierraEntry();
    await expect(elementsPage.REGISTRATION_FORM_HEADER).toBeVisible();
    await elementsPage.registrationFormClose();
    await webActions.clickByText('Buttons');
    await elementsPage.doubleClickButton();
    await expect(elementsPage.DOUBLE_CLICK_TEXT).toBeVisible();
    await elementsPage.rightClickButton();
    await expect(elementsPage.RIGHT_CLICK_TEXT).toBeVisible();
    await webActions.clickByText('Upload and Download');
    await elementsPage.downloadFile();
    await elementsPage.uploadFile();
    await expect(elementsPage.UPLOADED_FILE_TEXT).toBeVisible();
    await webActions.clickByText('Links');
    const homePage = await elementsPage.openHomeLinkInNewTab();
    expect(homePage.url()).toBe(`https://demoqa.com/`);
    await homePage.close();
});

test('Print table data', async ({ loginPage, elementsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements');
    await webActions.clickByText('Web Tables')
    await elementsPage.printTableData();
});
