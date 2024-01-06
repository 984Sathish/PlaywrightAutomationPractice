
const login = JSON.parse(JSON.stringify(require('../PageElements/Login.json')))
const { Utils } = require('../Utils')

class LoginPage {

    async login(page, username, password) {
        await Utils.type(page, login.fldUsername, username)
        await Utils.type(page, login.fldPassword, password)
        await Utils.click(page, login.btnSubmit)
    }

}

module.exports = { LoginPage }