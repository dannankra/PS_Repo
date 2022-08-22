import { 
  initialTestData,
} from '../../fixtures/setupdata'

describe('Homepage',  { tags: ['@smoke', '@critical', '@C1'] }, function () {
  let payload
  before(function () {
    // payload = initialTestData()
    cy.login()
    // scy.setupTest(payload)
  })
  after(function () {
    // cy.teardownTest(payload)
  })

  context('When correct credentials are entered', function () {
    it('C12003185 User should be logged in', { tags: '@C12003185' }, function () {
     cy.get('#slc-header-logo').should('exist').and('be.visible')
    })
  })
})
