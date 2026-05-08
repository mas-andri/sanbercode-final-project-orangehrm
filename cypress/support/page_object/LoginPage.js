class LoginPage {
  // Selectors
  get usernameInput() {
    return cy.get('input[name="username"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get loginButton() {
    return cy.get('button[type="submit"]');
  }

  get errorMessage() {
    return cy.get(".oxd-alert-content--error", { timeout: 5000 });
  }

  get requiredValidation() {
    return cy.get(".oxd-input-field-error-message");
  }

  get forgotPasswordLink() {
    return cy.get(".orangehrm-login-forgot-header");
  }

  get loginForm() {
    return cy.get(".orangehrm-login-form");
  }

  get logo() {
    return cy.get(".orangehrm-login-branding img");
  }

  // Actions

  // visit orangehrm login page
  visit() {
    cy.visit("/web/index.php/auth/login");
  }

  //  Enter username into the username field.
  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  // Enter password into the password field.
  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  //  Click the Login button.
  clickLogin() {
    this.loginButton.click();
  }

  //  Perform a complete login action.
  login(username, password) {
    if (username) this.enterUsername(username);
    if (password) this.enterPassword(password);
    this.clickLogin();
  }

  // Click the 'Forgot your password?' link.
  clickForgotPassword() {
    this.forgotPasswordLink.click();
  }

  // Assertions

  // Verify the login page is displayed correctly.
  verifyLoginPageIsDisplayed() {
    this.loginForm.should("be.visible");
    this.usernameInput.should("be.visible");
    this.passwordInput.should("be.visible");
    this.loginButton.should("be.visible");
  }

  // Verify 'Invalid credentials' error message is displayed.
  verifyInvalidCredentialsError() {
    this.errorMessage
      .should("be.visible")
      .and("contain", "Invalid credentials");
  }

  // Verify 'Required' field validation messages are shown.
  verifyRequiredFieldErrors() {
    this.requiredValidation.should("be.visible").and("contain", "Required");
  }

  // Verify the password field has type='password' (masked).
  verifyPasswordIsMasked() {
    this.passwordInput.should("have.attr", "type", "password");
  }

  // Verify user is redirected to the dashboard after login.
  verifyRedirectedToDashboard() {
    cy.url().should("include", "/dashboard");
  }

  // Verify user remains on the login page (URL check).
  verifyStillOnLoginPage() {
    cy.url().should("include", "/auth/login");
  }
}

export default LoginPage;
