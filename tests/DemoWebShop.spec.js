const {test, expect} = require('@playwright/test');

test('Order product from demo webshop site', async ({browser})=> {

    const context = await browser.newContext({
        recordVideo: { dir: './videos/'}
    })

    const page = await context.newPage()

    //go to application
    await page.goto('https://demowebshop.tricentis.com/')

    //login
    await page.locator('.ico-login').click()
    await page.locator('#Email').fill('sathishsuresh@gmail.com')
    await page.locator('#Password').fill('Satz@984')
    await page.locator('[value="Log in"]').click()

    await page.getByRole('link', {name: 'Log out'}).waitFor()

     //wait to all newtwork response are captured once. 
     await page.waitForLoadState('networkidle')

     await page.locator('a:has-text("Electronics")').nth(0).hover()

    
     await page.getByRole('link', {name: 'Cell phones'}).nth(0).click()
     
     await page.waitForLoadState('networkidle')

     const productGrid =  page.locator('.product-item')
     console.log("Product Count - "+ await productGrid.count())

     const product = "Smartphone"
     for(let i = 0; i< await productGrid.count(); i++){

        const productName = await productGrid.nth(i).locator('h2 a').textContent()
        console.log("product Name: "+ productName)
        
        if(productName == product){
            const btnAddtoCart =  productGrid.nth(i).locator('input')
            await expect(btnAddtoCart).toBeVisible()
            await btnAddtoCart.click()
            break
        }
     }

     await page.locator('.ico-cart').first().click()

     await page.locator('#termsofservice').click()

     await page.locator('#checkout').click()

     await page.locator('[onclick="Billing.save()"]').click()
     await page.locator('[onclick="Shipping.save()"]').click()
     await page.locator('[onclick="ShippingMethod.save()"]').click()
     await page.locator('[onclick="PaymentMethod.save()"]').click()
     await page.locator('[onclick="PaymentInfo.save()"]').click()

    const productName = page.locator('.product-name')
     await expect(productName).toHaveText(product)
     await page.locator('[onclick="ConfirmOrder.save()"]').click()

     let orderNumber = await page.locator('ul.details li').first().textContent()
     orderNumber = orderNumber.split(":")[1].trim()
     console.log("expect order number: "+orderNumber)

     await page.locator('[href*="orderdetails"]').click()

     let orderNum = await page.locator('.order-number strong').textContent()
     orderNum = orderNum.split("#")[1]
     console.log("actual order number: "+orderNum)

     expect(orderNum).toEqual(orderNumber)
})

