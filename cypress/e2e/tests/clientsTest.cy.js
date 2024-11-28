import Clients from "../../fixtures/elements/Clients.json";
import ClientsTestData from "../../fixtures/testdata/clientstestdata.json";
import loginTestData from "../../fixtures/testdata/logintestdata.json";

describe("Sign-up Process", () => {
  beforeEach(() => {
    cy.userLogin(loginTestData.email, loginTestData.password);
    cy.url().should('include', '/agency/dashboard');
  });

  it("Clients_Validations", () => {
    // Navigate to Clients tab
    cy.get(Clients.ClientTab).click();
    cy.get(Clients.Clientlabel).should("be.visible").should("have.text", ClientsTestData.Clientlabel);
    // Select a client from the ClientTable
    cy.get(Clients.ClientTable).should("be.visible");
    cy.screenshot("Clients/SS0001/full-page");
    cy.get(Clients.threedoticon).first().click({force:true}); // Choosing the first element from many identified elements 
    cy.selectOption(Clients.ViewEditButton, ClientsTestData.ViewEditClient);
    // Select Niche and Save
    cy.get(Clients.Niche).last().should('be.visible').click();
    cy.get(Clients.SaveButton).click();
    cy.screenshot("Clients/SS001/full-page");

    // Search for a Business Niche
    cy.get(Clients.BusinessNiche).last().should("be.visible").click();
    cy.get(Clients.SearchNiche).should("be.visible").type(ClientsTestData.NicheData);
    cy.selectOption(Clients.NicheList, ClientsTestData.NicheListData);
    cy.screenshot("Clients/SS002/full-page");

    // Save Niche
    cy.get(Clients.SaveButton).click();
    cy.get(Clients.Clientlabel).should("be.visible").should("have.text", ClientsTestData.Clientlabel);
    cy.get(Clients.ToastMessage).should("be.visible").should("have.text", ClientsTestData.ToastMessage);
    cy.screenshot("Clients/SS004/full-page");

    // Verify the niche in the table
    cy.get(Clients.ClientsTableNiche).should("have.text", ClientsTestData.NicheData);
    cy.screenshot("Clients/SS0004/full-page");
    // Reopen the client menu and select a different niche
    cy.get(Clients.ClientTable).should("be.visible");
    cy.get(Clients.threedoticon).first().click({force:true}); // Choosing the first element from many identified elements
    cy.selectOption(Clients.ViewEditButton, ClientsTestData.AssignNichebutton);
    // Close the popup and select a new niche
    cy.get(Clients.NicheDropdownpopupCrossIcon).click();
    cy.screenshot("Clients/SS0007/full-page");
    cy.get(Clients.SelectBusinessNiche).click();
    cy.selectOption(Clients.SelectBusinessNichepopup, ClientsTestData.BusinessNiche);
    cy.screenshot("Clients/SS0008/full-page");
    cy.get(Clients.AssignNIcheButton).click();
    cy.get(Clients.Clientlabel).should("be.visible").should("have.text", ClientsTestData.Clientlabel);
    cy.get(Clients.ToastMessage).should("be.visible").should("have.text", ClientsTestData.NicheToastMessage);
    cy.screenshot("Clients/SS003/full-page");
    // Verify the updated niche in the table
    cy.selectOption(Clients.ClientsTableNiche2, ClientsTestData.ClientTableData);
    // Capture the text of the first client name
    cy.get(Clients.CleintsTableFirstElement).first().invoke("text") // Choosing the first element from many identified elements
      .then((cellText) => {
        cy.log(`Client name: ${cellText}`);
        cy.wrap(cellText).as('clientTableFirstName');
      });

    // Hide the client and confirm the action
    cy.get(Clients.threedoticon).first().click({force:true});   // Choosing the first element from many identified elements
    cy.selectOption(Clients.ViewEditButton, ClientsTestData.HideClientButton); 
    cy.get(Clients.HideClientButton).click();
    cy.screenshot("Clients/SS0013/full-page");
    cy.get(Clients.Clientlabel).should("be.visible").should("have.text", ClientsTestData.Clientlabel);
    cy.get(Clients.ToastMessage).should("be.visible").should("have.text", ClientsTestData.ClientToastMessage);
    cy.screenshot("Clients/SS004/full-page");

    // Toggle the hidden clients view
    cy.get(Clients.HideClientsToggleButton).click({force:true});
    cy.get(Clients.Clientlabel).should("be.visible").should("have.text", ClientsTestData.Clientlabel);
    cy.screenshot("Clients/SS0012/full-page");
    cy.get('@clientTableFirstName').then((clientTableFirstName) => {
      searchAcrossPages(clientTableFirstName);
    });
    cy.screenshot("Clients/SS005/full-page");
  });
   });

   function searchAcrossPages(expectedValue, currentPage = 1, maxPageLimit = 100) {
    if (currentPage > maxPageLimit) {
      cy.log('Reached the maximum page limit without finding the client.');
      return;
    }
  
    cy.log(`Searching for "${expectedValue}" on page ${currentPage}`);
  
    // Check if the expected value exists on the current page
    cy.get(Clients.CellsActualValues).then(($cells) => {
      const values = [];
  
      // Loop through each cell and trim whitespace
      $cells.each((index, cell) => {
        const cellText = Cypress.$(cell).text().trim();
        if (cellText) {
          values.push(cellText);
        }
      });
  
      // Debug: log all values on the current page
      cy.log(`Values on page ${currentPage}: ${values.join(', ')}`);
  
      if (values.includes(expectedValue)) {
        cy.log(`Found the client "${expectedValue}" on page ${currentPage}`);
        return; // Exit the function as we found the value
      } else {
        cy.log(`"${expectedValue}" not found on page ${currentPage}.`);
      }
  
      // Check if there is a next page and navigate
      const pageSelector = Clients.PaginationSelector;
      cy.get(pageSelector).then(($pages) => {
        const lastPage = parseInt($pages.last().text().trim(), 10);
  
        if (currentPage >= lastPage) {
          cy.log('Reached the last page. No more pages to navigate.');
          return;
        }
  
        cy.get(pageSelector)
          .contains((currentPage + 1).toString())
          .then(($nextPage) => {
            if ($nextPage.length) {
              cy.log(`Going to the next page: ${currentPage + 1}`);
              cy.wrap($nextPage).click({force:true}).then(() => {
                searchAcrossPages(expectedValue, currentPage + 1, maxPageLimit); // Recursive call for the next page
              });
            } else {
              cy.log('No more pages to navigate.');
            }
          });
      });
    });
  }
  






  
  
  
  
  