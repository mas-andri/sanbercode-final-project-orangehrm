@login
Feature: Login Functionality

  # SCN-LOG-001: Verify Login Functionality

  @positive @high @LOG-001-TC-001
  Scenario: LOG-001-TC-001 - Login with valid credentials
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "admin123"
    And the user clicks the Login button
    Then the user should be redirected to the dashboard

  @positive @medium @LOG-001-TC-002
  Scenario: LOG-001-TC-002 - Verify session persists after refresh
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "admin123"
    And the user clicks the Login button
    Then the user should be redirected to the dashboard
    When the user refreshes the page
    Then the user session should remain active on the dashboard

  @positive @medium @LOG-001-TC-003
  Scenario: LOG-001-TC-003 - Verify Dashboard redirect on browser back post-login
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "admin123"
    And the user clicks the Login button
    Then the user should be redirected to the dashboard
    When the user navigates back in the browser
    And the user refreshes the page
    Then the user should remain logged in

  @positive @high @LOG-001-TC-004
  Scenario: LOG-001-TC-004 - Verify successful logout after login
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    And the logout API is intercepted
    When the user enters username "Admin" and password "admin123"
    And the user clicks the Login button
    Then the user should be redirected to the dashboard
    When the user clicks on the user dropdown
    And the user clicks on Logout
    Then the user should be redirected to the login page


  # SCN-LOG-002: Verify Login Security


  @positive @medium @LOG-002-TC-005
  Scenario: LOG-002-TC-005 - Verify password field masks entered characters
    Given the user is on the OrangeHRM login page
    When the user enters password "admin123"
    Then the password field should be of type "password"

  @negative @high @LOG-002-TC-006
  Scenario: LOG-002-TC-006 - Login with invalid username
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "dasvday" and password "admin123"
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @high @LOG-002-TC-007
  Scenario: LOG-002-TC-007 - Login with invalid password
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "dyydqwdh2"
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @high @LOG-002-TC-008
  Scenario: LOG-002-TC-008 - Login with blank username and password
    Given the user is on the OrangeHRM login page
    When the user clicks the Login button
    Then the "Required" validation message should be displayed

  @negative @high @LOG-002-TC-009
  Scenario: LOG-002-TC-009 - Unauthorized access to dashboard is blocked
    Given the user is not logged in
    When the user directly accesses the dashboard URL
    Then the user should be redirected to the login page

  @negative @medium @LOG-002-TC-010
  Scenario: LOG-002-TC-010 - Case sensitivity Username in UPPERCASE
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "ADMIN" and password "admin123"
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @high @LOG-002-TC-011
  Scenario: LOG-002-TC-011 - Case sensitivity Password in UPPERCASE
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "ADMIN123"
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @medium @LOG-002-TC-012
  Scenario: LOG-002-TC-012 - Leading/Trailing spaces in Username
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "  Admin  " and password "admin123"
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @high @LOG-002-TC-013
  Scenario: LOG-002-TC-013 - Leading/Trailing spaces in Password
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user enters username "Admin" and password "  admin123  "
    And the user clicks the Login button
    Then an "Invalid credentials" error message should be displayed

  @negative @high @LOG-002-TC-014
  Scenario: LOG-002-TC-014 - Brute Force: 5+ failed attempts
    Given the user is on the OrangeHRM login page
    And the login API is intercepted
    When the user attempts login 5 times with username "Admin" and invalid password
    Then the system should apply brute-force protection
