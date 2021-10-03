import { Reporter, TestCase, TestError, TestResult, TestStep } from "@playwright/test/reporter";

export default class CustomReporterConfig implements Reporter {

    onTestBegin(test: TestCase): void {
        console.log(`Test Case Started : ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        console.log(`Test Case Completed : ${test.title} Status : ${result.status}`);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
        if (step.category === `test.step`) {
            console.log(`Executing Step : ${step.title}`);
        }
    }

    onError(error: TestError): void {
        console.log(error.message);
    }
}