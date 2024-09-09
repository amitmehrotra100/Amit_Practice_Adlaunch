// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const { loginPage } = require("../pages/LoginPage");
import login from "../fixtures/elements/login.json";
Cypress.Commands.add("userLogin", (email, password) => {
  //cy.session([email, password], (loginPage) => {
    cy.visit("/");
    cy.get(login.emailTxt).type(email).should("have.value", email);
    cy.get(login.passwordTxt).type(password).should("have.value", password);
    cy.get(login.loginBtn).click();
  });
//});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;clear
});

/// <reference types="Cypress" />

// Cypress.Commands.add('IframeBody', (iframeSelector) => {
//   return cy
//     .get(iframeSelector)
//     .its('0.contentDocument.body') // Get the body of the iframe's content document
//     .should('not.be.empty') // Ensure the body is not empty
//     .then(cy.wrap);
// });

Cypress.Commands.add('waitForLoaderToDisappear', (loaderSelector) => {
  const checkLoader = () => {
    cy.get(loaderSelector, { timeout: 25000 }).should('not.exist');
  };

  checkLoader();
});

Cypress.Commands.add("IframeContent", (iframeSelector) => {
  return cy.get(iframeSelector).its("0.contentDocument");
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
