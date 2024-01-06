const { test, expect} = require('@playwright/test');
const { LoginPage } = require('./PageObjects_Practice/LoginPage');
const { HomePage } = require('./PageObjects_Practice/HomePage')
const { CheckOutPage } = require('./PageObjects_Practice/CheckoutPage')
const { CartPage } = require('./PageObjects_Practice/CartPage');
const { OrdersPage } = require('./PageObjects_Practice/OrdersPage');

test('POM: Demo Webshop', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    const loginPage = new LoginPage(page)
    
    //go to application url
    await loginPage.gotoUrl()
    //login
    await loginPage.login("sathishsuresh@gmail.com", "Satz@984")

    const homePage = new HomePage(page)

    //select category
    await homePage.selectCategory()
    //select product
    const product = "Smartphone"
    await homePage.selectProduct(product)
    //click to cart
    await homePage.clicktoCart()

    const cartPage = new CartPage(page)

    //check termOfCondition
    await cartPage.clickTermsOfCondition()
    //click chekcout
    await cartPage.clickOnCheckOut()

    const checkOutPage = new CheckOutPage(page)

    //choose order details
    await checkOutPage.chooseOrderDetails()
    //verify product name
    await expect(await checkOutPage.getProductTitle()).toHaveText(product)
    //confirm order
    await checkOutPage.clickConfirmOrder()

    const orderPage = new OrdersPage(page)

    //get order number 
    const expectOrderNumber = await orderPage.getOrderNumber()
    console.log("expect order number: "+expectOrderNumber)

    //click order details
    await orderPage.clickOrderDetails()

    //click get order number from orders page
    const actualOrderNumber = await orderPage.getOrderNumFromOrderpage()
    console.log("actual order number: "+actualOrderNumber)

    //verify order number
    expect(expectOrderNumber).toEqual(actualOrderNumber)



})