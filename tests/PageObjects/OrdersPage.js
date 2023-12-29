class OrdersPage{

    constructor(page){

        this.page = page
        this.bodyOrderList = page.locator('tbody')
        this.rowOrderList = page.locator('tbody tr')

    }

    async CheckOrderAndClickView(orderId){

        await this.bodyOrderList.waitFor()
        for (let i = 0; i < await this.rowOrderList.count(); ++i) {
            const actualOrderId = await this.rowOrderList.nth(i).locator('th').textContent()
            
            if(orderId == actualOrderId){
                console.log(actualOrderId)
                this.rowOrderList.nth(i).locator('button').first().click()
                break;
            }
        } 
    }
}

module.exports = {OrdersPage}