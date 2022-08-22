
import Component from "./Component"
/// <reference types="cypress" />
const {_} = Cypress
import dayjs from "dayjs"

class Table extends Component {
    constructor () {
        super()
        this.name = 'Table'
        this.groupByTabsCss = '.div.analyze-execution-tab'
        this.pipelineSwitchCss = '[aria-label *="pipeline switch"]'
        this.taskSwitchCss = '[aria-label *="task switch"]'

        this.tableHeadersCss = 'th.sl-analyze-execution-table-header-cell'
        this.dataRowsCss = '[data-analytics*="table row"]'
        this.pipelineNamesCss = '.slui-copyable-text span[class]'

        this.noResultsCss = '.sl-analyze-execution-table-no-result'
        this.footerCss = '.sl-analyze-execution-table-footer'

        this.paginationCss = '.slui-tablePages'

        this.headers = {
            pipelinename: 'Pipeline name',
            completed: 'Completed',
            executing: 'Executing',
            failed: 'Failed'
        }
        this.noResultsText = 'No results found'
        this.paginationCtrs = {
            prev: 'PREV',
            next: 'NEXT'
        }
    }
    get tableHeaders () { return cy.get(this.tableHeadersCss) }
    get dataRows () { return cy.get(this.dataRowsCss) }
    get pipelineSwitch () { return cy.get(this.pipelineSwitchCss) }
    get noResults () { return cy.get(this.noResultsCss) }
    get footer () { return cy.get(this.footerCss) }
    get pagination () { return cy.get(this.paginationCss) }

    enablePipelineSwitch () {
       this.pipelineSwitch.then(($switch) => {
           if(!$switch.is('enabled')) {
            cy.wrap($switch).click()
           }
       })
    }
    enterDateRange (dateRange = 'Mar 28, 2022 12:00 AM - Apr 30, 2022 12:00 AM' ) {
        cy.get('div.slui-duration-picker').click()
        cy.get('.slui-duration-picker-dropdown')
        .should('be.visible')
        cy.get('[qa-id="analyze-execution-date-range-selector-item-calender"]').click()
        cy.get('input.slui-duration-picker-date-input').type(dateRange, { parseSpecialCharSequences: true })
    }

    selectItemsPerPage (itemsPerPage = '10' ) {
        cy.get('.perpage-dropdown').click()
        cy.get('.slui-dropdown-list')
        .should('be.visible')
        cy.get(`[aria-label="show ${itemsPerPage} per page"] > .label`).click()
        // cy.get('.slui-dropdown-list-item .label').contains(itemsPerPage).click()
    }

    getColumnData (columnName) {
        return cy.get(this.tableHeadersCss)
        .then(($els) => {
           const headers = Array.from($els, el => el.innerText)
           const index = headers.indexOf(columnName)
           cy.get(`td:nth-child(${index + 1})`) 
           .then(($els) => {
               return (
                $els.toArray().map(el => el.innerText)
               )
            })
        })
    }

    clickTableHeader (header) {
        cy.get(this.tableHeadersCss).contains(header).click()
    }
    
    isColumnSorted (columnName) {
        cy.get(this.tableHeadersCss).contains(columnName).parent().find('span').then(($span) => {
            cy.wrap($span.hasClass('slui-table__chevron')).as('IsColumnSorted')
        })
    }
    sortColumnDesc (columnName) {
        cy.get(this.tableHeadersCss).contains(columnName).parent().find('span').then(($span) => {
            if(!$span.hasClass('slui-table__arrowSortClass--desc')) {
             cy.wrap($span).click()
             cy.wait(500)
             this.sortColumnDesc(columnName)
            }
        })
    }
    sortColumnAsc (columnName) {
        cy.get(this.tableHeadersCss).contains(columnName).parent().find('span').then(($span) => {
            if($span.hasClass('slui-table__arrowSortClass--desc') || $span.hasClass('slui-table__chevron')) {
             cy.wrap($span).click()
             cy.wait(500)
             this.sortColumnAsc(columnName)
            }
        })
    } 
    getTableHeaders () {
         cy.get(this.tableHeadersCss)
        .then(($els) => {
           const headers = Array.from($els, el => el.innerText)
           cy.wrap(headers).as('TableHeaders')
        })
    }
    clickNextButton () {
        this.clickPaginationButton('.pagination-icon-forward')
    }
    clickPreviousButton () {
        this.clickPaginationButton('.pagination-icon-back')
    }
    clickPaginationButton (css) {
        this.pagination.find(css).then(($btn) => {
            if(!$btn.is(':disabled')) {
                cy.wrap($btn).click()
            } else {
                return cy.log(`The element ${css} is disabled and cannot be interracted with.`)
            }
        })
    }
    selectedPageNumber () {
        return this.pagination.find('.page-number[aria-label*="selected"]')
    }
    getDisplayedPageNumbers () {
        return this.pagination.find('.page-number').then(($els) => {
            return (
               $els.toArray().map(el => el.innerText)
            )
        })
    }
    clickPageNumber(num) {
        this.pagination.find('.page-number').contains(num).should('be.visible').click()
    }

    verifyColumnIsSortedCorrectly (columnName, order='ASC') {
        this.getColumnData(columnName).then(data => {
            cy.log('ColumnDAta:::::', _.sortBy(data))
            const columnData = data.slice(0, 5)
            const sorted = _.sortBy(columnData)
            if (order.toUpperCase() === this.sortOrder.ascending) {
                expect(columnData).to.deep.eq(sorted)
            } else {
                expect(columnData).to.deep.eq(_.reverse(sorted)) 
            }        
        })
    }
    verifyTableHasNoResults () {
        this.noResults.should('be.visible')
        this.noResults.should('contain.text', this.noResultsText)
    }
    verifyTableShowsItem (item) {
       cy.get('td').should('contain.text', item)
    }
    verifyTableHasData () {
        this.dataRows.should('be.visible').and($els => {
            expect($els.length).to.be.greaterThan(0)
        })
     }
    verifyFooterDateFormat () {
        this.footer.then(($els) => {
            const displayedDate = $els.text().split('Show')[0]
            const formated = dayjs(displayedDate).format('[Last Updated] MMM DD, YYYY hh:mm:ss A1')
            expect(displayedDate).to.equal(formated)
        })
     }
     verifyPageGoesToCorrectPage (direction) {
        this.selectedPageNumber().then($els => {
            const selectedPage = parseInt($els.text())
            if (direction.toUpperCase() === this.paginationCtrs.next) {
                this.clickNextButton()
                this.verifySelectedPage(selectedPage + 1)
            } else if (direction.toUpperCase() === this.paginationCtrs.prev) {
                this.clickPreviousButton()
                this.verifySelectedPage(selectedPage - 1)
            } else {
                this.verifySelectedPage(selectedPage)
            }
        })    
     }
     verifySelectedPage (pageNumber) {
        this.selectedPageNumber().should('have.text', pageNumber) 
     }

     verifyTableHasCorrectDataRows (rows) {
        this.dataRows.should('have.length', rows)
     }
     getActiveCaladarDays () {
        // .react-datepicker-right
     }
}
export default new Table()