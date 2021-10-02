import rimraf from "rimraf";

async function globalSetup(): Promise<void> {
    await new Promise(resolve => {
        rimraf(`./allure-results`, resolve);
    });
}
export default globalSetup;