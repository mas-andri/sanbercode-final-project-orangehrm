import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../page_object/LoginPage";
import ForgotPasswordPage from "../page_object/ForgotPasswordPage";

const loginPage = new LoginPage();
const forgotPasswordPage = new ForgotPasswordPage();

// GIVEN Steps
// Navigates to login first, then clicks "Forgot your password?" link.
Given("the user is on the Forgot Password page", () => {
  loginPage.visit();
  loginPage.clickForgotPassword();
  cy.url().should("include", "/requestPasswordResetCode");
});

// Intercept the Reset Password API endpoint.
Given("the reset password API is intercepted", () => {
  cy.intercept("POST", "**/sendPasswordReset").as("resetPasswordRequest");
});

// WHEN Steps

// Click the "Forgot your password?" link on the login page.
When("the user clicks on {string} link", () => {
  loginPage.clickForgotPassword();
});

// Enter username in the Forgot Password form.
When(
  "the user enters username {string} in the forgot password form",
  (username) => {
    forgotPasswordPage.enterUsername(username);
  },
);

// Click the Reset Password button.
When("the user clicks the Reset Password button", () => {
  forgotPasswordPage.clickResetPassword();
});

// Click the Cancel button on Forgot Password page.
When("the user clicks the Cancel button", () => {
  forgotPasswordPage.clickCancel();
});

// THEN Steps

// Verify the Forgot Password page UI elements are displayed.
Then(
  "the Forgot Password page should be displayed with the correct UI elements",
  () => {
    forgotPasswordPage.verifyForgotPasswordPageDisplayed();
  },
);

// Verify the success message after submitting a password reset request.
Then("a success message should be displayed", () => {
  forgotPasswordPage.verifyResetSuccessMessage();
});

Then("a reset failed message should be displayed", () => {
  forgotPasswordPage.verifyResetFailedMessage();
});

// Verify the "Required" validation error on the Forgot Password page.
Then(
  "the {string} validation error should be displayed on forgot password page",
  (validationMessage) => {
    forgotPasswordPage.verifyRequiredFieldError(validationMessage);
  },
);
