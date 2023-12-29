const {test, expect} = require('@playwright/test');
const {POManager} = require('../tests/PageObjects/POManager');

test('Page Object Model(POM Manager) : end to end scenario for ecommerce site', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //call POManager constructor to get all class reference.
    const pomanager = new POManager(page)

    //call constructor
    const loginPage = pomanager.getLoginPage()

    //go to application url
    await loginPage.goToUrl()
    
    //username and password
    const userName = 'sathishsuresh984@gmail.com'
    const password = 'Satz@984'

    //login
    await loginPage.validLogin(userName, password)

    //product name
    const actualProductName = 'ZARA COAT 3'
    
    //call DashboardPage consturctor
    const dashboardPage =  pomanager.getDashboardPage()

    //add product to cart
    await dashboardPage.searchProduct(actualProductName)

    //click add to cart
    await dashboardPage.NavigateToCart()

    //call CartPage constructor
    const cartPage = pomanager.getCartPage()

    //verify product in the cart
   await cartPage.verifyProductNameInCart(actualProductName)
   
    //click checkout
    await cartPage.NavigatecheckOut()

    //call CheckoutPage constructor
    const checkOutPage = pomanager.getCheckOutPage()

    //select country
    await checkOutPage.selectCountry('ind', 'India')

    //email verification
    await checkOutPage.emailVerification(userName)

    //click order
    await checkOutPage.clickOrder()

    //verify success message
    await checkOutPage.verifyOrderSuccessMessage()

    //get order Id
    const orderId = await checkOutPage.getOrderId()

    //click on order details
    await checkOutPage.clickOrderDetails()

    //call OrdersPage constructor
    const ordersPage = pomanager.getOrdersPage()
    
    //verify order id and click view button
    await ordersPage.CheckOrderAndClickView(orderId)

    //call OrderSummaryPage constructor
    const orderSummaryPage = pomanager.getOrderSummaryPage()

    //get order id from order summary page and verify
    await orderSummaryPage.verifyConfirmOrderId(orderId)
   
})