
import Component from "./Component"
/// <reference types="cypress" />
const {_} = Cypress

class Filters extends Component {
    constructor () {
        super()
        this.name = 'Filters'
        this.searchInputCss = '[qa-id="pipeline-table-search-input"]'
        this.projectSearchInputCss = '[qa-id$="filters-project-search-input"]'
        this.filterBtnCss = '.sl-searchbar-filter-button'
        this.filterDropdownCss = '.sl-searchbar-filters'
        this.applyFilterBtnCss = '[data-analytics$="filter apply"]'
        this.itemsPerPageDropdownCss = '.perpage-dropdown'

        this.advanceSearchOptionsCss = {
            snaplexFilterCss: '[aria-label*="snaplex filter"]',
            nodeFilterCss: '[aria-label*="node filter"]',
            executedByCss: '[aria-label*="executed by filter"]'
        }
        this.itemsPerPage = {
            ten: 10,
            twentyfive: 25,
            fifty: 50,
            hundred: 100
        }
    }
    get searchInput () { return cy.get(this.searchInputCss) }
    get filterBtn () { return cy.get(this.filterBtnCss) }
    // get filterDropdown () { return cy.get(this.filterDropdownCss) }
    get itemsPerPageDropdown () { return cy.get(this.itemsPerPageDropdownCss) }

    search (term) {
        this.searchInput.click().clear().type(`${term}{enter}`)
    }

    enterDateRange (dateRange = 'Mar 28, 2022 12:00 AM - Apr 30, 2022 12:00 AM' ) {
        cy.get('div.slui-duration-picker').click()
        cy.get('.slui-duration-picker-dropdown')
        .should('be.visible')
        cy.get('[qa-id="analyze-execution-date-range-selector-item-calender"]').click()
        cy.get('input.slui-duration-picker-date-input').type(dateRange, { parseSpecialCharSequences: true })
    }

    selectItemsPerPage (itemsPerPage = '10' ) {
        this.itemsPerPageDropdown.should('be.visible').click()
        cy.get('.slui-dropdown-list')
        .should('be.visible')
        cy.get(`[aria-label="show ${itemsPerPage} per page"] > .label`).click()
    }
    
    isColumnSorted (columnName) {
        cy.get(this.tableHeadersCss).contains(columnName).parent().find('span').then(($span) => {
            cy.wrap($span.hasClass('slui-table__chevron')).as('IsColumnSorted')
        })
    }
    verifyColumnIsSortedCorrectly (columnName, order='ASC') {
        this.getColumnData(columnName).then(data => {
            // cy.log('ColumnDAta:::::', _.sortBy(data))
            const columnData = data.slice(0, 5)
            const sorted = _.sortBy(columnData)
            if (order.toUpperCase() === this.sortOrder.ascending) {
                expect(columnData).to.deep.eq(sorted)
            } else {
                expect(columnData).to.deep.eq(_.reverse(sorted)) 
            }        
        })
    }
    expandAdvanceFilter () {
        this.filterDropdown.then(($dropdown) => {
            if($dropdown.length === 0) {
                this.filterBtn.click()
            }
        })
    }

    clearAdvanceFilter () {
       cy.get('button.clear').contains('Clear All').click()
    }
    clickFilterBtn () {
        this.filterBtn.should('be.visible').click()
    }
    setProjectSearch (term) {
        cy.get('[aria-label$="projects filter"]').should('be.visible').click()
        cy.get('.project-dropdown-list').should('be.visible')
        cy.get(this.projectSearchInputCss).type(term)
    }
    advanceSearch(payload) {
        this.clickFilterBtn()
        // search project
        this.setProjectSearch(payload.project)
        this.selectProjectSearchSuggestions()
        cy.get(this.applyFilterBtnCss).click()
        // cy.get('[aria-label$="projects filter"]').click() // close the project dropdown
    }
    getProjectSearchSuggessions () {
        return cy.get(`.project-dropdown-list [title]`) 
           .then(($els) => {
               return (
                $els.toArray().map(el => el.innerText)
            )
        }) 
    }
    getProjectSearchSuggessionsWithoutShared () {
        return this.getProjectSearchSuggessions().then(suggestions => {
            return suggestions.filter((value, index, arr) => {
                 return value !== "shared"
             })
        }) 
    }
    selectProjectSearchSuggestions () {
        this.getProjectSearchSuggessionsWithoutShared().then(suggestions => {
            suggestions.forEach(suggestion => {
                cy.get(`.project-dropdown-list [title]`).contains(suggestion).click()
            })
        })
    }
    selectFirstProjectSearchedSuggestion () {
        this.getFirstSuggestion().then(suggestion => {
            cy.get(`.project-dropdown-list [title="${suggestion}"]`).click()
        })
    }
    getFirstSuggestion () {
        return this.getProjectSearchSuggessionsWithoutShared().then(suggestions => {
            return suggestions[0]
        })  
    }
    verifyFirstProjectSearchedSugestionIsSelected () {
        this.getFirstSuggestion().then(suggestion => {
            cy.get(`.project-dropdown-list [title="${suggestion}"]`).should('have.class', 'selected')
            cy.get(`.project-dropdown-list [title="${suggestion}"]`).find('.delete-icon').should('be.visible')
        })
    }
    selectProjectSearchSuggestion (suggestion) {
        cy.get(`.project-dropdown-list [title]`).contains(suggestion).click()
    }
    verifyProjectSuggectionsAreCorrect(term) {
        this.getProjectSearchSuggessionsWithoutShared().then(suggestions => {
            suggestions.forEach(suggestion => {
                expect(suggestion).to.contain(term)
            })
        })
    }
}
export default new Filters()