import { MyAddressesPageObjects } from "@objects/MyAddressesPageObjects";
import { WebActions } from "@lib/WebActions";
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MyAddressesPage extends MyAddressesPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyMyAddressesHeader(): Promise<void> {
        await webActions.verifyElementText(MyAddressesPageObjects.MY_ADDRESSES_HDR_XPATH, `My addresses`);
    }

    async verifyAdressDetails(): Promise<void> {
        await webActions.verifyElementText(MyAddressesPageObjects.ADDRESS_DETAILS_XPATH, `qwert`);
    }
}