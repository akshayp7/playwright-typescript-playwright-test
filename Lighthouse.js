const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info',output: 'html',onlyCategories: ['performance'],port: chrome.port};
  
   // Below configuration is for Desktop mode
  const config = { extends: 'lighthouse:default', settings: {formFactor: 'desktop', screenEmulation:{mobile:false}} }
  // Below configuration is for Mobile devices 
  // const config = { extends: 'lighthouse:default', settings: {formFactor: 'mobile', screenEmulation:{mobile:true}} }

  const runnerResult = await lighthouse('https://www.google.com',options,config);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('LighthouseReport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();