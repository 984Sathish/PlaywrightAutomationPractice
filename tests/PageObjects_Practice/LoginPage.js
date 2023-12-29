class LoginPage{

    constructor(page){
        this.page = page
        this.btnLogin = page.locator('.ico-login')
        this.fldUserName = page.locator('#Email')
        this.fldPassword = page.locator('#Password')
        this.btnSubmit = page.locator('[value="Log in"]')
        this.btnLogout = page.getByRole('link', {name: 'Log out'})
    }

    async gotoUrl(){
        await this.page.goto('https://demowebshop.tricentis.com/')
    }

    async login(username, password){
        await this.btnLogin.click()
        await this.fldUserName.fill(username)
        await this.fldPassword.fill(password)
        await this.btnSubmit.click()
        await this.btnLogout.waitFor()
        await this.page.waitForLoadState('networkidle')
    }


}

module.exports = {LoginPage}