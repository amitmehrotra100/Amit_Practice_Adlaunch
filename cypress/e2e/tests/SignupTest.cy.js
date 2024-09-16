//<reference types="cypress"/>
import SignupPage from "../../pages/SignupPage";
import SignupTestData from "../../fixtures/testdata/SignupTestData.json";
import Signup from "../../fixtures/elements/Signup.json";
const SPage = new SignupPage();

describe("Sign-up Process", () =>{

    it("Signup-Redirection", () =>{
        cy.visit("https://app-qa.adlaunch.io/");
        SPage.Signup.click();
        cy.url().should('include','/signup');
        cy.get(Signup.AccountSetuptxt).should("be.visible").contains(SignupTestData.Accountsetuptxt);
        cy.get(Signup.Emailaddress)
       .type(SignupTestData.Email)
       .should('have.value',SignupTestData.Email);

        cy.get(Signup.Selectplan).click()
        .get(Signup.AgencyPlan).click()

        cy.get(Signup.TermAndConditioncheckbox).click();
        cy.screenshot("Signup/SS01/full-page");
        cy.get(Signup.paybutton).click();
        
        cy.IframeContent(Signup.iframeTxt)
            .find(Signup.cardNumberTxt)
            .type(SignupTestData.cardNumber)
            .should("have.value", SignupTestData.cardNumber);
        cy.IframeContent(Signup.iframeTxt)
            .find(Signup.expiryDate)
            .type(SignupTestData.expiryDate)
            .should("have.value", SignupTestData.expiryDate);
        cy.IframeContent(Signup.iframeTxt)
            .find(Signup.cvc)
            .type(SignupTestData.cvcNumber)
            .should("have.value", SignupTestData.cvcNumber);
        cy.IframeContent(Signup.iframeTxt)
            .find(Signup.cardNameTxt)
            .type(SignupTestData.cardHolderName)
            .should("have.value", SignupTestData.cardHolderName);
            cy.IframeContent(Signup.iframeTxt)
            .find(Signup.payButton).click();
            cy.screenshot("Signup/SS02/full-page");
            cy.location("pathname", { timeout: 10000 }).should('include', "/onboarding");
            cy.screenshot("Signup/SS03/full-page");

        cy.get(Signup.FirstName).should('be.visible').type(SignupTestData.FirstName);
        cy.get(Signup.LastName).type(SignupTestData.LastName);
        cy.get(Signup.PhoneNumber).type(SignupTestData.PhoneNumnber);
        cy.screenshot("Signup/SS04/full-page");
        cy.get(Signup.Button).click();
        cy.get(Signup.BusinessProfileTxt).should('have.text', SignupTestData.BusinessProfileTxt);
        cy.screenshot("Signup/SS05/full-page");

        cy.get(Signup.BusinessName).type(SignupTestData.BusinessName);
        cy.get(Signup.NicheList).click();
        cy.get(Signup.NicheData).type(SignupTestData.NicheData);
        
        cy.get(Signup.StreetAddress).type(`${SignupTestData.StreetAddressData}{enter}`).should('be.visible').get(Signup.StrreetAddressDropdown).first().click();
        cy.screenshot("Signup/SS06/full-page");
        cy.get(Signup.BusinessProfileContinueButton).should("be.visible").click();
        cy.get(Signup.ConnectYourAssettxt).should('have.text', SignupTestData.ConnectAssettxt);
        cy.get(Signup.SkipAndContinue).click();
        cy.url().should('include','/agency/dashboard');
        cy.screenshot("Signup/SS07/full-page");



      
        
    })


})