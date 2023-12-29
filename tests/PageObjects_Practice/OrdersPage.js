class OrdersPage {

    constructor(page) {
        this.page = page
        this.orderNumber = page.locator('ul.details li')
        this.orderDetails = page.locator('[href*="orderdetails"]')
        this.orderNum = page.locator('.order-number strong')

    }

    async getOrderNumber() {
        let orderNumber = await this.orderNumber.first().textContent()
        orderNumber = orderNumber.split(":")[1].trim()
        return orderNumber
    }

    async clickOrderDetails() {
        await this.orderDetails.click()
    }

    async getOrderNumFromOrderpage() {
        let orderNum = await this.orderNum.textContent()
        orderNum = orderNum.split("#")[1]
        return orderNum
    }

}
module.exports = {OrdersPage}