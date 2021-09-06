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
- It can be used to simulate browser behaviour on mobile devices, and supports over 100+ devices.
- It has ability to produce and visually compare screenshots.
- To slow down execution slowMo option is available.
- Supports 'download' event monitoring, so there is no need for user to actually wait for downloads to finish.
- Supports Serial and Parallel execution.
- Allure Reports are generated after execution with an option to capture screenshot/video/trace file on failure.
- Nonetheless Support from Microsoft so FREQUENT RELEASES and turn arounf time for any queries is 48 hours.

Bonus:

- Supports API testing using 'supertest' module.
- Supports PostgresSQL using 'pg' module.
- Supports Excel File Read/Write using 'excel-js' module.

### Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [Supertest](https://github.com/visionmedia/supertest)
- [node-postgres](https://github.com/brianc/node-postgres)
- [excel-js](https://github.com/exceljs/exceljs)
- [ESLint](https://eslint.org/)

## Getting Started

### Prerequisites

The following software are required:

- nodejs
  ```sh
  Download and Install Node JS from https://nodejs.org/en/download/
  ```
- Java
  ```sh
  Download and Install Java 8 or above, Allure Reports require Java 8 or higher.
  ``` 
- allure commandline
  ```sh
  Install allure command line for generating Allure Reports using "npm install -g allure-commandline"
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