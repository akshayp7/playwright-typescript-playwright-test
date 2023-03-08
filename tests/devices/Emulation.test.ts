import test from '@lib/BaseTest';

test(`Verify Elements Page.`, async ({ loginPage, elementsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements'); // Click on Elements Icon identified via text selector
    await webActions.clickByText('Text Box'); //Click on TextBox Navigation Sidebar identified via text selector
    await elementsPage.enterFullName(`AutoTest`);
});