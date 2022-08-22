/// <reference types="cypress" />

export default class Page {
    visit () {
        cy.visit(this.url)
        cy.get(this.iconCss).should('exist')
    }

    getTitle () {
        return 
    }
}
