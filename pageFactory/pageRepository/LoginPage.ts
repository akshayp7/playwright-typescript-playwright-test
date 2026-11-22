import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from '../../testConfig';

let webActions: WebActions;

export class LoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly BOOKS_SEARCH_BOX: Locator;
    readonly BOOK_STORE_APPLICATION: Locator;
    readonly NEW_USER: Locator;
    readonly FIRST_NAME: Locator;
    readonly LAST_NAME: Locator;
    readonly REGISTER: Locator

    /*This contructor is a special method that's automatically executed when an object of the class is created using the new keyword. 
    In java it has the same name as the class name but in ts it is created by using the keyword "constructor"
    The constructor receives the page object from playwright. Without page object the class won't be able to interact with the web elements
    We also define the locators for the web elements of the login page, (similarly in other page objects)*/

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.getByPlaceholder('UserName');
        this.PASSWORD_EDITBOX = page.getByPlaceholder('Password');
        this.LOGIN_BUTTON = page.getByRole('button', { name: 'Login' });
        this.BOOKS_SEARCH_BOX = page.getByPlaceholder('Type to search');
        this.BOOK_STORE_APPLICATION = page.getByRole('heading',{ name: 'Book Store Application' })
        this.NEW_USER = page.getByRole('button', {name: 'New User'})
        this.FIRST_NAME = page.getByPlaceholder('First Name')
        this.LAST_NAME = page.getByPlaceholder('Last Name')
        this.REGISTER = page.getByRole('button', {name: 'Register'})
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async clickOnLoginMainButton(): Promise<void> {
        await this.LOGIN_BUTTON.click();
    }

    async loginToApplication(): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testConfig.username);
        await this.PASSWORD_EDITBOX.fill(decipherPassword);
        await this.LOGIN_BUTTON.click();
    }

}
