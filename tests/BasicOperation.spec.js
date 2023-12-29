const { test, expect } = require('@playwright/test')
const moment = require('moment/moment')
const { timeout } = require('../playwright.config')
const { link } = require('fs')
const Tesseract = require('tesseract.js')

test('Frame', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/#iFrame')

    const frameLocator = page.frameLocator('[name="globalSqa"]')

    const courseCount = await frameLocator.locator('#portfolio_items div.one-third').count()
    console.log('Number of Training Course: ' + courseCount)
})

test('Window Handling', async ({ browser }) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const btnNewWinodw = page.getByRole('link', { name: 'Click Here' })

    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/#Open%20New%20Window')

    const [newPage] = await Promise.all([   

        context.waitForEvent('page'),
        btnNewWinodw.click()
    ])

    console.log('2nd Page URL: ' + newPage.url())
    console.log('1st Page URL:' + page.url())
})

test('Alert', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/samplepagetest/')

    page.on('dialog', dialog => console.log(dialog.message())) //get dialog text
    page.on('dialog', dialog => dialog.accept())               //accept dialog

    await page.locator('[onclick="myFunction()"]').click()

})

test('Static Dropdown', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/select-dropdown-menu/')

    //select dropdown option directly
    const dropdown = page.locator('[rel-title="Select Country"] select')
    await dropdown.selectOption('ASM')
    await page.waitForTimeout(2000)

    //select dropdown by label(visible text in dropdown)
    dropdown.selectOption({ label: "Australia" })
    await page.waitForTimeout(2000)

    //select dropdown by option 
    dropdown.selectOption({ value: "CHN" })
    await page.waitForTimeout(2000)

    //select dropdown by index 
    dropdown.selectOption({ index: 0 })
    await page.waitForTimeout(2000)

    //validate dropdown value
    const textValue = await dropdown.textContent()
    expect(textValue.includes('Afghanistan')).toBeTruthy()
})

test('Dialog box', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/dialog-boxes/#Message%20Box')

    await page.locator('[id="Message Box"]').click()

    const frame = page.frameLocator('[data-src*="message"]')

    const dialogTitle = await frame.locator('[aria-describedby="dialog-message"] .ui-dialog-title').textContent()
    console.log("Dialog Box title: " + dialogTitle)

    const dialogMsg = await frame.locator('#dialog-message p').nth(1).textContent()
    console.log("Dialog Box message: " + dialogMsg)

    await frame.locator('[aria-describedby="dialog-message"] button').nth(1).click()

})

test('Drag and drop', async ({ page }) => {

    await page.goto('https://commitquality.com/practice-drag-and-drop')

    await page.locator('#small-box').dragTo(page.locator('.large-box '))
    const message = page.locator('.large-box')
    await expect(message).toContainText('Success!')

})

test('checkbox', async ({ page }) => {

    await page.goto('https://commitquality.com/practice-general-components')

    const checkboxEl = page.locator('[name="checkbox1"]')
    await checkboxEl.check()
    await expect(checkboxEl).toBeChecked()
    await expect(checkboxEl.isChecked()).toBeTruthy()

    await checkboxEl.uncheck()
    expect(await checkboxEl.isChecked()).toBeFalsy()

})

test('get/verify Attribute value', async ({ page }) => {
    await page.goto('https://commitquality.com/practice-general-components')

    const url = await page.locator('[data-testid="link-same-tab"]').getAttribute('href')
    console.log('Attribute value: ' + url)
    await page.goto(url)

})

test('WebTable', async ({ page }) => {

    await page.goto('https://commitquality.com/')
    const tbody = page.locator('.product-list-table tbody')

    const row = tbody.locator('tr')
    console.log('row count: ' + await row.count())
    for (let i = 0; i < await row.count(); i++) {
        const id = await row.nth(i).locator('td').nth(0).textContent()
        //console.log(id)
        if (id == 4) {
            const price = await row.nth(i).locator('td').nth(2).textContent()
            console.log('Price :' + price)

            const productName = await row.nth(i).locator('td').nth(1).textContent()
            console.log('Product Name : ' + productName)
            break
        }
    }
})

