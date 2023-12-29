const {test, expect} = require('@playwright/test');

test("handle 'ok' alert", async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    //Click to accept (or) ok for alert 
    page.on('dialog', dialog => dialog.accept())

    await page.locator('#confirmbtn').click()

    page.locator('#alertbtn').click()

    //Click to accept (or) ok for alert 
    // page.on('dialog', dialog => dialog.dismiss())

    // await page.locator('#confirmbtn').click()

    // page.locator('#alertbtn').click()

    /*Note: 
     1. dialog.accept() - to accept alert
     2. dialog.dismiss() - to dismiss alert
     3. any one action u will be perfom. accept or dismiss 
     4. one time declaration is enough to accept or dismiss all the time when alert is comming.
     5.If there is no listener for page.on('dialog'), all dialogs are automatically dismissed.
     */

})