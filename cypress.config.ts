import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://mariage-en-main.com',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
