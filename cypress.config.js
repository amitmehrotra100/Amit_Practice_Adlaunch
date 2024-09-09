module.exports = {
  e2e: {
    baseUrl: "https://app-qa.adlaunch.io/",
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
    chromeWebSecurity: false,
  },
  screenshotOnRunFailure: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "e2eAutomation/reports",
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    apiUrl: "https://api.adlaunch.com/api/v1",
    grepFilterSpecs: true,
    // grep: "viewport",
  },
  pageLoadTimeout: 120000,
};
