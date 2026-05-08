@forgotPassword
Feature: Forgot Password Functionality

  # SCN-FP-001: Verify Forgot Password (Positive & Negative)

  @positive @low @FP-001-TC-015
  Scenario: FP-001-TC-015 - Verify UI elements on Forgot Password page
    Given the user is on the OrangeHRM login page
    When the user clicks on "Forgot your password?" link
    Then the Forgot Password page should be displayed with the correct UI elements

  @positive @medium @FP-001-TC-016
  Scenario: FP-001-TC-016 - Reset password with valid username
    Given the user is on the Forgot Password page
    And the reset password API is intercepted
    When the user enters username "blessy" in the forgot password form
    And the user clicks the Reset Password button
    Then a success message should be displayed

  @positive @low @FP-001-TC-017
  Scenario: FP-001-TC-017 - Cancel password reset
    Given the user is on the Forgot Password page
    When the user clicks the Cancel button
    Then the user should be redirected to the login page

  @negative @medium @FP-001-TC-018
  Scenario: FP-001-TC-018 - Reset password with invalid username
    Given the user is on the Forgot Password page
    And the reset password API is intercepted
    When the user enters username "InvalidUser" in the forgot password form
    And the user clicks the Reset Password button
    Then a reset failed message should be displayed

  @negative @medium @FP-001-TC-019
  Scenario: FP-001-TC-019 - Reset password with empty username
    Given the user is on the Forgot Password page
    When the user clicks the Reset Password button
    Then the "Required" validation error should be displayed on forgot password page

  @negative @low @FP-001-TC-020
  Scenario: FP-001-TC-020 - Reset password with leading/trailing spaces
    Given the user is on the Forgot Password page
    And the reset password API is intercepted
    When the user enters username "  Admin  " in the forgot password form
    And the user clicks the Reset Password button
    Then a reset failed message should be displayed
