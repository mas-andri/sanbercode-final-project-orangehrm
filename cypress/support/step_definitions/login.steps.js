import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../page_object/LoginPage";
import DashboardPage from "../page_object/DashboardPage";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given("the user is on the OrangeHRM login page", () => {
  loginPage.visit();
  loginPage.verifyLoginPageIsDisplayed();
});

// Intercept the login API endpoint.
Given("the login API is intercepted", () => {
  cy.intercept("POST", "**/auth/validate").as("loginRequest");
});

Given("the logout API is intercepted", () => {
  cy.intercept("GET", "**/auth/logout").as("logoutRequest");
});

//  Clear all cookies and session storage to simulate a fresh visit.
Given("the user is not logged in", () => {
  cy.clearCookies();
  cy.clearAllSessionStorage();
  cy.clearAllLocalStorage();
});

When(
  "the user enters username {string} and password {string}",
  (username, password) => {
    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
  },
);

//  Enter only the password field (for masking verification).
When("the user enters password {string}", (password) => {
  loginPage.enterPassword(password);
});

// Click the Login button.
When("the user clicks the Login button", () => {
  loginPage.clickLogin();
});

//  Refresh the current page, to test session persistence.
When("the user refreshes the page", () => {
  cy.reload();
});

//  Navigate back in the browser history.
When("the user navigates back in the browser", () => {
  cy.go(-1);
});

// Click the user dropdown on the top-right of the dashboard.
When("the user clicks on the user dropdown", () => {
  dashboardPage.openUserDropdown();
});

// Click the Logout option from the dropdown.
When("the user clicks on Logout", () => {
  dashboardPage.logoutLink.click();
});

// Used to verify unauthorized access is blocked.
When("the user directly accesses the dashboard URL", () => {
  cy.visit("/web/index.php/dashboard/index", {
    failOnStatusCode: false,
  });
});

// Attempt login multiple times with invalid password to simulate brute force.
When(
  "the user attempts login {int} times with username {string} and invalid password",
  (attempts, username) => {
    for (let i = 0; i < attempts; i++) {
      cy.intercept("POST", "**/auth/validate").as(`loginAttempt${i}`);
      loginPage.visit();
      loginPage.enterUsername(username);
      loginPage.enterPassword(`wrongpassword${i}`);
      loginPage.clickLogin();
      cy.wait(`@loginAttempt${i}`);
    }
  },
);

// Verify user is redirected to the dashboard after successful login.
Then("the user should be redirected to the dashboard", () => {
  cy.wait("@loginRequest").then((interception) => {
    // Verify the login API was called
    expect(interception.response.statusCode).to.eq(302);
  });
  loginPage.verifyRedirectedToDashboard();
});

// Verify session remains active after page refresh.
Then("the user session should remain active on the dashboard", () => {
  cy.url().should("include", "/dashboard");
  dashboardPage.dashboardGrid.should("be.visible");
});

// Verify user remains logged in after navigating back.
Then("the user should remain logged in", () => {
  cy.url().should("not.include", "/auth/login");
  dashboardPage.dashboardGrid.should("be.visible");
});

//  Verify user is redirected to the login page (after logout or unauthorized access).
Then("the user should be redirected to the login page", () => {
  cy.url().should("include", "/auth/login");
  loginPage.verifyLoginPageIsDisplayed();
});

// Verify password field has type="password" for masking.
Then("the password field should be of type {string}", (fieldType) => {
  loginPage.passwordInput.should("have.attr", "type", fieldType);
});

//  Verify the "Invalid credentials" error message is displayed.
Then("an {string} error message should be displayed", (errorMessage) => {
  loginPage.errorMessage.should("be.visible").and("contain", errorMessage);
});

// Verify "Required" validation messages are displayed for blank fields.
Then(
  "the {string} validation message should be displayed",
  (validationMessage) => {
    loginPage.requiredValidation
      .should("be.visible")
      .and("contain", validationMessage);
  },
);

// Verify brute-force protection is applied after multiple failed attempts.
Then("the system should apply brute-force protection", () => {
  loginPage.errorMessage
    .should("be.visible")
    .and("contain", "Account disabled");
});
