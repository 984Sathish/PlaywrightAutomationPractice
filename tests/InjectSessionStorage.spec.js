const {test, expect} = require('@playwright/test');
let userName = 'sathishsuresh984@gmail.com'
let webContext

test.beforeAll('save and inject session storage', async({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //login
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill(userName)
    await page.locator('#userPassword').fill('Satz@984')
    await page.locator('#login').click()

    //wait for network api to complete
    await page.waitForLoadState('networkidle')

    //save the storage state in the path of 'storageState.json'
    await context.storageState({path: 'storageState.json'})

    //inject the session storage from saved path of storageState.json
    webContext = await browser.newContext({storageState : 'storageState.json'})

})

/*Note: 
1.save session storage in before all method and  to inject it every test we can bypass login for all 
test cases.
2.This method is usefull for higher number of test cases u have.
*/

test('create new page with injected session storage', async () => {

    const page = await webContext.newPage()

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')

    //add product to cart
    const actualProductName = 'ZARA COAT 3'
    const productElement =  page.locator('div.card-body')  

    //get number for product 
    const countOfPrd = await productElement.count()
    console.log('product count: '+countOfPrd)

    for (let i = 0; i < countOfPrd; i++) {

        //using nth to dynamically check product name
        const expectProductName = await productElement.nth(i).locator('b').textContent()
        console.log(expectProductName)

        if(expectProductName == actualProductName) {
             
            //click add to cart
           await productElement.last().waitFor()
           await productElement.nth(i).locator('button').nth(1).click()
           break;
        }
    }
    
    //click on cart
    page.locator('[routerlink*="cart"]').click()

    //verify product in the cart
    page.locator('div li').last().waitFor()
    const boolean = page.locator(".cartSection h3:has-text('"+actualProductName+"')").isVisible()
    expect(boolean).toBeTruthy()

    //click checkout
    await page.locator('text=Checkout').click()

    //select country
    await page.locator('[placeholder="Select Country"]').type('ind', {delay: 100}) //{delay: 100} - will type delay 
    
    //waiting for suggestion field
    const countrySuggestion = page.locator('section.ta-results')
    await countrySuggestion.waitFor()
    const countryCount = await countrySuggestion.locator('button').count()
    console.log('suggestion count: '+countryCount)

    //click suggestion dynamically
    for (let i = 0; i < countryCount; i++) {
        const countryName = await countrySuggestion.locator('button').nth(i).textContent()
        if(countryName == " India"){
            
            await countrySuggestion.locator('button').nth(i).click()
            break;
        }  
    }

    //email verification
    const fldEmail = page.locator('label[type="text"]')
    await expect(fldEmail).toHaveText(userName)

    //click order
    await page.locator('.action__submit').click()

    //verify success message
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')

    //get order Id
    var orderId = await page.locator('label.ng-star-inserted').textContent() 
    orderId = orderId.split('|')[1].trim()  //split and trim order id text.
    console.log('Order Id :'+orderId)

    //click on order details
    await page.locator('button[routerlink*="myorders"]').click()

    //verify order id and click view button
    await page.locator('tbody').waitFor()
    const rows = await page.locator('tbody tr')

    for (let i = 0; i < await rows.count(); ++i) {
        const actualOrderId = await rows.nth(i).locator('th').textContent()
        
        if( orderId == actualOrderId){
            rows.nth(i).locator('button').first().click()
            break;
        }
    } 
    
    //get order id from order summary page
    const summaryOrderId = await page.locator('div.col-text').textContent()

    console.log("Actual order id: "+orderId)
    console.log("Expected order id: "+summaryOrderId)

    //verify order id
    expect(orderId.includes(summaryOrderId)).toBeTruthy()
   
})