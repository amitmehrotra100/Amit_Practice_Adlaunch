//<reference types="cypress"/>
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";
import SignupTestData from "../../fixtures/testdata/SignupTestData.json";
import Signup from "../../fixtures/elements/Signup.json";
import AdassistTestData from "../../fixtures/testdata/AdassistTestData.json";
import Adassist from "../../fixtures/elements/Adassist.json";
import util from "../../pages/util"

describe("Adassist Sign-up Process", () => {
    // beforeEach(() => {
    //     //cy.visit("/login");
    //     cy.userLogin(loginTestData.email, loginTestData.password);
    // })
    // //     it("loginTest", { tags: "@smoke" }, () => {

    // //         /*to confirm that you are on the page before start interacting with the page element,*/
    // //         //cy.visit("/agency/dashboard");
    // //         cy.location("pathname").should("eq", "/agency/dashboard");

    // // })
    // it("White-Label user link copy", () => {
    //     // Grant clipboard permissions
    //     cy.wrap(Cypress.automation('remote:debugger:protocol', {
    //         command: 'Browser.grantPermissions',
    //         params: {
    //             permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
    //             origin: window.location.origin,
    //         },
    //     }));

    //     // Check the current pathname
    //     cy.location("pathname").should("eq", "/agency/dashboard");

    //     // Click on Account Settings and verify visibility
    //     cy.get(Adassist.AccountSetting).click().should("be.visible");

    //     // Click on Profile button and verify the pathname
    //     cy.contains('button', 'Profile').click();
    //     cy.location("pathname").should("eq", "/agency/my-account");

    //     // Ensure the text is visible and contains the expected messag

    //     // Click the copy button
    //     cy.get("#__next > div > div.__className_9eb1a5.min-h-screen.bg-gray-1 > section.px-4.py-12 > div > div > div.flex.flex-col > div:nth-child(2) > div > div:nth-child(3) > button").click();

    //     // Ensure the document is focused before accessing the clipboard
    //     cy.window().then((win) => {
    //         win.focus(); // Make sure the window is focused

    //         // Read clipboard text
    //         return win.navigator.clipboard.readText();
    //     }).then((clipboardText) => {
    //         // Log the clipboard text for debugging
    //         console.log(clipboardText);

    //         // Assert that the copied text matches the expected text
    //         // expect(clipboardText).to.eq('White Label Client Signup copied!');
    //     });
    // });
    it("White-Label user Sign-up process", () => {
    cy.visit("https://app-qa.adassist.wiki/c3bb95d20b52870a6662554e7310732381");
    cy.get(Adassist.Adassistlogintxt).should("be.visible").and("have.text",AdassistTestData.Adassistlogintxt);
    cy.get(Adassist.AdassistSignuplink).eq(1).click();
    cy.url().should('include','/c3bb95d20b52870a6662554e7310732381/signup');
    cy.get(Adassist.Adassistsignupstep1).should("be.visible").and("have.text",AdassistTestData.Adassistsignupstep1txt);
    cy.get(Adassist.FirstName).should('be.visible').type(AdassistTestData.FirstName);
        cy.get(Adassist.LastName).type(AdassistTestData.LastName);
        cy.get(Adassist.PhoneNumber).type(AdassistTestData.PhoneNumnber);
        cy.screenshot("Signup/SS04/full-page");
        cy.get(Adassist.Button).click();
        cy.get(Adassist.BusinessProfileTxt).should('have.text', AdassistTestData.BusinessProfileTxt);
        cy.screenshot("Signup/SS05/full-page");
    })

});
