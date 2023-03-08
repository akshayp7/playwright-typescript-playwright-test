import test from '@lib/BaseTest';
import { expect } from '@playwright/test';
test(`Verify Elements Page.`, async ({ page, loginPage }) => {
    await loginPage.navigateToURL();
    expect(await page.screenshot()).toMatchSnapshot('MainPage.png');
});