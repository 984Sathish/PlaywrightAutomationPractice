const { test, expect } = require('@playwright/test');

/*serial test is run test serially, by default playwright test also run serially,
but this is unique.
 -> because , it depend on each test.
 example: when execution 4 test. 1 test pass and 2nd test is failed mean remaining 2 test is 
 not run(skip the remaining test.).
 -> by default playwright have serial test execution with independent test execution.

*/

// individual test are run serially.
test.describe.configure({ mode: 'serial' })

test('First test case with "broswer" fixture', async ({ browser }) => {

    //create new browser
    const context = await browser.newContext();

    //create new page
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/') //navigate to url

    await page.title() //get title of page

    //verify page title assertion
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

    //type username
    await page.locator('#username').fill('rahulshettyacademy');

    //type password
    await page.locator('#password').fill('learning')

    //click sign in
    await page.locator('#signInBtn').click();
});

test('first test case with "page" fixture', async ({ page }) => {

    //create new browser and create new page will be automatically execute when you denote {page} fixture

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/') //navigate to url

    await page.title()  //get title of page

    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
});

test('login to verify "Invalid credential" error msg', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning')
    await page.locator('#signInBtn').click();

    const fldErrMsg = page.locator('[style*="block"]')

    //get text
    await fldErrMsg.textContent()
    console.log(await fldErrMsg.textContent())

    await expect(fldErrMsg).toContainText('Incorrect');
});

test('Add product and get all text', async ({ page }) => {

    //navigate url - goto
    page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    //perform valid login - type 
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('learning')

    //click to login - click 
    await page.locator('#signInBtn').click();

    //add product to cart
    const productList = page.locator('.card-title a')

    console.log(await productList.first().textContent());
    console.log(await productList.nth(1).textContent());
    console.log(await productList.last().textContent());

    //get all text
    const allProductText = await productList.allTextContents();
    console.log(allProductText)
})



