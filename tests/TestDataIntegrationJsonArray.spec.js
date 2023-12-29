const { test, expect } = require('@playwright/test');
//import json array test data
const datasetJsonArray = JSON.parse(JSON.stringify(require('./Utils/testDataJsonArray.json')))

//loop the test data -> dataset . It will execute with max array index.

//
test('test data from JSON Array', async ({ page }) => {

    for (const data of datasetJsonArray) {
        await test.step('Add product to cart - '+data.productName, async () => {

            //go to application url
            await page.goto('https://rahulshettyacademy.com/client')

            //login
            await page.locator('#userEmail').fill(data.userName)
            await page.locator('#userPassword').fill(data.password)
            await page.locator('#login').click()

            //wait to all newtwork response are captured once. 
            await page.waitForLoadState('networkidle')

            //add product to cart
            const productElement = page.locator('div.card-body')

            //get number for product 
            const countOfPrd = await productElement.count()
            console.log('product count: ' + countOfPrd)

            for (let i = 0; i < countOfPrd; i++) {

                //using nth to dynamically check product name
                const expectProductName = await productElement.nth(i).locator('b').textContent()
                console.log(expectProductName)

                if (expectProductName == data.productName) {
                    //click add to cart
                    await productElement.nth(i).locator('button').nth(1).click()
                    break;
                }
                
            }
            await page.getByRole('button', {name: 'Sign Out'}).click()
        })
    }
});
