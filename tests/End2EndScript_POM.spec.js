const {test, expect} = require('@playwright/test');
const {LoginPage} = require('./PageObjects/LoginPage');
const { DashboardPage } = require('./PageObjects/DashboardPage');
const { CartPage } = require('./PageObjects/CartPage');
const { CheckoutPage } = require('./PageObjects/CheckOutPage');
const { OrdersPage } = require('./PageObjects/OrdersPage');
const { OrderSummaryPage } = require('./PageObjects/OrderSummaryPage');

test('Page Object Model(POM) : end to end scenario for ecommerce site', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //call constructor
    const loginPage = new LoginPage(page)

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
    const dashboardPage = new DashboardPage(page)

    //add product to cart
    await dashboardPage.searchProduct(actualProductName)

    //click add to cart
    await dashboardPage.NavigateToCart()

    //call CartPage constructor
    const cartPage = new CartPage(page)

    //verify product in the cart
   await cartPage.verifyProductNameInCart(actualProductName)
   
    //click checkout
    await cartPage.NavigatecheckOut()

    //call CheckoutPage constructor
    const checkOutPage = new CheckoutPage(page)

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
    const ordersPage = new OrdersPage(page)
    
    //verify order id and click view button
    await ordersPage.CheckOrderAndClickView(orderId)

    //call OrderSummaryPage constructor
    const orderSummaryPage = new OrderSummaryPage(page)

    //get order id from order summary page and verify
    await orderSummaryPage.verifyConfirmOrderId(orderId)
   
})