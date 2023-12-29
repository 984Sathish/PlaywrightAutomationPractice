class CartPage{

    constructor(page){

        this.terms = page.locator('#termsofservice')
        this.checkout = page.locator('#checkout')
    }

    async clickTermsOfCondition(){
        await this.terms.click()
    }

    async clickOnCheckOut(){
        await this.checkout.click()
    }



}
module.exports = {CartPage}