describe('Login Form', () => {
    beforeEach(() => {
        cy.visit('https://mariage-en-main.com/');
    });

    it('should open the login form', () => {
        cy.openLoginForm();
        cy.contains('Se connecter').should('be.visible');
    });

    it('should close the login form', () => {
        cy.openLoginForm();
        cy.get('.auth-modal-close > button').click();
        cy.contains('Se connecter').should('not.exist');
    });
});