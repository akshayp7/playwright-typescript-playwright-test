import { MyAccountPageObjects } from "@objects/MyAccountPageObjects";
import { WebActions } from "@lib/WebActions";
import type { BrowserContext, Page } from 'playwright';

let webActions: WebActions;

export class MyAccountPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        webActions = new WebActions(this.page);
    }

    myAccountPageObjects = new MyAccountPageObjects();

    async verifyMyAccountHeader(): Promise<void> {
        await webActions.verifyElementText(this.myAccountPageObjects.MY_ACCOUNT_HDR_XPATH, `My account`);
    }

    async clickOnMyAccountLinks(linkName: string): Promise<void> {
        await webActions.clickElement(this.myAccountPageObjects.MY_ACCOUNT_LINKS_XPATH.replace(`linkName`, linkName));
    }

    async verifyFollowUsFBWindow(context: BrowserContext, urlText: string): Promise<void> {
        await webActions.verifyNewWindowUrl(context, this.myAccountPageObjects.MY_ACCOUNT_FOLLOW_FB_LINK_XPATH, urlText);

    }

}