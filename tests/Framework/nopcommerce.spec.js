const { test, expect } = require('@playwright/test')

const { Utils } = require('./Utils')
const { LoginPage } = require('./PageObjects/LoginPage')
const { DashboardPage } = require('./PageObjects/DashboardPage')
const { ProductPage } = require('./PageObjects/ProductPage')
const { describe } = require('node:test')
const filePath = 'dataFile.xlsx'
const sheetName = 'CreateUser'


test('Create Product', async ({ browser }) => {

    const utils = new Utils()
    //get excel data
    const data = utils.readExcel(filePath, sheetName)

    //create new browser context
    const context = await browser.newContext()

    //create new page
    const page = await context.newPage()

    const loginPage = new LoginPage()

    //naviagate url
    await page.goto('/Admin')

    //login
    await loginPage.login(page, data[0].Username, data[0].Password)

    const dashboardPage = new DashboardPage()

    //verify dashboard page header
    expect(await dashboardPage.verifyDashboardHeader(page)).toBe('Dashboard')

    //goto Catalog menu
    await dashboardPage.clickMenu(page, 'Catalog')
    await page.waitForTimeout(2000)

    //goto Product page
    await dashboardPage.clickSubMenu(page, 'Products')

    await page.waitForTimeout(2000)
    //verify product page header
    expect(await dashboardPage.verifyDashboardHeader(page)).toBe('Products')

    const productPage = new ProductPage()
    //goto Add to new product page
    await productPage.AddNewProduct(page)

    await page.waitForTimeout(2000)

    //verify add new product page header
    expect(await productPage.verifyProdctHeader(page)).toContain('Add a new product')

    //Enter Product details
    const productName = await productPage.addProductInfo(page)

    //save product details
    expect(await productPage.saveDetails(page)).toContain('The new product has been added successfully.')

    //verify the created product in the table
    expect(await productPage.verifyProductInProdTable(page, productName)).toBeTruthy()

    //verify created product is deleted in the product table
    expect(await productPage.verifyProductInProdTable(page, productName)).toBeFalsy()
})