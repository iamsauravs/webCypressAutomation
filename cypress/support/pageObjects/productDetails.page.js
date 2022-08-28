import {actions} from '../cypressWrappers/actions';
import {assertions} from '../cypressWrappers/assertions';

class ProductDetails {
// ###### PAGE ELEMENTS ########
  qtyTextField = () => cy.get('#quantity_wanted');
  sizeDropDown = () => cy.get('#group_1');
  addToCartButton = () => cy.get('#add_to_cart button');
  productNameOnCheckoutModal = () => cy.get('span.product-name');
  productAttributesOnCheckoutModal = () => cy.get('#layer_cart_product_attributes');
  productIndividualPrice = () => cy.get('#layer_cart_product_price');
  productTotalQty = () => cy.get('#layer_cart_product_quantity');
  proceedToCheckoutBtn = () => cy.get('#layer_cart a.btn-default');

  // ###### PAGE ACTIONS ########
  typeIntoQtyTextField(qty) {
    actions.type(this.qtyTextField(), qty);
  }

  selectSizeDropDown(size) {
    actions.selectDropDownOption(this.sizeDropDown(), size);
  }

  clickOnAddToCartButton() {
    actions.click(this.addToCartButton());
  }

  clickOnProceedToCheckoutBtn() {
    actions.click(this.proceedToCheckoutBtn());
  }

  // ###### PAGE ASSERTIONS ########
  verifyProductNameOnCheckoutModal(productName) {
    assertions.assertElementHasText(this.productNameOnCheckoutModal(), productName);
  }

  verifyProductAttributeOnCheckoutModal(attr) {
    assertions.assertElementHasText(this.productAttributesOnCheckoutModal(), attr);
  }

  verifyProductQtyOnCheckoutModal(qty) {
    assertions.assertElementHasText(this.productTotalQty(), qty);
  }

  verifyProductPriceOnCheckoutModal(indPrice, qty) {
    const totalPrice = parseFloat(indPrice.replace(/\$/g, '')) * parseInt(qty);
    assertions.assertElementHasText(this.productIndividualPrice(), totalPrice.toString());
  }
}

export const productDetails = new ProductDetails();
