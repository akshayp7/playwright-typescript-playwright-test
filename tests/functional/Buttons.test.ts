import test from '@lib/BaseTest';
import { expect } from 'allure-playwright';


test('Click buttons', async ({loginPage, webActions, elementsPage}) => {
    await loginPage.navigateToURL();
    await webActions.clickByText('Elements')
    await webActions.clickByText('Buttons')
    await elementsPage.doubleClickButton()
    await elementsPage.dblClickText.isVisible()
    await expect(elementsPage.dblClickText).toBeVisible()
    await elementsPage.rightClickButton()
    await expect(elementsPage.RIGHT_CLICK_TEXT).toBeVisible()
})