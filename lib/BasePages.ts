import { LoginPage } from '../pageFactory/pageRepository/LoginPage';
import { test as baseTest } from '@playwright/test';

const test = baseTest.extend<{
    loginPage: LoginPage;

}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export default test;