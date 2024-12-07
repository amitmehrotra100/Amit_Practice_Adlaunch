Cypress.Commands.add("addANewClient", (firstname, lastname, businessname, email) => {
  const token = Cypress.env('auth0Token');
  const apiUrl = Cypress.env("apiUrl");

  cy.log(`Token: ${token}`);
  cy.request({
      url: `${apiUrl}/agency/?include[]=group&include[]=subscription&include[]=business_address&include[]=source`,
      method: "GET",
      headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
      },
  }).then((response) => {
      cy.log("Full Response:", response.body);
      expect(response.body.status).to.eq(200);
      
      const white_label_url = response.body.data?.white_label_url;
      cy.log("White Label URL:", white_label_url);
      cy.wrap(white_label_url).as('whiteLabelUrl');
    cy.request({
      url: `${white_label_url}/signup`,
      method: "POST",
      headers: {
        Accept: "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: {
        first_name: firstname,
        last_name: lastname,
        business_name: businessname,
        email: email,
        phone: "+14047241937",
        niche_id: "14",
        business_address_street: "Lotte New York Palace, Madison Avenue, New York, NY, USA",
        business_address_city: "New York",
        business_address_state: "New York",
        business_address_zip: "10022",
        business_address_country: "United States",
        business_address_country_code: "US",
        business_address_suite_number: "",
        business_phone: "+14047241937",
        country_code: "US",
        meta: {
          lat: 40.7581922,
          lng: -73.97462329999999,
        },
      },
    }).then((response) => {
      expect(response.body.status).to.eq(200);
      const token1 = response.body.token.access_token;
      Cypress.env('auth0Token', token1);
    });
  });
});
  