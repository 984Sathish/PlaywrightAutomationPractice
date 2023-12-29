class CheckOutPage{

    constructor(page){
        this.billSave =  page.locator('[onclick="Billing.save()"]')
        this.shipSave = page.locator('[onclick="Shipping.save()"]')
        this.shipMethod = page.locator('[onclick="ShippingMethod.save()"]')
        this.payMethod = page.locator('[onclick="PaymentMethod.save()"]')
        this.PayInfo = page.locator('[onclick="PaymentInfo.save()"]')
        this.productName = page.locator('.product-name')
        this.confirmOrder = page.locator('[onclick="ConfirmOrder.save()"]')
   
    }

    async chooseOrderDetails(){
        await this.billSave.click()
        await this.shipSave.click()
        await this.shipMethod.click()
        await this.payMethod.click()
        await this.PayInfo.click()
         
    }

    async getProductTitle(){
        const productTitle = await this.productName
        return productTitle
    }

    async clickConfirmOrder(){

        await this.confirmOrder.click()
    }



}
module.exports = {CheckOutPage}