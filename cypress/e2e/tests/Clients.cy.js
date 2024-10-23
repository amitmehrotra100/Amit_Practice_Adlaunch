import Clients from "../../fixtures/elements/Clients.json";
import ClientsTestData from "../../fixtures/testdata/ClientsTestData.json";
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";

describe("Sign-up Process", () =>{
    beforeEach(() => {
        cy.visit("/");
        cy.userLogin(loginTestData.email, loginTestData.password);
        cy.url().should('include', '/agency/dashboard');
    });

    it("Clients_Validations", () =>{
        cy.get(Clients.ClientTab).click();
        cy.get(Clients.ClientTable).first();
        cy.get(Clients.threedoticon).eq(1).click();
        cy.get(Clients["View/Edit"]).eq(0).click({ multiple: true });
        cy.get(Clients.Niche).last().should('be.visible').click();
        cy.get(Clients.SaveButton).click();
        cy.get(Clients.BusinessNiche).last().should("be.visible").click();
        cy.get(Clients.SearchNiche).type("Auto Dealers");
        cy.get(Clients.NicheList).contains("Auto Dealers").click();
        cy.get(Clients.SaveButton).click();
        cy.get(Clients.ToastMessage).should("be.visible");
        cy.get(Clients.ClientsTableNiche).contains("Auto Dealers");
        cy.get(Clients.ClientTable).first();
        cy.get(Clients.threedoticon).eq(1).click();
        cy.get(Clients.ClientMenudropdown).eq(2).click();
        cy.get(Clients.NicheDropdownpopupCrossIcon).click();
        cy.get(Clients.SelectBusinessNiche).click();
        cy.contains('span', 'Boating Sales').click();
        cy.get(Clients.AssignNIcheButton).click();
        cy.contains('Niche updated successfully').should("have.text", "Niche updated successfully");
        cy.get(Clients.ClientsTableNiche2).contains("Boating Sales");
        //cy.get(Clients.HiddenClientName).eq(0).should("have.text", ClientsTestData.HiddenClientName);
        cy.get(Clients.threedoticon).eq(1).click();
        cy.get("button:contains('Hide Client')").click();
        cy.get(Clients.HideClientButton).click();
        cy.get(Clients.ToastMessageHideclients).should("be.visible");
        cy.get(Clients.HideClientsToggleButton).click();
        cy.get(Clients.HiddenclientsTable).eq(0).invoke("text")
        .then((cellText) => {
            // Do something with the cell text
            cy.log(cellText); // Log the cell text to the console
          });
    })
})