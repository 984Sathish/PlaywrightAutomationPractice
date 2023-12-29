// @ts-check
const config = {
  testDir: './tests',
  retries :1,
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    headless : true,
    screenshot : 'retain-on-failure',
    video: 'retain-on-failure',
    trace : 'retain-on-failure',//off,on or retain-on-failure
  },
  

};

module.exports = config;
