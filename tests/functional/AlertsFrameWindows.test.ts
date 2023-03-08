import test from '@lib/BaseTest';

test(`@Smoke Verify Alerts, Frame & Windows Page`, async ({ loginPage, alertsFrameWindowsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Alerts, Frame & Windows'); // Click on Alerts, Frame & Windows icon
    await webActions.clickByText('Browser Windows'); // Click on Browser Windows navigation side bar
    await alertsFrameWindowsPage.verifyNewTab(`https://demoqa.com/sample`);
    await alertsFrameWindowsPage.verifyNewWindow(`https://demoqa.com/sample`);
    await webActions.clickByText('Alerts');
    await alertsFrameWindowsPage.enterTextAndAccept(`Hello`); // Enter Text Hello in alert prompt and click ok
    await webActions.clickByText('Frames');
    await alertsFrameWindowsPage.verifyFrameText('This is a sample page');
    await webActions.clickByText('Nested Frames');
    await alertsFrameWindowsPage.verifyNestedFrameChildText();
});