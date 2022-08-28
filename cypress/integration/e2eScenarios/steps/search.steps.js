import {Then} from 'cypress-cucumber-preprocessor/steps';
import {basePage} from '../../../support/pageObjects/page';
import {searchPage} from '../../../support/pageObjects/search.page';

Then('I navigate to {string} product on search page', (index)=> {
  searchPage.getProductNameByIndex(index);
  cy.readFile('./cypress/fixtures/productsAdded.json').then((product) => {
    searchPage.clickOnProductNameIndex(index);
    basePage.verifyPageNavigation(product.productName);
  });
});


