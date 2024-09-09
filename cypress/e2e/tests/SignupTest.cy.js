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
        cy.get('.py-2').should("be.visible");
        cy.get(Signup.Emailaddress)
       .type(SignupTestData.Email)
       .should('have.value',SignupTestData.Email);

        cy.get(Signup.Selectplan).click()
        .get(Signup.AgencyPlan).click()

        cy.get(Signup.TermAndConditioncheckbox).click();
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
            cy.wait(20000);
        cy.url().should('include','/onboarding');

        cy.get(Signup.FirstName).should('be.visible').type(SignupTestData.FirstName);
        cy.get(Signup.LastName).type(SignupTestData.LastName);
        cy.get(Signup.PhoneNumber).type(SignupTestData.PhoneNumnber);
        cy.get(Signup.Button).click();
        cy.get(Signup.BusinessProfileTxt).should('have.text', SignupTestData.BusinessProfileTxt);

        cy.get(Signup.BusinessName).type(SignupTestData.BusinessName);
        cy.get(Signup.NicheList).click();
        cy.get(Signup.NicheData).type(SignupTestData.NicheData);
        
        cy.get(Signup.StreetAddress).type(`${SignupTestData.StreetAddressData}{enter}`).should('be.visible').get(Signup.StrreetAddressDropdown).first().click();
        cy.get(Signup.BusinessProfileContinueButton).should("be.visible").click();
        cy.get(Signup.ConnectYourAssettxt).should('have.text', SignupTestData.ConnectAssettxt);
        cy.get(Signup.SkipAndContinue).click();
        cy.url().should('include','/agency/dashboard');



      
        
    })


})