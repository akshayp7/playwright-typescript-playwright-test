import test from '@lib/BaseTest';

test(`@Smoke Verify Interactions Page`, async ({ loginPage, interactionsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Interactions'); // Click on Interactions Icon identified via text selector
    await webActions.clickByText('Droppable');
    await interactionsPage.verifyDragandDrop();
});