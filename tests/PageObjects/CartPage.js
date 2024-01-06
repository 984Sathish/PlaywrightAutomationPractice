const {expect} = require('@playwright/test')

class CartPage {

    constructor(page){

        this.page = page
        this.itemList = page.locator('div li')
        this.checkOutBtn = page.locator('text=Checkout')
    }

     

    async verifyProductNameInCart(actualProductName){

        await this.itemList.last().waitFor()
        const boolean = await this.getProductLocator(actualProductName).isVisible()
        expect(boolean).toBeTruthy()
    }

    getProductLocator(actualProductName){
        return this.page.locator(".cartSection h3:has-text('"+actualProductName+"')")
     }

    async NavigatecheckOut(){
        await this.checkOutBtn.click()
    }



}

module.exports = {CartPage}