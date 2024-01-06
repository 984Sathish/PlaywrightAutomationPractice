class LoginPage {

    constructor(page){

        this.page = page;
        this.fldUserName = page.locator('#userEmail');
        this.fldPassword = page.locator('#userPassword');
        this.btnLogin = page.locator('#login');
    
    }

    async goToUrl()
    {
        await this.page.goto('https://rahulshettyacademy.com/client')   
    }

    async validLogin(userName, password) 
    {
        await this.fldUserName.fill(userName)
        await this.fldPassword.fill(password)
        await this.btnLogin.click()
        await this.page.waitForLoadState('networkidle')
    }

}

module.exports = {LoginPage}