test('date picker', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/datepicker/')
    const frame = page.frameLocator('[data-src*="datepicker/default"]')
    await frame.locator('#datepicker').click()

    const month = frame.locator('.ui-datepicker-month')
    const year = frame.locator('.ui-datepicker-year')
    const prev = frame.locator('[title="Prev"]')
    const next = frame.locator('[title="Next"]')
    const date = frame.locator('[data-handler="selectDay"]')

    const actualMonth = "April"
    const actualYear = "2022"

    const thisMonth = moment(actualMonth, 'MMMM').isBefore()
    const thisYear = moment(actualYear, 'YYYY').isBefore()
    //console.log(thisMonth)

    //select month and year
    while (await month.textContent() != actualMonth && await year.textContent() != actualYear) {
        //console.log(thisMonth)
        if (thisMonth && thisYear) {
            await prev.click()
        }
        else {
            await next.click()
        }
    }

    let i = 0
    const days = await date.count()
    console.log(await date.count())

    //select date
    while (i < days) {
        if (await date.nth(i).textContent() == '4') {
            date.nth(i).click()
        }
        i++
    }
    page.waitForTimeout(3000)
    console.log('Date: ' + await frame.locator('#datepicker').inputValue())
})

test('Codegen', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Electronics' }).first().click();
    await page.locator('h2 [href*="cell-phone"]').click()
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('link', { name: 'Shopping cart (1)' }).click();
    await page.locator('#termsofservice').check();
    await page.getByRole('button', { name: 'Checkout' }).click();

})

test('Select Elements', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/select-elements/#Multiple%20Selection')

    const frame = page.frameLocator('[data-src*="selectable/default"]')
    const item = frame.locator('#selectable li')
    let i = 0

    while (i < await item.count()) {

        await frame.locator('#selectable li').nth(i).click()
        await expect(frame.locator('li.ui-selected')).toBeVisible()
        i++
    }
})

test('Slider', async ({ page }) => {

    await page.goto('https://groww.in/calculators/sip-calculator')

    //get slider element using $
    const slider = await page.$('(//div[@role="slider"])[1]')
    const amount = page.locator('#MONTHLY_INVESTMENT')

    const targetAmt = '50000'
    let isComplete = false

    if (slider) {
        while (!isComplete) {
            let srcBound = await slider.boundingBox()
            console.log(srcBound)
            if (srcBound) {

                //start to drag mouse with srcBound value
                await page.mouse.move(srcBound.x + srcBound.width / 2, srcBound.y + srcBound.height / 2)
                await page.mouse.down()
                //drop mouse with below srcBount value(srcBound.width / 2 = 15)
                await page.mouse.move(srcBound.x + 16, srcBound.y + srcBound.height / 2)
                await page.mouse.up()

                let actualAmount = await amount.inputValue()
                console.log(actualAmount)
                //verify actual and target amount
                if (actualAmount >= targetAmt) {
                    isComplete = true
                }
            }
        }
    }

})

test('Upload', async ({ page }) => {
    const filePath1 = 'C:/Users/sathish.suresh/PlaywrightAutomationPratice/image/NewImg.png'
    const filePath2 = 'C:/Users/sathish.suresh/PlaywrightAutomationPratice/image/NewImg2.png'

    //upload single file
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    await page.setInputFiles('#filesToUpload', filePath1)

    //upload multiple file
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
    await page.setInputFiles('#filesToUpload', [filePath1, filePath2])

    //upload file without input tag HTML
    await page.goto('http://autopract.com/selenium/upload2/')

    //filechooser
    const [uploadFile] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('#pickfiles')
    ])
    await uploadFile.setFiles([filePath1, filePath2])

})

