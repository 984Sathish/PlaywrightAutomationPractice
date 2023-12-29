const {test, expect} = require('@playwright/test');

test('Abort response from route.abort() method', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //*** Note:
    //abort operation to abort all the jpg, png and jpeg request.
    page.route('**/*.{jpg,png,jpeg}', 
    route=> {
        route.abort()
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