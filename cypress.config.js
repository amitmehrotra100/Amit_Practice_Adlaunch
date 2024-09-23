module.exports = {
  e2e: {
    baseUrl: "https://app-qa.adlaunch.io/",
    experimentalStudio: true,
    setupNodeEvents(on, config) {
     require("cypress-mochawesome-reporter/plugin")(on);
      require("@cypress/grep/src/plugin")(config);
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          // fullPage screenshot size is 1400x1200 on non-retina screens
          // and 2800x2400 on retina screens
          launchOptions.args.push("--window-size=1920,1080");

          // force screen to be non-retina (1400x1200 size)
          launchOptions.args.push("--force-device-scale-factor=1");

          // force screen to be retina (2800x2400 size)
           launchOptions.args.push('--force-device-scale-factor=2')
        }
        return launchOptions;
      });
      return config;
  },
     chromeWebSecurity: false,
  // },
  screenshotOnRunFailure: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    apiUrl: "https://app-qaapi.adlaunch.io/api/v1",
    grepFilterSpecs: true,
    USERNAME:'amit'
    // grep: "viewport",
  },
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 20000,
  viewportWidth: 1536,
  viewportHeight: 960
}};