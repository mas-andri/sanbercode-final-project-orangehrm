class ForgotPasswordPage {
  // Selectors
  get usernameInput() {
    return cy.get('input[name="username"]');
  }

  get resetPasswordButton() {
    return cy.get('button[type="submit"]');
  }

  get cancelButton() {
    return cy.get('button[type="button"]').contains("Cancel");
  }

  get pageTitle() {
    return cy.get(".orangehrm-forgot-password-title");
  }

  get requiredValidation() {
    return cy.get(".oxd-input-field-error-message");
  }

  get successMessage() {
    return cy.get(".orangehrm-forgot-password-title");
  }

  get forgotPasswordContainer() {
    return cy.get(".orangehrm-forgot-password-container");
  }

  // Actions

  // Navigate directly to the Forgot Password page.
  visit() {
    cy.visit("/web/index.php/auth/requestPasswordResetCode");
  }

  // Enter username into the username field.
  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  // Click the 'Reset Password' button.
  clickResetPassword() {
    this.resetPasswordButton.click();
  }

  // Click the 'Cancel' button.
  clickCancel() {
    this.cancelButton.click();
  }

  // Assertions

  // Verify the Forgot Password page UI elements.
  verifyForgotPasswordPageDisplayed() {
    this.pageTitle.should("be.visible").and("contain", "Reset Password");
    this.usernameInput.should("be.visible");
    this.resetPasswordButton.should("be.visible");
    this.cancelButton.should("be.visible");
  }

  // Verify success message after password reset request.
  verifyResetSuccessMessage() {
    cy.get(".orangehrm-forgot-password-title")
      .should("be.visible")
      .and("contain", "Reset Password link sent successfully");
  }

  verifyResetFailedMessage() {
    cy.get(".orangehrm-forgot-password-title")
      .should("be.visible")
      .and("contain", "Reset password link was not sent");
  }

  // Verify 'Required' validation error is displayed.
  verifyRequiredFieldError() {
    this.requiredValidation.should("be.visible").and("contain", "Required");
  }

  // Verify user is redirected back to the login page.
  verifyRedirectedToLoginPage() {
    cy.url().should("include", "/auth/login");
  }
}

export default ForgotPasswordPage;
