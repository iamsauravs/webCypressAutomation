import {actions} from '../cypressWrappers/actions';

class CheckoutCommonPage {
  // ##### PAGE ASSERTIONS #####
  proceedToCheckoutBtnFromAddress = () => cy.get('button[name="processAddress"]');
  proceedToCheckoutBtnFromCarrier = () => cy.get('button[name="processCarrier"]');
  proceedToCheckoutBtnFromCart = () => cy.get('.cart_navigation a[title="Proceed to checkout"]');

  // ##### PAGE ACTIONS ######
  clickOnProceedToCheckoutBtn(pageName) {
    switch (pageName.toLowerCase()) {
      case 'shopping cart':
        actions.click(this.proceedToCheckoutBtnFromCart());
        break;
      case 'address':
        actions.click(this.proceedToCheckoutBtnFromAddress());
        break;
      case 'carrier':
        actions.click(this.proceedToCheckoutBtnFromCarrier());
        break;
    }
  }
}

export const checkoutCommonPage = new CheckoutCommonPage();
