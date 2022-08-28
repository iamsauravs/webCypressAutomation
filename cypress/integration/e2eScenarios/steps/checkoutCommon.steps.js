import {Then} from 'cypress-cucumber-preprocessor/steps';
import {checkoutCommonPage} from '../../../support/pageObjects/checkoutCommon.page';

Then('I click on proceed to checkout from {string} page', (pageName) => {
  checkoutCommonPage.clickOnProceedToCheckoutBtn(pageName);
});
