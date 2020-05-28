Feature: create entities
  we test our api

  Scenario: create a user
    When I create a user
    Then I should have created a user
    When I create an order
    Then I should have created an order
    When I create a figure
    Then I should have created a figure
