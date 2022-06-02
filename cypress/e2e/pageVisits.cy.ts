import { EMPTY_CART_ERROR_MESSAGE } from "../../constants";

describe("pageVisits.cy.ts", () => {
  it("should visit the products and carts page", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-test-element="navigation-cart"]').click();
    cy.url().should("include", "/cart");
  });
  it("should display appropriate message if cart is empty", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-test-element="navigation-cart"]').click();
    cy.get('[data-test-id="action-error"]').should(
      "contain",
      EMPTY_CART_ERROR_MESSAGE
    );
  });
});
