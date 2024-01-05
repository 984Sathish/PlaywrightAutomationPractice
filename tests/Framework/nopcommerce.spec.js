const { test, expect } = require('@playwright/test')

const { Utils } = require('./Utils')
const { LoginPage } = require('./PageObjects/LoginPage')
const { DashboardPage } = require('./PageObjects/DashboardPage')
const { ProductPage } = require('./PageObjects/ProductPage')
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
    expect(await dashboardPage.verifyDashboardHeader(page)).toBe('Dashboard')

    await dashboardPage.clickMenu(page, 'Catalog')
    await page.waitForTimeout(1000)

    await dashboardPage.clickSubMenu(page, 'Products')

    await page.waitForTimeout(1000)
    expect(await dashboardPage.verifyDashboardHeader(page)).toBe('Products')

    const productPage = new ProductPage()
    productPage.AddNewProduct(page)
    await page.waitForTimeout(1000)

    expect(await productPage.verifyProdctHeader(page)).toContain('Add a new product')

    await productPage.addProductInfo(page)

    expect(await productPage.saveDetails(page)).toContain('The new product has been added successfully.')
})