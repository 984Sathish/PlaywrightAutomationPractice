
const dashboard = JSON.parse(JSON.stringify(require('../PageElements/Dashboard.json')))
const { Utils } = require('../Utils')
const { expect } = require('@playwright/test')
const playwright = require('playwright');


class DashboardPage {

    async verifyDashboardHeader(page, description) {
        expect(await page.isVisible(dashboard.textHeader)).toBeTruthy()
        // await expect(page.locator(dashboard.textHeader)).toBeAttached()
        // await expect(page.locator(dashboard.textHeader)).toBeVisible()
        const header = Utils.getText(page, dashboard.textHeader)
        return header
    }

    async clickMenu(page, menuTitle) {
        await Utils.clickElementInList(page, dashboard.closedMenu, menuTitle)
    }

    async clickSubMenu(page, subMenuTitle) {
        await Utils.clickElementInList(page, dashboard.openedMenu, subMenuTitle)
    }

}

module.exports = { DashboardPage }