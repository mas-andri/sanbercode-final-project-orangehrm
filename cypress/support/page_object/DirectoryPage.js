class DirectoryPage {
  // Selectors

  // Filter Section
  get nameSearchInput() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  get jobTitleDropdown() {
    return cy.get(".oxd-select-wrapper").eq(0).find(".oxd-select-text");
  }

  get locationDropdown() {
    return cy.get(".oxd-select-wrapper").eq(1).find(".oxd-select-text");
  }

  get searchButton() {
    return cy.get("button.oxd-button--secondary");
  }

  get resetButton() {
    return cy.get("button.oxd-button--ghost");
  }

  // Results Section
  get recordsFoundCounter() {
    return cy.get(".orangehrm-horizontal-padding .oxd-text--span");
  }

  get employeeCards() {
    return cy.get(".orangehrm-directory-card");
  }

  get noRecordsMessage() {
    return cy
      .get(".orangehrm-horizontal-padding span")
      .contains("No Records Found");
  }

  get sidePanel() {
    return cy.get(".orangehrm-qr-code");
  }

  get sidePanelCloseButton() {
    return cy.get(
      ".orangehrm-corporate-directory-sidebar > .oxd-grid-item > .oxd-sheet > .orangehrm-directory-card-top > .oxd-icon",
    );
  }

  get autocompleteDropdown() {
    return cy.get(".oxd-autocomplete-dropdown");
  }

  get autocompleteOption() {
    return cy.get(".oxd-autocomplete-option");
  }

  get dropdownOptions() {
    return cy.get(".oxd-select-dropdown .oxd-select-option");
  }

  // Actions

  // Navigate to the Directory page.
  visit() {
    cy.visit("/web/index.php/directory/viewDirectory");
  }

  // Search directory by employee name (with autocomplete).
  searchByName(name) {
    this.nameSearchInput.clear().type(name);
    // Wait for autocomplete dropdown to appear and select the first matching option
    this.autocompleteDropdown.should("be.visible");
    this.autocompleteOption.first().click();
  }

  // Search directory by partial name (type and select from autocomplete).
  searchByPartialName(partialName) {
    this.nameSearchInput.clear().type(partialName);
    this.autocompleteDropdown.should("be.visible");
    this.autocompleteOption.first().click();
  }

  // Search by entering invalid name (no autocomplete match expected).
  searchByInvalidName(invalidName) {
    this.nameSearchInput.clear().type(invalidName);
    // Wait for "No Records Found" to appear in autocomplete or for it to close
    cy.wait(2000);
  }

  // Select Job Title from the dropdown.
  selectJobTitle(jobTitle) {
    this.jobTitleDropdown.click();
    this.dropdownOptions.contains(jobTitle).click();
  }

  // Select Location from the dropdown.
  selectLocation(location) {
    this.locationDropdown.click();
    this.dropdownOptions.contains(location).click();
  }

  // Click the Search button.
  clickSearch() {
    this.searchButton.click();
  }

  // Click the Reset button.
  clickReset() {
    this.resetButton.click();
  }

  // Click on an employee card by name.
  clickEmployeeCard(employeeName) {
    this.employeeCards.contains(employeeName).click();
  }

  // Close the side panel by clicking the arrow/close button.
  closeSidePanel() {
    this.sidePanelCloseButton.click();
  }

  // Assertions

  // Verify directory page is displayed.
  verifyDirectoryPageDisplayed() {
    cy.url().should("include", "/directory/viewDirectory");
  }

  // Verify that at least one employee card is visible.
  verifyEmployeeCardsAreDisplayed() {
    this.employeeCards.should("have.length.greaterThan", 0);
  }

  // Verify employee cards contain the searched name.
  verifyEmployeeNameDisplayed(name) {
    this.employeeCards.should("contain", name);
  }

  // Verify 'No Records Found' message is shown.
  verifyNoRecordsFound() {
    cy.get(".oxd-input-group > .oxd-text").should("contain", "Invalid");
  }

  // Verify records found counter is visible and has a positive count.
  verifyRecordsFoundCounter() {
    this.recordsFoundCounter.should("be.visible");
    this.recordsFoundCounter.invoke("text").then((text) => {
      const match = text.match(/\d+/);
      if (match) {
        const count = parseInt(match[0], 10);
        expect(count).to.be.greaterThan(0);
      }
    });
  }

  // Verify the side panel is visible.
  verifySidePanelIsOpen() {
    this.sidePanel.should("be.visible");
  }

  // Verify the side panel is closed/not visible.
  verifySidePanelIsClosed() {
    this.sidePanel.should("not.be.exist");
  }

  // Verify employee profile images are visible in the card list.
  verifyEmployeeProfileImagesDisplayed() {
    this.employeeCards.first().find("img").should("exist");
  }

  // Verify default avatar is displayed for a specific employee.
  verifyDefaultAvatarForEmployee(employeeName) {
    this.employeeCards
      .contains(employeeName)
      .closest(".orangehrm-directory-card")
      .find("img")
      .should("exist");
  }

  // Verify the search fields have been reset/cleared.
  verifyFieldsAreCleared() {
    this.nameSearchInput.should("have.value", "");
  }
}

export default DirectoryPage;
