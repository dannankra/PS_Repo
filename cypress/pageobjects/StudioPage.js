import Page from './Page'
/// <reference types="cypress" />

class StudioPage extends Page {
    constructor () {
        super()
        this.name = 'Studio'
        // this.title = 'SnapLogic'
        this.url = '/sl/studio.html'
        this.iconCss = '.sl-header .sl-product-iip'
        this.titleCss = '.title'
        this.headerCss = '.sl-page-header'
        this.failedCardCss = '[title="failed"]'
        this.completedCardCss = '[title="completed"]'
        this.executingCardCss = '[title="executing"]'
        this.completedWithErrorsCss = '[title="completed-with-errors"]'
        this.loginButtonCss = '.loginButton__primary'
        this.runInfoStatisticsCss = '.runinfo-statistics .runinfo-statistics-item'
        this.runInfoStatsHeaderCss = '.settings-header span',
        this.detailsFlyoutCss = '[aria-label="close execution details flyout"]'

        this.designMenuItemCss = '.sl-menu .design-icon'
        this.analizeExecutionMenuItemCss = '[aria-label="analyze executions"][href$="executions"]'

        this.errorDetailsTitleCss = '.runinfo-error-details-title'

        let cardsCss = {
            title: '.title',
            icon: 'span.icon',
            number: '.number',
            statusicon: '[class*="-icon"]'
        }
        let statuses = {
            failed: 'failed',
            executing: 'executing',
            completed: 'completed',
            ultra: 'ultra',
            completedwitherrors: 'completed with errors'
        }
    }
  
    get title () { return cy.get(this.titleCss) }
    get failedCard () { return cy.get(this.failedCardCss) }
    get executingCard () { return cy.get(this.executingCardCss) }
    get completedCard () { return cy.get(this.completedCardCss) }
    get completedWithErrorsCard () { return cy.get(this.completedWithErrorsCss) }
    get runInfoStatistics () { return cy.get(this.runInfoStatisticsCss) }
    get runInfoStatsHeader () { return cy.get(this.runInfoStatsHeaderCss) }
    get detailsFlyout () { return cy.get(this.detailsFlyoutCss) }

    // get designMenuItemCss () { return cy.get(this.designMenuItemCss) }

    get errorDetailsTitle () { return cy.get(this.errorDetailsTitleCss) }

    goToExecutionOverview () {
        cy.get(this.designMenuItemCss).should('be.visible').click()
        cy.get(this.analizeExecutionMenuItemCss).should('be.visible').click()
        cy.get(this.headerCss).contains('.title', 'Execution overview')
    }
    getPipeline (name) {
        return cy.get(`[title*="pipeline ${name}"]` )
    }
    getFailedCardsObjs () {
        return this.getCardsObjs(this.failedCard)
    }
    getExecutingCardsObjs () {
        return this.getCardsObjs(this.executingCard)
    }
    getCompletedCardsObjs () {
        return this.getCardsObjs(this.completedCard)
    }
    getCompletedWithErrorsCardsObjs () {
        return this.getCardsObjs(this.completedWithErrorsCard)
    }
    getCardsObjs (obj) {
        return {
            title: obj.find(cardsCss.title),
            icon: obj.find(cardsCss.icon),
            number: obj.find(cardsCss.number),
            statusicon: obj.find(cardsCss.statusicon),
        }
    }
    clickExecutingPipeline(name) {
        this.executingCard.click()
        this.getPipeline(name).click()
    }
    clickFailedPipeline(name) {
        this.failedCard.click()
        this.getPipeline(name).click()
    }
    clickCompletedPipeline(name) {
        // this.completedCard.click()
        this.getPipeline(name).click()
    }
    clickCompletedWithErrorsPipeline(name) {
        this.completedWithErrorsCard.click()
        this.getPipeline(name).click()
    }
    closeDetailsFlyout(name) {
        this.detailsFlyout.click()
    }
    verifyRunInfoSatistics(payload) {
        this.runInfoStatsHeader
        .should('be.visible')
        cy.wait(500)
        this.runInfoStatistics.should('have.length', 9)
        this.runInfoStatistics.find('.name').as('Names')
        this.runInfoStatistics.find('.value').as('Values')
        Object.entries(payload).forEach((entry) => {
            const [name, value] = entry;
            cy.get('@Names').should('include.text', name)
            cy.get('@Values').should('include.text', value)
            cy.log(`${name}: ${value}`);
        });
    }
}

export default new StudioPage()
