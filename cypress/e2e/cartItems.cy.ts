import { EMPTY_CART_ERROR_MESSAGE } from "../../constants";

describe("cartItems.cy.ts", () => {
  it("should visit products page and add a product to cart", () => {
    cy.visit("localhost:3000/");
    cy.get('[ data-test-element="action-add-cart"]').first().click();

    cy.get('[data-test-element="action-go-to-cart"]').first().click();

    cy.get('[data-test-element="cart-item"]').should("have.length", "1");
    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 250");
  });

  it("should visit products page and add a product to cart and increase or decrease the quantity of the product", () => {
    cy.visit("localhost:3000/");
    cy.get('[ data-test-element="action-add-cart"]').first().click();

    cy.get('[data-test-element="action-go-to-cart"]').first().click();

    cy.get('[data-test-element="action-add-quantity"]').click();
    cy.get('[data-test-element="action-add-quantity"]').click();

    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 750");

    cy.get('[data-test-element="action-subtract-quantity"]').click();
    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 500");
  });

  it("should add a product to cart and delete product from the cart", () => {
    cy.visit("localhost:3000/");
    cy.get('[ data-test-element="action-add-cart"]').first().click();

    cy.get('[data-test-element="action-go-to-cart"]').first().click();

    cy.get('[data-test-element="action-delete-item"]').click();
    cy.get('[data-test-id="action-error"]').should(
      "contain",
      EMPTY_CART_ERROR_MESSAGE
    );
  });

  it("should add multiple product to cart and increase or decrease quantity", () => {
    cy.visit("localhost:3000/");
    cy.get('[ data-test-element="action-add-cart"]').first().click();
    cy.get('[ data-test-element="action-add-cart"]').last().click();

    cy.get('[data-test-element="action-go-to-cart"]').last().click();
    cy.get('[data-test-element="cart-item"]').should("have.length", "2");
    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 550");

    cy.get('[data-test-element="action-add-quantity"]').first().click();
    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 800");

    cy.get('[data-test-element="action-delete-item"]').last().click();
    cy.get('[data-test-element="cart-price"]').should("contain", "Rs 500");
  });

  it("should add multiple product to cart and remove all products from cart", () => {
    cy.visit("localhost:3000/");
    cy.get('[ data-test-element="action-add-cart"]').first().click();
    cy.get('[ data-test-element="action-add-cart"]').last().click();

    cy.get('[data-test-element="action-go-to-cart"]').last().click();

    cy.get('[data-test-element="action-delete-item"]').first().click();
    cy.get('[data-test-element="action-delete-item"]').last().click();
    cy.get('[data-test-id="action-error"]').should(
      "contain",
      EMPTY_CART_ERROR_MESSAGE
    );
  });
});
