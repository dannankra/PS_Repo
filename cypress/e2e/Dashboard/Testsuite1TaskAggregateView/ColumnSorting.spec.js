
import StudioPage  from '../../../pageobjects/StudioPage'
import Table from '../../../components/Table'
describe('Task aggregated view: Column Sorting', function () {
  before(() => {
    cy.clearLocalStorageCache();
    cy.login()
    StudioPage.visit()
    StudioPage.goToExecutionOverview()
    Table.selectItemsPerPage()
    Table.enterDateRange()
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
  
  context('Sorting table Columns', function () {
    before(() => {
      Table.enablePipelineSwitch()
    }) 
    it('Pipeline Name column can be sorted in ascending order', function () {
      let column = Table.headers.pipelinename
      Table.sortColumnAsc(column)
      Table.verifyColumnIsSortedCorrectly(column)
    })
    it('Pipeline Name column can be sorted in descending order', function () {
      let column = Table.headers.pipelinename
      Table.sortColumnDesc(Table.headers.column)
      Table.verifyColumnIsSortedCorrectly(column, Table.sortOrder.descending)
    })
    it('Completed column can be sorted in ascending order', function () {
      let column = Table.headers.completed
      Table.sortColumnAsc(column)
      Table.verifyColumnIsSortedCorrectly(column)
    })
    it('Completed column can be sorted in descending order', function () {
      let column = Table.headers.completed
      Table.sortColumnDesc(column)
      Table.verifyColumnIsSortedCorrectly(column, Table.sortOrder.descending)
    })
    it('Executing column can be sorted in ascending order', function () {
      let column = Table.headers.completed
      Table.sortColumnAsc(column)
      Table.verifyColumnIsSortedCorrectly(column)
    })
    it('Executing column can be sorted in descending order', function () {
      let column = Table.headers.executing
      Table.sortColumnDesc(column)
      Table.verifyColumnIsSortedCorrectly(column, Table.sortOrder.descending)
    })
    it('Failed column can be sorted in ascending order', function () {
      let column = Table.headers.failed
      Table.sortColumnAsc(column)
      Table.verifyColumnIsSortedCorrectly(column)
    })
    it('Failed column can be sorted in descending order', function () {
      let column = Table.headers.failed
      Table.sortColumnDesc(column)
      Table.verifyColumnIsSortedCorrectly(column, Table.sortOrder.descending)
    })
  })
})
