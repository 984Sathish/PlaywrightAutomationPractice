const {test, expect} = require('@playwright/test');

test('Log request and response', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //log all request url
    page.on('request', 
    request => {
        console.log(request.url())
    })

    //log all response url and status code
    page.on('response', 
    response => {
        console.log(response.url(), response.status())
    })


    //login
    const userName = 'sathishsuresh984@gmail.com'
    await page.locator('#userEmail').fill(userName)
    await page.locator('#userPassword').fill('Satz@984')
    await page.locator('#login').click()

    //wait to all newtwork response are captured once. 
     await page.waitForLoadState('networkidle')

    //add product to cart
    const actualProductName = 'iphone 13 pro'
    const productElement =  page.locator('div.card-body')  
 
})