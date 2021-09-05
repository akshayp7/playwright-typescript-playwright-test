import supertest from 'supertest';
import { APIActions } from '../../lib/APIActions';
import { test, expect } from '@playwright/test';

const apiActions = new APIActions();

test(`@API getTodos`, async () => {
    const request = supertest(`https://jsonplaceholder.typicode.com`);
    const response = await request.get(`/todos/1`);
    await apiActions.verifyStatusCode(response.status, 200, expect.getState().currentTestName);

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const responseBodyParams = (await apiActions.readValuesFromTextFile(`getTodos`)).split(`#`)[0];
    await apiActions.verifyResponseBody(responseBodyParams, response.body, expect.getState().currentTestName, `Respomse Body`);

    const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getTodos`)).split(`#`)[1];
    await apiActions.verifyResponseBody(responseBodyHeaders, response.headers, expect.getState().currentTestName, `Respomse Headers`);
});

