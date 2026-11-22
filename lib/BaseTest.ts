/* this baseTest is a function(not a class) created by importing the playwright test module and modyfying it to add custom fixtures that can be used in the test cases.
By using export default test at the end of the file we are sharing the modified test module with the rest of the framework
Now the actual test scripts will import this modified baseTest which has additional custom fixtures */
import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { InteractionsPage } from '@pages/InteractionsPage';
import { WebActions } from '@lib/WebActions';
import AxeBuilder from '@axe-core/playwright';
import { formsPage } from '@pages/formsPage';

/* Fixtures are reusable components that can be used in the test cases. They are used to set up
   the test environment and provide common functionality that can be used across multiple test cases.
   page and context are built-in fixtures and below are custom fixtures
   page is built in playwright fixture that represents a single tab in the browser.
   It is used to perform actions on the current web page
    context is build in fixture that holds the cookies, and session data for the browser.

   test.extend is used to create custom fixtures that can be used in the test cases.
   It allows us to define additional fixtures that can be used in the test cases.
   The fixtures defined here are webActions, loginPage, elementsPage, alertsFrameWindowsPage, 
   widgetsPage, interactionsPage, makeAxeBuilder and testInfo. 
   These fixtures can be used in the test cases by importing them from this file.
   
   Use is a function i.e. used to pass the instanciated objects to the test cases.
   like we don't need to instantiate them in each test case e.g. new LoginPage(page, context)*/
const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    elementsPage: ElementsPage;
    alertsFrameWindowsPage: AlertsFrameWindowsPage;
    widgetsPage: WidgetsPage;
    interactionsPage: InteractionsPage;
    makeAxeBuilder: AxeBuilder;
    testInfo: TestInfo;
    formsPage: formsPage;
}>({
    
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    elementsPage: async ({ page, context }, use) => {
        await use(new ElementsPage(page, context));
    },
    alertsFrameWindowsPage: async ({ page, context }, use) => {
        await use(new AlertsFrameWindowsPage(page, context));
    },
    widgetsPage: async ({ page, context }, use) => {
        await use(new WidgetsPage(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    },
    formsPage: async ({page, context}, use) =>{
        await use(new formsPage(page, context));
    },
    makeAxeBuilder: async ({ page }, use) => {
        await use(new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .exclude('#commonly-reused-element-with-known-issue'));
    }
})

export default test;