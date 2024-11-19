import Clients from "../../fixtures/elements/Clients.json";
import ClientsTestData from "../../fixtures/testdata/ClientsTestData.json";
import loginTestData from "../../fixtures/testdata/loginTestData.json";
import { LoginPage } from "../../pages/LoginPage";

describe("Sign-up Process", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.userLogin(loginTestData.email, loginTestData.password);
    cy.url().should('include', '/agency/dashboard');
  });

  it("Clients_Validations", () => {
    // Navigate to Clients tab
    cy.get(Clients.ClientTab).click();

    // Select a client from the ClientTable
    cy.get(Clients.ClientTable).first();

    // Open the action menu (three-dot icon) and click View/Edit
    cy.get(Clients.threedoticon).then(($icons) => {
      cy.wrap($icons[0]).click(); // Index is zero-based.
    });
    
    cy.get(Clients["View/Edit"]).then(($buttons) => {
      cy.wrap($buttons[0]).click(); // Index is zero-based.
    });
    

    // Select Niche and Save
    cy.get(Clients.Niche).last().should('be.visible').click();
    cy.get(Clients.SaveButton).click();
    cy.screenshot("Clients/SS001/full-page");

    // Search for a Business Niche
    cy.get(Clients.BusinessNiche).last().should("be.visible").click();
    cy.get(Clients.SearchNiche).should("be.visible").type("Auto Dealers");
    cy.get(Clients.NicheList).contains("Auto Dealers").click();
    cy.screenshot("Clients/SS002/full-page");

    // Save Niche
    cy.get(Clients.SaveButton).click();
    cy.get(Clients.ToastMessage).should("be.visible");
    //cy.screenshot("Clients/SS004/full-page");

    // Verify the niche in the table
    cy.get(Clients.ClientsTableNiche).contains("Auto Dealers");

    // Reopen the client menu and select a different niche
    cy.get(Clients.ClientTable).first();
    cy.get(Clients.threedoticon).then(($icons) => {
      cy.wrap($icons[0]).click(); // Index is zero-based.
    });
    
    cy.get(Clients.ClientMenudropdown).then(($dropdowns) => {
      cy.wrap($dropdowns[2]).click(); // Index is zero-based.
    });
    

    // Close the popup and select a new niche
    cy.get(Clients.NicheDropdownpopupCrossIcon).click();
    cy.get(Clients.SelectBusinessNiche).click();
    cy.contains('span', 'Boating Sales').click();
    //cy.screenshot("Clients/SS005/full-page");
    cy.get(Clients.AssignNIcheButton).click();
    cy.contains('Niche updated successfully').should("have.text", "Niche updated successfully");
    cy.screenshot("Clients/SS003/full-page");

    // Verify the updated niche in the table
    cy.get(Clients.ClientsTableNiche2).contains("Boating Sales");

    // Capture the text of the first client name
    cy.get(Clients.CleintsTableFirstElement).first().invoke("text")
      .then((cellText) => {
        cy.log(`Client name: ${cellText}`);
        cy.wrap(cellText).as('clientTableFirstName');
      });

    // Hide the client and confirm the action
    cy.get(Clients.threedoticon).then(($icons) => {
      cy.wrap($icons[0]).click(); // Index is zero-based.
    });    
    cy.get("button:contains('Hide Client')").click();
    cy.get(Clients.HideClientButton).click();
    cy.get(Clients.ToastMessageHideclients).should("be.visible");
    cy.screenshot("Clients/SS004/full-page");

    // Toggle the hidden clients view
    cy.get(Clients.HideClientsToggleButton).click();
    cy.screenshot("Clients/SS005/full-page");
    cy.get('@clientTableFirstName').then((clientTableFirstName) => {
      searchAcrossPages(clientTableFirstName);
    });
  });
   });

function searchAcrossPages(expectedValue, currentPage = 1, maxPageLimit = 20) {
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
  } 
  else {
    cy.log(`"${expectedValue}" not found on page ${currentPage}.`);
  }
      // Click the next page
      const pageSelector = Clients.PaginationSelector;
      cy.get(pageSelector).contains((currentPage + 1).toString()).then(($nextPage) => {
        if ($nextPage.length) {
          cy.log(`Going to the next page: ${currentPage + 1}`);
          cy.wrap($nextPage).click().then(() => {
            searchAcrossPages(expectedValue, currentPage + 1, maxPageLimit); // Recursive call for the next page
          });
        } else {
          cy.log('No more pages to navigate.');
        }
      });
    });
  }






  
  
  
  
  