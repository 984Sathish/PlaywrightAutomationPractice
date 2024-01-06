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
        await Utils.typeOnTextField(page, product.fldProdName, fk.prodName.toString())
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
}
module.exports = { ProductPage }