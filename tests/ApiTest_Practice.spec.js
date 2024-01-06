const {test, request, expect} = require('@playwright/test')
const loginPayload = {Email: "sathishsuresh984@gmail.com",Password: "Satz@984", RememberMe: "false"}

test('Login API test', async ()=> {

    const apiContext = await request.newContext()
    const loginResponse = await apiContext.post('https://demowebshop.tricentis.com/login',
    {
        data: loginPayload
    })

    expect(loginResponse.ok()).toBeTruthy()
})

test