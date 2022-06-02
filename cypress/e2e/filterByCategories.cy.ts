describe("filterByCategories.cy.ts", () => {
  it("should visit the products page and filter items by single colour", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-colour="action-color"]')
      .first()
      .click()
      .should("contain", "Black");
    cy.get('[data-test-id="cards-1"]').should("contain", "Black");
    cy.get('[data-test-id="cards-2"]').should("not.contain", "Blue");
  });
  it("should visit the products page and filter items by multiple colour", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-colour="action-color"]')
      .first()
      .click()
      .should("contain", "Black");
    cy.get('[data-element-checkbox-colour="action-color"]')
      .last()
      .click()
      .should("contain", "Yellow");
    cy.get('[data-test-id="cards-1"]').should("contain", "Black");
    cy.get('[data-test-id="cards-4"]').should("contain", "Yellow");
  });
  it("should visit the products page and filter items by single gender", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-gender="action-gender"]')
      .first()
      .click()
      .should("contain", "Men");
    cy.get('[data-test-element="cards"]').should("have.length", "15");
    cy.get('[data-test-id="cards-2"]').should("not.contain", "Pink");
  });
  it("should visit the products page and filter items by multiple gender", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-gender="action-gender"]')
      .first()
      .click()
      .should("contain", "Men");
    cy.get('[data-element-checkbox-gender="action-gender"]')
      .last()
      .click()
      .should("contain", "Women");
    cy.get('[data-test-element="cards"]').should("have.length", "30");
    cy.get('[data-test-element="cards"]').should("contain", "Pink");
  });
  it("should visit the products page and filter items by single price filter", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-price="action-price"]')
      .first()
      .click()
      .should("contain", "250");
    cy.get('[data-test-element="cards"]').should("have.length", "3");
    cy.get('[data-test-id="cards-1"]').should("contain", "250");
    cy.get('[data-test-id="cards-2"]').should("not.contain", "500");
  });
  it("should visit the products page and filter items by multiple price filter", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-checkbox-price="action-price"]')
      .first()
      .click()
      .should("contain", "250");
    cy.get('[data-element-checkbox-price="action-price"]')
      .last()
      .click()
      .should("contain", "300");
    cy.get('[data-test-element="cards"]').should("have.length", "18");
    cy.get('[data-test-element="cards"]').should("not.contain", "Pink");
    cy.get('[data-test-id="cards-3"]').should("contain", "300");
  });

  it("should visit the products page and filter items by single type filter", () => {
    cy.visit("localhost:3000/");

    cy.get('[data-element-checkbox-type="action-type"]')
      .first()
      .click()
      .should("contain", "Polo");
    cy.get('[data-test-element="cards"]').should("have.length", "10");
    cy.get('[data-test-id="cards-1"]').should("contain", "Polo");
    cy.get('[data-test-id="cards-2"]').should("not.contain", "Hoodie");
  });

  it("should visit the products page and filter items by multiple type filter", () => {
    cy.visit("localhost:3000/");

    cy.get('[data-element-checkbox-type="action-type"]')
      .first()
      .click()
      .should("contain", "Polo");
    cy.get('[data-element-checkbox-type="action-type"]')
      .last()
      .click()
      .should("contain", "Basic");
    cy.get('[data-test-element="cards"]').should("have.length", "21");
    cy.get('[data-test-element="cards"]').should("contain", "Pink");
  });
});
