// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { report } from 'process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './test',
  timeout: 40000,
  expect: { timeout: 5000 },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
  },

});

module.exports = config;

