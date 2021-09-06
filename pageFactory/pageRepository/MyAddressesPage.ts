import { MyAddressesPageObjects } from "../objectRepository/MyAddressesPageObjects";
import { WebActions } from "../../lib/WebActions";
import type { Page } from 'playwright';

let webActions: WebActions;

export class MyAddressesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    myAddressesPageObjects = new MyAddressesPageObjects();

    async verifyMyAddressesHeader(): Promise<void> {
        await webActions.verifyElementText(this.myAddressesPageObjects.MY_ADDRESSES_HDR_XPATH, `My addresses`);
    }

    async verifyAdressDetails(): Promise<void> {
        await webActions.verifyElementText(this.myAddressesPageObjects.ADDRESS_DETAILS_XPATH, `qwert`);
    }
}