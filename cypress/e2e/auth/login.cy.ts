describe('Login Form', () => {
    const baseURL = "https://mariage-en-main.com";
    let userEmail;
    let userPwd;

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

    it('should allow user to login with valid credentials (QASM-TC-14)', () => {
        // cy.intercept({
        //     method: "POST",
        //     path: "/api/auth/adminLogin",
        //     query: {
        //       email: process.env.USER_EMAIL || '',
        //       password: process.env.USER_PWD || '',
        //       signal: "{}"
        //     }
        //   }).as("loginRequest");

        cy.openLoginForm();
        cy.url().should('eq', `${baseURL}/login`);

        userEmail = Cypress.env('userEmail');
        userPwd = Cypress.env('userPwd');

        const emailInput = cy.get('.auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #email');
        const pwdInput = cy.get('.auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #password');
        const button = cy.get('.auth-modal > .login-page > .login-grid > .grid-item-2 > .login > .login__form > form > :nth-child(3) > .MuiButtonBase-root').contains('Se connecter');

        emailInput.invoke("val", "");
        pwdInput.invoke("val", "");

        emailInput.type(userEmail);
        pwdInput.type(userPwd);
        button.click();

        cy.url().should("include", "/tableau-de-bord");


        // cy.wait("@loginRequest").then(() => {
        //     cy.url().should("include", "/tableau-de-bord");
        // });
    });
});