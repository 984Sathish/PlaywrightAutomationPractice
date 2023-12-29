const { Before, After, AfterStep } = require('@cucumber/cucumber')
const playwright = require('@playwright/test')
const { POManager } = require('./PageObjects/POManager');

Before(async function () {

    const browser = playwright.chromium.launch({
        headless: false
    })
    const context = await browser.newContext()
    this.page = await context.newPage()

    //call POManager constructor to get all class reference.
    this.pomanager = new POManager(this.page)
})

AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'})
    }

})

After(async function(){
    console.log('executing after hook!!')
})