const {test, expect, request} = require('@playwright/test')
const {ApiUtils} = require('./Utils/ApiUtils')
const { json } = require('stream/consumers')

const loginPayload = {userEmail: "sathishsuresh984@gmail.com",userPassword: "Satz@984"}
const orderPayLoad = {orders: [{ country: "India",productOrderedId: "65204ac27244490f95c5fdbc"}]}
const mockResponseBody = {data:[],message:"No Orders"}
let response

test.beforeAll('Login API request', async ()=> {

    //create new API context
    const apiContext = await request.newContext()

    //create constructor from ApiUtils.js 
    const apiUtils = new ApiUtils(apiContext, loginPayload)

    //call createorder2 method
    response = await apiUtils.createOrder2(orderPayLoad)
} )

test('verify order id', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()    

    page.addInitScript(value => {
        
        window.localStorage.setItem('token', value);
    }, response.token);

    //go to application url
    await page.goto('https://rahulshettyacademy.com/client')
    

    /*
    Note: Mock response life cycle or steps:
    1.get api response
    2.mock the response
    3.sent it to browser
    4.then automatically render to front end.

    */
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    route => {

        // get the response from the api call
        const response = page.request.fetch(route.request()) 

        //covert to javascript object to Json object
        let body = JSON.stringify(mockResponseBody)
    

        route.fulfill({
            response,
            body,
        })

    })

    //click on order details
    await page.locator('button[routerlink*="myorders"]').click()

    //wait from the reponse back.
    // await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    await page.locator('div.mt-4').waitFor()
    const msgNoOrder = await page.locator('div.mt-4').textContent()
    console.log(msgNoOrder)
    expect(msgNoOrder.includes('No Orders')).toBeTruthy()

})  