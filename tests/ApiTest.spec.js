const {test, expect, request} = require('@playwright/test')
const loginPayload = {userEmail: "sathishsuresh984@gmail.com",userPassword: "Satz@984"}
const orderPayLoad = {orders: [{ country: "India",productOrderedId: "652041717244490f95c5f99a"}]}
let token
let orderId

test.beforeAll('Login API request', async ()=> {

    //login
    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
        data: loginPayload
    })

    expect(loginResponse.ok()).toBeTruthy()

    const JsonloginResponse = await loginResponse.json()
    token = JsonloginResponse.token
    console.log('token: '+token)
   
    //Create order
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
    {

        data: orderPayLoad,
        headers: {

            'Authorization': token,
            'Content-Type' : 'application/json'        
        }
    })

    const orderResponseJson = await orderResponse.json()
    orderId = orderResponseJson.orders[0]
    console.log('order id: '+orderId)


} )

test('end to end scenario for ecommerce site', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = 'sathishsuresh984@gmail.com'
    page.addInitScript(value => {
        
        window.localStorage.setItem('token', value);
    }, token);

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')
    
    //click on order details
    await page.locator('button[routerlink*="myorders"]').click()

    //verify order id and click view button
    await page.locator('tbody').waitFor()
    const rows = page.locator('tbody tr')

    for (let i = 0; i < await rows.count(); ++i) {
        const actualOrderId = await rows.nth(i).locator('th').textContent()
        
        if( orderId == actualOrderId){
            console.log(actualOrderId)
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