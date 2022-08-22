import DesignerPage  from '../../pageobjects/DesignerPage'
/// <reference types="cypress" />

describe('Login', function () {
  beforeEach(function () {
    cy.login()
    cy.visit('/')
  })

  afterEach(() => {
  })

  context('When App is initially logged in', function () {
    it('should default to the Designer tab', function () {
      DesignerPage.verifyDesignerTabIsActive()
    })
  })
})
