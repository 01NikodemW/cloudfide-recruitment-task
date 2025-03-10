

describe("Transaction Chart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should load the dashboard with default values", () => {
    cy.get("[data-cy=symbol-select]").should("exist");
    cy.get(".echarts-for-react").should("exist");
  });

  it("should allow selecting a different symbol", () => {
    cy.get("[data-cy=symbol-select]").click();
    cy.get("li").contains("ETHUSDT").click();
    cy.get('[data-cy="symbol-select"] > .MuiSelect-select').should(
      "have.text",
      "ETHUSDT"
    );
  });


  it("should display the CryptoChart and update data on selection", () => {
    cy.get(".echarts-for-react").should("exist");

    cy.get("[data-cy=symbol-select]").click();
    cy.get("li").contains("BNBUSDT").click();

    cy.wait(5000); 
    cy.get(".echarts-for-react").should("exist");
  });
});