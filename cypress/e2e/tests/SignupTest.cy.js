//<reference types="cypress"/>
import SignupPage from "../../pages/SignupPage";
import SignupTestData from "../../fixtures/testdata/SignupTestData.json";
import Signup from "../../fixtures/elements/Signup.json";
import util from "../../pages/util"
const utilPage = new util();

describe("Sign-up Process", () =>{
    beforeEach(() => {
        cy.visit("/");
    });
    it("Signup-Redirection", () =>{
        //cy.visit("https://app-qa.adlaunch.io/");
        cy.get(Signup.SignupClick).click({ multiple: true });
        cy.url().should('include','/signup');
        cy.get(Signup.AccountSetuptxt).should("be.visible").contains(SignupTestData.Accountsetuptxt);
        const emailToUse = utilPage.generateSimpleEmail("logiciel.io");
        cy.get(Signup.Emailaddress)
        .type(emailToUse)
        .should("be.visible")
        .and("have.value", emailToUse);

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

        
        const Business_Name = utilPage.generateRandomName(2,50);
        cy.get(Signup.BusinessName)
        .type(Business_Name)
        .should("be.visible")
        .and("have.value", Business_Name);
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