import {Then} from 'cypress-cucumber-preprocessor/steps';
import {productDetails} from '../../../support/pageObjects/productDetails.page';

Then('I add product to cart with {string} qty and {string} size as selected attributed',
    (qty, size)=> {
      cy.readFile('./cypress/fixtures/productsAdded.json').then((product) => {
        product.qty = qty;
        product.size = size;
        cy.get('#our_price_display').invoke('text').then((price) => {
          product.price = price.trim();
        });
        cy.writeFile('./cypress/fixtures/productsAdded.json',
            product);
      });
      productDetails.typeIntoQtyTextField(qty);
      productDetails.selectSizeDropDown(size);
      productDetails.clickOnAddToCartButton();
    });

Then('I verify product details on checkout modal', () => {
  cy.readFile('./cypress/fixtures/productsAdded.json').then((product) => {
    productDetails.verifyProductNameOnCheckoutModal(product.productName);
    productDetails.verifyProductAttributeOnCheckoutModal(product.size);
    productDetails.verifyProductQtyOnCheckoutModal(product.qty);
    productDetails.verifyProductPriceOnCheckoutModal(product.price, product.qty);
  });
});

Then('I click on proceed to checkout', () => {
  productDetails.clickOnProceedToCheckoutBtn();
});
