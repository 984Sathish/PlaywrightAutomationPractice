const {test, expect} = require('@playwright/test')
test('Window handling', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')


    //visible assertion
    await expect(page.locator('#displayed-text')).toBeVisible();

    //only get the element screenshot and not include all the elements in the page
    await page.locator('#displayed-text').screenshot({path: 'ElementScreenshot.jpg'})

    await page.locator('#hide-textbox').click()

    //get page screenshot
    await page.screenshot({path: 'PageScreenshot.jpg'})
    
    //invisible assertion
    await expect(page.locator('#displayed-text')).toBeHidden();

})