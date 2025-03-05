import { defineConfig } from "cypress";
const { registerAIOTestsPlugin } = require('cypress-aiotests-reporter/src')
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  env: {
    aioTests: {
      enableReporting: true, // Active le reporting AIO Tests
      cloud: {
        apiKey: process.env.AIOTESTS_API_KEY,
      },
      jiraProjectId: process.env.JIRA_PROJECT_ID,
      cycleDetails: {
        cycleKey: process.env.CYCLE_KEY,
        createNewCycle: false,
        cycleName: "Auth Automation",
      }
  }
},
  e2e: {
    baseUrl: 'https://mariage-en-main.com',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      registerAIOTestsPlugin(on, config);

      return config;
    },
  },
});
