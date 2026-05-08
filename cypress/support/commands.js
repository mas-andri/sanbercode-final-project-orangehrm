// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***********************************************************
// cypress/support/commands.js
// Custom Cypress commands for reusable actions across tests.
// ***********************************************************

// Performs login via the OrangeHRM login page.
// Session caching to speed up tests.
Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.visit("/web/index.php/auth/login");
      cy.get('input[name="username"]').clear().type(username);
      cy.get('input[name="password"]').clear().type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should("include", "/dashboard");
    },
    {
      validate() {
        cy.visit("/web/index.php/dashboard/index");
        cy.url().should("include", "/dashboard");
      },
    },
  );
});

// Performs login without session caching - for testing login flow itself.
Cypress.Commands.add("loginViaUI", (username, password) => {
  cy.visit("/web/index.php/auth/login");
  if (username) {
    cy.get('input[name="username"]').clear().type(username);
  }
  if (password) {
    cy.get('input[name="password"]').clear().type(password);
  }
  cy.get('button[type="submit"]').click();
});

//  Waits for the OrangeHRM loading spinner to disappear.
Cypress.Commands.add("waitForSpinner", () => {
  cy.get(".oxd-loading-spinner-container", { timeout: 500 }).should(
    "not.exist",
  );
});
