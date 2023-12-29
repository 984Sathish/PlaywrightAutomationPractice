const { test, expect } = require('@playwright/test');
//import json test data
const datasetJson = JSON.parse(JSON.stringify(require('./Utils/testDataJson.json')))
const { customtest } = require('./Utils/test-base')



test('test data from JSON', async ({ browser }) => {

    /*convert json to test data lifecycle
    1. create json 
    2. json convert to string object
    3. string convert to json  object
    */

    const context = await browser.newContext()
    const page = await context.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //login
    await page.locator('#userEmail').fill(datasetJson.userName)
    await page.locator('#userPassword').fill(datasetJson.password)
    await page.locator('#login').click()

    //wait to all newtwork response are captured once. 
    await page.waitForLoadState('networkidle')

    await page.locator('div.card-body').first().waitFor()
    //add product to cart
    const productElement = page.locator('div.card-body')

    //get number for product 
    const countOfPrd = await productElement.count()
    console.log('product count: ' + countOfPrd)

    for (let i = 0; i < countOfPrd; i++) {

        //using nth to dynamically check product name
        const expectProductName = await productElement.nth(i).locator('b').textContent()
        console.log(expectProductName)

        if (expectProductName == datasetJson.productName) {

            //click add to cart
            await productElement.nth(i).locator('button').nth(1).click()
            break;
        }
    }

})

customtest('test data from new data fixture', async ({ browser, testDataForOrder }) => {

    /*
    create new data fixture.
    */

    const context = await browser.newContext()
    const page = await context.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //login
    await page.locator('#userEmail').fill(testDataForOrder.userName)
    await page.locator('#userPassword').fill(testDataForOrder.password)
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

        if (expectProductName == testDataForOrder.productName) {

            //click add to cart
            await productElement.nth(i).locator('button').nth(1).click()
            break;
        }
    }

})
