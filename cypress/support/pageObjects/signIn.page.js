import {actions} from '../cypressWrappers/actions';

class SignInPage {
  // ###### PAGE ELEMENTS ########
  emailAddress = () => cy.get('#email');
  password = () => cy.get('#passwd');
  signInButton = () => cy.get('#SubmitLogin');

  // ###### PAGE ACTIONS #######
  typeIntoEmailAddress(emailId) {
    actions.type(this.emailAddress(), emailId);
  }

  typeIntoPassword(pwd) {
    actions.type(this.password(), pwd);
  }

  clickOnSignInBtn() {
    actions.click(this.signInButton());
  }
}

export const signInPage = new SignInPage();
