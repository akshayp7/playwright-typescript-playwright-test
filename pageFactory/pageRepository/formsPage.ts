import {Page, BrowserContext, Locator} from '@playwright/test';


export class formsPage{

    page: Page;
    context: BrowserContext;
    name: Locator;
    email: Locator;
    gender: Locator;
    mobile: Locator;
    formLink: Locator;
    practiceFormLink: Locator;
    lastName: Locator;

    constructor(page: Page, context: BrowserContext){
        this.page = page;
        this.context = context;
        this.name = page.getByRole('textbox', {name: 'First Name'});
        this.formLink = page.getByRole('heading', {name: 'Form'})
        this.practiceFormLink = page.getByRole('link', {name: 'Practice form'})
        this.lastName = page.locator('//input[@id="lastName"]')
        this.gender = page.getByRole('radio', {name: '%s'})
    }

    public async fillForm(firstname: string, lastname: string): Promise<void>{
        await this.name.fill(firstname);
        await this.lastName.fill(lastname);
    }

    public async getGenderRadio(gender: string){
        return this.page.getByRole('radio', {name: gender, exact: true})
    }

    public async getCheckboxHobbies(hobby: string): Promise<Locator>{
        return this.page.getByRole('checkbox', {name: hobby, exact: true})
    }

}