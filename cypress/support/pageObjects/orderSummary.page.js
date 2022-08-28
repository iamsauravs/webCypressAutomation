import {assertions} from '../cypressWrappers/assertions';

class OrderSummaryPage {
  // ###### PAGE ELEMENTS ########
  productNames = () => cy.get('#cart_summary p.product-name');
  productDescription = () => cy.get('#cart_summary td.cart_description');
  productUnitPrice = () => cy.get('#cart_summary .cart_unit > .price');
  productQtyTxtField = () => cy.get('#cart_summary .cart_quantity span');
  productTotalPrice = () => cy.get('#cart_summary .cart_total .price');


  // ###### PAGE ASSERTIONS ########
  verifyProductNameOnCartPage(productName) {
    assertions.assertElementHasText(this.productNames(), productName);
  }

  verifyProductAttributeOnCartPage(attr) {
    assertions.assertElementHasText(this.productDescription(), attr);
  }

  verifyProductQtyOnCartPage(qty) {
    assertions.assertElementHasText(this.productQtyTxtField(), qty);
  }

  verifyProductPriceOnCartPage(indPrice, qty) {
    const totalPrice = parseFloat(indPrice.replace(/\$/g, '')) * parseInt(qty);
    assertions.assertElementHasText(this.productTotalPrice(), totalPrice.toString());
  }
}

export const orderSummaryPage = new OrderSummaryPage();
