const product = JSON.parse(JSON.stringify(require('../PageElements/Product.json')))
const { Utils } = require('../Utils')
const { FakerObject } = require('../FakerObject')
const { expect } = require('@playwright/test')

class ProductPage {

    async verifyProdctHeader(page, description) {
        //expect(await page.isVisible(product.header)).toBeTruthy()
        // await expect(page.locator(product.header)).toBeAttached()
        // await expect(page.locator(product.header)).toBeVisible()
        const header = Utils.getText(page, product.header)
        return header
    }

    async AddNewProduct(page) {
        await Utils.clickOnElement(page, product.btnAddNew)
    }

    async addProductInfo(page) {
        const fk = new FakerObject()
        //product name
        const productName = fk.prodName.toString()
        await Utils.typeOnTextField(page, product.fldProdName, productName)
        //product description
        await Utils.typeOnTextField(page, product.fldProdDesc, fk.prodDesc.toString())
        //category
        await Utils.selectvalue(page, product.drpdwnCategory, fk.categories.toString())
        //SKU
        await Utils.typeOnTextField(page, product.fldSKU, fk.stockUnit)
        //Manufacture
        await Utils.selectvalue(page, product.drpdwnManufacture, fk.manufacture.toString())
        //Publish
        await Utils.clickCheckBox(page, product.cboxPublish)
        //Product tag
        await Utils.typeOnTextField(page, product.fldProdTag, fk.prodTag)
        //Product type
        await Utils.slectDropdown(page, product.selctProductType, fk.prodType)
        //Customer Role
        await Utils.selectvalue(page, product.drpdwnCustomerRole, fk.custRoles.toString())
        //Store
        await Utils.selectvalue(page, product.drpdwnStore, fk.limitStore.toString())
        //Vendor
        await Utils.slectDropdown(page, product.selectVendor, fk.vendor)
        //Start date
        await Utils.type(page, product.fldStartDate, fk.startDate)
        //End date
        await Utils.type(page, product.fldEndDate, fk.endDate)
        //Price
        await Utils.typeOnFirstTextField(page, product.fldprice, fk.price)
        //Free shipping
        await Utils.clickCheckBox(page, product.cboxFreeShip)
        //Inventory method
        await Utils.slectDropdown(page, product.methodInventory, fk.inventory)
        //Upload photo
        //await page.setInputFiles(product.fileUpload, 'C:/Users/sathish.suresh/Documents/PlaywrightAutomation/demoImage.jpg')
        return productName
    }

    async saveDetails(page) {
        //Save
        await Utils.clickOnElement(page, product.btnSave)
        //Success message
        const msg = await Utils.getText(page, product.msgSuccess)
        //close alert
        await Utils.clickOnElement(page, product.btnAlertClose)
        //return success message
        return msg
    }

    async verifyProductInProdTable(page, prodName) {

        await page.reload()
        let found = false

        //get pagination size
        const size = await Utils.getSize(page, product.prodTabPagination)
        console.log('size - ' + size)
        const sizeOfPagination = size - 1
        let i = 1
        while (sizeOfPagination >= i) { 
            if (!found) {
                console.log("pagination: " + i)
                await page.locator(product.prodTabPagination).nth(i).click()
                await page.waitForTimeout(1000)
                await page.locator("li[class='paginate_button page-item active']").waitFor()
                const row = await Utils.getSize(page, product.productNameInTable)
                console.log("row count - " + row)

                //select and delete the product name
                for (let j = 0; j < row; j++) {
                    let productName = await page.locator(product.productNameInTable).nth(j).textContent()
                    //console.log(productName)
                    if (productName == prodName) {
                        console.log(prodName + ' is successfully verified in table list')
                        await page.locator(product.prodTabCbox).nth(j).check()
                        await Utils.click(page, product.btnDeleteProduct)
                        await Utils.click(page, product.btnYesDelete)
                        found = true
                        break
                    }

                }
            }
            i++
        }
    return found
    }
}
module.exports = { ProductPage }