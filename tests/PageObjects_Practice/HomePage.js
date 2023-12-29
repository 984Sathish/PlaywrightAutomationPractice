class HomePage{

    constructor(page){

        this.page = page
        this.electronics = page.locator('a:has-text("Electronics")')
        this.cellphone = page.getByRole('link', {name: 'Cell phones'})
        this.product = page.locator('.product-item')
        this.cart = page.locator('.ico-cart')
      
    }
    
    async selectCategory(){
        await this.electronics.nth(0).hover()
        await this.cellphone.nth(0).click()
        await this.page.waitForLoadState('networkidle')
    }

    async selectProduct(productName){

        console.log(await this.product.count())
        for(let i = 0; i< await this.product.count(); i++){
   
           const ActualproductName = await this.product.nth(i).locator('h2 a').textContent()
           console.log("product name: "+productName)
           if(ActualproductName == productName){
               this.page.waitForLoadState() 
               this.product.last().waitFor()
               await this.product.nth(i).locator('input').click()
               break
           }
        }
   
    }

    async clicktoCart(){
        this.cart.first().click()
    }
}
module.exports = {HomePage}