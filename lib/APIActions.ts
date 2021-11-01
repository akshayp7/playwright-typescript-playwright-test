import fs from 'fs';
import { expect } from '@playwright/test';

export class APIActions {

    async verifyStatusCode(actual: number, expected: number): Promise<void> {
        try {
            expect(actual).toBe(expected);
        }
        catch (exception) {
            throw new Error(`${expected} status code was not displayed.`);
        }
    }

    async verifyResponseBody(expectedResponseBodyParams: string, responsePart: JSON, responseType: string): Promise<void> {
        let status = true;
        let fieldNames = `Parameter`;
        const headers = expectedResponseBodyParams.split("|");
        const responseToString = JSON.stringify(responsePart).trim();
        for (let i = 0; i < headers.length; i++) {
            if (!(responseToString.includes(headers[i].trim()))) {
                status = false;
                fieldNames = fieldNames + `, ` + headers[i];
                break;
            }
        }
        try {
            expect(status).toBe(true);
        }
        catch (exception) {
            throw new Error(`${fieldNames} was not present in ${responseType}`);
        }
    }

    async verifyResponseHeader(expectedResponseHeaderParams: string, responsePart: Array<{ name: string, value: string }>, responseType: string): Promise<void> {
        let status = true;
        let fieldNames = `Parameter`;
        for (let i = 0; i < responsePart.length; i++) {
            if (!(expectedResponseHeaderParams.includes(responsePart[i].name.trim()))) {
                status = false;
                fieldNames = fieldNames + ' ,' + responsePart[i].name;
                break;
            }
        }
        try {
            expect(status).toBe(true);
        }
        catch (exception) {
            throw new Error(`${fieldNames} was not present in ${responseType}`);
        }
    }

    async readValuesFromTextFile(fileName: string): Promise<string> {
        return fs.readFileSync(`./utils/api/${fileName}.txt`, `utf8`);
    }
}