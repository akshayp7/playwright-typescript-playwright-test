import fs from 'fs';
import * as CryptoJS from 'crypto-js';
import type { Page } from 'playwright';
import { expect } from '@playwright/test';
import { Workbook } from 'exceljs';
import path from 'path';

const loginData = JSON.parse(fs.readFileSync(`./testData.json`, `utf-8`));
const waitForElement = parseInt(JSON.parse(fs.readFileSync(`./testData.json`, `utf-8`)).waitForElement);

export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToURL(url: string) {
        this.page.goto(url);
    }

    async decipherPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        // const cipher = CryptoJS.AES.encrypt('demouat',key);
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(loginData.password, key).toString(CryptoJS.enc.Utf8);
    }

    async waitForElementAttached(locator: string): Promise<void> {
        await this.page.waitForSelector(locator);
    }

    async waitForPageNavigation(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case `networkidle`:
                await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
                break;
            case `load`:
                await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
                break;
            case `domcontentloaded`:
                await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
        }
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickElement(locator: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await this.page.click(locator);
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async boundingBoxClickElement(locator: string): Promise<void> {
        await this.delay(1000);
        const elementHandle = await this.page.$(locator);
        const box = await elementHandle.boundingBox();
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await this.page.fill(locator, text);
    }

    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
        await this.waitForElementAttached(dragElementLocator);
        await this.waitForElementAttached(dropElementLocator);
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
    }

    async selectOptionFromDropdown(locator: string, option: string): Promise<void> {
        await this.waitForElementAttached(locator);
        const selectDropDownLocator = await this.page.$(locator);
        selectDropDownLocator.type(option);
    }

    async getTextFromWebElements(locator: string): Promise<string[]> {
        await this.waitForElementAttached(locator);
        return await this.page.$$eval(locator, elements => elements.map(item => item.textContent.trim()));
    }

    async downloadFile(locator: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent(`download`),
            this.page.click(locator)
        ]);
        await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
        return download.suggestedFilename();
    }

    async keyPress(locator: string, key: string): Promise<void> {
        this.page.press(locator, key);
    }

    async readDataFromExcel(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string> {
        const workbook = new Workbook();
        const data = await workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
            const sheet = workbook.getWorksheet(sheetName);
            return sheet.getRow(rowNum).getCell(cellNum).toString();
        });
        return data;
    }

    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    async writeDataIntoTextFile(filePath: number | fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }

    async verifyElementText(locator: string, text: string): Promise<void> {
        await this.waitForElementAttached(locator);
        const textValue = await this.page.textContent(locator);
        expect(textValue.trim()).toBe(text);
    }

    async verifyElementContainsTest(locator: string, text: string): Promise<void> {
        await this.waitForElementAttached(locator);
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async verifyJSElementValue(locator: string, text: string): Promise<void> {
        await this.waitForElementAttached(locator);
        const textValue = await this.page.$eval(locator, (element: HTMLInputElement) => element.value);
        expect(textValue.trim()).toBe(text);
    }

    async verifyElementAttribute(locator: string, attribute: string, value: string): Promise<void> {
        await this.waitForElementAttached(locator);
        const textValue = await this.page.getAttribute(locator, attribute);
        expect(textValue.trim()).toBe(value);
    }

    async verifyElementIsDisplayed(locator: string, errorMessage: string): Promise<void> {
        await this.page.waitForSelector(locator, { state: `visible`, timeout: waitForElement })
            .catch(() => { throw new Error(`${errorMessage}`); });
    }

    async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
        try {
            expect(status).toBe(true);
        }
        catch (exception) {
            throw new Error(`${errorMessage}`);
        }
    }

    async expectToBeValue(expectedValue: string, actualValue: string, errorMessage: string): Promise<void> {
        try {
            expect(expectedValue.trim()).toBe(actualValue);
        }
        catch (exception) {
            throw new Error(`${errorMessage}`);
        }
    }
}