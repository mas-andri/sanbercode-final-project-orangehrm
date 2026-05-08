import { Given } from "@badeball/cypress-cucumber-preprocessor";

// This step is shared by Dashboard and Directory features (Background step).
Given(
  "the user is logged in as {string} with password {string}",
  (username, password) => {
    cy.login(username, password);
  },
);
