const {test, expect} = require('@playwright/test')

test('handle check box', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    //check 'Agree' checkbox
    const agreeCheckBox = page.locator('#terms')
    await agreeCheckBox.click() //check
    await expect(agreeCheckBox).toBeChecked() //check assertion
    await agreeCheckBox.uncheck() //uncheck
    expect(await agreeCheckBox.isChecked()).toBeFalsy() //uncheck assertion 


})