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
    cy.get(Clients.threedoticon).eq(1).click();
    cy.get(Clients["View/Edit"]).eq(0).click();

    // Select Niche and Save
    cy.get(Clients.Niche).last().should('be.visible').click();
    cy.get(Clients.SaveButton).click();

    // Search for a Business Niche
    cy.get(Clients.BusinessNiche).last().should("be.visible").click();
    cy.get(Clients.SearchNiche).should("be.visible").type("Auto Dealers");
    cy.get(Clients.NicheList).contains("Auto Dealers").click();

    // Save Niche
    cy.get(Clients.SaveButton).click();
    cy.get(Clients.ToastMessage).should("be.visible");

    // Verify the niche in the table
    cy.get(Clients.ClientsTableNiche).contains("Auto Dealers");

    // Reopen the client menu and select a different niche
    cy.get(Clients.ClientTable).first();
    cy.get(Clients.threedoticon).eq(1).click();
    cy.get(Clients.ClientMenudropdown).eq(2).click();

    // Close the popup and select a new niche
    cy.get(Clients.NicheDropdownpopupCrossIcon).click();
    cy.get(Clients.SelectBusinessNiche).click();
    cy.contains('span', 'Boating Sales').click();
    cy.get(Clients.AssignNIcheButton).click();
    cy.contains('Niche updated successfully').should("have.text", "Niche updated successfully");

    // Verify the updated niche in the table
    cy.get(Clients.ClientsTableNiche2).contains("Boating Sales");

    // Capture the text of the first client name
    cy.get(Clients.CleintsTableFirstElement).first().invoke("text")
      .then((cellText) => {
        cy.log(`Client name: ${cellText}`);
        cy.wrap(cellText).as('clientTableFirstName');
      });

    // Hide the client and confirm the action
    cy.get(Clients.threedoticon).eq(1).click();
    cy.get("button:contains('Hide Client')").click();
    cy.get(Clients.HideClientButton).click();
    cy.get(Clients.ToastMessageHideclients).should("be.visible");

    // Toggle the hidden clients view
    cy.get(Clients.HideClientsToggleButton).click();

    //Filter and trace values across pagination
    cy.get('table tbody tr td:nth-child(2)').invoke("text").then(($cells) => {
      const values = $cells.map((index, cell) => Cypress.$(cell).text().trim()).get();
      cy.log(values);
      // const firstTenValues = values.slice(0, 10);
      // cy.log(firstTenValues);

      // firstTenValues.forEach((value) => {
      //   cy.get('@clientTableFirstName').then((clientTableFirstName) => {
      //     traceValueAcrossPagination(value, clientTableFirstName, 8);
      //   });
      // });
    });
  });
});

// Recursive function to trace value across pagination
// Function to trace a value across pagination with dynamic page limit
// function traceValueAcrossPagination(elementLocator, expectedValue, maxPageLimit) {
//   let currentPage = 1; // Start from the first page
//   let lastPageReached = false; // Flag to indicate if the last page is reached

//   function searchInPage() {
//     if (lastPageReached || currentPage > maxPageLimit) {
//       cy.log('Stopping pagination - last page reached or max page limit exceeded.');
//       return;
//     }

//     cy.log(`Searching on page ${currentPage}`);

//     // Check if the expected value exists on the current page
//     cy.get('body').then(($body) => {
//       if ($body.find(elementLocator).length > 0) {
//         cy.get(elementLocator).each(($el) => {
//           const actualValue = $el.text().trim();
//           if (actualValue === expectedValue) {
//             cy.log('Found the value: ' + actualValue);
//             lastPageReached = true; // Stop searching if found
//             return false; // Break out of the .each loop
//           }
//         });
//       }

//       // Selector for pagination buttons, adapted for your UI
//       const pageSelector = 'ul[aria-label="Pagination"] li a';

//       // Find the current active page and the next page
//       cy.get(pageSelector).then(($paginationLinks) => {
//         const totalPages = $paginationLinks.length;
        
//         // Ensure we don't exceed the max page limit
//         if (currentPage < totalPages && currentPage < maxPageLimit) {
//           const nextPageNumber = currentPage + 1;
          
//           // Click the next page based on the page number
//           cy.get(pageSelector)
//             .contains(nextPageNumber.toString())
//             .should('be.visible')
//             .click()
//             .then(() => {
//               cy.wait(500); // Wait for the page to load, adjust if needed
//               currentPage += 1; // Increment page counter
//               searchInPage(); // Recursive call for the next page
//             });
//         } else {
//           cy.log('No more pages or reached the max page limit.');
//           lastPageReached = true; // Stop if no more pages
//         }
//       });
//     });
//   }

//   searchInPage(); // Start the search process
// }







  
  
  
  
  