test('Relative locator', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/register')

    //right-of
    await page.fill('#FirstName:right-of(:text("First name:"))', "sathish")
    //left-of
    await page.click('#gender-male:left-of(:text("Female"))')
    //below
    await page.fill('#Password:below(:text("Your Password"))', "satz@123")
    //above
    await page.fill('#LastName:above(:text("Email:"))', "suresh")
    //below and right-of
    await page.fill('#Email:below(:text("Last name:")):right-of(:text("Email:"))', 'sathishsuresh@gmail.com')
})

test('Input field', async ({ page }) => {

    //fill -> delete textfield and type
    await page.goto('https://letcode.in/edit')
    const element = page.locator('#join')
    await element.fill('Hi')
    await element.screenshot({ path: 'ElementScreenshot1.jpg' })

    //type -> only type (not delete textfield) 
    await page.goto('https://letcode.in/edit')
    await element.type('Human ')
    await element.screenshot({ path: 'ElementScreenshot2.jpg' })

    //type last in textfield of exiting using keyboard.
    await page.goto('https://letcode.in/edit')
    await element.focus()
    await page.keyboard.press('End')
    await element.type(' Human')
    await element.screenshot({ path: 'ElementScreenshot3.jpg' })
})

test('Shadow-root', async ({ page }) => {

    //note:
    //Shadow-root is handle by playwright itself no need to add anything in code. Only locate unique element.
    //It is applicate for single and nested shadow-root also.

    await page.goto('https://bugs.chromium.org/p/chromium/issue')
    await page.locator('#can').selectOption({ label: 'Open and reported by me' })
    await page.waitForTimeout(3000)

})

test('Suggestion', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/auto-complete/')

    const frame = page.frameLocator('[data-src*="autocomplete/categories"]')
    await frame.getByLabel('Search: ').fill('a', { timeout: 3000 })
    const elemt = frame.locator('.ui-menu-item-wrapper')
    const suggestion = await elemt.count()

    for (let i = 0; i < suggestion; i++) {
        const text = await elemt.nth(i).textContent()
        console.log(text)
        if (text == 'annk K12') {
            await elemt.nth(i).click()
            break
        }
    }
    await page.waitForTimeout(3000)


})

test('scrolling', async ({ page }) => {

    //element scrolling
    await page.goto('https://commitquality.com/')
    const element = page.getByRole('button', { name: 'Show More' })
    await element.scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000)

    await page.goto('https://commitquality.com/')
    await page.evaluate(() => {
        window.scrollTo(0, 50)  //change as per speed
    })
    await page.waitForTimeout(3000)
})

test('Nested frame', async ({ page }) => {

    await page.goto('https://letcode.in/frame')
    const mainFrame = page.frame({ name: 'firstFr' })

    const childFrames = mainFrame.childFrames()
    console.log("No of child frames: " + childFrames.length)

    await childFrames[1].getByPlaceholder('Enter email').fill('sathish@gmail.com')
    await page.waitForTimeout(3000)

})

test('Handle Multiple window', async ({ page }) => {
    await page.goto('https://letcode.in/windows')

    //window handling
    const [multiPage] = await Promise.all([
        await page.locator('#multi').click(),
        await page.locator('#multi').click(),
    ])

    //get all opened window
    page.waitForTimeout(2000)
    const allWindow = page.context().pages()
    console.log('No of window: ' + allWindow.length)


    //print all windows url
    allWindow.forEach(newpage => {
        console.log(newpage.url())
    })

    //show the window
    await allWindow[2].bringToFront()

    //select dropdown
    await allWindow[2].locator('#fruits').selectOption({ label: 'Pine Apple' })

})

test('dropdown without select', async ({ page }) => {

    await page.goto('https://www.leafground.com/select.xhtml')
    await page.locator('[aria-haspopup="listbox"]').nth(0).click()
    //dropdown select 
    await page.locator('ul[role="listbox"]').locator('li', { hasText: 'India' }).click()
    await page.waitForTimeout(3000)
})

