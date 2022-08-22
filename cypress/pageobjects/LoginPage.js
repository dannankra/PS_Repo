import Page from './Page'
/// <reference types="cypress" />

class LoginPage extends Page {
    constructor () {
        super()
        this.name = ''
        this.title = ''
        this.url = '/sl/login.html'

        this.iconCss = '#login-logo'
        this.usernameCss = 'input[type="email"]'
        this.passwordCss = 'input[type="password"]'
        this.loginButtonCss = '.loginButton__primary'
        this.freeTrialBtnCss = '.loginButton.loginButton__secondary'
    }

    get loginButton () { return cy.get(this.loginButtonCss) }
    get username () { return cy.get(this.usernameCss) }
    get password () { return cy.get(this.passwordCss) }
    get loginButton () { return cy.get(this.loginButtonCss) }
    get freeTrialBtn () { return cy.get(this.freeTrialBtnCss) }

    login (credentials) {
        this.username.type(credentials.username)
        this.password.type(credentials.password)
        this.loginButton.click()
    }
}

export default new LoginPage()
