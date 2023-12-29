const { Given, When, Then } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const { POManager } = require('./PageObjects/POManager');

Given('Login to valid {username} and {password}', async function (userName, password) {

    //call constructor
    const loginPage = this.pomanager.getLoginPage(page)

    //go to application url
    await loginPage.goToUrl()

    //login
    await loginPage.validLogin(userName, password)
})

When('Add {productName} to cart', async function (actualProductName) {

    //call DashboardPage consturctor
    this.dashboardPage = this.pomanager.getDashboardPage(page)

    //add product to cart
    await this.dashboardPage.searchProduct(actualProductName)
})

Then('Verify {productName} is displayed in cart', async function () {

    //click add to cart
    await this.dashboardPage.NavigateToCart()

    //call CartPage constructor
    this.cartPage = pomanager.getCartPage(page)

    //verify product in the cart
    await cartPage.verifyProductNameInCart(actualProductName)

})

When('Select country and Place Order', async function () {

    //click checkout
    await cartPage.NavigatecheckOut()

    //call CheckoutPage constructor
    this.checkOutPage = this.pomanager.getCheckOutPage(page)

    //select country
    await this.checkOutPage.selectCountry('ind', 'India')

    //click order
    await this.checkOutPage.clickOrder()

})

Then('Veirfy Order persent in orderHistory', async function () {

    //verify success message
    await this.checkOutPage.verifyOrderSuccessMessage()

    //get order Id
    const orderId = await this.checkOutPage.getOrderId()

    //click on order details
    await this.checkOutPage.clickOrderDetails()

    //call OrdersPage constructor
    const ordersPage = this.pomanager.getOrdersPage(page)

    //verify order id and click view button
    await ordersPage.CheckOrderAndClickView(orderId)

    //call OrderSummaryPage constructor
    const orderSummaryPage = this.pomanager.getOrderSummaryPage(page)

    //get order id from order summary page and verify
    await orderSummaryPage.verifyConfirmOrderId(orderId)
})