const {test, expect} = require('@playwright/test');

test('Handle static dropdown', async ({page})=> {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    //select static drppdown
    const dropdown = page.locator('select.form-control')
    
    //consult -> select 'value'
    await dropdown.selectOption('consult')


   

})
