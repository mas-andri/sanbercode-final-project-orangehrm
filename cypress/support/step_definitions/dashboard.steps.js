import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DashboardPage from "../page_object/DashboardPage";

const dashboardPage = new DashboardPage();

// GIVEN Steps

// Intercept the Dashboard API endpoints.
Given("the dashboard API is intercepted", () => {
  // Intercept the employee count/data endpoints used by dashboard widgets
  cy.intercept("GET", "**/api/v2/dashboard/employees/time-at-work*").as(
    "timeAtWorkAPI",
  );
  cy.intercept("GET", "**/api/v2/dashboard/employees/action-summary*").as(
    "actionSummaryAPI",
  );
  cy.intercept("GET", "**/api/v2/dashboard/shortcuts*").as("shortcutsAPI");
  cy.intercept("GET", "**/api/v2/dashboard/employees/subunit*").as(
    "subUnitDistributionAPI",
  );
  cy.intercept("GET", "**/api/v2/dashboard/employees/locations*").as(
    "locationDistributionAPI",
  );
  cy.intercept("GET", "**/api/v2/dashboard/employees/leaves*").as(
    "employeesOnLeaveAPI",
  );
  cy.intercept("GET", "**/api/v2/buzz/feed*").as("buzzFeedAPI");
});

// Navigates and waits for dashboard widgets to load.
Given("the user is on the Dashboard", () => {
  dashboardPage.visit();
  // Wait for dashboard grid to be visible (widgets loaded)
  dashboardPage.dashboardGrid.should("be.visible");
});

// Intercept the Buzz API for monitoring redirection.
Given("the buzz API is intercepted", () => {
  cy.intercept("GET", "**/api/v2/buzz/feed*").as("buzzPageAPI");
});

// Intercept the Leave Configuration API.
Given("the leave config API is intercepted", () => {
  cy.intercept("GET", "**/api/v2/leave/leave-period*").as("leaveConfigAPI");
});

// Intercept the Sub Unit Distribution API with EMPTY data.
Given("the sub unit distribution API is intercepted with empty data", () => {
  cy.intercept("GET", "**/api/v2/dashboard/employees/subunit*", {
    statusCode: 200,
    body: {
      data: [],
      meta: { total: 0 },
    },
  }).as("emptySubUnitAPI");
});

// Intercept the Location Distribution API with EMPTY data.
Given("the location distribution API is intercepted with empty data", () => {
  cy.intercept("GET", "**/api/v2/dashboard/employees/locations*", {
    statusCode: 200,
    body: {
      data: [],
      meta: { total: 0 },
    },
  }).as("emptyLocationAPI");
});

// WHEN Steps

// Time at Work Widget

When("the user views the Time at Work widget", () => {
  dashboardPage.timeAtWorkWidgetTitle.scrollIntoView();
});

When("the user clicks the time button on the Time at Work widget", () => {
  dashboardPage.clickTimeButton();
});

// Quick Launch Widget (SCN-DASH-002)
When("the user clicks the Assign Leave button in Quick Launch", () => {
  dashboardPage.clickAssignLeave();
});

When("the user clicks the Leave List button in Quick Launch", () => {
  dashboardPage.clickLeaveList();
});

When("the user clicks the Timesheets button in Quick Launch", () => {
  dashboardPage.clickTimesheet();
});

When("the user clicks the Apply Leave button in Quick Launch", () => {
  dashboardPage.clickApplyLeave();
});

When("the user clicks the My Leave button in Quick Launch", () => {
  dashboardPage.clickMyLeave();
});

When("the user clicks the My Timesheet button in Quick Launch", () => {
  dashboardPage.clickMyTimesheet();
});

// Buzz Latest Post Widget (SCN-DASH-003)
When("the user views the Buzz Latest Posts widget", () => {
  dashboardPage.buzzLatestPostWidget.scrollIntoView();
});

When("the user clicks on a buzz latest post username", () => {
  dashboardPage.buzzLatestPostWidget.scrollIntoView();
  // Buzz usernames are <p> tags on the dashboard widget, not <a> links
  dashboardPage.buzzPostUsername.click({ force: true });
});

// Employees on Leave Today Widget (SCN-DASH-004)
When("the user views the Employees on Leave Today widget", () => {
  dashboardPage.employeesOnLeaveTodayWidget.scrollIntoView();
});

