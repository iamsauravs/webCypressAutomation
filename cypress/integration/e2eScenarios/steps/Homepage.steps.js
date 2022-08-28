import {Given, Then} from 'cypress-cucumber-preprocessor/steps';
import {basePage} from '../../../support/pageObjects/page';
import {topBar} from '../../../support/pageObjects/topBar.page';

Given('I navigate to home page', ()=> {
  basePage.open('index.php');
  topBar.verifyVisibilityOfHomeLogo();
});

Then('I search for {string} product', (productName)=> {
  topBar.searchForInput(productName);
  topBar.clickOnSearchButton();

  basePage.verifyNavigationPage('Search');
});


