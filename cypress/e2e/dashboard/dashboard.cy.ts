describe('Dashboard', () => {
    const baseURL = Cypress.config("baseUrl");

    before(() => {
        cy.visit(baseURL || "mariage-en-main.com");
        
        // The login form si already filled with the valid user credentials
        cy.openLoginForm();
        cy.url().should('eq', 'https://mariage-en-main.com/login');

        cy.loginViaAPI();
    });

    it('should have "Voir détails" buttons that redirects to main features', () => {
        

        // cy.get('[data-cy="dashboard-cards"]').within(() => {
        //     cy.get('a').each(($el) => {
        //         const href = $el.prop('href');
        //         cy.wrap($el).should('have.attr', 'href').and('include', href);
        //     });
        // });
    });
});