const {test, expect} = require('@playwright/test');

test('get by method in playwright', async({page}) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')

    await page.getByLabel('Check me out if you Love IceCreams!').click()

    await page.getByLabel('Employed').check()

    await page.getByLabel('Gender').selectOption('Male')

    await page.getByPlaceholder('Password').fill('abc123$')

    await page.getByRole('button', {name: 'Submit'}).click()

    await page.getByText('The Form has been submitted successfully!.').isVisible()

    //'a' tag comes under link
    await page.getByRole('link', {name: 'Shop'}).click()

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click()

    await page.pause()


})