<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
          <ol>
            <li>
              <a href="#about-the-project">About the Project</a>
              <ul>
                <li><a href="#built-with">Built With</a>
              </ul>
            </li>
            <li>
              <a href="#getting-started">Getting Started</a>
              <ul>
                <li><a href="#prerequisites">Prerequisites</a>
                <li><a href="#installation">Installation</a>
              </ul>
            </li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#reports">Reports</a></li>
            <li><a href="#sonarqube">SonarQube</a></li>
          </ol>
        </h5>    
    </details>
</h2>

<!-- ABOUT THE PROJECT -->

## About the Project

Playwright Demo - This project is based on Microsoft Playwright which enables reliable end-to-end testing for modern web apps.

Top Features:

- Easy to Configure.
- Auto-waits for all the relevant checks to pass and only then performs the requested action.
- Records videos for Test Cases.
- Records the test script and every action on the target page is turned into generated script.
- Generates trace file, which gives in-depth details of Test Case execution.
- Execution of test case is faster when compared with other competitive framework in market.
- Supports Headful/Headless mode execution for Firefox/Webkit/Google Chrome/Chromium/MS Edge on Windows/Linux/Mac machines.
- It supports API testing (From Playwright version 1.16 onwards)
- It can be used to simulate browser behaviour on mobile devices, and supports over 100+ devices.
- It has ability to produce and visually compare screenshots.
- To slow down execution slowMo option is available.
- Supports 'download' event monitoring, so there is no need for user to actually wait for downloads to finish.
- Supports Serial and Parallel execution.
- Allure/HTML Reports are generated after execution with an option to capture screenshot/video/trace file on failure.
- Nonetheless Support from Microsoft so FREQUENT RELEASES and turn arounf time for any queries is 48 hours.

Bonus:

- Supports PostgresSQL using 'pg' module.
- Supports Excel File Read/Write using 'excel-js' module.

### Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [node-postgres](https://github.com/brianc/node-postgres)
- [excel-js](https://github.com/exceljs/exceljs)
- [adm-zip](https://www.npmjs.com/package/adm-zip)
- [ESLint](https://eslint.org/)
- [SonarQube](https://www.sonarqube.org/)

## Getting Started

### Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```
- Install Java 8 or above, Allure Reports require Java 8 or higher.
- Install Java 11 instead of Java 8 if you intend to use Sonar Qube.
- allure commandline : Install allure command line for generating Allure Reports using
  ```sh
  npm install -g allure-commandline
  ```
- Install adm-zip which allows user to create zip files, in this framework html-report are zipped along with video and trace files so that it can be sent across as single zip file
 ```sh
  npm i adm-zip
 ```
- If you wish to include SonarQube follow the below steps:
  - Install Java 11 and add java path to "PATH" environment variable.
  - Download SonarQube community server from the below url and unzip it to desired location.
  ```sh
  https://www.sonarqube.org/downloads/
  ```
  - Download Sonar Scanner for your desired OS (Windows in my case) from below location and unzip it to desired location. Then navigate to bin location once unzipped and provide the path to "PATH" environment variable.
  ```sh
  https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
  ```

### Installation

1. Clone the repo using below URL

```sh
https://github.com/akshayp7/playwright-typescipt-playwright-test.git
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```

<!-- USAGE EXAMPLES-->

## Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "ENV" can be "qa" or "dev", `Test Cases are present in "tests" folder`:

```JS
npx cross-env ENV=qa npm run test
```

3. For executing single test case on Chrome browser execute the below command, you can change the browser for execution e.g. if you want to run test cases on Firefox, you can change `--project=Firefox` against `test:single` in `package.json`, just make sure the browser name given matches the name given in `playwright.config.ts`.

```JS
npx cross-env ENV=qa npm run test:single
```

4. For executing test cases in parallel, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:parallel` give the tag value and execute :

```JS
npx cross-env ENV=qa npm run test:parallel
```

5. For executing test cases in sequence, provide a suitable tag `@SmokeTest` at the start of your test case name, then in `package.json` against `test:serial` give the tag value and execute, `workers` parameter correspond to test cases you want to execute simultaneously e.g. `--workers=3`, executes 3 test cases simultaneously :

```JS
npx cross-env ENV=qa npm run test:serial
```

6. For executing API test cases, please provide "ENV" value as "qaApi" or "devApi" :

```JS
npx cross-env ENV=qaApi npm run test:api
```

7. For recording test scripts :

```JS
npm run test:record
```

8. To produce and visually compare screenshots execute below command. On first execution reference screenshot will be generated for comparision with subsequent runs.

```JS
npx cross-env ENV=qa npm run test:visual
```

9. For emulating test cases on any device, in `playwright.config.ts`, under device section provide desired device name and execute :

```JS
npx cross-env ENV=qa npm run test:device
```

10. For Allure Report generation execute :

```JS
npm run allureReport
```
11. For HTML Report generation execute below command , single static HTML report(index.html) which can be sent via email is generated in "html-report" folder:
12. For converting HTML Reports to zip file "adm-zip" library is used, the logic is implemented in `global-teardown.ts` , to make sure this runs after all the test are executed and after reports are generated, `global-teardown.ts` is given as a parameter for "globalTeardown" in `playwright.config.ts` file. Results are generated as `html-report.zip` in project directory. 
13. For debugging test cases add debug points, the press CNTRL+SHIFT+P and type "debug:debug npm script", on the edit box select desired script.
14. Screenshots, Videos and Trace files will be generated in test-results folder.
15. To change your username go to `testConfig.ts` and provide value against `username`
16. To change password, go to `lib/WebActions` in `decipherPassword()` uncomment `ENCRYPT` code block and replace `password` with your password, execute the test case, Encrypted password will be printed on your console . Copy Encrypted password in `testConfig.ts` against `password` field. You can comment Encrypt bloack ater this.
17. For executing Postgres DB test case, navigate to `testConfig.ts` and provide values for `dbUsername, dbPassword, dbServerName, dbPort, dbName`. Refer to `tests/DB.test.ts` for connecting to DB and Firing a Query.
18. For viewing trace files, go to folder where `trace.zip` is generated and execute :
```JS
npx playwright show-trace trace.zip
```
19. You can change the Logging Message at Test Case/Test Step Level in CustomReporterConfig.ts file

## Reports

- <b>Overall Report</b>
  ![Overall Report Screenshot][overall-report-screenshot]

- <b>Detailed Report</b>
  ![Detailed Report Screenshot][detailed-report-screenshot]

- <b>Failure Report</b>
  ![Failure Report Screenshot][failure-report-screenshot]

## SonarQube

Once you have completed setup for SonarQube given in Prerequisites section, configure SonarQube as given below
- Go to the path where sonarqube server(For e.g. : C:\SonarQube\sonarqube-9.1.0.47736) is unzipped -> Go to conf Folder -> open sonar.properties file and add the below prperties and save the file, you can give any port you wish I have used port 9000.
```JS
sonar.host.url=http://localhost:9000
sonar.sourceEncoding=UTF-8
```
- Go to the path where sonarqube server(For e.g. : C:\SonarQube\sonarqube-9.1.0.47736) is unzipped -> Go to bin section -> Go to the folder as per the OS you are using , in my case windows-x86-64 -> Double click on Start Sonar and wait for it to display SonarQube is up (you might encounter some java errors but its fine don't close the terminal).
- Go to the browser and naigate to http://localhost:9000 , default username is `admin`, default password is `admin`. It might ask you to provide a new password for if you have logged in for first time, I have changed default password to `password`.
- In your working project (playwright-typescipt-playwright-test), navigate to `sonar-project.properties` file and provide the credentials configured on server webpage username value in `sonar.login` and password in `sonar.password`, in my case username is `admin` and password was changed to `password`.
```JS
sonar.login=admin
sonar.password=password
```
- You can provide any project name in `sonar.projectKey`.
- Specify a version in `sonar.projectVersion`.
- Provide `UTF-8` in `sonar.sourceEncoding`.
- In `sonar.language` provide the language you want to run scan on (For e.g. for typescipt its ts and for javascript its js).
- If you have eslint file in your project provide the location in `sonar.eslint.eslintconfigpath`.
- You can exclude file from scanning like node_modules, results , Downloads section in `sonar.exclusions`.
- You can give your project location in `sonar.sources` section I have provided it as `./` because my `sonar-project.properties` file is within my project. If your properties files is somewhere else you have to provide the complete project path.
- Now go to the location where `sonar-project.properties` is present and run `sonar-scanner` command (In my case I will diectly run it inside my project), and wait for scan to get over with success message.
- Now navigate to `http://localhost:9000/` and click on your project key displayed and go to Issues section, you can find all the suggestions and issues here. You can fix the issues ans rerun `sonar-scanner` command once again.
- <b>SonarQube Report</b>
  ![SonarQube Report Screenshot][sonar-report-screenshot]

<!-- MARKDOWN LINKS & IMAGES -->

[overall-report-screenshot]: ReadMeImages/OverallReport.PNG
[detailed-report-screenshot]: ReadMeImages/DetailedReport.PNG
[failure-report-screenshot]: ReadMeImages/FailureReport.PNG
[sonar-report-screenshot]: ReadMeImages/SonarReport.PNG