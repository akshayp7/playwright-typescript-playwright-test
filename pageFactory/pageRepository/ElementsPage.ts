import { Locator, Page, BrowserContext } from '@playwright/test';
import path from 'path';

export class ElementsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly ELEMENTS_TITLE: Locator;
    readonly TEXT_BOX_TITLE: Locator;
    readonly FULL_NAME_EDITBOX: Locator;
    readonly SUBMIT_BUTTON: Locator;
    readonly SUBMITTED_TEXT: Locator;
    readonly HOME_CHECK_BOX: Locator;
    readonly HOME_SELECTED_TEXT: Locator;
    readonly NO_RADIO_BUTTON: Locator;
    readonly WEB_TABLES_HEADER: Locator;
    readonly WEB_TABLES_EDIT_ICON: Locator;
    readonly REGISTRATION_FORM_HEADER: Locator;
    readonly REGISTRATION_FORM_CLOSE_BUTTON: Locator;
    readonly DOUBLE_CLICK_BUTTON: Locator;
    readonly DOUBLE_CLICK_TEXT: Locator;
    readonly RIGHT_CLICK_BUTTON: Locator;
    readonly RIGHT_CLICK_TEXT: Locator;
    readonly HOME_LINK: Locator;
    readonly DOWNLOAD_BUTTON: Locator;
    readonly UPLOAD_BUTTON: Locator;
    readonly UPLOADED_FILE_TEXT: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.FULL_NAME_EDITBOX = page.getByPlaceholder(`Full Name`);
        this.SUBMIT_BUTTON = page.getByText(`Submit`);
        this.SUBMITTED_TEXT = page.getByText(`Name:AutoTest`, { exact: true }); // Matches exact text
        this.HOME_CHECK_BOX = page.getByRole('checkbox', { name: 'Select Home' });
        this.HOME_SELECTED_TEXT = page.locator(`#result`);
        this.NO_RADIO_BUTTON = page.locator(`#noRadio`); // Using CSS Selector
        this.WEB_TABLES_HEADER = page.getByRole('columnheader');
        this.WEB_TABLES_EDIT_ICON = page.getByRole('row', { name: 'Cierra' }).getByTitle('Edit').locator('svg'); // Chaining Locators
        this.REGISTRATION_FORM_HEADER = page.getByText('Registration Form');
        this.REGISTRATION_FORM_CLOSE_BUTTON = page.getByRole('button', { name: 'Close' });
        this.DOUBLE_CLICK_BUTTON = page.locator('#doubleClickBtn');
        this.DOUBLE_CLICK_TEXT = page.getByText('You have done a double click');
        this.RIGHT_CLICK_BUTTON = page.locator('#rightClickBtn');
        this.RIGHT_CLICK_TEXT = page.getByText('You have done a right click');
        this.HOME_LINK = page.locator('#simpleLink');
        this.DOWNLOAD_BUTTON = page.locator(`#downloadButton`);
        this.UPLOAD_BUTTON = page.locator(`#uploadFile`)
        this.UPLOADED_FILE_TEXT = page.getByText('sampleFile.jpeg');
    }

    async enterFullName(name: string): Promise<void> {
        await this.FULL_NAME_EDITBOX.fill(name);
    }

    async clickSubmit(): Promise<void> {
        await this.SUBMIT_BUTTON.click();
    }

    async clickHomeCheckBox(): Promise<void> {
        await this.HOME_CHECK_BOX.check();
    }

    async getFirstColumnTableHeader(): Promise<string> {
        return await this.WEB_TABLES_HEADER.first().innerText();
    }

    async editCierraEntry(): Promise<void> {
        await this.WEB_TABLES_EDIT_ICON.click();
    }

    async registrationFormClose(): Promise<void> {
        await this.REGISTRATION_FORM_CLOSE_BUTTON.click();
    }

    async doubleClickButton(): Promise<void> {
        await this.DOUBLE_CLICK_BUTTON.dblclick();
    }

    async rightClickButton(): Promise<void> {
        await this.RIGHT_CLICK_BUTTON.click({ button: 'right' }); // Right Click on button
    }

    async openHomeLinkInNewTab(): Promise<Page> {
        // Start waiting for new page before clicking.
        const pagePromise = this.context.waitForEvent('page');
        await this.HOME_LINK.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }

    async downloadFile(): Promise<void> {
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = this.page.waitForEvent('download');
        await this.DOWNLOAD_BUTTON.click();
        // Wait for the download process to complete.
        const download = await downloadPromise;
        // File will be downloaded in the Downloads folder of thos project
        await download.saveAs(path.join(__dirname, `../../Downloads`, download.suggestedFilename()));
    }

    async uploadFile(): Promise<void> {
        // Select one file
        const uploadFilePath = path.join(__dirname, `../../utils/functional/sampleFile.jpeg`);
        await this.UPLOAD_BUTTON.setInputFiles(uploadFilePath);
    }
}
