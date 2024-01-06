class DashboardPage{

    constructor(page){

        this.page = page
        this.productElement = page.locator('div.card-body') 
        this.cart = page.locator('[routerlink*="cart"]');

    }

    async searchProduct(actualProductName){
        
        await this.productElement.last().waitFor()
        const countOfPrd = await this.productElement.count()
        console.log('product count: '+countOfPrd)
    
        for (let i = 0; i < countOfPrd; i++) {
    
            //using nth to dynamically check product name
            const expectProductName = await this.productElement.nth(i).locator('b').textContent()
            console.log(expectProductName)
    
            if(expectProductName == actualProductName) {
                 
                //click add to cart
               await this.productElement.nth(i).locator('button').nth(1).click()
               break;
            }
        }
        
    }

    
    async NavigateToCart(){
        await this.cart.click()
    }
}
 
module.exports = {DashboardPage}