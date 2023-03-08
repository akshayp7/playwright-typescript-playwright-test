import test from '@lib/BaseTest';

test(`@Smoke Verify Widgets Page`, async ({ loginPage, widgetsPage, webActions }) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Widgets'); // Click on Widgets Icon identified via text selector
    await webActions.clickByText('Auto Complete');
    await widgetsPage.enterAutocompleteEditbox('Bl');
    await widgetsPage.verifyBlueColourSelected();
    await webActions.clickByText('Tool Tips');
    await widgetsPage.verifyButtonTooltip('You hovered over the Button');
    await webActions.clickByText('Select Menu');
    await widgetsPage.oldStyleSelectColour('Aqua');
});