Cypress.Commands.add("login", (userName, password) => {
  const apiUrl = Cypress.env("apiUrl");
  cy.request({
    url: `${apiUrl}/login`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: {
      email: userName,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    // user is also logged in after registering
    // so we can just save token
    console.log(response.body);
    const token = response.body.token.access_token;
    Cypress.env('auth0Token', token);
    window.localStorage.setItem("auth0Cypress", `${response.body}`);

    // y.log("**user created**");
    // cy.log(`**email: ${email}**`);
    // cy.log(`**password: ${password}**`);c
  });
});
