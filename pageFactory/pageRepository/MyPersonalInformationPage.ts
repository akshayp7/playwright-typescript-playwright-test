import { MyPersonalInformationPageObjects } from '@objects/MyPersonalInformationPageObjects'
import { WebActions } from "@lib/WebActions";
import type { Page } from '@playwright/test';

let webActions: WebActions;

export class MyPersonalInformationPage extends MyPersonalInformationPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyMyPersonalInfoHeader(): Promise<void> {
        await webActions.verifyElementText(MyPersonalInformationPageObjects.MY_PERSONAL_INFO_HDR_XPATH, `Your personal information`);
    }

    async verifyFirstName(firstName: string): Promise<void> {
        await webActions.verifyJSElementValue(MyPersonalInformationPageObjects.FIRST_NAME_ID, firstName);
    }
}