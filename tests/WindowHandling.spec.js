const {test, expect} = require('@playwright/test')

test('Parent child winndow handle test', async({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const documentsLink = page.locator('[href*="documents-request"]')
    //toHaveAttribute - assert attribute value
    expect(documentsLink).toHaveAttribute('class', 'blinkingText')

    //create new page
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),   //wait for event
        documentsLink.click()           //click blink link
    ])

    //newPage - 2nd page
    const text = await newPage.locator('.red strong').textContent()
    const domain = text.split('@')[1]

    //page - 1st page
    await page.locator('#username').fill(domain)

})

test('Window navigation: back and forward', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.goto('https://rahulshettyacademy.com/client')

    //go back to window
    await page.goBack()

    //go forward to window
    await page.goForward()

})

