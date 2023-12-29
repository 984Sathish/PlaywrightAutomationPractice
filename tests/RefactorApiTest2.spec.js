const {test, expect, request} = require('@playwright/test')
const {ApiUtils} = require('./Utils/ApiUtils')
const loginPayload = {userEmail: "sathishsuresh984@gmail.com",userPassword: "Satz@984"}
const orderPayLoad = {orders: [{ country: "India",productOrderedId: "65204ac27244490f95c5fdbc"}]}
// let token
// let orderId
let response
test.beforeAll('Login API request', async ()=> {

    //create new API context
    const apiContext = await request.newContext()

    //create constructor from ApiUtils.js 
    const apiUtils = new ApiUtils(apiContext, loginPayload)

    //call createorder2 method
    response = await apiUtils.createOrder2(orderPayLoad)

    /*
    NOTE: In RefactorApiTest2.spec.js will be use only use createOrder() method to the preconditon. pls check!!.

    -> response will store token and order id dynamically.
    */
} )

test('verify order id', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    page.addInitScript(value => {
        
        window.localStorage.setItem('token', value);
    }, response.token);

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')
    
    //click on order details
    await page.locator('button[routerlink*="myorders"]').click()

    //verify order id and click view button
    await page.locator('tbody').waitFor()
    const rows = page.locator('tbody tr')

    for (let i = 0; i < await rows.count(); ++i) {
        const actualOrderId = await rows.nth(i).locator('th').textContent()
        
        if( response.orderId == actualOrderId){
            console.log(actualOrderId)
            rows.nth(i).locator('button').first().click()
            break;
        }
    } 
    
    //get order id from order summary page
    const summaryOrderId = await page.locator('div.col-text').textContent()

    console.log("Actual order id: "+response.orderId)
    console.log("Expected order id: "+summaryOrderId)

    //verify order id
    expect(response.orderId.includes(summaryOrderId)).toBeTruthy()

})  