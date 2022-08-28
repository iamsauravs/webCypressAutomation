import {actions} from '../cypressWrappers/actions';
import {assertions} from '../cypressWrappers/assertions';

class TopBar {
  // ###### PAGE ELEMENTS ########
  searchTextField = () => cy.get('#search_query_top');
  homeLogo = () => cy.get('#header_logo');
  searchButton = () => cy.get('.button-search');

  // ###### PAGE ACTIONS ########
  searchForInput(input) {
    actions.type(this.searchTextField(), input);
  }

  clickOnSearchButton() {
    actions.click(this.searchButton());
  }

  // ###### PAGE ASSERTIONS ########
  verifyVisibilityOfHomeLogo() {
    assertions.assertVisibilityOfImg(this.homeLogo(), 'logo.jpg');
  }
}

export const topBar = new TopBar();
