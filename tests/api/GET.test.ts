import { APIActions } from '@lib/APIActions';
import { test } from '@playwright/test';

const apiActions = new APIActions();

test(`@API getUsers`, async ({ request }) => {
    const response = await request.get(`/api/users?per_page=1`);
    await apiActions.verifyStatusCode(response);

    //* Body Response Params and Body Response Headers are stored in single text file separated by #
    const responseBodyParams = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[0];
    await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);

    const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[1];
    await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Response Headers`);
});

//* In Case you application has token system, Please use the below code

// test(`@API getUsersToken`, async ({ playwright, baseURL }) => {
//     const apiContext = await playwright.request.newContext({
//         baseURL: baseURL,
//         extraHTTPHeaders: {
//             'Authorization': `Your App Token`
//         }
//     });
//     const response = await apiContext.get(`/api/users?per_page=1`);
//     await apiActions.verifyStatusCode(response.status(), 200);

//     //* Body Response Params and Body Response Headers are stored in single text file separated by #
//     const responseBodyParams = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[0];
//     await apiActions.verifyResponseBody(responseBodyParams, await response.json(), `Response Body`);

//     const responseBodyHeaders = (await apiActions.readValuesFromTextFile(`getUsers`)).split(`#`)[1];
//     await apiActions.verifyResponseHeader(responseBodyHeaders, response.headersArray(), `Response Headers`);
// });

