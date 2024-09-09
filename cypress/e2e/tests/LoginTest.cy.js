/// <reference types="cypress"/>
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";
//const lPage = new LoginPage();
describe("My Test Name", () => {
  beforeEach(() => {
    cy.userLogin(loginTestData.email, loginTestData.password);
  });
  it("loginTest", { tags: "@smoke" }, () => {
    //
    //
    /* Basic login and interaction with the web element */
    // cy.visit("/");
    // LoginPage.email
    //   .type(loginTestData.email)
    //   .should("have.value", loginTestData.email);
    // LoginPage.password
    //   .type(loginTestData.password)
    //   .should("have.value", loginTestData.password);
    // cy.screenshot();
    // LoginPage.submit.click();
    //
    //
    /*to confirm that you are on the page before start interacting with the page element,*/
    cy.visit("/agency/dashboard");
    cy.location("pathname").should("eq", "/agency/dashboard");
    cy.screenshot();
  });
});
