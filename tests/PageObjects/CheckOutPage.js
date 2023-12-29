const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page){
        this.page = page
        this.countrySelect = page.locator('[placeholder="Select Country"]')
        this.countrySuggestion = page.locator('section.ta-results')
        this.userName = page.locator('label[type="text"]')
        this.placeOrder = page.locator('.action__submit')
        this.orderConfirmMsg = page.locator('.hero-primary')
        this.orderId = page.locator('label.ng-star-inserted')
        this.orderDetails = page.locator('button[routerlink*="myorders"]')
    }

    async selectCountry(countryType, countryName) {

    //select country
    await this.countrySelect.type(countryType, {delay: 100}) //{delay: 100} - will type delay 
    
    //waiting for suggestion field
    this.page.waitForTimeout(2000)
    await this.countrySuggestion.waitFor()
    const countryCount = await this.countrySuggestion.locator('button').count()
    console.log('suggestion count: '+countryCount)

    //click suggestion dynamically
    for (let i = 0; i < countryCount; i++) {
        const expectcountryName = await this.countrySuggestion.locator('button').nth(i).textContent()
        console.log(expectcountryName)

        if(expectcountryName.trim() == countryName){
            await this.countrySuggestion.locator('button').nth(i).click()
            break;
            }  
        }
    }

    async clickOrder(){
        await this.placeOrder.click()
    }

    async verifyOrderSuccessMessage(){
        await expect(this.orderConfirmMsg).toHaveText(' Thankyou for the order. ')
    }

    async emailVerification(userName){
        await expect(this.userName).toHaveText(userName)
    }

    async getOrderId(){
        var orderId = await this.orderId.textContent() 
        orderId = orderId.split('|')[1].trim()  //split and trim order id text.
        console.log('Order Id :'+orderId)
        return orderId
    }

    async clickOrderDetails(){

        await this.orderDetails.click()
    }

}

module.exports = {CheckoutPage}