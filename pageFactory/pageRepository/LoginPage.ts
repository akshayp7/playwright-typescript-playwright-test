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

    async navigateToURL() {
        await this.page.goto(loginData.URL);
    }

    async loginToApplication() {
        const decipherPassword = await webActions.decipherPassword();
        await this.page.fill(this.loginPageObjects.EMAIL_EDITBOX_XPATH, loginData.username);
        await this.page.fill(this.loginPageObjects.PASSWORD_EDITBOX_XPATH, decipherPassword);
        await this.page.click(this.loginPageObjects.LOGIN_BUTTON_XPATH);
    }



}
