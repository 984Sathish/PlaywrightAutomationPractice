const {test, expect} = require('@playwright/test')
test('Assert for visible and invisible elements', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')


    //visible assertion
    await expect(page.locator('#displayed-text')).toBeVisible();

    await page.locator('#hide-textbox').click()

    //invisible assertion
    await expect(page.locator('#displayed-text')).toBeHidden();

})