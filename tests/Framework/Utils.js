
import XLSX from 'xlsx'

class Utils {

  readExcel(path, Sheet) {
    const workbook = XLSX.readFile(path)
    // const sheet = workbook.Sheets[workbook.SheetNames[0]] 
    const sheet = workbook.Sheets[Sheet]
    const jsonSheet = XLSX.utils.sheet_to_json(sheet)
    //console.log(jsonSheet)
    return jsonSheet;
  }

  static async clickElementInList(page, selector, menuTitle) {
    let text
    await page.waitForLoadState()
    const element = await page.locator(selector)
    //await element.last().waitFor()
    console.log(await element.count())
    for (let i = 0; i < await element.count(); i++) {
      text = await element.nth(i).textContent()
      text = text.trim()
      console.log(text)
      if (text == menuTitle) {
        await element.nth(i).click({ force: true })
        break
      }

    }
    return text
  }



  static async clickOnElement(page, selector) {
    await page.waitForLoadState()
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.click({ force: true })
  }

  static async getText(page, selector) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    const text = await element.textContent()
    return text.trim()
  }

  static async typeOnTextField(page, selector, text) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.fill(text, { force: true })
  }

  static async selectvalue(page, selector, text) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.click({ force: true })
    await element.fill(text, { force: true })
    await page.waitForLoadState()
    await page.waitForTimeout(500)
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
  }

  static async clickCheckBox(page, selector) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.check({ force: true })
  }

  static async type(page, selector, text) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.fill(text)
  }

  static async click(page, selector) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.click()
  }

  static async slectDropdown(page, selector, text) {
    const element = page.locator(selector)
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.selectOption(text, { force: true })
  }

  static async typeOnFirstTextField(page, selector, text) {
    const element = page.locator(selector).first()
    await element.scrollIntoViewIfNeeded()
    await element.waitFor()
    await element.fill(text, { force: true })
  }

}

module.exports = { Utils }