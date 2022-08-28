// / <reference types="cypress" />

const fs = require('fs');
// eslint-disable-next-line no-var
const testStore = {};
const _ = require('lodash');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    getFilteredSearchResultByFileTypeArray(searchResultsInput, fileType) {
      // eslint-disable-next-line prefer-const
      let searchResultArray = _.split(searchResultsInput.searchResults, ',');
      // eslint-disable-next-line prefer-const
      let filteredFilesFromSearchResult = [];

      searchResultArray.forEach( (index) =>{
        if (_.includes(index, searchResultsInput.fileType)) {
          filteredFilesFromSearchResult.push(index);
        }
      });
      return filteredFilesFromSearchResult;
    },
  });

  on('task', {
    isGivenNameColumnHasValue(filteredJSONFilesFromSearchResult) {
      return new Promise((resolve, reject) => {
        filteredJSONFilesFromSearchResult.forEach((file) => {
          fs.readFile(file, (err, data) => {
            // eslint-disable-next-line no-var
            var json = JSON.parse(data);
            // eslint-disable-next-line quotes
            if (json[0].user.givenName !== "" && json[0].user.givenName !== null) {
              resolve(true);
            } else if (json[0].user.givenName == null) {
              resolve(false);
            } else {
              resolve(false);
            }
          });
        });
      });
    },
  });

  on('task', {
    deleteZipFile(pathToZipFile) {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(pathToZipFile)) {
          fs.unlinkSync(pathToZipFile);
          resolve(true);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(false);
        }
      });
    },
  });

  on('task', {
    deleteDir(pathToDirToBeDeleted) {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(pathToDirToBeDeleted)) {
          fs.rmSync(pathToDirToBeDeleted, {recursive: true, force: true});
          resolve(true);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(false);
        }
      });
    },
  });

  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });

  on('task', {
    pushValue({name, value}) {
      testStore[name] = value;
      return true;
    },
  });

  on('task', {
    getValue(name) {
      return testStore[name];
    },
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber());
  return config;
};
