import test from '@lib/BaseTest';
import { WebActions } from '@lib/WebActions';
import {expect} from '@playwright/test';

test('Fill the registration form',{tag: '@Smoke'},async ({loginPage, formsPage, webActions})=>{
    await loginPage.navigateToURL();
    await webActions.clickElement(formsPage.formLink);
    await webActions.clickElement(formsPage.practiceFormLink);
    await formsPage.fillForm('rohit','pannu');
    await webActions.clickElement(await formsPage.getGenderRadio('Male'));
    await webActions.clickElement(await formsPage.getGenderRadio('Female'));
    await webActions.clickElement(await formsPage.getCheckboxHobbies('Sports'))
})