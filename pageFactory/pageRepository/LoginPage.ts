import { LoginPageObjects } from "@objects/LoginPageObjects";
import { WebActions } from "@lib/WebActions";
import type { Page } from '@playwright/test';
import {testConfig} from '../../testConfig';

let webActions: WebActions;

export class LoginPage extends LoginPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(`/index.php?controller=authentication&back=my-account`);
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await webActions.enterElementText(LoginPageObjects.EMAIL_EDITBOX_ID, testConfig.username);
        await webActions.enterElementText(LoginPageObjects.PASSWORD_EDITBOX_ID, decipherPassword);
        await webActions.clickElement(LoginPageObjects.SIGN_IN_BUTTON_ID);
    }
}
