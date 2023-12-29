const {expect} = require('@playwright/test')
class OrderSummaryPage {

    constructor(page){

        this.page = page
        this.getOrderId = page.locator('div.col-text')
    }

    async verifyConfirmOrderId(orderId){
        const summaryOrderId = await this.getOrderId.textContent()

        console.log("Actual order id: "+orderId)
        console.log("Expected order id: "+summaryOrderId)
    
        expect(orderId.includes(summaryOrderId)).toBeTruthy()
    }
}

module.exports = {OrderSummaryPage}