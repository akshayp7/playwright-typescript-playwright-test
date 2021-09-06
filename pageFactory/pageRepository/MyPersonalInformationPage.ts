import { MyPersonalInformationPageObjects } from '../objectRepository/MyPersonalInformationPageObjects'
import { WebActions } from "../../lib/WebActions";
import type { Page } from 'playwright';

let webActions: WebActions;

export class MyPersonalInformationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    myPersonalInformationPageObjects = new MyPersonalInformationPageObjects();

    async verifyMyPersonalInfoHeader(): Promise<void> {
        await webActions.verifyElementText(this.myPersonalInformationPageObjects.MY_PERSONAL_INFO_HDR_XPATH, `Your personal information`);
    }

    async verifyFirstName(firstName: string): Promise<void> {
        await webActions.verifyJSElementValue(this.myPersonalInformationPageObjects.FIRST_NAME_ID, firstName);
    }
}