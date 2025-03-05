describe('Login Form', () => {
    beforeEach(() => {
        cy.visit('https://mariage-en-main.com/');
    });

    it('should open the login form and match the URL "/login"', () => {
        cy.openLoginForm();
        cy.url().should('include', '/login');
    });

    it('should close the login form', () => {
        cy.openLoginForm();
        cy.get('.auth-modal-close > button').click();
        cy.contains('Se connecter').should('not.exist');
    });
});