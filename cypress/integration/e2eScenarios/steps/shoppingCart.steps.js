import {Then} from 'cypress-cucumber-preprocessor/steps';
const {shoppingCart} = require('../../../support/pageObjects/shoppingCart.page');
const {signInPage} = require('../../../support/pageObjects/signIn.page');

Then('I verify product details on cart page', () => {
  cy.readFile('./cypress/fixtures/productsAdded.json').then((product) => {
    shoppingCart.verifyProductNameOnCartPage(product.productName);
    shoppingCart.verifyProductAttributeOnCartPage(product.size);
    shoppingCart.verifyProductQtyOnCartPage(product.qty);
    shoppingCart.verifyProductPriceOnCartPage(product.price, product.qty);
  });
});

Then('I click on proceed to checkout from shopping cart', () => {
  shoppingCart.clickOnProceedToCheckoutBtn();
});

Then('I sign in with valid credentials', () => {
  signInPage.typeIntoEmailAddress(Cypress.env('email'));
  signInPage.typeIntoPassword(Cypress.env('password'));
  signInPage.clickOnSignInBtn();
});

Then('I verify user is on {string} step', (step) => {
  shoppingCart.verifyCurrentStepFromCheckout(step);
});

Then('I select to TnC for Shipping Carrier', () => {
  shoppingCart.selectTermsServiceCheckbox();
});
