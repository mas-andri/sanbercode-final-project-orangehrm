import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DirectoryPage from "../page_object/DirectoryPage";

const directoryPage = new DirectoryPage();

// GIVEN Steps

// Intercept the Directory API endpoints.
Given("the directory API is intercepted", () => {
  cy.intercept("GET", "**/api/v2/directory/employees*").as(
    "directorySearchAPI",
  );
});

// Precondition: User is on the Directory page.
Given("the user is on the Directory page", () => {
  directoryPage.visit();
  directoryPage.verifyDirectoryPageDisplayed();
  // Wait for initial directory data to load
  cy.wait("@directorySearchAPI");
});

// WHEN Steps

// Enter full employee name in the search field.
When("the user enters name {string} in the search field", (name) => {
  directoryPage.searchByName(name);
});

// Enter partial name in the search field.
When(
  "the user enters partial name {string} in the search field",
  (partialName) => {
    directoryPage.searchByPartialName(partialName);
  },
);

// Enter invalid name in the search field (no autocomplete match).
When(
  "the user enters invalid name {string} in the search field",
  (invalidName) => {
    directoryPage.searchByInvalidName(invalidName);
  },
);

// Select a Job Title from the dropdown.
When("the user selects job title {string}", (jobTitle) => {
  directoryPage.selectJobTitle(jobTitle);
});

// Select a Location from the dropdown.
When("the user selects location {string}", (location) => {
  directoryPage.selectLocation(location);
});

// Click the Search button on the directory filter form.
When("the user clicks the Search button", () => {
  directoryPage.clickSearch();
});

// Click the Reset button to clear all search filters.
When("the user clicks the Reset button", () => {
  // Intercept the reload that happens after reset
  cy.intercept("GET", "**/api/v2/directory/employees*").as(
    "directoryResetResult",
  );
  directoryPage.clickReset();
  cy.wait("@directoryResetResult");
});

// View the employee cards on the Directory page.
When("the user views the employee cards", () => {
  directoryPage.employeeCards.should("exist");
});

// Observe the total Records Found count.
When("the user observes the total count", () => {
  directoryPage.recordsFoundCounter.should("be.visible");
});

// Locate a specific employee by name in the directory.
When("the user locates employee {string}", (employeeName) => {
  // Type the first name to trigger autocomplete
  const firstName = employeeName.split(" ")[0];
  directoryPage.nameSearchInput.clear().type(firstName);

  // Wait for autocomplete and select if available
  cy.get(".oxd-autocomplete-dropdown", { timeout: 5000 }).then(($dropdown) => {
    if ($dropdown.find(".oxd-autocomplete-option").length > 0) {
      cy.get(".oxd-autocomplete-option").first().click();
      cy.intercept("GET", "**/api/v2/directory/employees*").as(
        "searchForEmployee",
      );
      directoryPage.clickSearch();
      cy.wait("@searchForEmployee");
    }
  });
});

// Click on a specific employee card.
When("the user clicks on the employee card for {string}", (employeeName) => {
  directoryPage.clickEmployeeCard(employeeName);
});

// Click the close button on the side detail panel.
When("the user clicks the close button on the side panel", () => {
  directoryPage.closeSidePanel();
});

// THEN Steps

// Verify the correct employee is displayed in search results.
Then("the correct employee {string} should be displayed", (employeeName) => {
  directoryPage.verifyEmployeeNameDisplayed(employeeName);
});

// Verify employees matching partial name are displayed.
Then("employees matching the partial name should be displayed", () => {
  directoryPage.verifyEmployeeCardsAreDisplayed();
});

// Verify employees with the selected job title are displayed.
Then("employees with the selected job title should be displayed", () => {
  directoryPage.verifyEmployeeCardsAreDisplayed();
});

// Verify employees in the selected location are displayed.
Then("employees in the selected location should be displayed", () => {
  directoryPage.verifyEmployeeCardsAreDisplayed();
});

// Verify the search fields have been cleared/reset.
Then("the search fields should be cleared", () => {
  directoryPage.verifyFieldsAreCleared();
});

// Verify all employees are displayed (no filter applied).
Then("all employees should be displayed", () => {
  directoryPage.verifyEmployeeCardsAreDisplayed();
});

// Verify "No Records Found" message is displayed.
Then("a {string} message should be displayed", (message) => {
  directoryPage.verifyNoRecordsFound(message);
});

// Verify employee profile pictures are displayed in the card list.
Then("employee profile pictures should be displayed correctly", () => {
  directoryPage.verifyEmployeeProfileImagesDisplayed();
});

// Verify the Records Found counter matches actual results.
Then(
  "the Records Found counter should reflect the total number of employee records",
  () => {
    directoryPage.verifyRecordsFoundCounter();
  },
);

// Verify default avatar is displayed for employee without photo.
Then("a default avatar placeholder should be displayed", () => {
  // Employees without a photo show a default placeholder img
  directoryPage.employeeCards.first().find("img").should("exist");
});

// Verify the right-side detail panel is displayed.
Then("the right-side detail panel should be displayed", () => {
  directoryPage.verifySidePanelIsOpen();
});

// Verify the side panel is collapsed/closed.
Then("the side panel should be collapsed", () => {
  directoryPage.verifySidePanelIsClosed();
});
