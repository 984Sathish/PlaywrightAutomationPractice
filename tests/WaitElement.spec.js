const {test, expect} = require('@playwright/test')


test('wait for element to load', async ({browser})=> {

    //load new page
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client')

    await page.locator('#userEmail').fill('sathishsuresh984@gmail.com')
    await page.locator('#userPassword').fill('Satz@984')
    await page.locator('#login').click()

    //wait to all newtwork response are captured once. 
     await page.waitForLoadState('networkidle')

    //waitFor() - to wait for element
    await page.locator('.card-body b').last().waitFor()
 
    //note: waitForLoadState method is not working sometimes. so we will use waitFor().

    const allProductText = await page.locator('.card-body b').allTextContents()
    console.log(allProductText)



})