test('waits', async ({ page }) => {

    await page.goto('https://www.leafground.com/waits.xhtml')
    await page.locator('div.card').locator('h5', { hasText: 'Wait for Visibility (1 - 10 Sec)' }).waitFor()

    //wait for element to be visible 
    await page.locator('[type="submit"] span', { hasText: 'Click' }).first().click()
    const element = page.locator('[type="submit"] span', { hasText: 'I am here' })
    await expect(element).toBeVisible({ timeout: 10000 })

    //wait for element to invisible 
    await page.locator('[id*="show1"] span', { hasText: 'Click' }).click()
    const hideElement = page.locator('[type="submit"] span', { hasText: 'I am about to hide' })
    await expect(hideElement).toBeHidden({ timeout: 10000 })

    //wait for visiblilty and invisiblity
    const oldElement = page.locator('[type="submit"] span', { hasText: 'I am going to change!' })
    await expect(oldElement).toBeVisible()

    await page.locator('[type="submit"] span', { hasText: 'Click' }).last().click()

    const newElement = page.locator('[type="submit"] span', { hasText: 'Did you notice?' })
    await expect(newElement).toBeVisible({ timeout: 10000 })

    await page.waitForTimeout(3000)

})

test('File download', async ({ page }, testInfo) => {

    await page.goto('https://demo.automationtesting.in/FileDownload.html')

    const screenshot = await page.screenshot()
    await testInfo.attach('Page screenshot', { contentType: 'LoginImage.png', body: screenshot })

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        await page.getByRole('link', { name: 'Download' }).click(),
        await page.waitForTimeout(20000)
    ])
    const path = download.suggestedFilename()
    await download.saveAs(path)
    await testInfo.attach('downloaded', { path: path })

})

test('UI verification', async ({ page }) => {

    await page.goto('https://letcode.in/edit')
    expect(await page.isDisabled('#noEdit')).toBeTruthy()

    expect(await page.isEditable('#dontwrite')).toBeFalsy()

    expect(await page.isEnabled('#noEdit')).toBeFalsy()
})


test('get CSS value', async ({ page }) => {

    await page.goto('https://letcode.in/buttons')
    const btn = page.locator('#home')

    const color = await btn.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue('background-color')
    })
    console.log(color)

})

test('drop and drop inside frame using mouse', async ({ page }) => {

    await page.goto('https://jqueryui.com/droppable/')
    const frame = page.frameLocator('.demo-frame')
    if (frame) {
        const drag = frame.locator('#draggable')
        const drop = frame.locator('#droppable')

        if (drag && drop) {
            const dragBound = await drag.boundingBox()
            const dropBound = await drop.boundingBox()
            if (dragBound && dropBound) {
                await page.mouse.move(dragBound.x + dragBound.width / 2, dragBound.y + dragBound.height / 2)
                await page.mouse.down()
                await page.mouse.move(dropBound.x + dropBound.width / 2, dropBound.y + dropBound.height / 2)
                await page.mouse.down()
            }
            else {
                throw new Error('No Element')
            }
        }
    }
})

test('drag and drop inside frame using drapTo method', async ({ page }) => {

    await page.goto('https://jqueryui.com/droppable/')
    const frame = page.frameLocator('.demo-frame')
    if (frame) {
        await frame.locator('#draggable').dragTo(frame.locator('#droppable'))
    }
})

test.skip('Extract text from image', async ({ page }) => {

    await page.goto('https://tesseract.projectnaptha.com/')
    const img = page.locator('#input')
    const name = Date.now()
    await img.screenshot({ path: `${name}.png` })
    const imgText = await Tesseract.recognize(`/${name}`)
    console.log(imgText.data.text)  //Not getting expected output.

})




