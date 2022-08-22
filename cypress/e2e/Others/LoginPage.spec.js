import LoginPage  from '../../pageobjects/LoginPage'

describe('LoginPage', { tags: ['@login', '@smoke'] }, function () {
  before(function () {
    LoginPage.visit()
  })
  after(function() {})

  context('Should be on the Login Page', function () {
    it('Login Logo should be visible ', function () {
      cy.get(LoginPage.iconCss).should('exist').and('be.visible')
    })
    it('Email field should be present', function () {
        cy.get(LoginPage.usernameCss).should('exist').and('be.visible')
     })
     it('Password field should be present', function () {
        cy.get(LoginPage.passwordCss).should('exist').and('be.visible')
     })
     it('C12003185 Log In button should be present', { tags: ['@tester', '@smoke', '@C12003185'] }, function () {
        LoginPage.loginButton.should('exist').and('be.visible')
     })
     it('C2 Free Trial button should be present', function () {
        LoginPage.freeTrialBtn.should('exist').and('be.visible')
     })
  })
})
