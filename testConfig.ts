export const testConfig = {
    // this property is fetching the key of the ENV variable as defined in plauwyright.config.ts file. The value of the ENV variable is passed from command line while executing the tests
    // Maybe i will make an env as default value in the future but for now it is mandatory to pass the env variable while executing the tests
    qa: `https://demoqa.com`,
    dev: ``,
    qaApi: `https://reqres.in`,
    devApi: ``,
    username: `demouat@gmail.com`,
    password: `U2FsdGVkX18/eMdsOJpvI4hJZ/w7hNgwSRFaDvAcZx4=`,
    waitForElement: 120000,
    dbUsername: ``,
    dbPassword: ``,
    dbServerName: ``,
    dbPort: ``,
    dbName: ``
}