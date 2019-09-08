Feature: The home page shop button

    As a customer
    I want to access the product page

    Background:
        Given I open the home page

    Scenario: Test the initial page title
        Then I expect to be on the home page

    Scenario: Test the button functionality
        When I click on the CTA button
        Then I expect to be on the product page