describe("filterBySearch.cy.ts", () => {
  it("should visit products page and filter by search", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-search="action-search"]').type("Black Hoodie");

    cy.get('[data-test-element="cards"]').should("have.length", "2");

    cy.get('[data-element-search="action-search"]').clear();
    cy.get('[data-test-element="cards"]').should("have.length", "30");
  });

  it("should visit products page and filter by search as well as filter by colour", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-search="action-search"]').type("Hoodie");
    cy.get('[data-element-checkbox-colour="action-color"]').first().click();
    cy.get('[data-test-element="cards"]').should("have.length", "2");
    cy.get('[data-test-id="cards-0"]').should("not.contain", "Blue");
  });

  it("should visit products page and filter by search as well as filter by colour and gender", () => {
    cy.visit("localhost:3000/");
    cy.get('[data-element-search="action-search"]').type("Hoodie");
    cy.get('[data-element-checkbox-colour="action-color"]').first().click();
    cy.get('[data-element-checkbox-gender="action-gender"]').first().click();
    cy.get('[data-test-element="cards"]').should("have.length", "1");
    cy.get('[data-test-id="cards-0"]').should("contain", "Black");
  });
});
