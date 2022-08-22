
import StudioPage  from '../../../pageobjects/StudioPage'
import Table from '../../../components/Table'
import Filters from '../../../components/Filters'

/// <reference types="cypress" />

describe('Task aggregated view: Pagination', function () {
  before(() => {
    cy.clearLocalStorageCache();
    cy.login()
    StudioPage.visit()
    StudioPage.goToExecutionOverview()
    Table.selectItemsPerPage()
    // Table.enterDateRange()
    Table.enablePipelineSwitch()
  })
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  after(() => {
    cy.logout()
  })
  afterEach(() => {
    cy.saveLocalStorageCache();
  });
  
  context('User should be able to Use Pagination Controls', function () {
    it('Forward pagination icon should move to next page on click', function () {
      Table.verifyPageGoesToCorrectPage(Table.paginationCtrs.next)
    })
    it('Previous pagination icon should move to previous page on click', function () {
      Table.verifyPageGoesToCorrectPage(Table.paginationCtrs.prev)
    })
    it('Page should not change when nothing is clicked', function () {
      Table.verifyPageGoesToCorrectPage('None')
    })  
    it('Footer should show date with correct format', function () {
      Table.verifyFooterDateFormat()
    }) 
  })
  context('Items Per Page should display the correct number of Items', function () {
    it('Number of items per page option should be present', function () {
      Filters.itemsPerPageDropdown.should('be.visible')
    })
    Object.values(Filters.itemsPerPage).forEach(function (item) {
      it(`Table should display ${item} items when the items per page is set to ${item}`, function () {
        Filters.selectItemsPerPage(item)
        Table.verifyTableHasCorrectDataRows(item)
      })
    })
  })
})
