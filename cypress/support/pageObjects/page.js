import {assertions} from '../cypressWrappers/assertions';

class BasePage {
  // ###### PAGE ASSERTIONS ########
  navigationPage = () => cy.get('.navigation_page');
  navBreadCrumb = () => cy.get('.breadcrumb');

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path) {
    if (!path) {
      cy.visit('/');
    } else {
      const url = `${Cypress.config('baseUrl')}/${path}`;

      cy.url().then((currentUrl) => {
        if (currentUrl === url) {
          cy.reload({pageLoadTimeout: 600000});
        } else {
          cy.visit(url, {
            timeout: 600000,
            failOnStatusCode: false,
          });
        }
      });
    }
  }

  // ###### PAGE ASSERTIONS ########
  verifyNavigationPage(pageName) {
    assertions.assertElementHasText(this.navigationPage(), pageName);
  }

  verifyPageNavigation(pageName) {
    assertions.assertElementHasText(this.navBreadCrumb(), pageName);
  }
}

export const basePage = new BasePage();
