//terminal command to use this config file -> npx Playwright test tests/TestDataIntegration.spec.js --config playwright.config1.js
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 1, //number of retry execution when it fails
  Workers: 3,  //number of worker to run test in parallel(thread)

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {

    timeout: 5000
  },

  reporter: 'html',

  projects: [

    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',//off,on or only-on-failure
        video: 'retain-on-failure',//off,on,retain-on-failure or on-first-retry
        trace: 'on',//off,on,retain-on-failure or on-first-retry
        viewport : {width: 720, height:720},  //used to change execution view 
      }
    },

    {
      name: 'Webkit',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'off',//off,on or retain-on-failure   
        ...devices['iPhone 11'] //used to change execution view automatically irrespective of devices.
      }
    },

    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'off',//off,on or retain-on-failure    
        ignoreHttpsErrors: true,   //it will by pass ssl certificate error
        Permissions: ['geolocation'] //it will by pass location alert or dialog(allow wheneven get location dailog)
      }
    },

  ]
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */



};

module.exports = config;
