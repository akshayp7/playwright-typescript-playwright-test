import { APIActions } from '@lib/APIActions';
import { test } from '@playwright/test';

const apiActions = new APIActions();

test(`@API postUsers`, async ({ request }) => {

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const requestBody = JSON.parse((await apiActions.readValuesFromTextFile('postUsers')).split(`#`)[0]);
    const response = await request.post(`/api/users`, { data: requestBody });
    await apiActions.verifyStatusCode(response);

    const responseBodyParams = (await apiActions.readValuesFromTextFile(`postUsers`)).split(`#`)[1];
    await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);

    const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`postUsers`)).split(`#`)[2];
    await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Respomse Headers`);
});

