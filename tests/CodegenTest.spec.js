//Note:

//codegen - use to record the test executions.
//codegen run command - npx playwright codegen http://google.com (url need to add last to navigate)

import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');

  await page.getByPlaceholder('email@example.com').fill('sathishsuresh984@gmail.com');

  await page.getByPlaceholder('enter your passsword').fill('Satz@984');

  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(2).click();

  await page.getByRole('button', { name: ' Cart' }).click();

  await page.getByRole('button', { name: 'Checkout❯' }).click();

  await page.getByPlaceholder('Select Country').click();


  await page.getByPlaceholder('Select Country').type('India', { delay: 100 });
  await page.waitForTimeout(3000)
  /* codegen suggestion click is not working */
  // await page.getByRole('span', { name: ' India' }).click();

  //customized code to click india from the suggestion 
  const countrySuggestion = page.locator('section.ta-results')
  await countrySuggestion.waitFor()
  const countryCount = await countrySuggestion.locator('button').count()

  for (let i = 0; i < countryCount; i++) {
    const countryName = await countrySuggestion.locator('button').nth(i).textContent()
    if (countryName == " India") {

      await countrySuggestion.locator('button').nth(i).click()
      break;
    }
  }

  await page.getByText('Place Order').click();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Click To Download Order Details in CSV' }).click();
  const download = await downloadPromise;

  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Click To Download Order Details in Excel' }).click();
  const download1 = await download1Promise;
});