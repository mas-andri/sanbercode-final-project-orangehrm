class DashboardPage {
  // Selectors

  get dashboardGrid() {
    return cy.get(".orangehrm-dashboard-grid");
  }

  get userDropdown() {
    return cy.get(".oxd-userdropdown");
  }

  get logoutLink() {
    return (cy.wait(2000), cy.get('a[href="/web/index.php/auth/logout"]'));
  }

  // Selects the Time at Work widget card by finding the header text
  get timeAtWorkWidget() {
    return cy
      .contains(".orangehrm-dashboard-widget-header p", "Time at Work")
      .closest(".orangehrm-dashboard-widget");
  }

  get timeAtWorkWidgetTitle() {
    return cy.contains(".orangehrm-dashboard-widget-header p", "Time at Work");
  }

  get punchInOutDisplay() {
    return this.timeAtWorkWidget.find(".orangehrm-attendance-card");
  }

  // Quick Launch uses button elements with title attributes.
  get quickLaunchWidget() {
    return cy
      .contains(".orangehrm-dashboard-widget-header p", "Quick Launch")
      .closest(".orangehrm-dashboard-widget");
  }

  get assignLeaveButton() {
    return this.quickLaunchWidget.find('button[title="Assign Leave"]');
  }

  get leaveListButton() {
    return this.quickLaunchWidget.find('button[title="Leave List"]');
  }

  get timesheetButton() {
    return this.quickLaunchWidget.find('button[title="Timesheets"]');
  }

  get applyLeaveButton() {
    return this.quickLaunchWidget.find('button[title="Apply Leave"]');
  }

  get myLeaveButton() {
    return this.quickLaunchWidget.find('button[title="My Leave"]');
  }

  get myTimesheetButton() {
    return this.quickLaunchWidget.find('button[title="My Timesheet"]');
  }

  // Buzz Latest Post Widget
  get buzzLatestPostWidget() {
    return cy
      .contains(".orangehrm-dashboard-widget-header p", "Buzz Latest Posts")
      .closest(".orangehrm-dashboard-widget");
  }

  get buzzPostList() {
    return this.buzzLatestPostWidget.find(".orangehrm-buzz-widget-body");
  }

  get buzzPostUsername() {
    return this.buzzLatestPostWidget
      .find(".orangehrm-buzz-widget-header")
      .first();
  }

  // Employees on Leave Today Widget
  get employeesOnLeaveTodayWidget() {
    return cy
      .contains(
        ".orangehrm-dashboard-widget-header p",
        "Employees on Leave Today",
      )
      .closest(".orangehrm-dashboard-widget");
  }

  get leaveTodayConfigButton() {
    return this.employeesOnLeaveTodayWidget.find("i.bi-gear-fill");
  }

  // Employee Distribution by Sub Unit Widget
  get employeeDistributionSubUnitWidget() {
    return cy
      .contains(
        ".orangehrm-dashboard-widget-header p",
        "Employee Distribution by Sub Unit",
      )
      .closest(".orangehrm-dashboard-widget");
  }

  get subUnitPieChart() {
    return this.employeeDistributionSubUnitWidget.find("canvas");
  }

  // Employee Distribution by Location Widget
  get employeeDistributionLocationWidget() {
    return cy
      .contains(
        ".orangehrm-dashboard-widget-header p",
        "Employee Distribution by Location",
      )
      .closest(".orangehrm-dashboard-widget");
  }

  get locationPieChart() {
    return this.employeeDistributionLocationWidget.find("canvas");
  }

  // Actions

  //  Navigate to the Dashboard page.
  visit() {
    cy.visit("/web/index.php/dashboard/index");
  }

  // Click the user dropdown to reveal the logout option.
  openUserDropdown() {
    this.userDropdown.click();
  }

  // Click the Logout link.
  clickLogout() {
    this.openUserDropdown();
    this.logoutLink.click();
  }

  // Click the time button inside Time at Work widget.
  clickTimeButton() {
    this.timeAtWorkWidget
      .find("button.orangehrm-attendance-card-action")
      .click({ force: true });
  }

  // Click Quick Launch buttons.
  clickAssignLeave() {
    this.assignLeaveButton.click();
  }

  clickLeaveList() {
    this.leaveListButton.click();
  }

  clickTimesheet() {
    this.timesheetButton.click();
  }

  clickApplyLeave() {
    this.applyLeaveButton.click();
  }

  clickMyLeave() {
    this.myLeaveButton.click();
  }

  clickMyTimesheet() {
    this.myTimesheetButton.click();
  }

  // Click on a buzz post username.
  clickBuzzPostUsername() {
    this.buzzPostUsername.click({ force: true });
  }

  // Click the configuration (gear) button on the Leave Today widget.
  clickLeaveTodayConfigButton() {
    this.leaveTodayConfigButton.click({ force: true });
  }

  // Assertions

  // Verify Dashboard page is loaded.
  verifyDashboardIsDisplayed() {
    cy.url().should("include", "/dashboard");
    this.dashboardGrid.should("be.visible");
  }

  // Verify Time at Work widget is displayed with relevant content.
  verifyTimeAtWorkWidgetDisplayed() {
    this.timeAtWorkWidgetTitle.should("be.visible");
  }

  // Verify Quick Launch widget buttons are visible.
  verifyQuickLaunchWidgetDisplayed() {
    this.quickLaunchWidget.should("be.visible");
  }

  // Verify Buzz Latest Posts widget is displayed.
  verifyBuzzLatestPostWidgetDisplayed() {
    this.buzzLatestPostWidget.should("be.visible");
  }

  // Verify Employees on Leave Today widget.
  verifyEmployeesOnLeaveTodayWidgetDisplayed() {
    this.employeesOnLeaveTodayWidget.should("be.visible");
  }

  // Verify Employee Distribution by Sub Unit widget.
  verifySubUnitDistributionWidgetDisplayed() {
    this.employeeDistributionSubUnitWidget.should("be.visible");
    this.subUnitPieChart.should("be.visible");
  }

  // Verify Employee Distribution by Location widget.
  verifyLocationDistributionWidgetDisplayed() {
    this.employeeDistributionLocationWidget.should("be.visible");
    this.locationPieChart.should("be.visible");
  }

  // Verify redirection to specific pages after clicking quick launch.
  verifyRedirectedToAssignLeavePage() {
    cy.url().should("include", "/leave/assignLeave");
  }

  verifyRedirectedToLeaveListPage() {
    cy.url().should("include", "/leave/viewLeaveList");
  }

  verifyRedirectedToTimesheetPage() {
    cy.url().should("include", "/time/viewEmployeeTimesheet");
  }

  verifyRedirectedToApplyLeavePage() {
    cy.url().should("include", "/leave/applyLeave");
  }

  verifyRedirectedToMyLeavePage() {
    cy.url().should("include", "/leave/viewMyLeaveList");
  }

  verifyRedirectedToMyTimesheetPage() {
    cy.url().should("include", "/time/viewMyTimesheet");
  }

  verifyRedirectedToTimePage() {
    cy.url().should("include", "/time");
  }

  verifyRedirectedToBuzzPage() {
    cy.url().should("include", "/buzz");
  }
}

export default DashboardPage;
