import fs from 'fs';
import { APIResponse, expect } from '@playwright/test';

export class APIActions {

    async verifyStatusCode(response:APIResponse): Promise<void> {
        try {
            await expect(response).toBeOK();
        }
        catch (exception) {
            throw new Error(`200 Status code was not displayed.`);
        }
    }

    async verifyResponseBody(expectedResponseBodyParams: string, responsePart: JSON, responseType: string): Promise<void> {
        let status = true;
        let fieldNames = `Parameter`;
        const headers = expectedResponseBodyParams.split("|");
        const responseToString = JSON.stringify(responsePart).trim();
        for (let headerKey of headers) {
            if (!(responseToString.includes(headerKey.trim()))) {
                status = false;
                fieldNames = fieldNames + `, ` + headerKey;
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
        for (let responseKey of responsePart) {
            if (!(expectedResponseHeaderParams.includes(responseKey.name.trim()))) {
                status = false;
                fieldNames = fieldNames + ' ,' + responseKey.name;
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