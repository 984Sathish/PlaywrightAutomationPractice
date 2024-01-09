const manufacture = JSON.parse(JSON.stringify(require('../PageElements/Manufacturer.json')))
const { Utils } = require('../Utils')
const { FakerObject } = require('../FakerObject')
const fk = new FakerObject()
const manufactureName = fk.manufacturePart.toString()

class Manufacture {

    async EnterManufactName(page) {
        await Utils.typeOnTextField(page, manufacture.fldManufactName, manufactureName)
    }

    async EnterDisplayOrder(page) {
        await Utils.typeOnLastTextField(page, manufacture.fldDisplayOrder, fk.price)
    }

    async CreateNewManufacturePart(page) {

        //Enter Manufacturer details
        await Utils.CheckElementIsHidden(page, manufacture.cardManufactInfo) ? await this.EnterManufactName(page) : (await Utils.click(page, manufacture.cardManufactInfo), await this.EnterManufactName(page));

        //Enter Display Order details
        await Utils.CheckElementIsHidden(page, manufacture.cardManufactDisplay) ? await this.EnterDisplayOrder(page) : (await Utils.click(page, manufacture.cardManufactDisplay), await this.EnterDisplayOrder(page));

        return manufactureName
    }

    async verifyManufacturerInTable(page, manufacturerName) {

        await page.reload()
        await page.waitForLoadState()
        let found = false

        //get pagination size
        const size = await Utils.getSize(page, manufacture.manufactTabPagination)
        console.log('size - ' + size)
        const sizeOfPagination = size - 1
        let i = 1
        while (sizeOfPagination >= i) { 
            if (!found) {
                console.log("pagination: " + i)
                await page.locator(manufacture.manufactTabPagination).nth(i).click()
                await page.waitForTimeout(1500)
                await page.locator("li[class='paginate_button page-item active']").waitFor()
                const row = await Utils.getSize(page, manufacture.manufactNameInTable)
                console.log("row count - " + row)

                //select and delete the manufacturer name
                for (let j = 0; j < row; j++) {
                    let manufactName = await page.locator(manufacture.manufactNameInTable).nth(j).textContent()
                    if (manufactName == manufacturerName) {
                        console.log(manufacturerName + ' is successfully verified in table list')
                        await page.locator(manufacture.manufactTabCbox).nth(j).check()
                        await Utils.click(page, manufacture.btnDeleteManufact)
                        await Utils.click(page, manufacture.btnYesDelete)
                        found = true
                        break
                    }

                }
            }
            i++
        }
        if(!found){
            console.log(manufacturerName + ' is deleted successfully')
        }
    return found
    }

}
module.exports = { Manufacture }