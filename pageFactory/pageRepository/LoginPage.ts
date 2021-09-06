import { LoginPageObjects } from "../objectRepository/LoginPageObjects";
import { WebActions } from "../../lib/WebActions";
import type { Page } from 'playwright';
import fs from 'fs';

const loginData = JSON.parse(fs.readFileSync('./testData.json', 'utf-8'));

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    loginPageObjects = new LoginPageObjects();

    async navigateToURL(): Promise<void> {
        await webActions.navigateToURL(loginData.URL);
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await webActions.enterElementText(this.loginPageObjects.EMAIL_EDITBOX_ID, loginData.username);
        await webActions.enterElementText(this.loginPageObjects.PASSWORD_EDITBOX_ID, decipherPassword);
        await webActions.clickElement(this.loginPageObjects.SIGN_IN_BUTTON_ID);
    }
}
