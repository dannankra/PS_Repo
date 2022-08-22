import Page from './Page'
/// <reference types="cypress" />

class DesignerPage extends Page {
    constructor () {
        super()
        this.name = 'Designer'
        this.title = ''
        this.url = '/designer'

        this.designerTabCss = '#slc-header-tab-Designer'
    }

    get designerTab () { return cy.get(this.designerTabCss) }

    verifyDesignerTabIsActive () {
        this.designerTab.should('have.class', 'slc-header-title-active')
    }
}

export default new DesignerPage()
