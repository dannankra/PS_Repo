require('./commands')
/// <reference types="cypress" />

// cypress/support/index.js
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress-grep
// const registerCypressGrep = require('cypress-grep')
// registerCypressGrep()
// if you want to use the "import" keyword
// import registerCypressGrep from 'cypress-grep'
// registerCypressGrep()

global.defaultCredentials = {
    username: 'dannankra+cyadmin1@snaplogic.com',
    password: 'Cypress@12345!'
}


/* eslint-disable no-console */

let testAttributesToSend
const sendTestAttributes = () => {
  if (!testAttributesToSend) {
    return
  }

  console.log('sending test attributes: %s %s',
    testAttributesToSend.title, testAttributesToSend.state)

  const attr = testAttributesToSend

  testAttributesToSend = null
  cy.task('testFinished', attr)
}

beforeEach(sendTestAttributes)

after(sendTestAttributes)

// you cannot execute async code from event callbacks
// thus we need to be patient and send the test results
// when the next test starts, or after all tests finish
Cypress.on('test:after:run', (attributes, test) => {
  testAttributesToSend = attributes
})