const {test, expect} = require('@playwright/test');

test('Handle frame', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    const framePage = page.frameLocator('#courses-iframe')
    const element = framePage.getByRole('link', {name: 'All Access plan'})
    expect(element.waitFor()).toBeTruthy()
    
    /* Scrolling is needed to click below element. but not possible for this site */

    //await element.click()
    // const subscriberCount = await framePage.locator('div.text h2').textContent()
    // const count = subscriberCount.split(' ')[1]
    // console.log("Subscriber count : "+count)  

})