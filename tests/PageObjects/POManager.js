const {LoginPage} = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckOutPage');
const { OrdersPage } = require('./OrdersPage');
const { OrderSummaryPage } = require('./OrderSummaryPage');

class POManager{

    constructor(page){

        this.page = page
        this.loginPage = new LoginPage(page)
        this.dashboardPage = new DashboardPage(page)
        this.cartPage = new CartPage(page)
        this.checkoutPage = new CheckoutPage(page)
        this.ordersPage = new OrdersPage(page)
        this.orderSummaryPage = new OrderSummaryPage(page)

    }

    getLoginPage(){
        return this.loginPage
    }

    getDashboardPage(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getCheckOutPage(){
        return this.checkoutPage
    }

    getOrdersPage(){
        return this.ordersPage
    }

    getOrderSummaryPage(){
        return this.orderSummaryPage
    }


}

module.exports = {POManager}