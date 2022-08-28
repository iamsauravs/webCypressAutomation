@e2e @e2eCheckoutJourney
Feature: E2E Checkout journeys

        @mega
        Scenario: 01 E2E Checkout journey
            Given I navigate to home page
             When I search for "Faded Short Sleeve T-shirts" product
              And I navigate to "1" product on search page
              And I add product to cart with "3" qty and "M" size as selected attributed
             Then I verify product details on checkout modal
              And I click on proceed to checkout
              And I verify product details on cart page
              And I click on proceed to checkout from "Shopping Cart" page
              And I sign in with valid credentials
              And I verify user is on "Address" step
              And I click on proceed to checkout from "Address" page
              And I verify user is on "Shipping" step
              And I select to TnC for Shipping Carrier
              And I click on proceed to checkout from "Carrier" page
              And I verify user is on "Payment" step
              And I verify product details on order summary page