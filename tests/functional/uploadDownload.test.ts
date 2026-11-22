import test from "@lib/BaseTest";



test('Upload a file', async ({loginPage,webActions,elementsPage}) =>{
    await loginPage.navigateToURL();
    await elementsPage.ELEMENTS_TITLE.click();
    await webActions.clickByText('Upload and Download');
    await elementsPage.uploadFile()
})

test('Download the file', async ({loginPage,elementsPage,webActions})=>{
    await loginPage.navigateToURL();
    await elementsPage.ELEMENTS_TITLE.click();
    await webActions.clickByText('Upload and Download');
    await elementsPage.downloadFile()
})