import {actions} from '../cypressWrappers/actions';
import {assertions} from '../cypressWrappers/assertions';

class ShoppingCart {
// ###### PAGE ELEMENTS ########
  productNames = () => cy.get('#cart_summary p.product-name');
  productDescription = () => cy.get('#cart_summary td.cart_description');
  productUnitPrice = () => cy.get('#cart_summary .cart_unit > .price');
  productQtyTxtField = () => cy.get('#cart_summary .cart_quantity_input');
  productTotalPrice = () => cy.get('#cart_summary .cart_total .price');
  proceedToCheckoutBtn = () => cy.get('.cart_navigation a[title="Proceed to checkout"]');
  currentStep = () => cy.get('.step_current');
  tncCheckbox = () => cy.get('#cgv');

  // ###### PAGE ACTIONS ########
  clickOnProceedToCheckoutBtn() {
    actions.click(this.proceedToCheckoutBtn());
  }

  selectTermsServiceCheckbox() {
    actions.click(this.tncCheckbox());
  }

  // ###### PAGE ASSERTIONS ########
  verifyProductNameOnCartPage(productName) {
    assertions.assertElementHasText(this.productNames(), productName);
  }

  verifyProductAttributeOnCartPage(attr) {
    assertions.assertElementHasText(this.productDescription(), attr);
  }

  verifyProductQtyOnCartPage(qty) {
    assertions.assertAttributeContainValue(this.productQtyTxtField(), 'value', qty);
  }

  verifyProductPriceOnCartPage(indPrice, qty) {
    const totalPrice = parseFloat(indPrice.replace(/\$/g, '')) * parseInt(qty);
    assertions.assertElementHasText(this.productTotalPrice(), totalPrice.toString());
  }

  verifyCurrentStepFromCheckout(stepName) {
    assertions.assertElementHasText(this.currentStep(), stepName);
  }
}

export const shoppingCart = new ShoppingCart();
