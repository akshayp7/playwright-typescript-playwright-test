import { Locator, Page, BrowserContext, FrameLocator } from '@playwright/test';

export class AlertsFrameWindowsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly NEW_TAB_BUTTON: Locator;
    readonly NEW_WINDOW_BUTTON: Locator;
    readonly PROMPT_ALERT_BUTTON: Locator;
    readonly PROMPT_RESULT: Locator;
    readonly FRAME_LOCATOR: Locator;
    readonly NESTED_CHILDFRAME_LOCATOR: Locator;
    readonly SECOND_FRAME: FrameLocator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.NEW_TAB_BUTTON = page.getByText('New Tab');
        this.NEW_WINDOW_BUTTON = page.getByText('New Window', { exact: true });
        this.PROMPT_ALERT_BUTTON = page.locator('#promtButton');
        this.PROMPT_RESULT = page.locator(`#promptResult`);
        this.FRAME_LOCATOR = page.frameLocator('#frame2').locator('#sampleHeading');
        this.SECOND_FRAME = page.frameLocator('#frame2');
        //Nested Iframe Locator
        this.NESTED_CHILDFRAME_LOCATOR = page.frameLocator('#frame1').frameLocator('iframe').getByText('Child Iframe');
    }

    async openNewTab(): Promise<Page> {
        /* Start waiting for new page(tab) before clicking.
        The event name/argument 'page' is specific to Playwright */
        const pagePromise = this.context.waitForEvent('page');
        await this.NEW_TAB_BUTTON.click();
        //It does not switch to the new tab automatically; you must use the returned Page object and perform actions on that page.
        const newTab = await pagePromise;
        //wait for page to stop loading
        await newTab.waitForLoadState();
        return newTab;
    }

    async openNewWindow(): Promise<Page> {
        const pagePromise = this.context.waitForEvent('page');
        await this.NEW_WINDOW_BUTTON.click();
        const newWindow = await pagePromise;
        await newWindow.waitForLoadState();
        return newWindow;
    }

    async enterTextAndAccept(text: string): Promise<void> {
        //We have to accept the dialog before we perform action
        this.page.on('dialog', dialog => dialog.accept(text));
        await this.PROMPT_ALERT_BUTTON.click();
    }
}
