@directory
Feature: Directory Functionality

  Background:
    Given the user is logged in as "Admin" with password "admin123"
    And the directory API is intercepted

  # SCN-DIR-001: Verify Directory Filter Functionality

  @positive @high @DIR-001-TC-039
  Scenario: DIR-001-TC-039 - Search directory by Name
    Given the user is on the Directory page
    When the user enters name "Sheldon James Plankton" in the search field
    And the user clicks the Search button
    Then the correct employee "Sheldon James Plankton" should be displayed

  @positive @medium @DIR-001-TC-040
  Scenario: DIR-001-TC-040 - Search directory by partial Name
    Given the user is on the Directory page
    When the user enters partial name "Pla" in the search field
    And the user clicks the Search button
    Then employees matching the partial name should be displayed

  @positive @medium @DIR-001-TC-041
  Scenario: DIR-001-TC-041 - Search directory by job title
    Given the user is on the Directory page
    When the user selects job title "QA Engineer"
    And the user clicks the Search button
    Then employees with the selected job title should be displayed

  @positive @medium @DIR-001-TC-042
  Scenario: DIR-001-TC-042 - Search directory by location
    Given the user is on the Directory page
    When the user selects location "New York Sales Office"
    And the user clicks the Search button
    Then employees in the selected location should be displayed

  @positive @low @DIR-001-TC-043
  Scenario: DIR-001-TC-043 - Verify reset button
    Given the user is on the Directory page
    When the user enters partial name "Pet" in the search field
    And the user selects job title "Chief Financial Officer"
    And the user selects location "New York Sales Office"
    And the user clicks the Reset button
    Then the search fields should be cleared
    And all employees should be displayed

  @positive @low @DIR-001-TC-044
  Scenario: DIR-001-TC-044 - Search with empty field
    Given the user is on the Directory page
    When the user clicks the Search button
    Then all employees should be displayed

  @negative @low @DIR-001-TC-045
  Scenario: DIR-001-TC-045 - Search directory with invalid name
    Given the user is on the Directory page
    When the user enters invalid name "InvalidName123" in the search field
    And the user clicks the Search button
    Then a "Invalid" message should be displayed


  # SCN-DIR-002: Verify Directory Record List

  @positive @low @DIR-002-TC-046
  Scenario: DIR-002-TC-046 - View employee profile picture in directory record list
    Given the user is on the Directory page
    When the user views the employee cards
    Then employee profile pictures should be displayed correctly

  @positive @low @DIR-002-TC-047
  Scenario: DIR-002-TC-047 - Verify the Records Found counter matches the actual grid results
    Given the user is on the Directory page
    When the user observes the total count
    Then the Records Found counter should reflect the total number of employee records

  @positive @low @DIR-002-TC-048
  Scenario: DIR-002-TC-048 - Verify default avatar for employees without profile picture
    Given the user is on the Directory page
    When the user locates employee "Ranga Akunuri"
    Then a default avatar placeholder should be displayed

  @positive @low @DIR-002-TC-049
  Scenario: DIR-002-TC-049 - Verify clicking employee card expands right-side detail panel
    Given the user is on the Directory page
    When the user selects job title "QA Engineer"
    And the user clicks the Search button
    When the user clicks on the employee card for "Sheldon James Plankton"
    Then the right-side detail panel should be displayed

  @positive @low @DIR-002-TC-050
  Scenario: DIR-002-TC-050 - Verify the side panel can be collapsed
    Given the user is on the Directory page
    When the user selects job title "QA Engineer"
    And the user clicks the Search button
    When the user clicks on the employee card for "Sheldon James Plankton"
    And the right-side detail panel should be displayed
    When the user clicks the close button on the side panel
    Then the side panel should be collapsed
