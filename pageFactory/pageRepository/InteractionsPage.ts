import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class InteractionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly DRAGGABLE: Locator;
    readonly DROPPABLE: Locator

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.DRAGGABLE = page.getByRole('tabpanel', { name: 'Simple' }).locator('#draggable');
        this.DROPPABLE = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
    }

    async verifyDragandDrop(): Promise<void> {
        await this.DRAGGABLE.hover();
        await this.page.mouse.down();
        await this.DROPPABLE.hover();
        await this.page.mouse.up();
        await expect(this.DROPPABLE).toContainText('Dropped'); //Verify Dropped text
    }
}