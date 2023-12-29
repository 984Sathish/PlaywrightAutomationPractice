const {test, expect} = require('@playwright/test');

test('Handle check box', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

     //select radio button
     const userRadio = page.locator('.radiotextsty')
     await userRadio.last().click()
     await page.locator('#okayBtn').click()

     //use isChecked - only return boolean value
     console.log( await userRadio.last().isChecked() )

     //use toBeChecked - verify radio button is checked. It fails will stop the execution.
     await expect(userRadio.last()).toBeChecked()

});