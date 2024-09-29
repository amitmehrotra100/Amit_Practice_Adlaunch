//<reference types="cypress"/>
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";
import SignupTestData from "../../fixtures/testdata/SignupTestData.json";
import Signup from "../../fixtures/elements/Signup.json";
import AdassistTestData from "../../fixtures/testdata/AdassistTestData.json";
import Adassist from "../../fixtures/elements/Adassist.json";
import util from "../../pages/util"
const utilPage = new util();

describe("Adassist Sign-up Process", () => {
    it("White-Label user Sign-up process", () => {
    cy.visit("https://app-qa.adassist.wiki/c3bb95d20b52870a6662554e7310732381");
    cy.get(Adassist.Adassistlogintxt).should("be.visible").and("have.text",AdassistTestData.Adassistlogintxt);
    cy.get(Adassist.AdassistSignuplink).eq(1).click();
    cy.url().should('include','/c3bb95d20b52870a6662554e7310732381/signup');
    cy.get(Adassist.Adassistsignupstep1).should("be.visible").and("have.text",AdassistTestData.Adassistsignupstep1txt);
    cy.get(Adassist.FirstName).should('be.visible').type(AdassistTestData.FirstName);
        cy.get(Adassist.LastName).type(AdassistTestData.LastName);
        const emailToUse = utilPage.generateSimpleEmail("logiciel.io");
        cy.get(Adassist.EmailAddress).type(emailToUse).should("be.visible").and("have.value", emailToUse);
        cy.get(Adassist.PhoneNumber).type(AdassistTestData.PhoneNumnber);
        cy.screenshot("Signup/SS04/full-page");
        cy.get(Adassist.Button).click();
        cy.get(Adassist.BusinessProfileTxt).should('have.text', AdassistTestData.BusinessProfileTxt);
        cy.screenshot("Signup/SS05/full-page");
        const Business_Name = utilPage.generateRandomName(2,50);
        cy.get(Signup.BusinessName)
        .type(Business_Name)
        .should("be.visible")
        .and("have.value", Business_Name);
        cy.get(Signup.NicheList).as('targetButton')  // Alias the button
        .should('be.visible'); // Ensure it's visible
        cy.get('@targetButton').click({ multiple: true });
        cy.get(Signup.NicheData).type(SignupTestData.NicheData);
        cy.get(Signup.StreetAddress).type(`${SignupTestData.StreetAddressData}{enter}`).should('be.visible').get(Signup.StrreetAddressDropdown).first().click();
    })

});
