/// <reference types="Cypress" />
import MainPage from '../../../../support/pageObjects/MainPage'
import { Given,When,Then, And } from "cypress-cucumber-preprocessor/steps";

const mainPage = new MainPage()

Given('I open Web Page', () => {
    cy.visit(Cypress.env('project'))
})

When('I mark special filters', () => {
    mainPage.getDresses().click()
    cy.get('.block_content > .tree > .last > a').click()
    cy.get('#layered_id_attribute_group_1').check().should('be.checked')
    cy.get('#selectProductSort').select('In stock').should('have.value', 'quantity:desc')
})

When('I add items to Cart', () => {
    mainPage.getMainBlock().should('have.length', 3)
    mainPage.getMainBlock().find('.right-block').eq(2).contains('Add to cart').click({force:true})
    cy.get('h2').should('contain.text', 'Product successfully added to your shopping cart').get('a[title="Proceed to checkout"]').click()
})

When('Validate the price', () => {
    cy.get('.cart_quantity_input').invoke('val').then(quanity => {
        const productPrice = 16.40
        const totalPrice = quanity * productPrice
        cy.get('#total_product').should('contain.text', totalPrice)
    })
    mainPage.getProceedCart().click()
})

And('Sign in and submit order', function() {
    cy.get('#email').type(this.data.email)
    cy.get('#passwd').type(this.data.password)
    cy.get('#SubmitLogin > span').click()
    mainPage.getProceedCart().click()
    cy.get('#cgv').check().should('be.checked')
    mainPage.getProceedCart().click()
    cy.get('.cheque').click()
    mainPage.getProceedCart().click()
})

Then('Check and verify order status', () => {
    cy.get('.alert').should('contain.text', 'Your order on My Store is complete.')
})



