import {actions} from '../cypressWrappers/actions';

class SearchPage {
  // ###### PAGE ELEMENTS ########
  productNameByIndex = (index) => cy.get(`.product_list li:nth-child(${index}) a.product-name`);

  // ###### PAGE ACTIONS ########

  clickOnProductNameIndex(index) {
    actions.click(this.productNameByIndex(index));
  }

  getProductNameByIndex(index) {
    this.productNameByIndex(index).invoke('text').then((name) => {
      cy.fixture('productsAdded').then((product) => {
        product.productName = name.trim();
        cy.writeFile('./cypress/fixtures/productsAdded.json',
            product);
      });
    });
  }

  // ###### PAGE ASSERTIONS ########
}

export const searchPage = new SearchPage();
