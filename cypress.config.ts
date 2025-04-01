import { defineConfig } from "cypress";
const { registerAIOTestsPlugin } = require('cypress-aiotests-reporter/src')
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  env: {
    aioTests: {
      enableReporting: true, // Active le reporting AIO Tests
      cloud: {
        apiKey: process.env.AIO_API_KEY,
      },
      jiraProjectId: process.env.JIRA_PROJECT_ID,
      cycleDetails: {
        cycleKey: process.env.CYCLE_KEY,
        createNewCycle: false,
        cycleName: "Ad hoc",
      }
  }
},
  e2e: {
    baseUrl: 'https://mariage-en-main.com',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      registerAIOTestsPlugin(on, config);

      // if multiple reporters are needed (events like "on"), follow the instructions in the documentation:
      //https://aiosupport.atlassian.net/wiki/spaces/AioTests/pages/2027192415/Cypress+AIO+Tests+Reporter#Using-multiple-reporters%3F

      // implement node event listeners here
      // Exécuter du code avant chaque test
      // on('before:spec', (spec) => {
      //   console.log(`Le test ${spec.name} va commencer.`);
      // });

      config.env.userEmail = process.env.USER_EMAIL;
      config.env.userPwd = process.env.USER_PWD;

      // Exécuter du code après chaque test
      // on("after:spec", (spec, results) => {
      //   console.log(
      //     `Le test ${spec.name} est terminé. Résultat : ${
      //       results.stats.failures === 0 ? "Succès" : "Échec"
      //     }`
      //   );
      // });
      return config;
    },
  },
});
