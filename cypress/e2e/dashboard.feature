@dashboard
Feature: Dashboard Widgets

  Background:
    Given the user is logged in as "Admin" with password "admin123"
    And the dashboard API is intercepted

  # SCN-DASH-001: Verify Dashboard Widget Time at Work

  @positive @medium @DASH-001-TC-021
  Scenario: DASH-001-TC-021 - Verify UI elements time at work widget
    Given the user is on the Dashboard
    When the user views the Time at Work widget
    Then the Time at Work widget should display Punch In or Out time

  @positive @low @DASH-001-TC-022
  Scenario: DASH-001-TC-022 - Verify time button redirect to Time Page
    Given the user is on the Dashboard
    When the user clicks the time button on the Time at Work widget
    Then the user should be redirected to the Time page


  # SCN-DASH-002: Verify Dashboard Widget Quick Launch

  @positive @low @DASH-002-TC-023
  Scenario: DASH-002-TC-023 - Verify assign leave button
    Given the user is on the Dashboard
    When the user clicks the Assign Leave button in Quick Launch
    Then the user should be redirected to the Assign Leave page

  @positive @low @DASH-002-TC-024
  Scenario: DASH-002-TC-024 - Verify leave list button
    Given the user is on the Dashboard
    When the user clicks the Leave List button in Quick Launch
    Then the user should be redirected to the Leave List page

  @positive @low @DASH-002-TC-025
  Scenario: DASH-002-TC-025 - Verify timesheet button
    Given the user is on the Dashboard
    When the user clicks the Timesheets button in Quick Launch
    Then the user should be redirected to the Timesheet page

  @positive @low @DASH-002-TC-026
  Scenario: DASH-002-TC-026 - Verify apply leave button
    Given the user is on the Dashboard
    When the user clicks the Apply Leave button in Quick Launch
    Then the user should be redirected to the Apply Leave page

  @positive @low @DASH-002-TC-027
  Scenario: DASH-002-TC-027 - Verify my leave button
    Given the user is on the Dashboard
    When the user clicks the My Leave button in Quick Launch
    Then the user should be redirected to the My Leave page

  @positive @low @DASH-002-TC-028
  Scenario: DASH-002-TC-028 - Verify my timesheet button
    Given the user is on the Dashboard
    When the user clicks the My Timesheet button in Quick Launch
    Then the user should be redirected to the My Timesheet page


  # SCN-DASH-003: Verify Dashboard Widget Buzz Latest Post

  @positive @low @DASH-003-TC-029
  Scenario: DASH-003-TC-029 - Verify the widget show latest post list
    Given the user is on the Dashboard
    When the user views the Buzz Latest Posts widget
    Then the widget should show the latest post list

  @positive @low @DASH-003-TC-030
  Scenario: DASH-003-TC-030 - Verify User Redirection to Buzz Page via Username
    Given the user is on the Dashboard
    And the buzz API is intercepted
    When the user clicks on a buzz latest post username
    Then the user should be redirected to the Buzz page


  # SCN-DASH-004: Verify Dashboard Widget Employees on Leave Today

  @positive @low @DASH-004-TC-031
  Scenario: DASH-004-TC-031 - Verify UI elements employee on leave today widget
    Given the user is on the Dashboard
    When the user views the Employees on Leave Today widget
    Then the widget should display employee leave information or a message

  @positive @medium @DASH-004-TC-032
  Scenario: DASH-004-TC-032 - Verify configuration button on leave today widget
    Given the user is on the Dashboard
    And the leave config API is intercepted
    When the user clicks the configuration button on the Employees on Leave Today widget
    Then the Configuration settings should be visible


  # SCN-DASH-005: Verify Dashboard Widget Employee Distribution by Sub Unit

  @positive @medium @DASH-005-TC-033
  Scenario: DASH-005-TC-033 - Verify Employee Distribution by Sub Unit widget
    Given the user is on the Dashboard
    When the user views the Employee Distribution by Sub Unit widget
    Then a pie chart showing employee distribution by sub unit should be displayed

  @positive @low @DASH-005-TC-034
  Scenario: DASH-005-TC-034 - Verify tooltips on Employee Distribution by Sub Unit widget
    Given the user is on the Dashboard
    When the user hovers over the Sub Unit distribution pie chart
    Then a tooltip with sub unit details should be visible

  @negative @low @DASH-005-TC-035
  Scenario: DASH-005-TC-035 - Verify Employee Distribution by Sub Unit widget with no data
    Given the user is on the Dashboard
    And the sub unit distribution API is intercepted with empty data
    When the user views the Employee Distribution by Sub Unit widget
    Then the widget should display "No Records Found" or be empty


  # SCN-DASH-006: Verify Dashboard Widget Employee Distribution by Location

  @positive @medium @DASH-006-TC-036
  Scenario: DASH-006-TC-036 - Verify Employee Distribution by Location widget
    Given the user is on the Dashboard
    When the user views the Employee Distribution by Location widget
    Then a pie chart showing employee distribution by location should be displayed

  @positive @low @DASH-006-TC-037
  Scenario: DASH-006-TC-037 - Verify tooltips on Employee Distribution by Location widget
    Given the user is on the Dashboard
    When the user hovers over the Location distribution pie chart
    Then a tooltip with location details should be visible

  @negative @low @DASH-006-TC-038
  Scenario: DASH-006-TC-038 - Verify Employee Distribution by Location widget with no data
    Given the user is on the Dashboard
    And the location distribution API is intercepted with empty data
    When the user views the Employee Distribution by Location widget
    Then the widget should display "No Records Found" or be empty
