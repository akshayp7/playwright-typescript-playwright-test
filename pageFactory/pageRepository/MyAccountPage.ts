import { MyAccountPageObjects } from "@objects/MyAccountPageObjects";
import { WebActions } from "@lib/WebActions";
import type { BrowserContext, Page } from '@playwright/test';

let webActions: WebActions;

export class MyAccountPage extends MyAccountPageObjects{
    readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async verifyMyAccountHeader(): Promise<void> {
        await webActions.verifyElementText(MyAccountPageObjects.MY_ACCOUNT_HDR_XPATH, `My account`);
    }

    async clickOnMyAccountLinks(linkName: string): Promise<void> {
        await webActions.clickElement(MyAccountPageObjects.MY_ACCOUNT_LINKS_XPATH.replace(`linkName`, linkName));
    }

    async verifyFollowUsFBWindowAndClickMembers(context: BrowserContext, urlText: string): Promise<void> {
        await webActions.verifyNewWindowUrlAndClick(context, MyAccountPageObjects.MY_ACCOUNT_FOLLOW_FB_LINK_XPATH, urlText,MyAccountPageObjects.MY_ACCOUNT_FB_MEMBERS_LINK_XPATH);
    }

}