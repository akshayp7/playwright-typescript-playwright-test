import { PlaywrightTestConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';
import { OrtoniReportConfig } from 'ortoni-report';

const ENV = process.env.ENV || process.env.npm_config_ENV; // Support both modern and legacy patterns
const isCI = !!process.env.CI; // Detect if running in CI environment
const validEnvironments = [`qa`, `dev`, `qaApi`, `devApi`] as const;
type TestEnvironment = typeof validEnvironments[number];

if (!ENV || !validEnvironments.includes(ENV as TestEnvironment)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}

const currentEnvironment = ENV as TestEnvironment;
const ignoreHTTPSErrorsByEnvironment: Record<TestEnvironment, boolean> = {
  qa: false,
  dev: true,
  qaApi: true,
  devApi: true,
};
const ignoreHTTPSErrors = ignoreHTTPSErrorsByEnvironment[currentEnvironment];

const reportConfig: OrtoniReportConfig = {
  base64Image: true,
  title: "Playwright Framework with Typescript",
  filename: "OrtoniHtmlReport",
  authorName: "Akshay Pai",
  folderPath: "html-report",
  projectName: "Playwright Framework with Typescript",
}

const config: PlaywrightTestConfig = {

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  //sets timeout for each test case
  timeout: 120000,

  //number of retries if test case fails
  retries: 0,

  //Reporters
  reporter: isCI
    ? [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`blob`]]
    : [[`./CustomReporterConfig.ts`], [`allure-playwright`], [`html`, { outputFolder: 'html-report', open: 'never' }], ['ortoni-report', reportConfig]],

  projects: [
    {
      name: `Chrome`,
      use: {
        // Configure the browser to use.
        browserName: `chromium`,

        //Chrome Browser Config
        channel: `chrome`,

        //Picks Base Url based on User input
        baseURL: testConfig[currentEnvironment],

        //Browser Mode
        // headless: isCI ? true : false,
        headless : false,

        //Browser height and width
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors,

        //Enable File Downloads in Chrome
        acceptDownloads: true,

        //Artifacts
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,

        //Slows down execution by ms
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `Chromium`,
      use: {
        browserName: `chromium`,
        baseURL: testConfig[currentEnvironment],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Firefox`,
      use: {
        browserName: `firefox`,
        baseURL: testConfig[currentEnvironment],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },

    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[currentEnvironment],
        headless: false,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `WebKit`,
      use: {
        browserName: `webkit`,
        baseURL: testConfig[currentEnvironment],
        headless: true,
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `Device`,
      use: {
        ...devices[`Pixel 4a (5G)`],
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[currentEnvironment],
        headless: true,
        ignoreHTTPSErrors,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    {
      name: `DB`
    },
    {
      name: `API`,
      use: {
        baseURL: testConfig[currentEnvironment]
      }
    }
  ],
};
export default config;