When(
  "the user clicks the configuration button on the Employees on Leave Today widget",
  () => {
    dashboardPage.employeesOnLeaveTodayWidget.scrollIntoView();
    dashboardPage.clickLeaveTodayConfigButton();
  },
);

// Employee Distribution by Sub Unit Widget
When("the user views the Employee Distribution by Sub Unit widget", () => {
  dashboardPage.employeeDistributionSubUnitWidget.scrollIntoView();
});

When("the user hovers over the Sub Unit distribution pie chart", () => {
  dashboardPage.employeeDistributionSubUnitWidget.scrollIntoView();
  dashboardPage.subUnitPieChart.then(($canvas) => {
    // Trigger mousemove at the center of the canvas to activate Chart.js tooltip
    const rect = $canvas[0].getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    cy.wrap($canvas).trigger("mousemove", centerX, centerY, { force: true });
  });
});

// Employee Distribution by Location Widget

When("the user views the Employee Distribution by Location widget", () => {
  dashboardPage.employeeDistributionLocationWidget.scrollIntoView();
});

When("the user hovers over the Location distribution pie chart", () => {
  dashboardPage.employeeDistributionLocationWidget.scrollIntoView();
  dashboardPage.locationPieChart.then(($canvas) => {
    const rect = $canvas[0].getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    cy.wrap($canvas).trigger("mousemove", centerX, centerY, { force: true });
  });
});

// THEN Steps

// Time at Work Widget
Then("the Time at Work widget should display Punch In or Out time", () => {
  // Verify the widget title is visible first
  dashboardPage.timeAtWorkWidgetTitle.should("be.visible");
  // Verify the widget container is visible
  dashboardPage.timeAtWorkWidget.should("be.visible");
  // Verify the punch in/out display is visible
  dashboardPage.punchInOutDisplay.should("be.visible");
});

Then("the user should be redirected to the Time page", () => {
  cy.url().should("include", "/attendance");
});

// Quick Launch Widget
Then("the user should be redirected to the Assign Leave page", () => {
  cy.url().should("include", "/leave/assignLeave");
});

Then("the user should be redirected to the Leave List page", () => {
  cy.url().should("include", "/leave/viewLeaveList");
});

Then("the user should be redirected to the Timesheet page", () => {
  cy.url().should("include", "/time/viewEmployeeTimesheet");
});

Then("the user should be redirected to the Apply Leave page", () => {
  cy.url().should("include", "/leave/applyLeave");
});

Then("the user should be redirected to the My Leave page", () => {
  cy.url().should("include", "/leave/viewMyLeaveList");
});

Then("the user should be redirected to the My Timesheet page", () => {
  cy.url().should("include", "/time/viewMyTimesheet");
});

// Buzz Latest Post Widget
Then("the widget should show the latest post list", () => {
  dashboardPage.verifyBuzzLatestPostWidgetDisplayed();
  dashboardPage.buzzPostList.should("be.visible");
});

Then("the user should be redirected to the Buzz page", () => {
  cy.url().should("include", "/buzz");
});

// Employees on Leave Today Widget
Then(
  "the widget should display employee leave information or a message",
  () => {
    dashboardPage.verifyEmployeesOnLeaveTodayWidgetDisplayed();
  },
);

Then("the Configuration settings should be visible", () => {
  // After clicking config, user is redirected to Leave Settings page
  cy.get(".oxd-label").should("be.visible");
});

// Employee Distribution by Sub Unit Widget
Then(
  "a pie chart showing employee distribution by sub unit should be displayed",
  () => {
    dashboardPage.verifySubUnitDistributionWidgetDisplayed();
  },
);

Then("a tooltip with sub unit details should be visible", () => {
  dashboardPage.subUnitPieChart.should("be.visible");
});

Then("the widget should display {string} or be empty", (message) => {
  dashboardPage.employeeDistributionSubUnitWidget.should("be.visible");
});

// Employee Distribution by Location Widget
Then(
  "a pie chart showing employee distribution by location should be displayed",
  () => {
    dashboardPage.verifyLocationDistributionWidgetDisplayed();
  },
);

Then("a tooltip with location details should be visible", () => {
  dashboardPage.locationPieChart.should("be.visible");
});
