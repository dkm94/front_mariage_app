describe('Register form', () => {
    beforeEach(() => {
        cy.visit('https://mariage-en-main.com/');
    });
    
    it('should open the registration form and match the URL "/register" (QASM-TC-7)', () => {
        cy.openRegisterForm();
        cy.url().should('include', '/register');
    });
    
    // it('should submit the form with valid data', () => {    
    //     cy.get('[data-test=register-form]').within(() => {
    //         cy.get('[data-test=email]').type('test@example.com');
    //         cy.get('[data-test=password]').type('password123');
    //         cy.get('[data-test=confirm-password]').type('password123');
    //     });
    //     cy.get('[data-test=register-button]').click();
    //     cy.contains('Votre compte a bien été créé. Vous pouvez vous connecter maintenant.');
    // });
});