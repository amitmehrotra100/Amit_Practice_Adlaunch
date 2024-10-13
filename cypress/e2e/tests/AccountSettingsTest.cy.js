import SignupPage from "../../pages/SignupPage";
import SignupTestData from "../../fixtures/testdata/SignupTestData.json";
import Signup from "../../fixtures/elements/Signup.json";
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";
import AccountSettings from "../../fixtures/elements/AccountSettings.json";
import AccountSettingsTestData from "../../fixtures/testdata/AccountSettingsTestData.json";
//const { emailToUse } = require('./SignupTest.cy.js');

describe("Login_Process", () =>{
    beforeEach(() => {
      cy.session('loginSession', () => {
        cy.visit("/");
        cy.userLogin(loginTestData.email, loginTestData.password);
        cy.url().should('include', '/agency/dashboard');
        
      });
      cy.visit('https://app-qa.adlaunch.io/agency/dashboard');
      cy.screenshot("Account_setting/SS001/full-page");
      
    });
    
    let savedEmail;

    it("Account-Settings_user profile", () => {
      cy.get(AccountSettings.Profile, { timeout: 30000 }).click();
      cy.get('div.break-all', { timeout: 10000 }).should('have.text', "amit90+1@logiciel.io").then(($email) => {
        savedEmail = $email.text().trim();  // Save the email value in the variable
        //console.log(savedEmail);  // Log the saved email value
        cy.get(AccountSettings.AccountSettings).eq(2).click({ multiple: true });
        cy.get(AccountSettings.UserProfile).should("have.text", AccountSettingsTestData.UserProfile);
        cy.get(AccountSettings.ProfileName).contains(SignupTestData.FirstName + " " + SignupTestData.LastName);
        cy.get(AccountSettings.EmailInputbox).should('exist');
        cy.get(AccountSettings.EmailInputbox, { timeout: 10000 }).should("have.text",savedEmail);
      });
        cy.get(AccountSettings.PhoneNumberbox, { timeout: 20000 }).should('contain.text', SignupTestData.PhoneNumnber, { force: true });
        cy.screenshot("Account_setting/SS002/full-page");
        cy.get(AccountSettings.EditButton).click({ multiple: true });
        cy.screenshot("Account_setting/SS003/full-page");
        cy.get(AccountSettings.FirstName).clear();
        cy.get(AccountSettings.LastName).clear();
        cy.get(AccountSettings.PhoneNumber).clear();
        cy.get(AccountSettings.SaveChnagesButton).click();
        cy.screenshot("Account_setting/SS004/full-page");
        cy.get(AccountSettings.FirstName).type(AccountSettingsTestData.FirstName);
        cy.get(AccountSettings.LastName).type(AccountSettingsTestData.LastName);
        cy.get(AccountSettings.CountryCode).select('IN').should("have.value", "IN");
        cy.get(AccountSettings.PhoneNumber).type(AccountSettingsTestData.PhoneNumber);
        cy.screenshot("Account_setting/SS005/full-page");
        cy.get(AccountSettings.SaveChnagesButton).click();
        cy.screenshot("Account_setting/SS006/full-page");
        cy.get(AccountSettings.ProfileName).contains(AccountSettingsTestData.FirstName + " " + AccountSettingsTestData.LastName);
        cy.get(AccountSettings.PhoneNumberbox).should('contain.text', AccountSettingsTestData.PhoneNumber);
        cy.get(AccountSettings.HighlevelClient).should("have.text", AccountSettingsTestData.HighlevelClient);
        cy.get(AccountSettings.highLevelAgency).should("have.text", AccountSettingsTestData.highLevelAgency);
        cy.get(AccountSettings.Whitelabeled).should("have.text",AccountSettingsTestData.Whitelabeled);
        cy.get(AccountSettings.Affiliated).should("have.text", AccountSettingsTestData.Affiliated);
        cy.get(AccountSettings.AdlaunchFacebook).should("have.text", AccountSettingsTestData.AdlaunchFacebook);
        cy.screenshot("Account_setting/SS007/full-page");

    })

    it("Account-Settings_Agency profile", () => {
      cy.get(AccountSettings.Profile, { timeout: 30000 }).click();
        cy.get(AccountSettings.AccountSettings).eq(2).click({ multiple: true });
        cy.get(AccountSettings.AgencyProfile).eq(1).click({ multiple: true });
        cy.get(AccountSettings.BusinessName).should("have.text", AccountSettingsTestData.BusinessName);
        cy.get(AccountSettings.Category).should("have.text",AccountSettingsTestData.Category);
        cy.get(AccountSettings.StreetAddress).should("contain.text",SignupTestData.StreetAddressData);
        cy.get(AccountSettings.PhoneNumberData).should("contain.text",SignupTestData.PhoneNumnber);
        cy.screenshot("Account_setting/SS008/full-page");
        cy.contains('button', 'Edit').click({ multiple: true });
        //cy.get('[data-tooltip-id="agencyDataBusinessNameAmit and Company"]').invoke('hide');
        cy.get(AccountSettings.BusinessNameAgency).clear({force:true});
        cy.get(AccountSettings.CategoryNiche).click();
        cy.get(AccountSettings.BusinessAddressAgency).clear();
        cy.get(AccountSettings.BusinessPhone).clear();
        cy.screenshot("Signup/SS009/full-page");
        cy.get(AccountSettings.BusinessNameAgency).type(AccountSettingsTestData.BusinessNameAgency);
        cy.get(AccountSettings.TypeANiche).type(AccountSettingsTestData.TypeANiche);
        cy.get(AccountSettings.BusinessAddressAgency).type(AccountSettingsTestData.BusinessAddressAgency).should("be.visible").get(AccountSettings.BusinessAddressdropdown).first().click();
        cy.get(AccountSettings.CountryCodeAgency).select('IN').should("have.value", "IN");
        cy.get(AccountSettings.BusinessPhone).type(AccountSettingsTestData.BusinessPhone);
        cy.get(AccountSettings.SaveChnagesButtonAgency).click();
        cy.screenshot("Account_setting/SS010/full-page");
    })

    it("Account-Settings_Integration", () =>{
      cy.get(AccountSettings.Profile, { timeout: 30000 }).click();
      cy.get(AccountSettings.AccountSettings).eq(2).click({ multiple: true });
      cy.get(AccountSettings.AgencyProfile).eq(2).click({ multiple: true });
      cy.get(AccountSettings.HighLevel).eq(0).should("have.text", AccountSettingsTestData.HighLevel);
      cy.get(AccountSettings.Facebook).should("have.text", AccountSettingsTestData.Facebook);
      cy.get(AccountSettings.ChatGpt).should("have.text", AccountSettingsTestData.ChatGpt);
      cy.screenshot("Account_setting/SS012/full-page");
    })

    it ("Account-Settings_Billing", () => {

      cy.get(AccountSettings.Profile, { timeout: 30000 }).click();
      cy.get(AccountSettings.AccountSettings).eq(2).click({ multiple: true });
      cy.get(AccountSettings.AgencyProfile).eq(3).click({ multiple: true });
      cy.get("p:contains('Agency Unlimited')").should("have.text","Agency Unlimited");
      cy.get("p:contains('$2497')").should("have.text", "$2497 ");
      cy.screenshot("Account_setting/SS013/full-page");
    })
})