// / <reference types="cypress" />
// / <reference types="cypress-xpath" />

/*
 * ***********************************************************
 * This example support/index.js is processed and
 * loaded automatically before your test files.
 *
 * This is a great place to put global configuration and
 * behavior that modifies Cypress.
 *
 * You can change the location of this file or turn off
 * automatically serving support files with the
 * 'supportFile' configuration option.
 *
 * You can read more here:
 * https://on.cypress.io/configuration
 * ***********************************************************
 */

/*
 * Import commands.js using ES2015 syntax:
 * import './commands';
 */

import {
  attachScreenshotToFailedStep,
  clearBrowserStorage,
  clearProductsData,
} from './helpers/utils';
import 'cypress-localstorage-commands';
import './commands/commands';
import '@bahmutov/cy-api';
import 'cypress-real-events/support';

require('cypress-xpath');

before(() => {
  console.log('In before');
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearLocalStorageSnapshot();
  cy.log('Local storage is cleared!');
});

beforeEach(() => {
  console.log('In before');
  Cypress.LocalStorage.clear = function(keys, ls, rs) {
    console.log(keys, ls, rs);
  };
  cy.log('Local storage is restored!');
});

afterEach(() => {
  // clearProductsData();
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearLocalStorageSnapshot();
  //  cy.log('Local storage is cleared!');
  clearBrowserStorage();
});
