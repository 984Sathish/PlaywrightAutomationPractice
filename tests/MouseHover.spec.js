const {test, expect} = require('@playwright/test');

test('Handle mouse hovering', async ({page})=> {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    
    await page.locator('#mousehover').hover()

    await page.getByRole('link', {name: 'Top'}).click()

})