import test from '@lib/BaseTest'
import { WebActions } from '@lib/WebActions';


test('Register new user',async({loginPage, webActions}) => {
    await loginPage.navigateToURL();
    await webActions.clickElement(loginPage.BOOK_STORE_APPLICATION)
    await webActions.clickElement(loginPage.LOGIN_BUTTON)
    await webActions.clickElement(loginPage.NEW_USER)
    await loginPage.USERNAME_EDITBOX.fill("test")
    await loginPage.PASSWORD_EDITBOX.fill("test")
    await loginPage.FIRST_NAME.fill("test")
    await loginPage.LAST_NAME.fill("test")
    await loginPage.REGISTER.click()
})