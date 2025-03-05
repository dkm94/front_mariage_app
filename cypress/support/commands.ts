// / <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.

// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


// // -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })


// // -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })


// // -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('openLoginForm', () => {
  const connexionBtn = cy.get('.navbar-menu'); // add id to button
  connexionBtn.should('be.visible').click();
  cy.contains('Se connecter').should('be.visible');
});

Cypress.Commands.add('openRegisterForm', () => {
  const createAccountBtn = cy.get('#signup-box-form > button');
  createAccountBtn.should('be.visible').click();
});
declare global {
  namespace Cypress {
    interface Chainable {
    //   login(email: string, password: string): Chainable<void>
    //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      openLoginForm(): Chainable<void>
      openRegisterForm(): Chainable<void>
    }
  }
}

export {};