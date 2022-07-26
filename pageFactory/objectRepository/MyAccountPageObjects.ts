export class MyAccountPageObjects {
    protected static MY_ACCOUNT_HDR_XPATH = `//h1[contains(text(),'My account')]`;
    protected static MY_ACCOUNT_LINKS_XPATH = `//span[contains(text(),'linkName')]`;
    protected static MY_ACCOUNT_FOLLOW_FB_LINK_XPATH="//span[text()='Facebook']/..";
    protected static MY_ACCOUNT_FB_MEMBERS_LINK_XPATH=`//a[contains(text(),'members')]`;
}