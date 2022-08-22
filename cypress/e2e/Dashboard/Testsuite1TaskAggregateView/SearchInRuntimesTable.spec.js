
import StudioPage  from '../../../pageobjects/StudioPage'
import Table from '../../../components/Table'
import Filters from '../../../components/Filters'

/// <reference types="cypress" />

describe('Task aggregated view: Search in Run times table', function () {
  before(() => {
    cy.clearLocalStorageCache();
    cy.login()
    StudioPage.visit()
    StudioPage.goToExecutionOverview()
    Table.selectItemsPerPage()
    Table.enterDateRange()
    Table.enablePipelineSwitch()
  })
  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  after(() => {
    // cy.logout()
  })
  afterEach(() => {
    cy.saveLocalStorageCache();
  });
  
  context('Search in Run times table', function () {
    let runTimesTableData
    before(() => {
      cy.fixture('testdata').then((data) => { 
        runTimesTableData = data.taskagreegateview.search.runtimestable
      }) 
    })
    it('No results found is displayed when an item does not exist', function () {
      runTimesTableData.noitems.forEach((item) => {
          Filters.search(item)
          Table.verifyTableHasNoResults()
      }) 
    })
    it('Search should return the appropriate results', function () {
       runTimesTableData.itempresent.forEach((item) => {
          Filters.search(item)
          Table.verifyTableShowsItem(item)
        })
    })
  })
})
