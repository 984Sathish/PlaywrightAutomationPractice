const {test, expect} = require('@playwright/test')

test.skip('Visual testing to compare screenshop', async ({page}) => {

    await page.goto('https://demowebshop.tricentis.com/')

    //get page screenshot
    const actualScreenshot = await page.screenshot()

    //compare with actual and expected screenshot
    expect(actualScreenshot).toMatchSnapshot('ExpectedScreenshot.png')

    console.log('Screenshots verified sucessfully!')
})