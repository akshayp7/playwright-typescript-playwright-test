import supertest from 'supertest';
import { APIActions } from '../../lib/APIActions';
import { test, expect } from '@playwright/test';

const apiActions = new APIActions();

test(`@API postUsers`, async () => {
    const request = supertest(`https://reqres.in`);

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const requestBody = JSON.parse(await (await apiActions.readValuesFromTextFile('postUsers')).split(`#`)[0]);
    const response = await request.post(`/api/users`).send(requestBody);
    await apiActions.verifyStatusCode(response.status, 201, expect.getState().currentTestName);

    const responseBodyParams = (await apiActions.readValuesFromTextFile(`postUsers`)).split(`#`)[1];
    await apiActions.verifyResponseBody(responseBodyParams, response.body, expect.getState().currentTestName, `Respomse Body`);

    const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`postUsers`)).split(`#`)[2];
    await apiActions.verifyResponseBody(responseBodyHeaders, response.headers, expect.getState().currentTestName, `Respomse Headers`);
});

