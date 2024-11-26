/// <reference types="cypress"/>
import loginTestData from "../../fixtures/testdata/logintestdata.json";
describe("My Test Name", () => {
  beforeEach(() => {
    cy.userLogin(loginTestData.email, loginTestData.password);
  });
  it("loginTest", { tags: "@smoke" }, () => {
    /*to confirm that you are on the page before start interacting with the page element,*/
    cy.visit("/agency/dashboard");
    cy.location("pathname").should("eq", "/agency/dashboard");
    cy.screenshot();
  });
});
