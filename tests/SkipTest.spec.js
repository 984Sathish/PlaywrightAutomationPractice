const {test, expect} = require('@playwright/test');

//we can skip the test so, we can run all test, this login is test is already there in test. 
test.skip('Skip test', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //login
    const userName = 'sathishsuresh984@gmail.com'
    await page.locator('#userEmail').fill(userName)
    await page.locator('#userPassword').fill('Satz@984')
    await page.locator('#login').click()

    //wait to all newtwork response are captured once. 
     await page.waitForLoadState('networkidle')
   
})