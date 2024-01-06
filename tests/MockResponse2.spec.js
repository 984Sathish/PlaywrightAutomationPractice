const { test, expect } = require('@playwright/test')

test('security test with request intercept', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client')

    //login
    const userName = 'sathishsuresh984@gmail.com'
    await page.locator('#userEmail').fill(userName)
    await page.locator('#userPassword').fill('Satz@984')
    await page.locator('#login').click()

    //wait to all newtwork response are captured once. 
    await page.waitForLoadState('networkidle')

    //click on order details
    await page.locator('button[routerlink*="myorders"]').click()

    //intercept api call to change url 
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?*',
        route => route.continue({

            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=651a77cb7244490f95c0'
        }))

    await page.locator("button:has-text('View')").first().click()

    const errMsgForUnAuth = await page.locator('p.blink_me').textContent()
    console.log(errMsgForUnAuth)

    expect(errMsgForUnAuth.includes('not authorize')).toBeTruthy()
})