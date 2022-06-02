import { ERROR_MESSAGE } from "../../constants";

describe("filterByCategories.cy.ts", () => {
  it("should visit the products page and filter items by colour,gender,price and type", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-colour="action-color"]')
      .first()
      .click()
      .should("contain", "Black");
    cy.get('[data-element-checkbox-gender="action-gender"]')
      .first()
      .click()
      .should("contain", "Men");
    cy.get('[data-element-checkbox-price="action-price"]')
      .first()
      .click()
      .should("contain", "250");
    cy.get('[data-element-checkbox-type="action-type"]')
      .first()
      .click()
      .should("contain", "Polo");
    cy.get('[data-test-element="cards"]').should("have.length", "1");
    cy.get('[data-test-id="cards-0"]').should("not.contain", "Blue");

    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-colour="action-color"]')
      .first()
      .click()
      .should("contain", "Black");
    cy.get('[data-element-checkbox-gender="action-gender"]')
      .last()
      .click()
      .should("contain", "Women");
    cy.get('[data-element-checkbox-price="action-price"]')
      .last()
      .click()
      .should("contain", "300");
    cy.get('[data-element-checkbox-type="action-type"]')
      .last()
      .click()
      .should("contain", "Basic");
    cy.get('[data-test-element="cards"]').should("have.length", "1");
    cy.get('[data-test-id="cards-0"]').should("contain", "Black Round");
  });

  it("should visit the products page and throw error if filters doesn't match any products", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-colour="action-color"]').last().click();
    cy.get('[data-element-checkbox-gender="action-gender"]').first().click();
    cy.get('[data-test-element="cards"]').should("have.length", "0");
    cy.get('[data-test-id="action-no-match"]').should("contain", ERROR_MESSAGE);
  });
});
