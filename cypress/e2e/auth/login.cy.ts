describe('Login Form', () => {
    const baseURL = "https://mariage-en-main.com";
    beforeEach(() => {
        cy.visit(baseURL);
    });

    it('should open the login form and match the URL "/login" (QASM-TC-6)', () => {
        cy.openLoginForm();
        cy.url().should('eq', `${baseURL}/login`);
    });

    it('should close the login form', () => {
        cy.openLoginForm();
        cy.get('.auth-modal-close > button').click();
        cy.contains('Se connecter').should('not.exist');
    });

    it('should match the base URL "/" when the form is closed (QASM-TC-9)', () => {
        cy.openLoginForm();
        cy.get(".auth-modal-close > button").click();
        cy.url().should("eq", `${baseURL}/`);
    });

    it('should switch from register to login form when the bottom link is clicked and match the URL "/login" (QASM-TC-8)', () => { 
        // BEWARE !! This is not a link but a button !
        cy.openRegisterForm();
        cy.url().should('eq', `${baseURL}/register`);

        const loginBtn = cy.get('.register__signup > button').contains('Connectez-vous');
        loginBtn.should('be.visible').click();
        cy.contains('Se connecter').should('be.visible');
        cy.url().should('eq', `${baseURL}/login`);
    });
});