import { LoginPageObjects } from "@objects/LoginPageObjects";
import { WebActions } from "@lib/WebActions";
import type { Page } from 'playwright';
import {testConfig} from '../../testConfig';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    loginPageObjects = new LoginPageObjects();

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(`/index.php?controller=authentication&back=my-account`);
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await webActions.enterElementText(this.loginPageObjects.EMAIL_EDITBOX_ID, testConfig.username);
        await webActions.enterElementText(this.loginPageObjects.PASSWORD_EDITBOX_ID, decipherPassword);
        await webActions.clickElement(this.loginPageObjects.SIGN_IN_BUTTON_ID);
    }
}
