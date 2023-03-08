import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class AlertsFrameWindowsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly NEW_TAB_BUTTON: Locator;
    readonly NEW_WINDOW_BUTTON: Locator;
    readonly PROMPT_ALERT_BUTTON: Locator;
    readonly PROMPT_RESULT: Locator;
    readonly FRAME_LOCATOR: Locator;
    readonly NESTED_CHILDFRAME_LOCATOR: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.NEW_TAB_BUTTON = page.getByText('New Tab');
        this.NEW_WINDOW_BUTTON = page.getByText('New Window', { exact: true });
        this.PROMPT_ALERT_BUTTON = page.locator('#promtButton');
        this.PROMPT_RESULT = page.locator(`#promptResult`);
        this.FRAME_LOCATOR = page.frameLocator('#frame2').locator('#sampleHeading');
        //Nested Iframe Locator
        this.NESTED_CHILDFRAME_LOCATOR = page.frameLocator('#frame1').frameLocator('iframe').getByText('Child Iframe');
    }

    async verifyNewTab(newTabUrlExpect): Promise<void> {
        // Start waiting for new page before clicking.
        const pagePromise = this.context.waitForEvent('page');
        await this.NEW_TAB_BUTTON.click();
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        const newTabUrlActual = newTab.url();
        //Verify New Tab URL
        expect(newTabUrlActual == newTabUrlExpect).toBeTruthy();
        //Verify Text displayed in New tab
        await expect(newTab.locator('#sampleHeading')).toContainText('This is a sample page');
        //Close New tab
        await newTab.close();
    }

    async verifyNewWindow(newWindowUrlExpect): Promise<void> {
        const pagePromise = this.context.waitForEvent('page');
        await this.NEW_WINDOW_BUTTON.click();
        const newWindow = await pagePromise;
        await newWindow.waitForLoadState();
        const newWindowUrlActual = newWindow.url();
        //Verify New Tab URL
        expect(newWindowUrlActual == newWindowUrlExpect).toBeTruthy();
        //Close New Window
        await newWindow.close();
    }

    async enterTextAndAccept(text: string): Promise<void> {
        //We have to accept the dialog before we perform action
        this.page.on('dialog', dialog => dialog.accept(text));
        await this.PROMPT_ALERT_BUTTON.click();
        expect(this.PROMPT_RESULT).toContainText(`You entered ${text}`); // Verify User has clicked on Cancel button
    }

    async verifyFrameText(expectedFrameText: string): Promise<void> {
        const actualFrameText = await this.FRAME_LOCATOR.textContent();
        expect(expectedFrameText == actualFrameText).toBeTruthy();
    }

    async verifyNestedFrameChildText() {
        expect(this.NESTED_CHILDFRAME_LOCATOR).toBeVisible();
    }
}