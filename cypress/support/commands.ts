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

// Use as precondition
Cypress.Commands.add('loginViaAPI', (email, password, options = {}) => {
  // Successful login option
  const { expectStatus = 200 } = options;

  // Login request from API
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/api/auth/adminLogin`,
    body: {
      email,
      password,
    },
  }).then((response) => {
    expect(response.status).to.eq(expectStatus);
    // Check if the response body contains the token
    expect(response.body).to.have.property("token");
    localStorage.setItem("token", response.body.token);
  });

  // Check the redirection to the dashboard page
  cy.url().should("include", "/tableau-de-bord");

  // Check if the page content is correctly loaded
  cy.get(".titles > h2")
    .contains("Que souhaitez-vous faire aujourd'hui ?")
    .should("be.visible");

  // Check if the user is logged in with the top menu display
  cy.get(".navbar-menu").contains("Paramètres").should("be.visible");
  cy.get(".navbar-menu").contains("Déconnexion").should("be.visible");
});

// For UX tests (login.cy.ts)
Cypress.Commands.add("loginViaUI", (email?: string, password?: string) => {

  // email and password inputs
  const emailInput = cy.get(
    ".auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #email"
  );
  const passwordInput = cy.get(
    ".auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #password"
  );

  // Form validation button
  const button = cy
    .get(
      ".auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(3) > .MuiButtonBase-root"
    )
    .contains("Se connecter");

  // Passing unknown credentials
  if (email && password) {
    // Empty both inputs
    emailInput.invoke("val", "");
    passwordInput.invoke("val", "");

    // Type the credentials
    emailInput.type(email);
    passwordInput.type(password);
  }

  button.click();
});

Cypress.Commands.add("logout", () => {
  const logoutButton = cy.get('.slideDown-8 > button[type="submit"]').contains('Déconnexion'); 
  logoutButton.click();
});
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
  cy.contains('Inscrivez-vous').should('be.visible');
});


declare global {
  namespace Cypress {
    interface Chainable {
      loginViaAPI(email: string, password: string, options: any): Chainable<Element>
      loginViaUI(email?: string, password?: string): Chainable<void>
      logout(): Chainable<void>
    //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      openLoginForm(): Chainable<void>
      openRegisterForm(): Chainable<void>
      // loginWithEnv(): Chainable<void>
    }
  }
}

export {};