const {test, expect, request} = require('@playwright/test') ;
const loginPayload = {userEmail: "sathishsuresh984@gmail.com",userPassword: "Satz@984"}
const orderPayLoad = {orders: [{ country: "India",productOrderedId: "652049277244490f95c5fcb8"}]}


/* In this spec file we have '@web' and '@Api' tag to run the specified test.
 use this command ->  
1.npx playwright test --grep "@Web" -> to run Web test only
2.npx playwright test --grep "@Api" -> to run api test only.
*/


test('@Web login to verify "Invalid credential" error msg', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning')
    await page.locator('#signInBtn').click();

    const fldErrMsg = page.locator('[style*="block"]')

    //get text
    await fldErrMsg.textContent() 
    console.log(await fldErrMsg.textContent())

    await expect(fldErrMsg).toContainText('Incorrect');
});

test('@web Add product and get all text', async ({page})=> {

    //navigate url - goto
    page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    //perform valid login - type 
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning')

    //click to login - click 
    await page.locator('#signInBtn').click();

    //add product to cart
    const productList = page.locator('.card-title a')

    console.log(await productList.first().textContent());
    console.log(await productList.nth(1).textContent());
    console.log(await productList.last().textContent());

    //get all text
    const allProductText = await productList.allTextContents();
    console.log(allProductText)    
        
})

let token
let orderId

test('@Api Login API request', async ()=> {

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
