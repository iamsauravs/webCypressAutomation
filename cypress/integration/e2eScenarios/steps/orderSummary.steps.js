import {Then} from 'cypress-cucumber-preprocessor/steps';
import {orderSummaryPage} from '../../../support/pageObjects/orderSummary.page';

Then('I verify product details on order summary page', () => {
  cy.readFile('./cypress/fixtures/productsAdded.json').then((product) => {
    orderSummaryPage.verifyProductNameOnCartPage(product.productName);
    orderSummaryPage.verifyProductAttributeOnCartPage(product.size);
    orderSummaryPage.verifyProductQtyOnCartPage(product.qty);
    orderSummaryPage.verifyProductPriceOnCartPage(product.price, product.qty);
  });
});
