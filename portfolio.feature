Feature: End to end Ecommerce validation

    application Regression

    Scenario: Ecommerce products delivery
    Given I open ECommerce Page
    When I add items to Cart
    And Validate the total prices
    Then select the country submit and verify Thankyou

    Scenario: Filling the form to shop
    Given I open ECommerce Page
    When I fill the form details
    |name | gender |
    |Ally | Female |
    Then validate the forms behaviour
    And select the Shop Pages
